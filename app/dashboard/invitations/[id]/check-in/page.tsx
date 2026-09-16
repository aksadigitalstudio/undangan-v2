"use client";

import Link from "next/link";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Camera, CheckCircle2, Keyboard, QrCode, RefreshCw, TriangleAlert, UserRoundCheck, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseCheckInPayload } from "@/lib/checkIn";
import { supabase } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

type Guest = {
  id: number;
  guest_name: string;
  max_guest: number;
  confirmed_guest: number;
  rsvp_status: "pending" | "attending" | "declined";
  check_in_token: string | null;
  checked_in_at: string | null;
  checked_in_guest_count: number | null;
};

type ScannerControls = { stop: () => void };

export default function CheckInPage({ params }: Props) {
  const [invitationId, setInvitationId] = useState(0);
  const [invitationName, setInvitationName] = useState("Guest check-in");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [scannerActive, setScannerActive] = useState(false);
  const [manualValue, setManualValue] = useState("");
  const [candidate, setCandidate] = useState<Guest | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerControls = useRef<ScannerControls | null>(null);

  const loadGuests = useCallback(async (id: number) => {
    const { data, error: guestError } = await supabase
      .from("guests")
      .select("id, guest_name, max_guest, confirmed_guest, rsvp_status, check_in_token, checked_in_at, checked_in_guest_count")
      .eq("invitation_id", id)
      .order("guest_name");

    if (guestError) {
      setError("Daftar tamu belum dapat dimuat. Pastikan migration QR check-in sudah dijalankan.");
      setGuests([]);
      return;
    }

    setGuests((data ?? []) as Guest[]);
  }, []);

  useEffect(() => {
    async function init() {
      const { id } = await params;
      const numericId = Number(id);
      setInvitationId(numericId);

      const { data: invitation } = await supabase
        .from("invitations")
        .select("groom_name, bride_name")
        .eq("id", numericId)
        .single();

      if (invitation) {
        setInvitationName(`${invitation.groom_name} & ${invitation.bride_name}`);
      }

      await loadGuests(numericId);
      setLoading(false);
    }

    void init();
  }, [loadGuests, params]);

  const stopScanner = useCallback(() => {
    scannerControls.current?.stop();
    scannerControls.current = null;
    setScannerActive(false);
  }, []);

  useEffect(() => () => stopScanner(), [stopScanner]);

  const selectQr = useCallback((value: string) => {
    setError("");
    setNotice("");

    const parsed = parseCheckInPayload(value);
    if (!parsed) {
      setError("QR ini bukan AKSA Event Pass yang valid.");
      return;
    }

    if (parsed.invitationId !== invitationId) {
      setError("QR ini berasal dari undangan yang berbeda.");
      return;
    }

    const guest = guests.find((item) => item.check_in_token === parsed.token);
    if (!guest) {
      setError("Guest pass tidak ditemukan pada daftar tamu ini.");
      return;
    }

    if (guest.checked_in_at) {
      setNotice(`${guest.guest_name} sudah tercatat hadir sebelumnya.`);
      return;
    }

    setCandidate(guest);
    setGuestCount(Math.min(guest.max_guest, Math.max(1, guest.confirmed_guest || 1)));
  }, [guests, invitationId]);

  async function startScanner() {
    if (!videoRef.current) return;
    setError("");
    setNotice("");
    setScannerActive(true);

    try {
      const reader = new BrowserQRCodeReader();
      const controls = await reader.decodeFromConstraints(
        { audio: false, video: { facingMode: { ideal: "environment" } } },
        videoRef.current,
        (result) => {
          if (!result) return;
          stopScanner();
          selectQr(result.getText());
        }
      );
      scannerControls.current = controls;
    } catch {
      setScannerActive(false);
      setError("Kamera tidak dapat digunakan. Izinkan akses kamera atau gunakan input kode QR manual.");
    }
  }

  function submitManualCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    selectQr(manualValue);
    setManualValue("");
  }

  async function confirmCheckIn() {
    if (!candidate) return;
    setSaving(true);
    setError("");

    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) {
      setSaving(false);
      setError("Sesi petugas sudah berakhir. Silakan login kembali.");
      return;
    }

    const { data, error: updateError } = await supabase
      .from("guests")
      .update({
        checked_in_at: new Date().toISOString(),
        checked_in_guest_count: guestCount,
        checked_in_by: authData.user.id,
      })
      .eq("id", candidate.id)
      .eq("invitation_id", invitationId)
      .is("checked_in_at", null)
      .select("id, checked_in_at, checked_in_guest_count")
      .maybeSingle();

    setSaving(false);

    if (updateError || !data) {
      setCandidate(null);
      setError("Check-in tidak dapat disimpan. Mungkin pass ini baru saja digunakan pada perangkat lain.");
      await loadGuests(invitationId);
      return;
    }

    setGuests((current) => current.map((guest) => guest.id === candidate.id
      ? { ...guest, checked_in_at: data.checked_in_at, checked_in_guest_count: data.checked_in_guest_count }
      : guest));
    setNotice(`${candidate.guest_name} berhasil check-in untuk ${guestCount} orang.`);
    setCandidate(null);
  }

  const checkedInInvitations = guests.filter((guest) => guest.checked_in_at).length;
  const checkedInPeople = guests.reduce((total, guest) => total + (guest.checked_in_at ? guest.checked_in_guest_count || 1 : 0), 0);

  return (
    <section className="mx-auto max-w-5xl space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href={`/dashboard/invitations/${invitationId}/guests`} className="text-sm font-semibold text-[#657087] transition hover:text-[#182235]">← Back to guests</Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#e65d51]">AKSA guest check-in</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#182235] sm:text-4xl">Welcome desk for {invitationName}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#657087]">Scan each guest’s personal Event Pass. Attendance is saved directly to the invitation database.</p>
        </div>
        <button type="button" onClick={() => void loadGuests(invitationId)} className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#182235]/15 bg-white px-4 py-3 text-sm font-bold text-[#182235] transition hover:bg-[#f8f5ef]"><RefreshCw size={16} />Refresh</button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <article className="rounded-2xl border border-[#182235]/10 bg-white p-4 shadow-sm"><p className="text-xs font-semibold text-[#657087]">Guest passes</p><p className="mt-2 text-3xl font-bold text-[#182235]">{loading ? "—" : guests.length}</p></article>
        <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm"><p className="text-xs font-semibold text-emerald-700">Checked in</p><p className="mt-2 text-3xl font-bold text-emerald-800">{checkedInInvitations}</p></article>
        <article className="col-span-2 rounded-2xl border border-violet-100 bg-violet-50 p-4 shadow-sm sm:col-span-1"><p className="text-xs font-semibold text-violet-700">People arrived</p><p className="mt-2 text-3xl font-bold text-violet-800">{checkedInPeople}</p></article>
      </div>

      {(error || notice) && <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-6 ${error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{error ? <TriangleAlert className="mt-0.5 shrink-0" size={18} /> : <CheckCircle2 className="mt-0.5 shrink-0" size={18} />}<p>{error || notice}</p></div>}

      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <article className="overflow-hidden rounded-[2rem] border border-[#182235]/10 bg-[#182235] p-5 text-white shadow-xl shadow-[#182235]/15 sm:p-7">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e65d51]"><Camera size={19} /></span><div><h2 className="font-serif text-2xl">Scan event pass</h2><p className="mt-0.5 text-sm text-white/65">Use the device’s rear camera.</p></div></div>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-[#0d1524]">
            <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />
            {!scannerActive && <div className="absolute inset-0 grid place-items-center p-6 text-center"><QrCode size={44} className="text-white/35" /><p className="mt-3 text-sm text-white/60">Ready when your welcome team is.</p></div>}
            {scannerActive && <div className="pointer-events-none absolute inset-7 rounded-2xl border-2 border-[#f0bc75] shadow-[0_0_0_999px_rgba(8,13,24,.18)]" />}
          </div>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => void startScanner()} disabled={scannerActive || loading} className="inline-flex items-center gap-2 rounded-xl bg-[#e65d51] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d64e43] disabled:cursor-not-allowed disabled:opacity-50"><Camera size={16} />{scannerActive ? "Camera is scanning…" : "Open camera"}</button>{scannerActive && <button type="button" onClick={stopScanner} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"><X size={16} />Stop</button>}</div>
        </article>

        <article className="rounded-[2rem] border border-[#182235]/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-violet-50 text-violet-700"><Keyboard size={18} /></span><div><h2 className="font-serif text-2xl text-[#182235]">Manual fallback</h2><p className="mt-0.5 text-sm text-[#657087]">Paste a QR code if a camera is unavailable.</p></div></div>
          <form onSubmit={submitManualCode} className="mt-6 space-y-3"><textarea value={manualValue} onChange={(event) => setManualValue(event.target.value)} placeholder="AKSA-CHECKIN:…" rows={4} className="w-full resize-none rounded-xl border border-[#182235]/15 bg-[#fcfaf7] p-3 font-mono text-xs text-[#182235] outline-none transition focus:border-[#e65d51] focus:ring-4 focus:ring-[#e65d51]/10" /><button type="submit" disabled={!manualValue.trim()} className="w-full rounded-xl border border-[#182235]/15 px-4 py-3 text-sm font-bold text-[#182235] transition hover:bg-[#f8f5ef] disabled:cursor-not-allowed disabled:opacity-50">Find guest pass</button></form>
          <div className="mt-6 rounded-xl bg-[#f8f5ef] p-4 text-xs leading-5 text-[#657087]"><strong className="text-[#182235]">Privacy note:</strong> only a logged-in dashboard owner can record attendance. A QR pass never gives public access to your guest list.</div>
        </article>
      </div>

      {candidate && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#101827]/60 p-4 backdrop-blur-sm sm:items-center"><section className="w-full max-w-md rounded-[2rem] bg-[#fffdf8] p-6 shadow-2xl"><button type="button" onClick={() => setCandidate(null)} className="float-right rounded-full p-2 text-slate-500 transition hover:bg-slate-100" aria-label="Cancel check-in"><X size={18} /></button><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e65d51]">Guest found</p><h2 className="mt-3 pr-10 font-serif text-3xl text-[#182235]">{candidate.guest_name}</h2><p className="mt-2 text-sm text-[#657087]">RSVP: <span className="font-semibold capitalize text-[#182235]">{candidate.rsvp_status}</span> · Pass capacity: {candidate.max_guest}</p><label className="mt-6 block text-sm font-bold text-[#182235]">Number of people arriving<select value={guestCount} onChange={(event) => setGuestCount(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-[#182235]/15 bg-white px-3 py-3 text-base font-medium text-[#182235]">{Array.from({ length: candidate.max_guest }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? "person" : "people"}</option>)}</select></label><button type="button" disabled={saving} onClick={() => void confirmCheckIn()} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"><UserRoundCheck size={18} />{saving ? "Saving arrival…" : "Confirm check-in"}</button></section></div>}
    </section>
  );
}
