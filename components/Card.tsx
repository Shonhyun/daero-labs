"use client"

import { motion } from "framer-motion"

interface CardProps {
  children: React.ReactNode
  className?: string
  noHover?: boolean
}

export function Card({ children, className = "", noHover = false }: CardProps) {
  return (
    <motion.div
      whileHover={noHover ? {} : { y: -5 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white dark:bg-onyx/20 
        backdrop-blur-sm
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
