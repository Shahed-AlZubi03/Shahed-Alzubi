"use client";

import type { MotionValue } from "motion/react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import React, { useContext, useEffect, useRef, useState } from "react";

import { clsx } from "@/lib/clsx";

/**
 * Horizontal marquee whose speed — and direction — react to scroll velocity.
 *
 * Departures from the upstream snippet:
 *
 * 1. **Reduced motion stops the track, it does not merely calm it.** Upstream
 *    keeps scrolling at `speedMultiplier = 1`; a permanently moving strip is
 *    exactly what that preference asks you to switch off. Here the frame loop
 *    bails, so the row parks where it is. Callers that can do better should
 *    render a static list instead — see `components/projects/StackMarquee`.
 *
 * 2. **`pixelsPerSecond`.** `baseVelocity` is a *share of the repeating
 *    block* per second, so a row's speed scales with how much content it
 *    holds. Fine for one wide hero ticker; wrong for rows stacked one above
 *    another, where a two-chip row crawls beside a twelve-chip one at four
 *    times the pace. Setting this pins a row to a flat rate instead, so a
 *    group of them drifts in step whatever each is carrying.
 *
 * 3. `clsx` from `@/lib/clsx` rather than a shadcn `cn` — this project has no
 *    `tailwind-merge`-backed helper and no `@/lib/utils`.
 */

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ScrollVelocityContext = React.createContext<MotionValue<number> | null>(
  null,
);

/** Peak multiplier a fast scroll can add on top of the base drift. */
const MAX_VELOCITY_FACTOR = 5;

function toVelocityFactor(v: number) {
  const sign = v < 0 ? -1 : 1;
  const magnitude = Math.min(
    MAX_VELOCITY_FACTOR,
    (Math.abs(v) / 1000) * MAX_VELOCITY_FACTOR,
  );
  return sign * magnitude;
}

/**
 * Wrap sibling rows in this and they share one scroll listener and one spring
 * instead of each running their own.
 */
export function ScrollVelocityContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, toVelocityFactor);

  return (
    <ScrollVelocityContext.Provider value={velocityFactor}>
      <div className={clsx("relative w-full", className)} {...props}>
        {children}
      </div>
    </ScrollVelocityContext.Provider>
  );
}

interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Share of one repeating block travelled per second. */
  baseVelocity?: number;
  /** Flat px/s rate. Overrides `baseVelocity` — see departure 2. */
  pixelsPerSecond?: number;
  direction?: 1 | -1;
  scrollReactivity?: boolean;
}

interface ScrollVelocityRowImplProps extends ScrollVelocityRowProps {
  velocityFactor: MotionValue<number>;
}

function ScrollVelocityRowImpl({
  children,
  baseVelocity = 5,
  pixelsPerSecond,
  direction = 1,
  className,
  velocityFactor,
  scrollReactivity = true,
  ...props
}: ScrollVelocityRowImplProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [numCopies, setNumCopies] = useState(1);

  const baseX = useMotionValue(0);
  const baseDirectionRef = useRef<number>(direction >= 0 ? 1 : -1);
  const currentDirectionRef = useRef<number>(direction >= 0 ? 1 : -1);
  const unitWidth = useMotionValue(0);

  const isInViewRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let mq: MediaQueryList | null = null;

    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";
    };
    const handlePRM = () => {
      if (mq) prefersReducedMotionRef.current = mq.matches;
    };

    if (container && block) {
      const updateSizes = () => {
        const cw = container.offsetWidth || 0;
        const bw = block.scrollWidth || 0;
        unitWidth.set(bw);
        const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1;
        setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies));
      };

      updateSizes();

      ro = new ResizeObserver(updateSizes);
      ro.observe(container);
      ro.observe(block);

      io = new IntersectionObserver(([entry]) => {
        if (entry) isInViewRef.current = entry.isIntersecting;
      });
      io.observe(container);

      document.addEventListener("visibilitychange", handleVisibility, {
        passive: true,
      });
      handleVisibility();

      mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", handlePRM);
      handlePRM();
    }

    return () => {
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (mq) mq.removeEventListener("change", handlePRM);
    };
  }, [unitWidth]);

  const x = useTransform([baseX, unitWidth], ([v, bw]: number[]) => {
    const width = Number(bw) || 1;
    const offset = Number(v) || 0;
    return `${-wrap(0, width, offset)}px`;
  });

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return;
    // Departure 1: park the track rather than scrolling it slowly.
    if (prefersReducedMotionRef.current) return;

    const dt = delta / 1000;
    const vf = scrollReactivity ? velocityFactor.get() : 0;
    const absVf = Math.min(MAX_VELOCITY_FACTOR, Math.abs(vf));

    if (absVf > 0.1) {
      const scrollDirection = vf >= 0 ? 1 : -1;
      currentDirectionRef.current = baseDirectionRef.current * scrollDirection;
    }

    const bw = unitWidth.get() || 0;
    if (bw <= 0) return;
    const speed = pixelsPerSecond ?? (bw * baseVelocity) / 100;
    const moveBy = currentDirectionRef.current * speed * (1 + absVf) * dt;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={clsx("w-full overflow-hidden whitespace-nowrap", className)}
      ref={containerRef}
      {...props}
    >
      <motion.div
        className="inline-flex transform-gpu select-none items-center will-change-transform"
        style={{ x }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            aria-hidden={i !== 0}
            className="inline-flex shrink-0 items-center"
            key={i}
            ref={i === 0 ? blockRef : null}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ScrollVelocityRowLocal(props: ScrollVelocityRowProps) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const localVelocityFactor = useTransform(
    localSmoothVelocity,
    toVelocityFactor,
  );
  return (
    <ScrollVelocityRowImpl {...props} velocityFactor={localVelocityFactor} />
  );
}

export function ScrollVelocityRow(props: ScrollVelocityRowProps) {
  const sharedVelocityFactor = useContext(ScrollVelocityContext);
  if (sharedVelocityFactor) {
    return (
      <ScrollVelocityRowImpl {...props} velocityFactor={sharedVelocityFactor} />
    );
  }
  return <ScrollVelocityRowLocal {...props} />;
}

export default ScrollVelocityRow;
