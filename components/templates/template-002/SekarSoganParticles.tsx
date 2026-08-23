"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "5%", top: "16%", size: 15, delay: 0, duration: 6, symbol: "✦" },
  { left: "11%", top: "48%", size: 10, delay: 1, duration: 7, symbol: "•" },
  { left: "18%", top: "76%", size: 13, delay: 2, duration: 6, symbol: "✧" },
  { left: "28%", top: "24%", size: 10, delay: 0.5, duration: 8, symbol: "•" },
  { left: "39%", top: "72%", size: 14, delay: 3, duration: 7, symbol: "✦" },
  { left: "52%", top: "14%", size: 11, delay: 1.5, duration: 6, symbol: "✧" },
  { left: "64%", top: "66%", size: 10, delay: 2.5, duration: 8, symbol: "•" },
  { left: "76%", top: "30%", size: 15, delay: 1, duration: 7, symbol: "✦" },
  { left: "87%", top: "58%", size: 11, delay: 3.5, duration: 6, symbol: "✧" },
  { left: "94%", top: "18%", size: 10, delay: 2, duration: 8, symbol: "•" },
];

export default function SekarSoganParticles() {
  return (
    <div
className="pointer-events-none fixed inset-0 z-[20] overflow-hidden mix-blend-screen"
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute select-none text-[#FFD66B] drop-shadow-[0_0_10px_rgba(255,205,105,0.85)]"
          style={{
            left: particle.left,
            top: particle.top,
            fontSize: particle.size,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
opacity: [0, 0.12, 0.42, 0.12, 0],
            scale: [0.6, 1, 1.2, 1, 0.6],
            x: [0, 12, -8, 10, 0],
            y: [0, -24, -52, -78, -104],
            rotate: [0, 45, 100, 150],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {particle.symbol}
        </motion.span>
      ))}
    </div>
  );
}