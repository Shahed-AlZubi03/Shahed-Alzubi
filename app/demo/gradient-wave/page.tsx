import type { Metadata } from "next";

import { GradientWave } from "@/components/ui/gradient-wave";

/**
 * Scratch route for previewing <GradientWave /> in isolation.
 *
 * TODO(shahed): delete this route (or keep it noindex) before the Vercel
 * deploy — it is a component sandbox, not part of the portfolio.
 */
export const metadata: Metadata = {
  title: "Gradient Wave — demo",
  robots: { index: false, follow: false },
};

export default function GradientWaveDemoPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <GradientWave />
      <h1 className="z-10 text-center font-display text-7xl font-bold tracking-tighter text-fg">
        Gradient Wave
      </h1>
    </div>
  );
}
