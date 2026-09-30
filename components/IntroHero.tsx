"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MousePointer2 } from "lucide-react";

// Wordmark split into letters for the staggered drop-in; "Labs" is lighter, like the logo.
const letters = [
  ..."Daero".split("").map((char) => ({ char, light: false })),
  ..."Labs".split("").map((char) => ({ char, light: true })),
];

export function IntroHero() {
  const { scrollY } = useScroll();
  // Parallax effects
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleFade = useTransform(scrollY, [0, 600], [1, 0.9]);

  // svh instead of dvh: dvh changes as iOS Safari's toolbar shows/hides, which re-lays out the page mid-scroll.
  return (
    <motion.section
      style={{ y: yParallax, opacity: opacityFade, scale: scaleFade }}
      className="h-[100svh] w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Dynamic Floating Background Orbs.
          Soft edges come from a radial gradient, not filter: blur(). Animating a blurred element makes
          iOS Safari re-render the blur every frame, which caused scroll lag on iPhones. */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.15, 0.9, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-16 -right-16 -z-10 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-[radial-gradient(closest-side,rgb(100_100_100/0.15),transparent)] opacity-60"
      />
      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.25, 0.95, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-16 -left-16 -z-10 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-[radial-gradient(closest-side,rgb(181_181_181/0.15),transparent)] opacity-60"
      />

      {/* Main Text */}
      <div
        role="img"
        aria-label="Daero Labs"
        className="text-[10vw] sm:text-[11vw] font-display tracking-tighter text-rich-black dark:text-white-smoke leading-none z-10 text-center flex items-baseline justify-center w-full max-w-full px-4 [transform-style:preserve-3d] transform-gpu"
      >
        {letters.map(({ char, light }, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            initial={{ opacity: 0, y: 80, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className={light ? "font-light text-dim-gray dark:text-silver" : "font-extrabold"}
          >
            {char}
          </motion.span>
        ))}

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: letters.length * 0.08 + 0.3, type: "spring", stiffness: 200 }}
          className="font-extrabold text-accent relative ml-[0.5vw]"
        >
          .
          {/* Cursor Animation */}
          <motion.div
            initial={{ opacity: 0, x: 200, y: 200 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: letters.length * 0.08 + 0.8,
              duration: 1.2,
              type: "spring",
              damping: 15
            }}
            className="absolute -top-6 -right-6 md:-top-10 md:-right-10"
          >
            <motion.div
              animate={{
                scale: [1, 0.8, 1],
                rotate: [-12, -15, -12]
              }}
              transition={{ delay: letters.length * 0.08 + 1.6, duration: 0.2 }}
            >
              <MousePointer2 className="w-8 h-8 md:w-14 md:h-14 text-rich-black dark:text-white-smoke fill-current drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-dim-gray dark:text-silver">Scroll</span>
        <div className="w-px h-12 bg-dim-gray/30 dark:bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-rich-black dark:bg-white"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
