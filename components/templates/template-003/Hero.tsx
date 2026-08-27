"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(date: string): Countdown {
  const target = new Date(`${date}T00:00:00`).getTime();
  const difference = Math.max(target - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Hero({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

const [countdown, setCountdown] = useState<Countdown>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const [isCountdownReady, setIsCountdownReady] =
  useState(false);

useEffect(() => {
  const updateCountdown = () => {
    setCountdown(getCountdown(data.wedding_date ?? ""));
  };

  updateCountdown();
  setIsCountdownReady(true);

  const interval = window.setInterval(updateCountdown, 1000);

  return () => window.clearInterval(interval);
}, [data.wedding_date]);

  if (!sections.hero && !sections.countdown) {
    return null;
  }

  const groomName = data.groom_name?.split(" ")[0] ?? "";
  const brideName = data.bride_name?.split(" ")[0] ?? "";

  const countdownItems = [
    { value: countdown.days, label: "Hari" },
    { value: countdown.hours, label: "Jam" },
    { value: countdown.minutes, label: "Menit" },
    { value: countdown.seconds, label: "Detik" },
  ];

  return (
    <section className="relative z-10 px-6 py-24 text-center md:py-32">
      {sections.hero && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.55em] text-[#A37C32]">
            Pawiwahan Sunda
          </p>

          <div className="mx-auto mb-6 h-px w-16 bg-[#C8A65B]" />

          <p className="font-serif text-xl italic text-[#2B5A43]">
            Dengan penuh rasa bahagia
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight text-[#173D2E] md:text-7xl">
            {groomName}
            <span className="mx-3 text-[#C19035]">&</span>
            {brideName}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#506758]">
            Kami mengundang Bapak, Ibu, Saudara, dan Sahabat untuk
            berbagi kebahagiaan di hari istimewa kami.
          </p>

          {data.wedding_date && (
            <p className="mt-6 text-[11px] uppercase tracking-[0.38em] text-[#A37C32]">
              {data.wedding_date}
            </p>
          )}

          {data.hero_background && (
            <div className="relative mx-auto mt-12 aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] border-4 border-[#E8D8AE] shadow-[0_18px_45px_rgba(31,63,47,0.22)]">
              <Image
                src={data.hero_background}
                alt={`${groomName} dan ${brideName}`}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#173D2E]/35 via-transparent to-transparent" />
            </div>
          )}
        </motion.div>
      )}

      {sections.countdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-14 max-w-2xl"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#A37C32]">
            Menuju Hari Bahagia
          </p>

<h2 className="mt-3 font-serif text-4xl italic text-[#2B5A43]">
  Save The Date
</h2>

{data.wedding_date && (
  <p className="mt-4 font-serif text-lg italic tracking-[0.12em] text-[#355B46]">
    {data.wedding_date}
  </p>
)}

<div className="mt-7 grid grid-cols-4 border-y border-[#C8A65B]/70 py-5">
            {countdownItems.map((item, index) => (
              <div
                key={item.label}
                className={
                  index === 0
                    ? "px-2"
                    : "border-l border-[#C8A65B]/50 px-2"
                }
              >
                <p className="font-serif text-3xl text-[#173D2E] md:text-4xl">
{isCountdownReady
  ? String(item.value).padStart(2, "0")
  : "00"}
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.18em] text-[#A37C32]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
