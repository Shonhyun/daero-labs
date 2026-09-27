interface LegalPageProps {
  title: string
  updated: string
  children: React.ReactNode
}

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{title}</h1>
        <p className="text-sm text-dim-gray dark:text-silver mb-16">Last updated: {updated}</p>
        <div
          className="
            space-y-6 text-dim-gray dark:text-silver leading-relaxed
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-rich-black [&_h2]:dark:text-white-smoke [&_h2]:pt-6
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
            [&_a]:text-rich-black [&_a]:dark:text-white-smoke [&_a]:underline [&_a]:underline-offset-4
            [&_strong]:text-rich-black [&_strong]:dark:text-white-smoke
          "
        >
          {children}
        </div>
      </article>
    </div>
  )
}
