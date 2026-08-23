"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ambientAnimations } from "./motionConfig";

type AmbientImageProps = {
  src: string;
  animation: keyof typeof ambientAnimations;
  className?: string;
  priority?: boolean;
};

export default function AmbientImage({
  src,
  animation,
  className = "",
  priority = false,
}: AmbientImageProps) {
  
    return (
    <motion.div
      variants={ambientAnimations[animation]}
      animate="animate"
      className="absolute inset-0"
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        className={className}
      />
    </motion.div>
  );
}