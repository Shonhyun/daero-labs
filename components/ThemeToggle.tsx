"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Render a placeholder with same dimensions to prevent layout shift
  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-transform duration-150 touch-manipulation cursor-pointer select-none"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span
        className={`absolute transition-all duration-300 ease-out transform-gpu ${
          isDark
            ? "scale-0 rotate-90 opacity-0 pointer-events-none"
            : "scale-100 rotate-0 opacity-100"
        }`}
      >
        <Sun className="h-5 w-5 text-rich-black dark:text-white-smoke" />
      </span>
      <span
        className={`absolute transition-all duration-300 ease-out transform-gpu ${
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0 pointer-events-none"
        }`}
      >
        <Moon className="h-5 w-5 text-rich-black dark:text-white-smoke" />
      </span>
    </button>
  )
}
