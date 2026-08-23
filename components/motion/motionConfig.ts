import { Variants } from "framer-motion";

export const ambientAnimations: Record<string, Variants> = {
  pulse: {
    animate: {
      opacity: [0.65, 1, 0.65],
      scale: [1, 1.03, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  twinkle: {
    animate: {
      opacity: [0.2, 1, 0.3, 0.9, 0.2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  drift: {
    animate: {
      y: [0, -12, 0],
      x: [0, 4, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  float: {
    animate: {
      y: [0, -18, 0],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  sway: {
    animate: {
      rotate: [-2, 2, -2],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};