"use client";

import { motion } from "framer-motion";

interface BracketTransitionProps {
  isAnimating: boolean;
}

export default function BracketTransition({
  isAnimating,
}: BracketTransitionProps) {
  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      <motion.img
        src="/assets/gdg-l.png"
        alt="Left angular bracket"
        className="w-[50px]"
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
        className="w-[50px]"
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