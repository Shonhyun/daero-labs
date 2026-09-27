import { Hero } from "@/components/Hero";
import { Card } from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Code, Smartphone, Palette, Users, Monitor } from "lucide-react";
import { LottieAnimation } from "@/components/LottieAnimation";

const expertise = [
  {
    icon: Code,
    title: "Web Development",
    description: "Clean, responsive websites and internal tools built with modern frameworks like Next.js and React.",
    points: ["Performance First", "SEO Optimized", "Scalable Architecture"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform mobile applications using Flutter and scalable backends that feel native on every device.",
    points: ["iOS & Android", "Smooth Animations", "Offline Support"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Minimal interfaces focused on clarity, usability, and consistency. Design that breathes.",
    points: ["User Research", "Design Systems", "Interactive Prototyping"],
  },
  {
    icon: Users,
    title: "CRM Systems",
    description: "Custom CRMs built around how your team actually sells, supports, and follows up with customers.",
    points: ["Lead & Pipeline Tracking", "Customer History", "Reports & Dashboards"],
  },
  {
    icon: Monitor,
    title: "Desktop Apps",
    description: "Reliable desktop software for Windows and macOS, built for the tools your business runs on every day.",
    points: ["Offline-Ready", "Auto Updates", "Internal Business Tools"],
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-rich-black dark:text-white-smoke">Our Expertise</h2>
              <p className="text-dim-gray dark:text-silver max-w-xl text-lg">
                From web and mobile to CRMs and desktop software, we deliver exceptional results with precision and care.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden md:flex items-center gap-2 text-accent font-medium hover:gap-4 transition-all"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </div>

          {/* 3 cards on the first row, 2 wider cards on the second */}
          <div className="grid md:grid-cols-6 gap-8">
            {expertise.map((item, index) => (
              <Card key={item.title} className={`h-full flex flex-col justify-between ${index < 3 ? "md:col-span-2" : "md:col-span-3"}`}>
                <div>
                  <div className="w-12 h-12 rounded-lg bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-6 text-rich-black dark:text-white-smoke">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-dim-gray dark:text-silver leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-dim-gray dark:text-silver">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">• {point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              href="/services"
              className="flex items-center gap-2 text-accent font-medium"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-rich-black dark:text-white-smoke">Featured Work</h2>
            <p className="text-dim-gray dark:text-silver max-w-xl text-lg">
              Real products, shipped and in the hands of real users.
            </p>
          </div>

          {/* Card styling without Card's built-in padding, so the image runs edge to edge */}
          <div className="bg-white dark:bg-onyx/20 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2">
            <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[420px] bg-black">
              <Image
                src="/work/undergrounds.webp"
                alt="Undergrounds REE Review Center logo"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-dim-gray dark:text-silver mb-4">
                Mobile App • Web Platform
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Undergrounds REE Review Center</h3>
              <p className="text-dim-gray dark:text-silver leading-relaxed mb-6">
                An all-in-one review platform for the Registered Electrical Engineering board exam. Students
                get live online classes, structured MATH, ESAS, and EE modules, mock boards, and a mobile app
                with offline mode, smart progress analytics, a built-in scientific calculator, and XP-based
                rankings that make reviewing feel like a game.
              </p>
              <ul className="flex flex-wrap gap-2 mb-8">
                {["iOS & Android", "Offline Mode", "Smart Analytics", "Gamification", "Creator Marketplace"].map((tag) => (
                  <li key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-rich-black/5 dark:bg-white/10 text-rich-black dark:text-white-smoke">
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href="https://undergroundsree-com.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-accent text-accent-fg font-semibold hover:bg-accent/90 transition-all"
              >
                Visit Site <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brief About */}
      <section className="py-24 px-6 bg-dim-gray/5 dark:bg-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 w-full">
                <LottieAnimation 
                    src="https://lottie.host/acf92750-c659-43eb-bafb-b316c087e3a1/0CLTOK7MF5.lottie" 
                    className="w-full max-w-[500px] mx-auto"
                />
            </div>
            <div className="md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-rich-black dark:text-white-smoke">
                    Small Team, <br/>Big Impact.
                </h2>
                <div className="space-y-6 text-lg text-dim-gray dark:text-silver leading-relaxed">
                    <p>
                        Daero Labs is an early-stage software studio formed by developers and designers who care deeply about quality, clarity, and long-term maintainability.
                    </p>
                    <p>
                        We don't outsource. We don't take shortcuts. Every line of code and every pixel is crafted by our own in-house team.
                    </p>
                </div>
                <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-rich-black dark:text-white-smoke font-semibold underline underline-offset-4 hover:decoration-dim-gray transition-all">
                    Meet the Team <ArrowRight size={20} />
                </Link>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to build?</h2>
            <p className="text-xl text-dim-gray dark:text-silver mb-12">
                Let's map out your project and find the best road forward, together.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 rounded-full bg-rich-black text-white hover:bg-rich-black/90 dark:bg-white-smoke dark:text-rich-black dark:hover:bg-white/90 text-lg font-bold transition-all"
            >
              Let's Talk
            </Link>
        </div>
      </section>
    </>
  );
}
