"use client";

import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
  theme: {
    accent: string;
    background: string;
    text: string;
    card: string;
    divider: string;
  };
}

export default function SekarSoganCountdown({
  targetDate,
  theme,
}: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function updateCountdown() {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const distance = Math.max(target - now, 0);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) / 1000
        ),
      });
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const countdownItems = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-6">
      {countdownItems.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-white px-2 py-5 text-center shadow-lg md:rounded-3xl md:px-6 md:py-8"
          style={{
            border: `1px solid ${theme.divider}`,
          }}
        >
          <p
            className="font-serif text-3xl leading-none md:text-6xl"
            style={{ color: "#1B2437" }}
          >
            {item.value}
          </p>

          <div
            className="mx-auto my-3 h-px w-8 md:my-5 md:w-12"
            style={{ background: theme.accent }}
          />

          <p
            className="text-[9px] uppercase tracking-[0.15em] md:text-xs"
            style={{ color: "#6B7280" }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}