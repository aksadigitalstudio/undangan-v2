"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TemplateProps } from "../types";
import { editorialMedia, getEditorialSections } from "./shared";

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function calculateCountdown(dateValue?: string): Countdown {
  const target = new Date(`${dateValue ?? ""}T00:00:00`).getTime();
  const difference = Number.isNaN(target) ? 0 : Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export default function Hero({ invitation }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  const [countdown, setCountdown] = useState<Countdown>(() => calculateCountdown(invitation.wedding_date));
  const groomName = invitation.groom_name?.split(" ")[0] ?? "Groom";
  const brideName = invitation.bride_name?.split(" ")[0] ?? "Bride";

  useEffect(() => {
    const updateCountdown = () => setCountdown(calculateCountdown(invitation.wedding_date));
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1_000);
    return () => window.clearInterval(interval);
  }, [invitation.wedding_date]);

  if (!sections.hero && !sections.countdown) return null;

  const values = [
    [countdown.days, "Days"],
    [countdown.hours, "Hours"],
    [countdown.minutes, "Minutes"],
    [countdown.seconds, "Seconds"],
  ];

  return (
    <section className="relative z-10 overflow-hidden bg-[#f5f2ed] px-5 py-20 text-[#171717] sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div className="relative order-2 border-t border-[#171717]/20 pt-7 lg:order-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#6c645c]">Save the date</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.9] tracking-[-0.055em] sm:text-7xl">
            {groomName}<br /><span className="text-[#9b8c7b]">&amp;</span> {brideName}
          </h1>
          <p className="mt-6 max-w-xs text-sm leading-6 text-[#5f5a54]">
            A day to celebrate love, beautiful details, and everyone who brought us here.
          </p>
          <p className="mt-8 text-xs font-semibold tracking-[0.22em] text-[#28231f]">{invitation.wedding_date ?? ""}</p>
        </div>

        <div className="relative order-1 aspect-[4/5] overflow-hidden bg-[#dedad3] lg:order-2">
          <Image
            src={invitation.hero_background || editorialMedia.hero}
            alt={`${groomName} and ${brideName}`}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">A study in love · 2026</p>
        </div>
      </div>

      {sections.countdown && (
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-4 border-y border-[#171717]/20 py-5 text-center sm:mt-20 sm:py-7">
          {values.map(([value, label], index) => (
            <div key={String(label)} className={index ? "border-l border-[#171717]/20" : ""}>
              <p className="font-serif text-3xl sm:text-5xl">{String(value).padStart(2, "0")}</p>
              <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#756d64] sm:text-[10px]">{label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
