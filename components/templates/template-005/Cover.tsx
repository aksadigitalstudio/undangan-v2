"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { TemplateProps } from "../types";
import { editorialMedia } from "./shared";

export default function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  const groomName = invitation.groom_name?.split(" ")[0] ?? "Groom";
  const brideName = invitation.bride_name?.split(" ")[0] ?? "Bride";
  const guestName = invitation.guest_name?.trim() || "Dear Guest";

  if (opened) return null;

  function openInvitation() {
    window.dispatchEvent(new Event("invitation-opened"));
    setOpened(true);
  }

  return (
    <section
      className="fixed inset-0 z-50 grid min-h-screen place-items-center overflow-hidden bg-[#161616] px-5 py-8 text-[#f7f4ee]"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(8,8,8,0.25), rgba(8,8,8,0.84)), url('${invitation.hero_background || editorialMedia.hero}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(5,5,5,0.46)_100%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="relative w-full max-w-md border border-white/30 bg-[#111111]/74 px-7 py-10 text-center shadow-[0_25px_70px_rgba(0,0,0,0.48)] backdrop-blur-md sm:px-11 sm:py-12"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-white/65">AKSA · The Edit</p>
        <div className="mx-auto my-7 h-px w-14 bg-[#d6c1a3]" />
        <p className="font-serif text-lg italic text-white/80">The wedding of</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl">
          {groomName} <span className="font-light text-[#d6c1a3]">&amp;</span> {brideName}
        </h1>
        <p className="mt-6 text-xs font-semibold tracking-[0.25em] text-white/75">{invitation.wedding_date ?? ""}</p>

        <div className="mt-10 border-y border-white/20 py-5">
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#d6c1a3]">To</p>
          <p className="mt-3 font-serif text-2xl text-white">{guestName}</p>
        </div>

        <button
          type="button"
          onClick={openInvitation}
          className="mt-9 inline-flex items-center gap-3 border border-[#d6c1a3] bg-[#f7f4ee] px-7 py-3.5 text-xs font-bold tracking-[0.2em] text-[#151515] transition hover:bg-[#d6c1a3]"
        >
          OPEN INVITATION <span>→</span>
        </button>
      </motion.div>
    </section>
  );
}
