import { Hero } from "@/components/Hero";
import { Card } from "@/components/Card";
import Link from "next/link";
import { ArrowRight, Code, Smartphone, Palette } from "lucide-react";
import { LottieAnimation } from "@/components/LottieAnimation";

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
                We focus on three core areas to deliver exceptional results with precision and care.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden md:flex items-center gap-2 text-signal font-medium hover:gap-4 transition-all"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-6 text-rich-black dark:text-white-smoke">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Web Development</h3>
                <p className="text-dim-gray dark:text-silver leading-relaxed mb-6">
                  Clean, responsive websites and internal tools built with modern frameworks like Next.js and React.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-dim-gray dark:text-silver">
                <li className="flex items-center gap-2">• Performance First</li>
                <li className="flex items-center gap-2">• SEO Optimized</li>
                <li className="flex items-center gap-2">• Scalable Architecture</li>
              </ul>
            </Card>

            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-6 text-rich-black dark:text-white-smoke">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile Apps</h3>
                <p className="text-dim-gray dark:text-silver leading-relaxed mb-6">
                  Cross-platform mobile applications using Flutter and scalable backends that feel native on every device.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-dim-gray dark:text-silver">
                <li className="flex items-center gap-2">• iOS & Android</li>
                <li className="flex items-center gap-2">• Smooth Animations</li>
                <li className="flex items-center gap-2">• Offline Support</li>
              </ul>
            </Card>

            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-6 text-rich-black dark:text-white-smoke">
                  <Palette size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
                <p className="text-dim-gray dark:text-silver leading-relaxed mb-6">
                  Minimal interfaces focused on clarity, usability, and consistency. Design that breathes.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-dim-gray dark:text-silver">
                <li className="flex items-center gap-2">• User Research</li>
                <li className="flex items-center gap-2">• Design Systems</li>
                <li className="flex items-center gap-2">• Interactive Prototyping</li>
              </ul>
            </Card>
          </div>

          <div className="mt-12 md:hidden">
            <Link
              href="/services"
              className="flex items-center gap-2 text-signal font-medium"
            >
              View All Services <ArrowRight size={20} />
            </Link>
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
                <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-rich-black dark:text-white-smoke font-semibold underline underline-offset-4 hover:decoration-signal transition-all">
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
