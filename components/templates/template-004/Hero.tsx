"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TemplateProps } from "../types";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(dateValue: string): Countdown {
  if (!dateValue) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const target = new Date(`${dateValue}T00:00:00`).getTime();
  const distance = Math.max(target - Date.now(), 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Hero({ invitation }: TemplateProps) {
  const data = invitation;

  const groomName = data.groom_name?.split(" ")[0] ?? "Mempelai";
  const brideName = data.bride_name?.split(" ")[0] ?? "Mempelai";

  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function updateCountdown() {
      setCountdown(getCountdown(data.wedding_date ?? ""));
    }

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [data.wedding_date]);

  const countdownItems = [
{ label: "Days", value: countdown.days },
{ label: "Hours", value: countdown.hours },
{ label: "Minutes", value: countdown.minutes },
{ label: "Seconds", value: countdown.seconds },
  ];

  return (
    <section
className="relative z-10 overflow-hidden px-6 pb-10 pt-20 text-center md:pt-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,248,224,0.70) 0%, rgba(205,228,235,0.42) 46%, rgba(255,242,211,0.66) 100%), url('/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FFF8E8]/35 via-[#DCECF0]/10 to-[#FFF0D1]/30" />

      {/* Hero perlahan memudar menjadi warna krem sebelum Blessing */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <p className="text-[10px] uppercase tracking-[0.6em] text-[#7B3038]">
          囍
        </p>

        <div className="mx-auto my-5 h-px w-20 bg-[#C89B5C]" />

        <div className="inline-block rounded-2xl border border-[#C89B5C]/60 bg-[#FFF7E5]/70 px-5 py-3 shadow-[0_8px_24px_rgba(104,36,32,0.18)] backdrop-blur-sm">
          <h1 className="font-serif text-4xl leading-tight text-[#7B1F28] drop-shadow-[0_2px_3px_rgba(255,255,255,0.8)] md:text-6xl">
            {groomName}
            <span className="mx-3 text-[#C28B30]">&</span>
            {brideName}
          </h1>
        </div>

        <div className="relative mx-auto mt-9 h-72 w-72 md:h-96 md:w-96">
          <div className="absolute -inset-4 rounded-full border border-[#9B1720]/35" />
          <div className="absolute -inset-2 rounded-full border-2 border-[#F4CF71] shadow-[0_0_0_5px_rgba(133,27,32,0.72),0_14px_34px_rgba(91,16,20,0.32)]" />

          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#FFF0BF] bg-[#8B1C25]">
            <Image
              src={
                data.hero_background ??
                "/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp"
              }
              alt={`Foto ${groomName} dan ${brideName}`}
              fill
              priority
              sizes="(max-width: 768px) 288px, 384px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#5B0610]/35 via-transparent to-[#FFF1C9]/10" />
          </div>
        </div>

        <div className="mx-auto mt-8 inline-block rounded-full border border-[#C89B5C]/60 bg-[#FFF8E8]/75 px-6 py-3 shadow-[0_6px_20px_rgba(91,16,20,0.16)] backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8B2730]">
            Save The Date
          </p>

          <p className="mt-2 text-sm font-semibold tracking-[0.22em] text-[#7B3038]">
            {data.wedding_date ?? ""}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-2 md:gap-5">
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#E5C77E]/70 bg-[#8E3A43]/85 px-2 py-4 shadow-[0_12px_28px_rgba(48,0,5,0.32)] backdrop-blur-sm md:py-6"
            >
              <p className="font-serif text-2xl text-[#FFF8DF] md:text-5xl">
                {String(item.value).padStart(2, "0")}
              </p>

              <div className="mx-auto my-2 h-px w-6 bg-[#F2CD72]" />

              <p className="text-[7px] uppercase tracking-[0.14em] text-[#FFE4A1] md:text-[10px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent via-[#F8ECD1]/70 to-[#F8ECD1] md:h-56"
      />
    </section>
  );
}
