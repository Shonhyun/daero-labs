import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/Card";

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  link?: string;
}

const coreTeam: TeamMember[] = [
  { name: "James Heaven", role: "CMO • Marketing", photo: "/team/james.jpg", link: "https://james-heaven.netlify.app/" },
  { name: "John Christian", role: "Web Developer", photo: "/team/john.jpg", link: "https://johnchristian.vercel.app/" },
  { name: "Dylan Ramos", role: "Fullstack Developer", photo: "/team/dylan.jpg", link: "https://www.dylanramos.site" },
];

export default function About() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 md:pt-48">
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
            <Card className="h-full">
              <h3 className="text-xl font-bold mb-4">Quality over Quantity</h3>
              <p className="text-dim-gray dark:text-silver">
                We take on a limited number of projects to ensure every detail gets the attention it deserves. No churn and burn.
              </p>
            </Card>
            <Card className="h-full">
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
            {/* Level 1: Founder */}
            <div className="relative z-10 flex justify-center">
              <TeamNode name="Shoun Ramos" role="Founder • Tech Lead" photo="/team/shoun.jpg" link="https://shounhyun.vercel.app/" />
              {/* Vertical line down from center */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 sm:h-12 bg-dim-gray/20 dark:bg-white/10" />
            </div>

            {/* Level 2: Core Team */}
            <div className="relative mt-8 sm:mt-12 pt-8 w-full max-w-3xl">
              {/* Horizontal connector line, from column 1 center to column 3 center */}
              <div className="absolute top-0 left-[calc((100%-1rem)/6)] sm:left-[calc((100%-2rem)/6)] md:left-[calc((100%-4rem)/6)] right-[calc((100%-1rem)/6)] sm:right-[calc((100%-2rem)/6)] md:right-[calc((100%-4rem)/6)] h-px bg-dim-gray/20 dark:bg-white/10" />

              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-rich-black border border-dim-gray/20 dark:border-white/10 z-20 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-accent" />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 justify-items-center">
                {coreTeam.map((member) => (
                  <div key={member.name} className="relative flex justify-center w-full">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-8 bg-dim-gray/20 dark:bg-white/10" />
                    <TeamNode name={member.name} role={member.role} photo={member.photo} link={member.link} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function TeamNode({ name, role, photo, link }: { name: string; role: string; photo?: string; link?: string }) {
  const content = (
    <div
      className={`flex flex-col items-center bg-white dark:bg-onyx/30 px-2 pt-3.5 pb-3 sm:px-3 sm:pt-5 sm:pb-4 rounded-xl sm:rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[108px] sm:max-w-[160px] md:max-w-[176px] sm:w-40 md:w-44 h-40 sm:h-48 text-center ${
        link ? "cursor-pointer hover:border-black/20 dark:hover:border-white/20 active:scale-98" : ""
      }`}
    >
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gradient-to-br from-dim-gray/10 to-dim-gray/20 dark:from-white/5 dark:to-white/10 ring-2 ring-black/5 dark:ring-white/10 mb-2 sm:mb-3 flex items-center justify-center text-xs sm:text-base font-bold text-dim-gray dark:text-silver shrink-0">
        {photo ? (
          <Image src={photo} alt={name} fill sizes="64px" className="object-cover" />
        ) : (
          name.charAt(0)
        )}
      </div>
      <span className="font-bold text-xs sm:text-sm md:text-base text-rich-black dark:text-white-smoke leading-snug line-clamp-1">
        {name}
      </span>
      <span className="text-[9px] sm:text-[10px] md:text-[11px] text-dim-gray dark:text-silver uppercase tracking-wide font-medium mt-1 leading-snug">
        {role}
      </span>
      {link && (
        <span className="mt-auto pt-2 inline-flex items-center gap-0.5 text-[10px] sm:text-xs text-dim-gray/70 dark:text-silver/60 group-hover:text-accent underline-offset-2 group-hover:underline transition-colors">
          Portfolio <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </span>
      )}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full flex justify-center no-underline cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return content;
}
