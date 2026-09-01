"use client";

import { motion } from "framer-motion";

interface BracketTransitionProps {
  isAnimating: boolean;
}

export default function BracketTransition({
  isAnimating,
}: BracketTransitionProps) {
  return (
    <div className="brackets">
      <motion.img
        src="/assets/gdg-l.png"
        alt="Left angular bracket"
        className="bracket-image bracket-image-left"
        animate={
          isAnimating ? { x: "-60vw", opacity: 0,} : {x: 0, opacity: 1,}
        }
        transition={
          {duration: 0.9, ease: [0.76, 0, 0.24, 1],
        }}
      />

      <motion.img
        src="/assets/gdg-r.png"
        alt="Right angular bracket"
        className="bracket-image bracket-image-right"
        animate={
          isAnimating
            ? {x: "60vw", opacity: 0,} : {x: 0, opacity: 1,}
        }
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
}