"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BracketTransition from "../animations/BracketTransition";

export default function Hero() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleLetsGo = () => {
    setIsAnimating(true);

    setTimeout(() => {
      router.push("/login");
    }, 900);
  };

  return (
    <main className="h-[100dvh] relative overflow-hidden flex flex-col items-center justify-center">

      <motion.section
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isAnimating ? 0 : 1,
          y: isAnimating ? -20 : 0,
        }}
        transition={{ duration: 0.5 }}
      >

        <div className="bracket-container">
          <BracketTransition isAnimating={isAnimating} />
        </div>

        <h1 className="text-4xl font-medium tracking-tight text-center">
          GDG MIT-WPU
        </h1>

        <p className="text-md text-center text-neutral-400 mt-2 leading-none">
          Join a community of developers
          <br className="desktop-break" />
          and enthusiasts.
        </p>

        <button
          onClick={handleLetsGo}
          className="mt-8 flex items-center gapFsubmit-2 justify-center rounded-full py-4 w-full bg-neutral-100 text-neutral-900 text-md font-bold hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={isAnimating}
        >
          <span>PROCEED</span>
        </button>
      </motion.section>

    </main>
  );
}