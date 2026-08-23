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

export default function WeddingCountdown({
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
          (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) /
            1000
        ),
      });
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

return (
  <div className="grid grid-cols-4 gap-2 md:gap-6">

    {[
      { value: timeLeft.days, label: "DAYS" },
      { value: timeLeft.hours, label: "HOURS" },
      { value: timeLeft.minutes, label: "MINUTES" },
      { value: timeLeft.seconds, label: "SECONDS" },
    ].map((item) => (

<div
  key={item.label}
  className="bg-white rounded-2xl md:rounded-3xl shadow-lg
        py-5 md:py-8
        px-2 md:px-6
        text-center"
  style={{
    border: `1px solid ${theme.divider}`,
  }}
>

<p
  className="font-serif text-3xl md:text-6xl leading-none"
  style={{
    color: "#1B2437",
  }}
>
  {item.value}
</p>

<div
  className="w-8 md:w-12 h-px mx-auto my-3 md:my-5"
  style={{
    background: theme.accent,
  }}
></div>

<p
  className="uppercase tracking-[0.15em]
        text-[9px] md:text-xs"
  style={{
    color: "#6B7280",
  }}
>

          <span className="md:hidden">
            {item.label === "MINUTES"
              ? "MIN"
              : item.label === "SECONDS"
              ? "SEC"
              : item.label === "HOURS"
              ? "HR"
              : "DAY"}
          </span>

          <span className="hidden md:inline">
            {item.label}
          </span>

        </p>

      </div>

    ))}

  </div>
);
}