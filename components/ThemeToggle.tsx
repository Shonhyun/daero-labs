"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Render a placeholder with same dimensions to prevent layout shift
  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ scale: theme === "dark" ? 0 : 1, rotate: theme === "dark" ? 90 : 0, opacity: theme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-rich-black dark:text-white-smoke" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ scale: theme === "dark" ? 1 : 0, rotate: theme === "dark" ? 0 : -90, opacity: theme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-rich-black dark:text-white-smoke" />
      </motion.div>
    </button>
  )
}
