"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const petalPath =
  "/decor/sekar-sogan/foreground/sekar-sogan-petal-v1.png";

const petalFlights = [
  { top: "8%", size: 82, delay: 0, duration: 15, rise: -42, turn: 130 },
  { top: "19%", size: 66, delay: 3, duration: 17, rise: 54, turn: -150 },
  { top: "30%", size: 98, delay: 7, duration: 18, rise: -58, turn: 165 },
  { top: "42%", size: 72, delay: 1, duration: 16, rise: 46, turn: -140 },
  { top: "53%", size: 92, delay: 10, duration: 19, rise: -52, turn: 175 },
  { top: "64%", size: 62, delay: 5, duration: 15, rise: 44, turn: -120 },
  { top: "75%", size: 88, delay: 12, duration: 20, rise: -62, turn: 180 },
  { top: "87%", size: 70, delay: 8, duration: 17, rise: 48, turn: -145 },
  { top: "13%", size: 54, delay: 11, duration: 14, rise: 34, turn: 110 },
  { top: "69%", size: 58, delay: 15, duration: 16, rise: -36, turn: 125 },
];

export default function SekarSoganAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {petalFlights.map((petal, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: petal.top,
            width: petal.size,
            height: petal.size,
          }}
          initial={{
            x: "-18vw",
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: ["-18vw", "28vw", "72vw", "118vw"],
            y: [0, petal.rise, petal.rise * 0.35, 0],
            rotate: [
              0,
              petal.turn * 0.35,
              petal.turn * 0.72,
              petal.turn,
            ],
            opacity: [0, 0.5, 0.46, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Image
            src={petalPath}
            alt=""
            width={petal.size}
            height={petal.size}
            className="h-full w-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}