"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import GuestCheckInQr from "@/components/check-in/GuestCheckInQr";
import {
  buildWhatsAppShareMessage,
  isShareTemplateId,
  shareMessageTemplates,
  type ShareTemplateId,
} from "@/lib/shareMessageTemplates";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

interface Guest {
  id: number;
  guest_name: string;
  phone: string | null;
  address: string |null;
  max_guest: number;
  slug: string;
  rsvp_token: string;
  check_in_token: string | null;
  checked_in_at: string | null;
  checked_in_guest_count: number | null;

  rsvp_status: "pending" | "attending" | "declined";
  confirmed_guest: number;
  message: string | null;
  responded_at: string | null;
}

type InvitationDetails = {
  slug: string;
  groom_name: string | null;
  bride_name: string | null;
  wedding_date: string | null;
  sections: Record<string, unknown> | null;
};

export default function GuestsPage({ params }: Props) {
const [invitationId, setInvitationId] = useState(0);
const [invitationSlug, setInvitationSlug] = useState("");
const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
const [shareTemplateId, setShareTemplateId] = useState<ShareTemplateId>("aksa-signature");
const [isSavingShareTemplate, setIsSavingShareTemplate] = useState(false);
const [shareTemplateFeedback, setShareTemplateFeedback] = useState("");

const [guests, setGuests] = useState<Guest[]>([]);

  const [showForm, setShowForm] = useState(false);

const [guestName, setGuestName] = useState("");
const [phone, setPhone] = useState("");

const [editingGuestId, setEditingGuestId] = useState<number | null>(null);

const [maxGuest, setMaxGuest] = useState(1);
const [searchKeyword, setSearchKeyword] = useState("");
const ITEMS_PER_PAGE = 10;

const [currentPage, setCurrentPage] = useState(1);  
useEffect(() => {
    async function init() {
      const { id } = await params;

      const invitationId = Number(id);

setInvitationId(invitationId);

const { data } = await supabase
  .from("invitations")
  .select("slug, groom_name, bride_name, wedding_date, sections")
  .eq("id", invitationId)
  .single();

if (data) {
  setInvitationSlug(data.slug);
  const invitationData = data as InvitationDetails;
  setInvitation(invitationData);

  const savedTemplate = invitationData.sections?.whatsapp_share_template;
  if (isShareTemplateId(savedTemplate)) {
    setShareTemplateId(savedTemplate);
  }
}

loadGuests(invitationId);
    }

    init();
  }, [params]);

async function loadGuests(id: number) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_id", id)
    .order("created_at", {
      ascending: false,
    });

  setGuests(data ?? []);
}

  async function saveGuest() {
    if (!guestName.trim()) {
      alert("Nama tamu wajib diisi.");
      return;
    }

    const slug = guestName
      .toLowerCase()
      .replace(/\s+/g, "-");

let error = null;

if (editingGuestId) {
  const result = await supabase
    .from("guests")
    .update({
      guest_name: guestName,
      phone,
      max_guest: maxGuest,
      slug,
    })
    .eq("id", editingGuestId);

  error = result.error;
} else {
  const result = await supabase
    .from("guests")
    .insert([
      {
        invitation_id: invitationId,
        guest_name: guestName,
        phone,
        max_guest: maxGuest,
        slug,
      },
    ]);

  error = result.error;
}

if (error) {
  alert(
    JSON.stringify(error, null, 2)
  );

  return;
}

alert(
  editingGuestId
    ? "Tamu berhasil diperbarui."
    : "Tamu berhasil ditambahkan."
);

setGuestName("");
setPhone("");

setMaxGuest(1);

setEditingGuestId(null);

setShowForm(false);

loadGuests(invitationId);
  }
function getInvitationLink(rsvpToken: string) {
  return `${window.location.origin}/${invitationSlug}?to=${rsvpToken}`;
}

function getShareMessage(guest: Guest) {
  return buildWhatsAppShareMessage(shareTemplateId, {
    guestName: guest.guest_name,
    groomName: invitation?.groom_name ?? "",
    brideName: invitation?.bride_name ?? "",
    weddingDate: invitation?.wedding_date ?? null,
    invitationLink: getInvitationLink(guest.rsvp_token),
  });
}

async function copyShareMessage(guest: Guest) {
  await navigator.clipboard.writeText(getShareMessage(guest));
  alert("Pesan undangan berhasil disalin.");
}

function openWhatsApp(guest: Guest) {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(getShareMessage(guest))}`,
    "_blank"
  );
}

async function chooseShareTemplate(templateId: ShareTemplateId) {
  setShareTemplateId(templateId);
  setShareTemplateFeedback("");

  if (!invitation || templateId === shareTemplateId) return;

  setIsSavingShareTemplate(true);
  const nextSections = {
    ...(invitation.sections ?? {}),
    whatsapp_share_template: templateId,
  };

  const { error } = await supabase
    .from("invitations")
    .update({ sections: nextSections })
    .eq("id", invitationId);

  setIsSavingShareTemplate(false);

  if (error) {
    setShareTemplateFeedback("Pilihan belum tersimpan. Coba lagi.");
    return;
  }

  setInvitation({ ...invitation, sections: nextSections });
  setShareTemplateFeedback("Gaya pesan tersimpan untuk undangan ini.");
}
function startEdit(guest: Guest) {
  setEditingGuestId(guest.id);

  setGuestName(guest.guest_name);
  setPhone(guest.phone ?? "");
  setMaxGuest(guest.max_guest);

  setShowForm(true);
}
async function updateRSVP(
  guestId: number,
  status: "pending" | "attending" | "declined"
) {
  const { error } = await supabase
    .from("guests")
    .update({
      rsvp_status: status,
    })
    .eq("id", guestId);

  if (error) {
    alert(error.message);
    return;
  }

  loadGuests(invitationId);
}
const filteredGuests = guests.filter((guest) =>
  guest.guest_name
    .toLowerCase()
    .includes(searchKeyword.toLowerCase())
);
const totalPages = Math.max(
  1,
  Math.ceil(filteredGuests.length / ITEMS_PER_PAGE)
);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

const paginatedGuests = filteredGuests.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE
);
const totalInvitations = guests.length;

const onePersonInvitations = guests.filter(
  (guest) => guest.max_guest === 1
).length;

const twoPersonInvitations = guests.filter(
  (guest) => guest.max_guest === 2
).length;

const totalCapacity = guests.reduce(
  (total, guest) => total + guest.max_guest,
  0
);
const pendingRSVP = guests.filter(
  (guest) => guest.rsvp_status === "pending"
).length;
const attendingRSVP = guests.filter(
  (guest) => guest.rsvp_status === "attending"
).length;

const declinedRSVP = guests.filter(
  (guest) => guest.rsvp_status === "declined"
).length;

const respondedRSVP =
  attendingRSVP + declinedRSVP;

const confirmedGuests = guests.reduce(
  (total, guest) => total + guest.confirmed_guest,
  0
);
const checkedInInvitations = guests.filter((guest) => guest.checked_in_at).length;
const checkedInPeople = guests.reduce(
  (total, guest) => total + (guest.checked_in_at ? guest.checked_in_guest_count || 1 : 0),
  0
);
const hasSearch = searchKeyword.trim() !== "";
const previewMessage = invitation
  ? buildWhatsAppShareMessage(shareTemplateId, {
      guestName: guests[0]?.guest_name ?? "Dear Guest",
      groomName: invitation.groom_name ?? "",
      brideName: invitation.bride_name ?? "",
      weddingDate: invitation.wedding_date,
      invitationLink: `https://aksadigitalstudio.com/${invitation.slug}?to=personal-link`,
    })
  : "";

async function deleteGuest(guest: Guest) {

  const confirmed = window.confirm(
    `Hapus tamu "${guest.guest_name}"?\n\nTindakan ini tidak dapat dibatalkan.`
  );

  if (!confirmed) {
    return;
  }

const { error } = await supabase
  .from("guests")
  .delete()
  .eq("id", guest.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Tamu berhasil dihapus.");

  loadGuests(invitationId);
}
  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

<h1 className="text-4xl font-bold text-black">
  Daftar Tamu
</h1>
<div className="flex flex-wrap items-center justify-end gap-2">
  <Link href={`/dashboard/invitations/${invitationId}/check-in`} className="rounded-lg bg-[#182235] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2a3b5b]">QR Check-in</Link>
  <button
    onClick={() => {
      setEditingGuestId(null);
      setGuestName("");
      setPhone("");
      setMaxGuest(1);
      setShowForm(!showForm);
    }}
    className="bg-blue-600 text-white rounded-lg px-5 py-3"
  >
    + Tambah Tamu
  </button>
</div>

      </div>
<div className="grid grid-cols-1 gap-4 md:grid-cols-4">

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Total Undangan
    </p>

    <p className="mt-2 text-3xl font-bold text-black">
      {totalInvitations}
    </p>
  </div>

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Undangan 1 Orang
    </p>

    <p className="mt-2 text-3xl font-bold text-blue-600">
      {onePersonInvitations}
    </p>
  </div>

  <div className="rounded-xl bg-white p-5 shadow">
    <p className="text-sm text-gray-500">
      Undangan 2 Orang
    </p>

    <p className="mt-2 text-3xl font-bold text-green-600">
      {twoPersonInvitations}
    </p>
  </div>

<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">
    Total Kapasitas
  </p>

  <p className="mt-2 text-3xl font-bold text-purple-600">
    {totalCapacity}
  </p>
</div>
<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">Sudah Check-in</p>
  <p className="mt-2 text-3xl font-bold text-emerald-600">{checkedInInvitations}</p>
</div>
<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">Orang Tiba</p>
  <p className="mt-2 text-3xl font-bold text-violet-600">{checkedInPeople}</p>
</div>

<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">
    Belum RSVP
  </p>

  <p className="mt-2 text-3xl font-bold text-yellow-500">
    {pendingRSVP}
  </p>
</div>
<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">
    Sudah RSVP
  </p>

  <p className="mt-2 text-3xl font-bold text-blue-600">
    {respondedRSVP}
  </p>
</div>
<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">
    Hadir
  </p>

  <p className="mt-2 text-3xl font-bold text-green-600">
    {attendingRSVP}
  </p>
</div>
<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">
    Tidak Hadir
  </p>

  <p className="mt-2 text-3xl font-bold text-red-600">
    {declinedRSVP}
  </p>
</div>
<div className="rounded-xl bg-white p-5 shadow">
  <p className="text-sm text-gray-500">
    Orang Akan Hadir
  </p>

  <p className="mt-2 text-3xl font-bold text-indigo-600">
    {confirmedGuests}
  </p>
</div>
</div>
      {invitation && (
        <section className="overflow-hidden rounded-2xl border border-[#f1d7cc] bg-[#fffaf7] shadow-sm">
          <div className="border-b border-[#f1d7cc] px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e65d51]">Guest sharing</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#182235]">Pilih gaya pesan WhatsApp</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">Pesan pilihan ini otomatis dipakai saat Anda menekan WhatsApp atau Copy message untuk setiap tamu.</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#182235] shadow-sm">
                {isSavingShareTemplate ? "Menyimpan…" : shareTemplateFeedback || "Pilih satu gaya"}
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {shareMessageTemplates.map((template) => {
                const selected = template.id === shareTemplateId;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => chooseShareTemplate(template.id)}
                    disabled={isSavingShareTemplate}
                    className={`rounded-xl border p-4 text-left transition disabled:cursor-wait ${
                      selected
                        ? "border-[#e65d51] bg-[#182235] text-white shadow-md"
                        : "border-[#eadfd9] bg-white text-[#182235] hover:border-[#e65d51] hover:bg-[#fff5f1]"
                    }`}
                  >
                    <span className="block text-sm font-bold">{template.label}</span>
                    <span className={`mt-1 block text-xs ${selected ? "text-[#ffd4ca]" : "text-slate-500"}`}>{template.meta}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl bg-[#182235] p-5 text-white shadow-inner">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e9a99f]">Preview pesan</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Contoh dengan tamu pertama. Link final setiap tamu tetap unik dan aman.</p>
              <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-white/10 p-4 font-sans text-sm leading-6 text-white">{previewMessage}</pre>
            </div>
          </div>
        </section>
      )}
      {showForm && (

        <div className="bg-white rounded-xl shadow p-6 space-y-4">

<input
  value={guestName}
  onChange={(e) =>
    setGuestName(e.target.value)
  }
  placeholder="Nama Tamu"
  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black placeholder:text-gray-400"
/>
<input
  value={phone}
  onChange={(e) => {
    const value = e.target.value.replace(
      /[^0-9+]/g,
      ""
    );

    setPhone(value);
  }}
  placeholder="Nomor WA"
  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black placeholder:text-gray-400"
/>

<select
  value={maxGuest}
  onChange={(e) =>
    setMaxGuest(Number(e.target.value))
  }
  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
>
            <option value={1}>1 Orang</option>
            <option value={2}>2 Orang</option>
          </select>

<button
  onClick={saveGuest}
  className={`rounded-lg px-6 py-3 text-white ${
    editingGuestId
      ? "bg-amber-500 hover:bg-amber-600"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {editingGuestId ? "Update" : "Simpan"}
</button>

        </div>

      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
<div className="bg-white rounded-xl shadow p-4">
  <input
    type="text"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
    placeholder="Cari nama tamu..."
    className="w-full rounded-lg border border-gray-300 p-3 bg-white text-black placeholder:text-gray-400"
  />
</div>
        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
<th className="w-16 p-4 text-center text-gray-700 font-semibold">
  No
</th>
<th className="p-4 text-left text-gray-700 font-semibold">                
  Nama
</th>

<th className="p-4 text-left text-gray-700 font-semibold">                
  Maks Hadir
</th>

<th className="p-4 text-left text-gray-700 font-semibold">
  Link Undangan
</th>
<th className="p-4 text-left text-gray-700 font-semibold">
  RSVP
</th>

<th className="p-4 text-left text-gray-700 font-semibold">
  Akan Hadir
</th>

<th className="p-4 text-left text-gray-700 font-semibold">
  Aksi
</th>

            </tr>

          </thead>

          <tbody>

            {paginatedGuests.length === 0 ? (

              <tr>

<td
colSpan={7}
  className="text-center p-8 text-gray-600"
>
  {hasSearch
    ? "Tamu tidak ditemukan."
    : "Belum ada tamu."}
</td>

              </tr>

            ) : (

paginatedGuests.map((guest, index) => (

<tr
  key={guest.id}
className="border-t"
>
<td className="p-4 text-center font-medium text-gray-600">
{startIndex + index + 1}
</td>
<td className="p-4 text-black">
  {guest.guest_name}
</td>

<td className="p-4">
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
      guest.max_guest === 1
        ? "bg-blue-100 text-blue-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {guest.max_guest}{" "}
    {guest.max_guest === 1 ? "Orang" : "Orang"}
  </span>
</td>

<td className="p-4">
  <span className="text-sm text-gray-700 break-all">
    {`/${invitationSlug}?to=${guest.rsvp_token}`}
  </span>
</td>
<td className="p-4">
<select
  value={guest.rsvp_status}
onChange={(e) =>
  updateRSVP(
    guest.id,
    e.target.value as
      | "pending"
      | "attending"
      | "declined"
  )
}
  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black"
>
    <option value="pending">
      Belum RSVP
    </option>

    <option value="attending">
      Hadir
    </option>

    <option value="declined">
      Tidak Hadir
    </option>
  </select>
</td>
<td className="p-4">
<select
  defaultValue={guest.confirmed_guest}
    disabled={guest.rsvp_status !== "attending"}
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black disabled:bg-gray-100 disabled:text-gray-400"
  >
    <option value={0}>0</option>

    <option value={1}>1</option>

    {guest.max_guest >= 2 && (
      <option value={2}>2</option>
    )}
  </select>
</td>
<td className="p-4">
  <div className="flex gap-2">
    <button
      onClick={() => copyShareMessage(guest)}
      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
    >
      Copy pesan
    </button>

    <button
      onClick={() => openWhatsApp(guest)}
      className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
    >
      WhatsApp
    </button>
    <GuestCheckInQr invitationId={invitationId} guestName={guest.guest_name} token={guest.check_in_token} triggerLabel="QR" triggerClassName="rounded-lg bg-[#182235] px-3 py-2 text-sm text-white hover:bg-[#2a3b5b]" />
<button
  onClick={() => startEdit(guest)}
  className="rounded-lg bg-amber-500 px-3 py-2 text-sm text-white hover:bg-amber-600"
>
  Edit
</button>
<button
  onClick={() => deleteGuest(guest)}
  className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
>
  Hapus
</button>
  </div>
</td>

                </tr>

              ))

            )}

          </tbody>

        </table>
<div className="flex items-center justify-between border-t px-6 py-4">

  <button
    onClick={() =>
      setCurrentPage((page) => Math.max(1, page - 1))
    }
    disabled={currentPage === 1}
className="rounded-lg border border-gray-200 px-5 py-2 text-gray-600 transition hover:bg-gray-50 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300"
  >
    ← Previous
  </button>

<span className="text-sm font-medium text-gray-500">
  Page {currentPage} / {totalPages}
</span>

  <button
    onClick={() =>
      setCurrentPage((page) =>
        Math.min(totalPages, page + 1)
      )
    }
    disabled={currentPage === totalPages}
className="rounded-lg border border-gray-200 px-5 py-2 text-gray-600 transition hover:bg-gray-50 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300"
  >
    Next →
  </button>

</div>
      </div>

    </div>
  );
}
