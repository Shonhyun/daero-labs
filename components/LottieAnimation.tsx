"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export const LottieAnimation = ({ src, className, autoplay = true, loop = true }: LottieAnimationProps) => {
  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
};
