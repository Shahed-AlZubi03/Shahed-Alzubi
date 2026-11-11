"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline reading-progress bar along the bottom edge of the header. Sprung
 * so a fast scroll eases into place instead of jumping.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
