"use client";

import { Fragment, useLayoutEffect, useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Staggered entrance for a line of text, per letter or per word.
 *
 * Departures from the upstream snippet, all of them things that only start to
 * matter once this drives a real heading instead of a demo string:
 *
 * 1. `as` — upstream always renders a `<div>`. The hero needs its `<h1>` back
 *    (a `<div>` inside one is invalid, and dropping the `h1` costs the page
 *    its document outline), so the element is a prop. Defaults to `"div"`, so
 *    the pasted call signature still behaves as documented.
 *
 * 2. **Nothing is hidden by JS.** This is the important one. Upstream renders
 *    the split spans with `initial` applied, so the server-rendered HTML is
 *    thirteen letters at `opacity: 0` and the text does not exist until Motion
 *    runs. Measured on this page: with JS disabled, 0 of 13 letters were
 *    visible, and under `prefers-reduced-motion: reduce` every letter stayed
 *    pinned at computed opacity 0 — the site's `h1`, which is a person's name,
 *    silently disappeared.
 *
 *    So the hidden state moved to CSS, in the ANIMATED TEXT block of
 *    globals.css, behind `html[data-js]` and `prefers-reduced-motion:
 *    no-preference`. It applies from the first paint, so the line never shows
 *    in full and then blinks out; and it cannot apply at all without the
 *    pre-paint script, so no-JS and reduced-motion readers get plain text.
 *    `--animated-text-y` carries `initialY` over to that rule.
 *
 * 3. The markup is the same before and after hydration — the pieces are always
 *    rendered, and hydrating only adds Motion's inline styles on top of the
 *    CSS that already hid them. An earlier pass swapped a plain string for the
 *    split spans on mount instead, which cost a visible reset: the name
 *    painted, disappeared, then animated in, for 48ms on a fast machine and
 *    371ms under a 6x CPU throttle.
 *
 *    The preference is read with `matchMedia` rather than Motion's
 *    `useReducedMotion()`, which did not flip this branch in testing — the
 *    query matched and the letters animated anyway. It is subscribed live, so
 *    toggling the OS setting settles the text without a reload.
 *
 * 4. Letters are grouped per word inside a `nowrap` wrapper. Each letter is an
 *    `inline-block`, which makes every gap between letters a legal line-break
 *    opportunity — at display size on a phone that breaks names mid-word.
 *    Grouping keeps wrapping at the spaces, where it belongs, while the
 *    stagger still runs continuously across the whole line (each piece's delay
 *    comes from a flat index rather than `staggerChildren`, which would
 *    otherwise restart inside every group).
 *
 * 5. `aria-label` + `aria-hidden` on the pieces. Split per letter, the
 *    accessible name would become "S h a h e d …", which some screen readers
 *    spell out. The label restores the real string; the fragments leave the
 *    accessibility tree.
 */

type AnimatedTextProps = {
  text: string;
  className?: string;
  animationType?: "letters" | "words";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  initialY?: number;
  initialOpacity?: number;
  animateY?: number;
  animateOpacity?: number;
  /** Element to render. Use a heading here when the text is one. */
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Layout effect on the client, no-op on the server. Flipping `mounted` in a
 * layout effect rather than `useEffect` is deliberate: it commits before the
 * browser paints, so the swap from plain text to split spans never reaches the
 * screen. With `useEffect` the full line paints once and then blinks out as
 * the letters reset to their initial state.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Subscribes to the reduced-motion preference. Starts `true` so the first
 * client render matches the server, which cannot know the preference — and so
 * that the fallback, if the effect never runs, is the static one.
 */
function usePrefersReducedMotion() {
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

export default function AnimatedText({
  text,
  className = "text-4xl font-bold",
  animationType = "letters",
  duration = 0.6,
  delay = 0,
  staggerDelay = 0.05,
  initialY = 10,
  initialOpacity = 0,
  animateY = 0,
  animateOpacity = 1,
  as = "div",
}: AnimatedTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;
  const Component = animate ? motion[as] : as;

  /**
   * Each piece carries its own `initial`/`animate` rather than inheriting a
   * variant label from the container. Variants were the upstream approach and
   * they do not survive this structure: the container re-renders rather than
   * remounting, so Motion never runs a mount cycle on it and the propagated
   * `hidden` state sticks — measured as all 13 letters parked at opacity 0 for
   * good. A piece that animates itself has no such dependency, needs no
   * `custom`, and the flat index still gives one continuous stagger across the
   * word groups.
   */
  const pieceProps = (index: number) =>
    animate
      ? {
          initial: { y: initialY, opacity: initialOpacity },
          animate: { y: animateY, opacity: animateOpacity },
          transition: {
            duration,
            delay: delay + index * staggerDelay,
            ease: "easeOut" as const,
          },
        }
      : {};

  /** Read by the pre-paint rule in globals.css. */
  const Piece = animate ? motion.span : "span";
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <Component
      className={className}
      aria-label={text}
      style={{ "--animated-text-y": `${initialY}px` } as React.CSSProperties}
    >
      {animationType === "words"
        ? words.map((word, index) => (
            <Piece
              key={`word-${index}`}
              {...pieceProps(index)}
              data-animated-piece=""
              aria-hidden="true"
              className="mr-2 inline-block"
            >
              {word}
            </Piece>
          ))
        : words.map((word, wordIndex) => (
            <Fragment key={`word-${wordIndex}`}>
              <span
                aria-hidden="true"
                className="inline-block whitespace-nowrap"
              >
                {[...word].map((char) => (
                  <Piece
                    key={`letter-${letterIndex}`}
                    {...pieceProps(letterIndex++)}
                    data-animated-piece=""
                    className="inline-block"
                  >
                    {char}
                  </Piece>
                ))}
              </span>
              {/* Sibling of the wrapper, not a child of it: the wrapper is an
                  `inline-block`, and a trailing space inside one is trimmed —
                  which silently ran the words together into "ShahedAlZu’bi".
                  Out here it renders, and it stays the only place the line is
                  allowed to break. */}
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
    </Component>
  );
}
