import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calculator } from "lucide-react";
import { platforms } from "@/lib/estimator";

export function EstimatorTeaser() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-onyx/20 p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-center">
        <div className="lg:w-5/12">
          <div className="w-12 h-12 rounded-xl bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-6">
            <Calculator size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-rich-black dark:text-white-smoke">
            How much will your app cost?
          </h2>
          <p className="text-dim-gray dark:text-silver text-lg leading-relaxed mb-8">
            We price by feature, not by bundle. Choose your platform, pick the features you need, and get an instant estimate.
          </p>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-fg font-semibold hover:bg-accent/90 transition-all group"
          >
            Estimate My Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="lg:w-7/12 grid sm:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/estimate?platform=${platform.id}`}
              className="group p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-onyx/30 hover:border-black/20 dark:hover:border-white/25 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-rich-black/5 dark:bg-white/10 flex items-center justify-center">
                  <platform.icon size={22} />
                </div>
                <ArrowUpRight size={18} className="text-dim-gray dark:text-silver group-hover:text-accent transition-colors" />
              </div>
              <p className="font-bold">{platform.name}</p>
              <p className="text-sm text-dim-gray dark:text-silver mt-1">{platform.tagline}</p>
              <p className="text-xs text-dim-gray dark:text-silver mt-3">{platform.features.length} features to choose from</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
