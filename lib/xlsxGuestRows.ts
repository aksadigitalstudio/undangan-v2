import { strFromU8, unzipSync } from "fflate";

type SpreadsheetRow = Record<string, string>;

function parseXml(content: Uint8Array, label: string) {
  const document = new DOMParser().parseFromString(strFromU8(content), "application/xml");
  if (document.getElementsByTagName("parsererror").length) {
    throw new Error(`${label} tidak dapat dibaca sebagai file Excel yang valid.`);
  }
  return document;
}

function textContent(element: Element | null) {
  return element?.textContent?.trim() ?? "";
}

function columnNumber(reference: string) {
  const letters = reference.replace(/[^A-Z]/gi, "").toUpperCase();
  return [...letters].reduce((value, letter) => value * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function readSharedStrings(files: Record<string, Uint8Array>) {
  const sharedStrings = files["xl/sharedStrings.xml"];
  if (!sharedStrings) return [];

  const document = parseXml(sharedStrings, "Daftar kata Excel");
  return Array.from(document.getElementsByTagName("si")).map((item) => textContent(item));
}

function readCell(cell: Element, sharedStrings: string[]) {
  const type = cell.getAttribute("t");
  if (type === "inlineStr") return textContent(cell.getElementsByTagName("t")[0] ?? null);

  const value = textContent(cell.getElementsByTagName("v")[0] ?? null);
  if (type === "s") return sharedStrings[Number(value)] ?? "";
  return value;
}

export async function readGuestSpreadsheet(file: File): Promise<SpreadsheetRow[]> {
  if (!file.name.toLowerCase().endsWith(".xlsx")) {
    throw new Error("Gunakan file .xlsx dari template AKSA.");
  }

  let files: Record<string, Uint8Array>;
  try {
    files = unzipSync(new Uint8Array(await file.arrayBuffer()));
  } catch {
    throw new Error("File tidak dapat dibuka. Pastikan file adalah Excel .xlsx yang valid.");
  }

  const worksheet = files["xl/worksheets/sheet1.xml"];
  if (!worksheet) throw new Error("Sheet pertama tidak ditemukan di file Excel.");

  const sharedStrings = readSharedStrings(files);
  const document = parseXml(worksheet, "Daftar tamu");
  const rows = Array.from(document.getElementsByTagName("row")).map((row) => {
    const values: string[] = [];
    Array.from(row.getElementsByTagName("c")).forEach((cell) => {
      const reference = cell.getAttribute("r") ?? "";
      const column = columnNumber(reference);
      if (column >= 0) values[column] = readCell(cell, sharedStrings);
    });
    return values;
  });

  const [headerRow, ...dataRows] = rows;
  if (!headerRow?.some(Boolean)) throw new Error("Baris judul kolom tidak ditemukan di file Excel.");

  return dataRows
    .filter((row) => row.some((value) => value?.trim()))
    .map((row) => Object.fromEntries(headerRow.map((header, index) => [header ?? "", row[index] ?? ""])));
}
