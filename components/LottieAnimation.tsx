"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export const LottieAnimation = ({ src, className, autoplay = true, loop = true }: LottieAnimationProps) => {
  return (
    <div className={className}>
      <DotLottiePlayer
        src={src}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
};
