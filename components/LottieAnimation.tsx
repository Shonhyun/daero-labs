"use client";

import { useCallback, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

// iPhones report a pixel ratio of 3, so the canvas would redraw 9x the pixels every frame.
// 2x looks the same at these sizes and is much cheaper. Offscreen animations stay paused.
const RENDER_CONFIG = { devicePixelRatio: 2, freezeOnOffscreen: true };

export const LottieAnimation = ({ src, className, autoplay = true, loop = true }: LottieAnimationProps) => {
  // The canvas has no intrinsic size, so size it to the animation's own aspect ratio once loaded.
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleRef = useCallback((dotLottie: DotLottie | null) => {
    dotLottie?.addEventListener("load", () => {
      const { width, height } = dotLottie.animationSize();
      if (width && height) setAspectRatio(width / height);
    });
  }, []);

  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        dotLottieRefCallback={handleRef}
        renderConfig={RENDER_CONFIG}
        style={{ width: "100%", aspectRatio }}
      />
    </div>
  );
};
