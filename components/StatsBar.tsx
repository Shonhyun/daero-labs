"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Users, ShieldCheck, Code2 } from "lucide-react";

interface StatItem {
  icon: typeof Rocket;
  numericValue: number;
  decimals?: number;
  suffix?: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Rocket,
    numericValue: 100,
    suffix: "+",
    label: "Projects Shipped",
    description: "Web, mobile & enterprise apps",
  },
  {
    icon: Users,
    numericValue: 90,
    suffix: "+",
    label: "Clients",
    description: "Founders & partner businesses",
  },
  {
    icon: ShieldCheck,
    numericValue: 99.9,
    decimals: 1,
    suffix: "%",
    label: "System Uptime",
    description: "Production-ready stability",
  },
  {
    icon: Code2,
    numericValue: 100,
    suffix: "%",
    label: "In-House Craft",
    description: "Zero outsourcing, total quality",
  },
];

function AnimatedCounter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Premium easeOutExpo: starts dynamic and smoothly lands into place
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * value;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-10 mb-16 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl bg-white/70 dark:bg-panel/70 backdrop-blur-md md:backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-xl p-4 sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col p-3.5 sm:p-5 rounded-2xl bg-white/60 dark:bg-black/25 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-dim-gray dark:text-silver">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center text-rich-black dark:text-white-smoke shrink-0">
                    <stat.icon size={15} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-dim-gray dark:text-silver line-clamp-1">
                    {stat.label}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-rich-black dark:text-white-smoke my-0.5 sm:my-1 flex items-baseline">
                  <AnimatedCounter value={stat.numericValue} decimals={stat.decimals} />
                  {stat.suffix && (
                    <span className="text-accent text-xl sm:text-2xl md:text-3xl lg:text-4xl ml-0.5 font-bold">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="text-[10.5px] sm:text-xs text-dim-gray dark:text-silver leading-snug mt-0.5 sm:mt-1">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

