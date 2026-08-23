"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionGroupProps {
  children: ReactNode;
  stagger?: number;
}

export default function MotionGroup({
  children,
  stagger = 0.15,
}: MotionGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}