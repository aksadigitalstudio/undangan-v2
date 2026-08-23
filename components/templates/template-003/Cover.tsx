"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TemplateProps } from "../types";

const wallpaperPath =
  "/decor/puspa-priangan/background/puspa-priangan-wallpaper.webp";

const floralPath =
  "/decor/puspa-priangan/foreground/puspa-priangan-floral.png";

export default function Cover({ invitation }: TemplateProps) {
  const [opened, setOpened] = useState(false);
  const data = invitation;

  if (opened) {
    return null;
  }

  const groomName = data.groom_name?.split(" ")[0] ?? "Mempelai";
  const brideName = data.bride_name?.split(" ")[0] ?? "Mempelai";
  const guestName = data.guest_name ?? "Bapak / Ibu / Saudara";

  const backgroundImage = data.hero_background
    ? `linear-gradient(rgba(17, 48, 37, 0.50), rgba(17, 48, 37, 0.72)), url(${data.hero_background})`
    : `linear-gradient(rgba(17, 48, 37, 0.22), rgba(17, 48, 37, 0.58)), url(${wallpaperPath})`;

  return (
    <section
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[#183D31] px-5 py-8 text-[#FFFBEF]"
      style={{
        backgroundImage,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#102C22]/20" />

      <Image
        src={floralPath}
        alt=""
        width={520}
        height={780}
        className="pointer-events-none absolute -bottom-20 -left-32 w-72 opacity-75 md:-left-20 md:w-[360px]"
      />

      <Image
        src={floralPath}
        alt=""
        width={520}
        height={780}
        className="pointer-events-none absolute -bottom-20 -right-32 w-72 scale-x-[-1] opacity-75 md:-right-20 md:w-[360px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md overflow-hidden rounded-[34px] border border-[#F4E4B6]/45 bg-[#183D31]/70 px-7 py-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-md md:px-12"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C77B] to-transparent" />

        <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#F5D990]">
          Pawiwahan Sunda
        </p>

        <div className="mx-auto mb-7 h-px w-14 bg-[#E8C77B]" />

        <p className="mb-5 font-serif text-lg italic text-[#FFF5DA]">
          Dengan penuh rasa syukur
        </p>

        <h1 className="font-serif text-5xl leading-[1.05] text-[#FFFBEF] md:text-6xl">
          {groomName}
          <span className="my-2 block text-3xl text-[#E8C77B]">&</span>
          {brideName}
        </h1>

        <p className="mt-7 text-sm tracking-[0.18em] text-[#EDE3C6]">
          {data.wedding_date ?? ""}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10"
        >
          <div className="mb-5 rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
            <p className="mb-2 text-[9px] uppercase tracking-[0.4em] text-[#F5D990]">
              Kepada Yth.
            </p>

            <p className="text-lg font-medium text-[#FFFBEF]">
              {guestName}
            </p>
          </div>

<button
  type="button"
  onClick={() => {
    window.dispatchEvent(new Event("invitation-opened"));
    setOpened(true);
  }}
            className="inline-flex items-center gap-3 rounded-full bg-[#F4E4B6] px-8 py-4 text-sm font-semibold tracking-[0.16em] text-[#17382C] shadow-lg transition hover:bg-white"
          >
            <span>✦</span>
            BUKA UNDANGAN
            <span>→</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
