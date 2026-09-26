"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { LottieAnimation } from "./LottieAnimation"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-rich-black dark:text-white-smoke leading-tight">
            <span className="text-dim-gray dark:text-silver">Build</span> What&apos;s Next.
          </h1>

          <p className="text-xl md:text-2xl text-dim-gray dark:text-silver mb-10 max-w-2xl leading-relaxed">
            We engineer intelligent, scalable web and mobile systems that turn your business vision into a clear path forward, from first commit to launch and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-accent text-accent-fg font-semibold text-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-dim-gray/10 dark:bg-white/10 text-rich-black dark:text-white-smoke font-semibold text-lg hover:bg-dim-gray/20 dark:hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center"
        >
             <LottieAnimation 
                src="https://lottie.host/c757a3d8-c8ee-4603-b96b-764ef73348e7/BzZ7jCPl9P.lottie"
                className="w-full max-w-[500px] md:max-w-[600px]"
             />
        </motion.div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-dim-gray/10 rounded-full blur-[100px] opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-panel/5 rounded-full blur-[100px] opacity-50" />
    </section>
  )
}
