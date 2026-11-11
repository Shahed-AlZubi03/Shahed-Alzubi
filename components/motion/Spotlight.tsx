"use client";

import { useEffect, useRef } from "react";

/**
 * A soft accent glow that follows the pointer across its parent.
 *
 * Drop it in as the first child of any `relative overflow-hidden` element. It
 * listens on the parent rather than wrapping it, so the card around it can
 * stay a server component (and a plain `<Link>`). Position is written to CSS
 * variables, never React state, so tracking the pointer causes no re-renders.
 *
 * Touch input is ignored — there is no hover to follow.
 */
export function Spotlight({ size = 420 }: { size?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      layer.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      layer.style.setProperty("--my", `${event.clientY - rect.top}px`);
      layer.style.opacity = "1";
    };
    const leave = () => {
      layer.style.opacity = "0";
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 65%)`,
      }}
    />
  );
}
