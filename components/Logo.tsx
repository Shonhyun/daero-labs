interface LogoProps {
  className?: string
  /** Always-light wordmark, for dark surfaces like the footer. */
  inverted?: boolean
}

// A road running toward the horizon: "Daero" (대로) means "the great road".
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-signal" />
      <path d="M8.5 26 14.6 6.5h2.8L23.5 26z" className="fill-rich-black" />
      <rect x="15.45" y="9" width="1.1" height="2.5" rx="0.55" className="fill-signal" />
      <rect x="15.3" y="14" width="1.4" height="3.5" rx="0.7" className="fill-signal" />
      <rect x="15.1" y="20" width="1.8" height="4.5" rx="0.9" className="fill-signal" />
    </svg>
  )
}

export function Logo({ className = "", inverted = false }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-8 h-8 md:w-9 md:h-9 shrink-0" />
      <span
        className={`font-[family-name:var(--font-outfit)] text-2xl md:text-[1.75rem] tracking-[-0.04em] leading-none whitespace-nowrap ${
          inverted ? "text-white-smoke" : "text-rich-black dark:text-white-smoke"
        }`}
      >
        <span className="font-extrabold">Daero</span>
        <span className="font-medium text-signal"> Labs</span>
      </span>
    </span>
  )
}
