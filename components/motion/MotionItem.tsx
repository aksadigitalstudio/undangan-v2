"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionItemProps {
  children: ReactNode;
  delay?: number;
}

export default function MotionItem({
  children,
  delay = 0,
}: MotionItemProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.96,
          y: 20,
        },
        show: {
          opacity: 1,
          scale: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}