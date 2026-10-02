"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Logo } from "./Logo"

interface NavLink {
  name: string
  href: string
  children?: { name: string; href: string; description: string }[]
}

const navLinks: NavLink[] = [
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "All Services", href: "/services", description: "Web, mobile, desktop, CRM & design" },
      { name: "Project Estimator", href: "/estimate", description: "Get a ballpark price in seconds" },
    ],
  },
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

  // Lock body scroll on iOS/mobile when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Fade Navbar in on scroll (Homepage only)
  const navOpacity = useTransform(scrollY, [300, 600], [0, 1])
  const navY = useTransform(scrollY, [300, 600], [-20, 0])

  const finalOpacity = pathname === "/" ? navOpacity : 1
  const finalY = pathname === "/" ? navY : 0

  return (
    <>
      <motion.nav
        style={{ opacity: finalOpacity, y: finalY }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-[max(1.5rem,env(safe-area-inset-top))] pointer-events-none"
      >
        <motion.div
          layout
          className={`
            ${pathname === "/" && !isScrolled ? "pointer-events-none" : "pointer-events-auto"}
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
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-medium text-dim-gray hover:text-rich-black dark:text-silver dark:hover:text-white-smoke group-hover:text-rich-black dark:group-hover:text-white-smoke transition-colors"
                  >
                    {link.name}
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  {/* pt-3 bridges the gap so the menu stays open while the pointer moves down */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">
                    <div className="w-64 p-2 rounded-2xl bg-white dark:bg-panel border border-black/10 dark:border-white/10 shadow-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-rich-black dark:text-white-smoke">{child.name}</span>
                          <span className="block text-xs text-dim-gray dark:text-silver mt-0.5">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-dim-gray hover:text-rich-black dark:text-silver dark:hover:text-white-smoke transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
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
            className="fixed inset-0 z-40 bg-white/95 dark:bg-rich-black/95 backdrop-blur-xl md:hidden flex flex-col pt-32 pb-[max(2rem,env(safe-area-inset-bottom))] px-8 min-h-[100dvh] overflow-y-auto"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold">
               {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-rich-black dark:text-white-smoke active:opacity-70 transition-opacity"
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="mt-3 ml-4 pl-4 border-l border-dim-gray/20 flex flex-col gap-3">
                        {link.children
                          .filter((child) => child.href !== link.href)
                          .map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-lg font-medium text-dim-gray dark:text-silver active:opacity-70 transition-opacity"
                            >
                              {child.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
               ))}
               <hr className="border-dim-gray/20 my-4" />
               <Link 
                 href="/contact" 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="text-accent active:opacity-70 transition-opacity"
               >
                  Start a Project
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
