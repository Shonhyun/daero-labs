"use client"

import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
  noHover?: boolean
}

export function Card({ children, className = "", noHover = false }: CardProps) {
  // No backdrop-filter or forced GPU layer here: cards sit on a flat background, so the blur
  // was invisible, but every card still paid for it while scrolling (noticeably on iOS Safari).
  return (
    <motion.div
      whileHover={noHover ? {} : { y: -5 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white dark:bg-onyx/20
        border border-black/5 dark:border-white/5
        rounded-2xl p-8
        shadow-sm hover:shadow-xl dark:shadow-none
        transition-shadow duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
