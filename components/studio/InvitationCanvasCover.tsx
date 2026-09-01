"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import CanvasArtwork from "./CanvasArtwork";
import type { CanvasDocument } from "./canvasTypes";

export default function InvitationCanvasCover({ document }: { document: CanvasDocument }) {
  const [opened, setOpened] = useState(false);
  if (opened) return null;

  function openInvitation() {
    setOpened(true);
    window.dispatchEvent(new Event("invitation-opened"));
  }

  return <section className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-[#162238] p-4 sm:p-7">
    <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at top, #52627a 0%, transparent 42%)" }} />
    <div className="relative w-full max-w-[28rem]">
      <div className="overflow-hidden rounded-[2.25rem] border-[9px] border-white/90 bg-[#f7f2e8] shadow-[0_30px_100px_rgba(0,0,0,0.4)]"><div className="aspect-[9/16]"><CanvasArtwork document={document} /></div></div>
      <button type="button" onClick={openInvitation} className="absolute inset-x-0 -bottom-6 mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#19243a] shadow-xl transition hover:-translate-y-0.5"><Sparkles size={15} className="text-[#b58b36]" /> Open invitation <ArrowRight size={16} /></button>
    </div>
  </section>;
}
