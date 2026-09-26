"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Logo } from "./Logo"

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Technology", href: "/technology" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true)
    else if (latest <= 50 && isScrolled) setIsScrolled(false)
  })

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
      >
        <motion.div
          layout
          className={`
            pointer-events-auto
            relative flex items-center justify-between
            transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${
              isScrolled
                ? "w-[95%] md:w-full md:max-w-6xl px-6 py-3 rounded-full glass shadow-lg shadow-black/[0.03]"
                : "w-full max-w-7xl px-6 md:px-8 py-3 bg-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" aria-label="Daero Labs home" className="group mr-4">
             <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isScrolled ? "gap-6 lg:gap-8 ml-8" : "gap-12 lg:gap-16 ml-12"}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-dim-gray hover:text-rich-black dark:text-silver dark:hover:text-white-smoke transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all
                ${isScrolled 
                   ? "bg-accent text-accent-fg hover:bg-accent/90"
                   : "bg-rich-black text-white hover:bg-opacity-80 dark:bg-white-smoke dark:text-rich-black"
                }
              `}
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
             <ThemeToggle />
             <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
             >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-rich-black/95 backdrop-blur-xl md:hidden flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold">
               {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-rich-black dark:text-white-smoke"
                  >
                    {link.name}
                  </Link>
               ))}
               <hr className="border-dim-gray/20 my-4" />
               <Link href="/contact" className="text-accent">
                  Start a Project
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
