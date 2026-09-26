import { Card } from "@/components/Card";

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">Who We Are</h1>
        
        <p className="text-xl md:text-2xl text-dim-gray dark:text-silver leading-relaxed mb-20">
            Daero Labs is an early-stage software studio formed by engineers and designers who care deeply about quality, clarity, and long-term maintainability.
        </p>

        <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8">The Name</h2>
            <Card noHover className="border-l-4 border-l-accent">
                <p className="text-lg text-dim-gray dark:text-silver leading-relaxed">
                    <span className="font-bold text-rich-black dark:text-white-smoke">Daero (대로)</span> means
                    &ldquo;the great road.&rdquo; It is what we build for our clients: a clear, well-engineered path
                    from idea to product, built to carry them further than where they started.
                </p>
            </Card>
        </section>

        <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Our Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Quality over Quantity</h3>
                    <p className="text-dim-gray dark:text-silver">
                        We take on a limited number of projects to ensure every detail gets the attention it deserves. No churn and burn.
                    </p>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4">Transparent Communication</h3>
                    <p className="text-dim-gray dark:text-silver">
                        We believe in honest updates, clear timelines, and setting realistic expectations from day one.
                    </p>
                </Card>
            </div>
        </section>

        <section className="mt-32">
            <h2 className="text-3xl font-bold mb-16 text-center">Meet the Builders</h2>
            
            <div className="flex flex-col items-center">
                {/* Level 1: Leadership */}
                <div className="relative z-10">
                    <div className="flex gap-4 md:gap-16">
                        <TeamNode name="Shoun Ramos" role="CTO • Tech Lead" />
                        <TeamNode name="James Heaven" role="COO • Operations & Finance" />
                    </div>
                    {/* Vertical line down from center */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-dim-gray/20 dark:bg-white/10" />
                </div>

                {/* Level 2: Engineering */}
                <div className="relative mt-12">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-rich-black border border-dim-gray/20 dark:border-white/10 z-20 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-accent" />
                    </div>
                    <TeamNode name="John Christian" role="Fullstack • Machine Learning" />
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}

function TeamNode({ name, role }: { name: string, role: string }) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-onyx/30 p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-300 w-36 sm:w-40 md:w-48">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dim-gray/10 to-dim-gray/20 dark:from-white/5 dark:to-white/10 mb-4 flex items-center justify-center text-lg font-bold text-dim-gray dark:text-silver">
        {name.charAt(0)}
      </div>
      <span className="font-bold text-rich-black dark:text-white-smoke text-center mb-1">{name}</span>
      <span className="text-xs text-dim-gray dark:text-silver uppercase tracking-wider font-medium text-center">{role}</span>
    </div>
  )
}
