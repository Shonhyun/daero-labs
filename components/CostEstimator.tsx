"use client";

import { useRef, useState } from "react";
import { ArrowRight, Calculator, Check, LoaderCircle, RotateCcw, Sparkles } from "lucide-react";
import { formatUSD, platforms, type EstimateBreakdown, type PlatformId, type PriceRange } from "@/lib/estimator";
import { START_PROJECT_URL } from "@/lib/booking";
import { smoothScrollToElement } from "@/components/SmoothScrollProvider";

interface EstimateResult extends EstimateBreakdown {
  custom: (PriceRange & { name: string })[];
  customUnpriced: string[];
  summary: string;
  aiUsed: boolean;
}

const formatRange = (r: PriceRange) => `${formatUSD(r.min)} – ${formatUSD(r.max)}`;

function StepHeading({ step, title, hint }: { step: number; title: string; hint?: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <span className="w-8 h-8 rounded-full bg-accent text-accent-fg text-sm font-bold flex items-center justify-center shrink-0">
        {step}
      </span>
      <div>
        <h2 className="text-xl md:text-2xl font-bold leading-8">{title}</h2>
        {hint && <p className="text-sm text-dim-gray dark:text-silver mt-1">{hint}</p>}
      </div>
    </div>
  );
}

export function CostEstimator({ initialPlatforms = [] }: { initialPlatforms?: PlatformId[] }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(initialPlatforms);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [others, setOthers] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const activePlatforms = platforms.filter((p) => selectedPlatforms.includes(p.id));
  // Features of a platform that was deselected don't count.
  const activeFeatures = selectedFeatures.filter((key) => selectedPlatforms.includes(key.split(":")[0] as PlatformId));

  // Any change makes the last result stale, so hide it until the next calculation.
  const resetResult = () => {
    setResult(null);
    setStatus("idle");
  };

  const togglePlatform = (id: PlatformId) => {
    setSelectedPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
    resetResult();
  };

  const toggleFeature = (key: string) => {
    setSelectedFeatures((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]));
    resetResult();
  };

  const startOver = () => {
    setSelectedPlatforms([]);
    setSelectedFeatures([]);
    setOthers("");
    resetResult();
  };

  const calculate = async () => {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platforms: selectedPlatforms, features: activeFeatures, others }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      setResult(data);
      setStatus("idle");
      requestAnimationFrame(() => resultRef.current && smoothScrollToElement(resultRef.current));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-16">
      {/* Step 1: Platforms */}
      <section>
        <StepHeading step={1} title="What are you building?" hint="Pick one or more platforms." />
        <div className="grid sm:grid-cols-3 gap-4">
          {platforms.map((platform) => {
            const selected = selectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                type="button"
                aria-pressed={selected}
                onClick={() => togglePlatform(platform.id)}
                className={`relative text-left p-5 md:p-6 rounded-2xl border transition-all ${
                  selected
                    ? "border-accent bg-white dark:bg-onyx/40 shadow-md"
                    : "border-black/5 dark:border-white/10 bg-white/60 dark:bg-onyx/20 hover:border-black/20 dark:hover:border-white/25"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-rich-black/5 dark:bg-white/10 flex items-center justify-center mb-4">
                  <platform.icon size={24} />
                </div>
                <p className="text-lg font-bold">{platform.name}</p>
                <p className="text-sm text-dim-gray dark:text-silver mt-1">{platform.tagline}</p>
                <span
                  className={`absolute top-5 right-5 w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    selected ? "bg-accent border-accent text-accent-fg" : "border-black/15 dark:border-white/20"
                  }`}
                >
                  {selected && <Check size={14} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Features */}
      <section>
        <StepHeading
          step={2}
          title="Pick your features"
          hint="Tap the features you need. We price by feature, not by bundle, so you only pay for what you use."
        />

        {activePlatforms.length === 0 ? (
          <p className="p-8 rounded-2xl border border-dashed border-black/10 dark:border-white/15 text-center text-dim-gray dark:text-silver">
            Choose a platform above to see its features.
          </p>
        ) : (
          <div className="space-y-10">
            {activePlatforms.map((platform) => (
              <div key={platform.id}>
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-dim-gray dark:text-silver">
                  <platform.icon size={16} /> {platform.name} features
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {platform.features.map((feature) => {
                    const key = `${platform.id}:${feature.id}`;
                    const selected = selectedFeatures.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleFeature(key)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                          selected
                            ? "border-accent bg-white dark:bg-onyx/40"
                            : "border-black/5 dark:border-white/10 bg-white/60 dark:bg-onyx/20 hover:border-black/20 dark:hover:border-white/25"
                        }`}
                      >
                        <span
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            selected ? "bg-accent text-accent-fg" : "bg-rich-black/5 dark:bg-white/10"
                          }`}
                        >
                          <feature.icon size={18} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-semibold text-sm leading-snug">{feature.name}</span>
                          <span className="block text-xs text-dim-gray dark:text-silver leading-snug mt-0.5">{feature.description}</span>
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                            selected ? "bg-accent border-accent text-accent-fg" : "border-black/15 dark:border-white/20"
                          }`}
                        >
                          {selected && <Check size={12} strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Step 3: Other features + calculate */}
      <section>
        <StepHeading step={3} title="Anything else?" hint="Optional. Type any feature that isn't listed, one per line." />
        <textarea
          value={others}
          onChange={(e) => {
            setOthers(e.target.value);
            resetResult();
          }}
          rows={4}
          maxLength={600}
          placeholder={"e.g. Budget tracker with monthly limits\nLoyalty points for repeat customers"}
          className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-onyx/20 border border-black/5 dark:border-white/10 focus:border-accent outline-none transition-colors resize-none text-base"
        />

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-dim-gray/5 dark:bg-white/5">
          <p className="text-sm text-dim-gray dark:text-silver">
            {activePlatforms.length === 0
              ? "No platform selected yet"
              : `${activePlatforms.map((p) => p.name).join(" + ")} · ${activeFeatures.length} feature${activeFeatures.length === 1 ? "" : "s"} selected`}
          </p>
          <button
            type="button"
            onClick={calculate}
            disabled={activePlatforms.length === 0 || status === "loading"}
            className="px-8 py-4 rounded-full bg-accent text-accent-fg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <LoaderCircle size={20} className="animate-spin" /> Calculating...
              </>
            ) : (
              <>
                <Calculator size={20} /> Calculate Estimate
              </>
            )}
          </button>
        </div>
        {status === "error" && <p className="mt-4 text-center text-red-600 dark:text-red-400 font-medium">{error}</p>}
      </section>

      {/* Result */}
      {result && (
        <div ref={resultRef}>
          <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-onyx/30 shadow-xl p-6 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dim-gray dark:text-silver mb-3">Estimated Cost</p>
            <p className="text-4xl md:text-6xl font-bold font-display tracking-tight">{formatRange(result.total)}</p>
            <p className="mt-3 text-dim-gray dark:text-silver">
              Estimated timeline: <span className="font-semibold text-rich-black dark:text-white-smoke">{result.weeks.min}–{result.weeks.max} weeks</span>
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-dim-gray/5 dark:bg-white/5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-dim-gray dark:text-silver mb-2">
                <Sparkles size={14} /> {result.aiUsed ? "AI Summary" : "Summary"}
              </p>
              <p className="leading-relaxed">{result.summary}</p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dim-gray dark:text-silver mb-4">Breakdown</p>
              <ul className="divide-y divide-black/5 dark:divide-white/10">
                {result.lineItems.map((item) => (
                  <li key={`${item.platform}-${item.kind}-${item.name}`} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <span className={item.kind === "base" ? "font-semibold" : "text-dim-gray dark:text-silver pl-4"}>
                      {item.kind === "base" ? `${platforms.find((p) => p.id === item.platform)?.name}: ${item.name}` : item.name}
                    </span>
                    <span className="shrink-0 tabular-nums">{formatRange(item)}</span>
                  </li>
                ))}
                {result.custom.map((item) => (
                  <li key={`custom-${item.name}`} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <span className="flex flex-wrap items-center gap-2">
                      {item.name}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-rich-black/5 dark:bg-white/10">
                        AI estimate
                      </span>
                    </span>
                    <span className="shrink-0 tabular-nums">{formatRange(item)}</span>
                  </li>
                ))}
                {result.discount.max > 0 && (
                  <li className="flex items-start justify-between gap-4 py-3 text-sm">
                    <span>Multi-platform savings (shared backend)</span>
                    <span className="shrink-0 tabular-nums">−{formatRange(result.discount)}</span>
                  </li>
                )}
              </ul>
              {result.customUnpriced.length > 0 && (
                <p className="mt-4 text-sm text-dim-gray dark:text-silver">
                  Not included yet: {result.customUnpriced.join(", ")}. We&apos;ll price these with you on a call.
                </p>
              )}
            </div>

            <p className="mt-8 text-xs text-dim-gray dark:text-silver leading-relaxed">
              This is a ballpark based on typical projects, not a final quote. Your actual price depends on design complexity,
              integrations, and content. Book a call and we&apos;ll send you an exact proposal.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={START_PROJECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-accent text-accent-fg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Book a Call for an Exact Quote <ArrowRight size={20} />
              </a>
              <button
                type="button"
                onClick={startOver}
                className="px-8 py-4 rounded-full bg-dim-gray/10 dark:bg-white/10 font-semibold flex items-center justify-center gap-2 hover:bg-dim-gray/20 dark:hover:bg-white/20 transition-colors"
              >
                <RotateCcw size={18} /> Start Over
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
