"use client";

import { useEffect, useRef } from "react";

/**
 * Host for a CSS motion graphic. Stamps `data-offscreen` while the graphic is
 * out of view, which the MOTION GRAPHICS block in globals.css turns into
 * `animation-play-state: paused` for everything inside.
 *
 * The graphics themselves stay server-rendered SVG — this is the only JS they
 * need, and without it they simply keep running.
 *
 * No positioning of its own: callers pass `relative` or `absolute` as the
 * layout needs. (A default `relative` here silently beat an `absolute`
 * passed in, since both utilities ended up on the element.)
 */
export function MotionStage({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete node.dataset.offscreen;
        else node.dataset.offscreen = "";
      },
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
