import { CostEstimator } from "@/components/CostEstimator";
import { getPlatform, type PlatformId } from "@/lib/estimator";

export default async function Estimate({ searchParams }: { searchParams: Promise<{ platform?: string }> }) {
  // Homepage tiles link here with ?platform=web (or mobile/desktop) to preselect it.
  const { platform } = await searchParams;
  const initialPlatforms = platform && getPlatform(platform) ? [platform as PlatformId] : [];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 md:pt-48">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Estimate Your Project</h1>
        <p className="text-xl md:text-2xl text-dim-gray dark:text-silver leading-relaxed mb-16 md:mb-20 max-w-3xl">
          Every system is different, so we don&apos;t sell bundles. Pick your platform and the features you need, and get a
          ballpark price in seconds.
        </p>

        <CostEstimator initialPlatforms={initialPlatforms} />
      </div>
    </div>
  );
}
