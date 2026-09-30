"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisInstance: Lenis | null = null;

/** Smoothly scroll to the top, falling back to a native scroll if Lenis isn't running. */
export function smoothScrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Smoothly scroll an element into view, leaving room for the fixed navbar. */
export function smoothScrollToElement(element: HTMLElement, offset = -96) {
  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset, duration: 1 });
  } else {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Touch devices already have smooth native scrolling, and Lenis doesn't smooth touch input
    // (syncTouch is off). Running its per-frame loop there only costs battery and frames on iOS.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      allowNestedScroll: true,
      prevent: (node) => {
        if (!node || (node as any).nodeType !== 1) return false;
        const el = node as Element;
        return (
          el.hasAttribute("data-lenis-prevent") ||
          el.closest?.("[data-lenis-prevent]") !== null ||
          el.closest?.(".lenis-prevent") !== null
        );
      },
    });
    lenisInstance = lenis;

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
