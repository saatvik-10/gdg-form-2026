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
    <main className="hero">
      <div className="grid-background" />
      <div className="stars" />
      <div className="glow glow-blue" />
      <div className="glow glow-green" />
      <div className="center-glow" />
      <div className="orbit orbit-1" />
      <div className="orbit orbit-2" />
      <div className="orbit orbit-3" />
      <div className="orbit orbit-4" />

      <motion.section
        className="hero-content"
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

        <h1>
          <span>GDG</span>
        </h1>
        <h1>MIT-WPU</h1>

        <p className="hero-description">
          Connect. Learn. Grow.
        </p>

        <p className="hero-subtitle">
          Join a community of developers
          <br className="desktop-break" />
          and enthusiasts.
        </p>

        <button
          onClick={handleLetsGo}
          className="lets-go-button"
          disabled={isAnimating}
        >
          <span>LET&apos;S GOO</span>
          <span className="button-arrow">→</span>
        </button>
      </motion.section>

    </main>
  );
}