"use client";

import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

export default function WeddingCountdown({ targetDate }: Props) {
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
    <div className="grid grid-cols-4 gap-5">

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
        <p className="text-5xl font-bold">{timeLeft.days}</p>
        <p className="mt-3 uppercase text-sm">Days</p>
      </div>

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
        <p className="text-5xl font-bold">{timeLeft.hours}</p>
        <p className="mt-3 uppercase text-sm">Hours</p>
      </div>

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
        <p className="text-5xl font-bold">{timeLeft.minutes}</p>
        <p className="mt-3 uppercase text-sm">Minutes</p>
      </div>

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
        <p className="text-5xl font-bold">{timeLeft.seconds}</p>
        <p className="mt-3 uppercase text-sm">Seconds</p>
      </div>

    </div>
  );
}