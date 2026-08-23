"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TemplateProps } from "../types";

export function Template004CoverView({
  invitation,
}: TemplateProps) {
  const [opened, setOpened] = useState(false);

  if (opened) {
    return null;
  }

  const groomName =
invitation.groom_name?.split(" ")[0] ?? "Groom";

  const brideName =
invitation.bride_name?.split(" ")[0] ?? "Bride";

const guestName =
  invitation.guest_name?.trim() || "Dear Guest";

  function openInvitation() {
    setOpened(true);
    window.dispatchEvent(new Event("invitation-opened"));
  }

  return (
    <section
      className="fixed inset-0 z-50 overflow-hidden text-[#5A2930]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,248,228,0.18) 0%, rgba(216,139,112,0.10) 55%, rgba(103,38,45,0.28) 100%), url('/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8E5]/5 via-transparent to-[#642934]/15" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-14 text-center md:gap-14 md:py-20"
      >
<div className="rounded-[28px] border border-[#FFE49D]/70 bg-[#5A070C]/65 px-6 py-6 shadow-[0_12px_30px_rgba(58,0,5,0.48)] backdrop-blur-md md:px-10 md:py-8">
  <p className="text-[10px] uppercase tracking-[0.5em] text-[#FFF0BA] md:text-xs">
    The Wedding Of
  </p>

  <div className="mx-auto mt-4 h-px w-20 bg-[#F8C85E]" />

  <h1 className="mt-6 font-serif text-4xl leading-[1.15] text-[#FFFBEF] drop-shadow-[0_3px_8px_rgba(58,0,5,0.6)] md:text-6xl">
    {groomName}
    <span className="mx-3 text-[#FFD46E]">&</span>
    {brideName}
  </h1>

  <p className="mt-5 text-sm font-semibold tracking-[0.18em] text-[#FFF5D5] md:text-base">
    {invitation.wedding_date ?? ""}
  </p>
</div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-sm rounded-2xl border border-[#FFE49D]/75 bg-[#5A070C]/78 px-6 py-5 shadow-[0_12px_30px_rgba(58,0,5,0.42)] backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#F8C85E]/70" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#FFF0BA]">
              To
            </p>

            <div className="h-px flex-1 bg-[#F8C85E]/70" />
          </div>

          <p className="mt-3 font-serif text-2xl text-[#FFFBEF] drop-shadow-[0_2px_6px_rgba(58,0,5,0.6)]">
            {guestName}
          </p>

          <button
            type="button"
            onClick={openInvitation}
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#E3BE70] bg-[#963840]/95 px-8 py-4 text-xs font-semibold tracking-[0.18em] text-[#FFF7E7] shadow-[0_12px_28px_rgba(82,35,41,0.32)] transition hover:scale-105 hover:bg-[#7B2933]"
          >
            <span>✦</span>
OPEN INVITATION
            <span>→</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
