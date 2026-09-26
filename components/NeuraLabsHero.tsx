"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MousePointer2 } from "lucide-react";

export function NeuraLabsHero() {
  const { scrollY } = useScroll();
  // Parallax effects
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleFade = useTransform(scrollY, [0, 600], [1, 0.9]);

  const text = "NeuraLabs".split("");

  return (
    <motion.section 
      style={{ y: yParallax, opacity: opacityFade, scale: scaleFade }}
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Dynamic Floating Background Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, -100, 50, 0], 
          scale: [1, 1.2, 0.8, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] opacity-60 transform-gpu will-change-transform" 
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 50, 0], 
          y: [0, 100, -50, 0],
          scale: [1, 1.5, 0.9, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-deep-navy/10 rounded-full blur-[120px] opacity-60 transform-gpu will-change-transform" 
      />
      
      {/* Main Text */}
      <h1 className="text-[15vw] md:text-[12vw] font-outfit font-black tracking-tighter text-rich-black dark:text-white-smoke leading-none z-10 text-center flex items-baseline justify-center">
        {text.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 80, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.08, 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            {char}
          </motion.span>
        ))}

        <motion.span 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: text.length * 0.08 + 0.3, type: "spring", stiffness: 200 }}
          className="text-gold relative ml-[1vw]"
        >
          .
          {/* Cursor Animation */}
          <motion.div
            initial={{ opacity: 0, x: 200, y: 200 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ 
              delay: text.length * 0.08 + 0.8, 
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
              transition={{ delay: text.length * 0.08 + 1.6, duration: 0.2 }}
            >
              <MousePointer2 className="w-8 h-8 md:w-14 md:h-14 text-rich-black dark:text-white-smoke fill-current drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.span>
      </h1>
      
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
