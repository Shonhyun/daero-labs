import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Careers() {
  return (
    <div className="pt-32 pb-24 px-6 md:pt-48">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Careers</h1>
        
        <p className="text-xl md:text-2xl text-dim-gray dark:text-silver leading-relaxed mb-16">
            We’re a small team growing intentionally. We look for engineers and designers who are curious, kind, and obsessed with quality.
        </p>

        <section className="mb-24 space-y-12">
            <h2 className="text-3xl font-bold">Role Openings</h2>
            
            <div className="p-8 rounded-2xl border border-dashed border-dim-gray/20 text-center py-24">
                <p className="text-lg text-dim-gray dark:text-silver mb-6">
                    We don't have any specific roles open right now, but we are always interested in meeting talented people.
                </p>
                <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-signal font-semibold hover:gap-3 transition-all"
                >
                    Send an Open Application <ArrowRight size={20} />
                </Link>
            </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-xl font-bold mb-4">Learning Culture</h3>
                <p className="text-dim-gray dark:text-silver">
                    We invest in books, courses, and conferences. If you're not learning, we're not doing our job.
                </p>
            </div>
             <div>
                <h3 className="text-xl font-bold mb-4">Remote Friendly</h3>
                <p className="text-dim-gray dark:text-silver">
                    We value deep work and flexible schedules. Work where you are most productive.
                </p>
            </div>
        </section>
      </div>
    </div>
  );
}
