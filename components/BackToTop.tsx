"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { smoothScrollToTop } from "./SmoothScrollProvider";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollToTop();
  };

  return (
    <motion.button
      initial={false}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8, 
        y: isVisible ? 0 : 20,
        pointerEvents: isVisible ? "auto" : "none" 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={scrollToTop}
      className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5rem))] right-[max(1.5rem,calc(env(safe-area-inset-right)+1rem))] z-40 p-3.5 sm:p-4 rounded-full bg-accent text-accent-fg shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}
