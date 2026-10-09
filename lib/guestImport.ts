export type GuestImportIssue = {
  rowNumber: number;
  message: string;
};

export type ImportedGuest = {
  rowNumber: number;
  guestName: string;
  phone: string | null;
  maxGuest: number;
  address: string | null;
};

export type GuestImportResult = {
  guests: ImportedGuest[];
  issues: GuestImportIssue[];
  error?: string;
};

type GuestImportSourceRow = Record<string, unknown>;

const maximumRows = 500;

function headerKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function readCell(row: GuestImportSourceRow, aliases: string[]) {
  const expected = new Set(aliases.map(headerKey));
  const match = Object.entries(row).find(([header]) => expected.has(headerKey(header)));
  return match?.[1] ?? "";
}

function text(value: unknown) {
  return String(value ?? "").trim();
}

function guestKey(name: string, phone: string | null) {
  return `${name.toLocaleLowerCase("id-ID").replace(/\s+/g, " ")}|${phone ?? ""}`;
}

function normalizePhone(value: unknown) {
  const phone = text(value).replace(/[\s()\-.]/g, "");
  if (!phone) return null;
  return phone.replace(/[^0-9+]/g, "") || null;
}

export function prepareGuestImport(
  rows: GuestImportSourceRow[],
  existingGuests: Array<{ guest_name: string; phone: string | null }>
): GuestImportResult {
  if (rows.length > maximumRows) {
    return {
      guests: [],
      issues: [],
      error: `File berisi ${rows.length} baris. Maksimal ${maximumRows} tamu untuk satu kali impor.`,
    };
  }

  const hasNameColumn = rows.some((row) =>
    Object.keys(row).some((header) => ["namatamu", "nama", "guestname"].includes(headerKey(header)))
  );

  if (!hasNameColumn) {
    return {
      guests: [],
      issues: [],
      error: "Kolom “Nama Tamu” tidak ditemukan. Unduh lalu gunakan template AKSA agar formatnya sesuai.",
    };
  }

  const seen = new Set(existingGuests.map((guest) => guestKey(guest.guest_name, guest.phone)));
  const guests: ImportedGuest[] = [];
  const issues: GuestImportIssue[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const guestName = text(readCell(row, ["Nama Tamu", "Nama", "Guest Name"]));
    const phone = normalizePhone(readCell(row, ["Nomor WhatsApp", "Nomor WA", "WhatsApp", "Phone", "Phone Number"]));
    const address = text(readCell(row, ["Alamat (Opsional)", "Alamat", "Address"])) || null;
    const guestCountValue = text(readCell(row, ["Jumlah Tamu", "Maks Hadir", "Max Guest", "Guest Count"]));

    if (!guestName && !phone && !address && !guestCountValue) return;

    if (!guestName) {
      issues.push({ rowNumber, message: "Nama tamu wajib diisi." });
      return;
    }

    if (guestName.length > 160) {
      issues.push({ rowNumber, message: "Nama tamu terlalu panjang." });
      return;
    }

    const maxGuest = guestCountValue ? Number(guestCountValue) : 1;
    if (!Number.isInteger(maxGuest) || maxGuest < 1 || maxGuest > 10) {
      issues.push({ rowNumber, message: "Jumlah tamu harus berupa angka 1 sampai 10." });
      return;
    }

    const key = guestKey(guestName, phone);
    if (seen.has(key)) {
      issues.push({ rowNumber, message: "Tamu yang sama sudah ada atau muncul dua kali di file." });
      return;
    }

    seen.add(key);
    guests.push({ rowNumber, guestName, phone, maxGuest, address });
  });

  return { guests, issues };
}
