"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Layout effect on the client, no-op on the server. Committing before paint
 * matters wherever the decision "animate or not" changes what gets rendered:
 * with `useEffect` the un-animated markup paints once and then resets as
 * Motion takes over, which reads as a blink.
 */
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Subscribes to the reduced-motion preference.
 *
 * Starts `true` so the first client render matches the server, which cannot
 * know the preference — and so that the fallback, if the effect never runs, is
 * the static one. Read with `matchMedia` rather than Motion's
 * `useReducedMotion()`, which did not flip this branch in testing: the query
 * matched and the text animated anyway. Subscribed live, so toggling the OS
 * setting settles without a reload.
 *
 * Shared by `components/ui/animated-text.tsx` (entrance stagger) and
 * `components/ui/magic-text.tsx` (scroll reveal).
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
