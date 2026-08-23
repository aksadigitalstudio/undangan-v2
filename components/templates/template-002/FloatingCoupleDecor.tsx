"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type FloatingCoupleDecorProps = {
  groomCutout?: string | null;
  brideCutout?: string | null;
};

export default function FloatingCoupleDecor({
  groomCutout,
  brideCutout,
}: FloatingCoupleDecorProps) {
  if (!groomCutout && !brideCutout) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {groomCutout && (
        <motion.div
          className="absolute -left-[10vw] bottom-0 w-[42vw] max-w-[360px] md:-left-[4vw] md:w-[25vw]"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          <Image
            src={groomCutout}
            alt=""
            width={620}
            height={1100}
            className="h-auto w-full object-contain"
          />
        </motion.div>
      )}

      {brideCutout && (
        <motion.div
          className="absolute -right-[10vw] bottom-0 w-[42vw] max-w-[360px] md:-right-[4vw] md:w-[25vw]"
          animate={{ rotate: [3, -3, 3] }}
          transition={{
            duration: 3.1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          <Image
            src={brideCutout}
            alt=""
            width={620}
            height={1100}
            className="h-auto w-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
}
