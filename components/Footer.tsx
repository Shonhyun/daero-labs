"use client"

import Link from "next/link"

const footerLinks = {
  services: [
    { name: "Web Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "UI/UX Design", href: "/services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-deep-navy text-white-smoke pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1 group mb-4">
               <div className="relative flex items-end">
                  <span className={`font-[family-name:var(--font-outfit)] font-extrabold text-2xl tracking-[-0.08em] text-white-smoke leading-none`}>
                    NeuraLabs
                  </span>
                  <span className="text-gold font-extrabold text-3xl leading-none -mb-1 -ml-[2px]">.</span>
                  <svg
                    className="w-5 h-5 text-deep-navy fill-white-smoke absolute -right-2.5 -top-0 stroke-deep-navy stroke-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3l7 18 3.5-8.5L21 9l-18-6z" />
                  </svg>
               </div>
            </Link>
            <p className="text-silver max-w-xs text-sm leading-relaxed">
              Building thoughtful software systems with clean architecture and future-ready tools.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-silver hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-silver hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-silver hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-dim-gray">
          <p>© {new Date().getFullYear()} NeuraLabs. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="#" className="hover:text-silver transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-silver transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
