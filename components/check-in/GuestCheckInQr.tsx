"use client";

import { Download, QrCode, X } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";
import { createCheckInPayload } from "@/lib/checkIn";

type Props = {
  invitationId: number;
  guestName: string;
  token?: string | null;
  triggerLabel?: string;
  triggerClassName?: string;
};

export default function GuestCheckInQr({
  invitationId,
  guestName,
  token,
  triggerLabel = "QR Pass",
  triggerClassName = "rounded-lg bg-[#182235] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#2a3b5b]",
}: Props) {
  const [open, setOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");

  const payload = useMemo(
    () => (token ? createCheckInPayload(invitationId, token) : ""),
    [invitationId, token]
  );

  useEffect(() => {
    if (!open || !payload) return;

    let active = true;
    setError("");
    QRCode.toDataURL(payload, {
      width: 720,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#182235", light: "#fffdf8" },
    })
      .then((url) => {
        if (active) setQrUrl(url);
      })
      .catch(() => {
        if (active) setError("QR pass belum dapat dibuat. Coba kembali beberapa saat lagi.");
      });

    return () => {
      active = false;
    };
  }, [open, payload]);

  function downloadQr() {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `AKSA-event-pass-${guestName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "guest"}.png`;
    link.click();
  }

  if (!token) return null;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        <span className="inline-flex items-center gap-1.5"><QrCode size={15} />{triggerLabel}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101827]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="QR check-in pass">
          <section className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/70 bg-[#fffdf8] p-6 text-center shadow-2xl">
            <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close QR pass"><X size={18} /></button>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e65d51]">AKSA event pass</p>
            <h2 className="mt-3 font-serif text-3xl text-[#182235]">{guestName}</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">Present this QR code to the welcome team when you arrive.</p>

            <div className="mx-auto mt-6 grid aspect-square w-full max-w-[260px] place-items-center rounded-2xl border border-[#182235]/10 bg-white p-3 shadow-sm">
              {qrUrl ? (
                // The QR is generated locally as a data URL, so Next image optimization would add no value.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrUrl} alt={`Event pass for ${guestName}`} className="h-full w-full object-contain" />
              ) : <span className="text-sm text-slate-500">Preparing your QR pass…</span>}
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <button type="button" disabled={!qrUrl} onClick={downloadQr} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#182235] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2a3b5b] disabled:cursor-not-allowed disabled:opacity-50"><Download size={16} />Save QR pass</button>
          </section>
        </div>
      )}
    </>
  );
}
