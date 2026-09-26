import { Card } from "@/components/Card";

export default function About() {
    return (
        <div className="pt-32 pb-24 px-6 md:pt-48">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">Who We Are</h1>
                <p className="text-xl md:text-2xl text-dim-gray dark:text-silver leading-relaxed mb-20">
                    NeuraLabs is an early-stage software studio formed by engineers and designers who care deeply about quality, clarity, and long-term maintainability.
                </p>

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
            </div>

            <div className="max-w-7xl mx-auto">
                <section className="mt-32">
                    <h2 className="text-3xl font-bold mb-16 text-center">Meet the Builders</h2>

                    <div className="w-full pb-8 overflow-hidden">
                        <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 md:px-8">
                            {/* Level 1: Founders */}
                            <div className="relative z-10">
                                <div className="flex gap-4 md:gap-16">
                                    <TeamNode name="Aris Robles" role="CEO • Fullstack" />
                                    <TeamNode name="Shoun Ramos" role="CTO • Tech Lead" />
                                </div>
                                {/* Vertical line down from center */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-dim-gray/20 dark:bg-white/10" />
                            </div>

                            {/* Level 2: Core Team */}
                            <div className="relative mt-12 pt-8 w-full max-w-6xl">
                                {/* Horizontal connector line */}
                                <div className="absolute top-0 left-[25%] right-[25%] md:left-[10%] md:right-[10%] h-px bg-dim-gray/20 dark:bg-white/10" />

                                {/* Vertical lines connecting to horizontal line */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-rich-black border border-dim-gray/20 dark:border-white/10 z-20 flex items-center justify-center">
                                    <div className="w-1 h-1 rounded-full bg-gold" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-12 md:gap-6 lg:gap-10 justify-items-center">
                                    <div className="relative">
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-8 bg-dim-gray/20 dark:bg-white/10" />
                                        <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-dim-gray/20 dark:bg-white/10" />
                                        <TeamNode name="Isaiah Gabriel" role="CMO • Digital Marketing" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-8 bg-dim-gray/20 dark:bg-white/10" />
                                        <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-px h-12 bg-dim-gray/20 dark:bg-white/10" />
                                        <TeamNode name="James Heaven" role="COO • Operations & Finance" />
                                    </div>
                                    <div className="relative">
                                        <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 w-px h-8 bg-dim-gray/20 dark:bg-white/10" />
                                        <TeamNode name="John Christian" role="Fullstack • Machine Learning" />
                                    </div>
                                    <div className="relative">
                                        <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 w-px h-8 bg-dim-gray/20 dark:bg-white/10" />
                                        <TeamNode name="Jendel Juguilon" role="UI/UX Designer • Creative Lead" />
                                    </div>
                                    <div className="relative col-span-2 md:col-span-1">
                                        <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 w-px h-8 bg-dim-gray/20 dark:bg-white/10" />
                                        <TeamNode name="Dylan Ramos" role="FullStack • Developer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function TeamNode({ name, role }: { name: string, role: string }) {
    return (
        <div className="flex flex-col items-center bg-white dark:bg-onyx/30 p-4 sm:p-5 md:p-6 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[160px] md:max-w-none md:w-48">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-dim-gray/10 to-dim-gray/20 dark:from-white/5 dark:to-white/10 mb-3 md:mb-4 flex items-center justify-center text-base md:text-lg font-bold text-dim-gray dark:text-silver flex-shrink-0">
                {name.charAt(0)}
            </div>
            <span className="font-bold text-rich-black dark:text-white-smoke text-center mb-1 text-sm md:text-base leading-tight w-full break-words">{name}</span>
            <span className="text-[10px] md:text-xs text-dim-gray dark:text-silver uppercase tracking-wider font-medium text-center leading-tight w-full">{role}</span>
        </div>
    )
}
