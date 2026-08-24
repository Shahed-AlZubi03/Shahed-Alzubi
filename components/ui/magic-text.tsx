"use client";

import { Fragment, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import {
  useIsomorphicLayoutEffect,
  usePrefersReducedMotion,
} from "@/lib/use-prefers-reduced-motion";

/**
 * Word-by-word scroll reveal for body copy: the paragraph sits dim until it
 * rises through the viewport, then lights up a word at a time.
 *
 * Departures from the upstream snippet, all of them things that only start to
 * matter once this drives real case-study prose instead of one demo sentence:
 *
 * 1. **One node per word, not two.** Upstream renders each word twice — an
 *    absolutely-positioned ghost at `opacity-20` under a copy that fades 0 → 1.
 *    Composited, that is a straight ramp from 0.2 to 1.0, which a single span
 *    animating `opacity` between the same two numbers reproduces exactly. The
 *    duplicate is not just wasted DOM on a page with ~1,800 words: it puts
 *    every word into the accessible tree twice, so a screen reader reads the
 *    paragraph doubled and a copy-paste comes out doubled too.
 *
 * 2. **Nothing is hidden by JS.** The dim state lives in the MAGIC TEXT block
 *    of globals.css, behind `html[data-js]` and `prefers-reduced-motion:
 *    no-preference`, exactly as `animated-text.tsx` does it. It applies from
 *    the first paint, so the paragraph never flashes at full strength before
 *    Motion takes over; and it cannot apply without the pre-paint script, so
 *    no-JS readers and reduced-motion readers get plain, fully-legible text
 *    rather than a page of 28%-opacity prose they cannot read. Motion's inline
 *    styles outrank the rule once hydrated. `--magic-text-dim` is written by
 *    this file so the floor has one source of truth.
 *
 * 3. **The reveal only goes forward.** Upstream re-dims on the way back up,
 *    which is fine for a hero line and hostile in a case study — scroll up to
 *    re-read a sentence and it fades out from under you. `revealed` latches the
 *    highest progress seen.
 *
 * 4. **The tail of the page is guaranteed to light up.** The offset completes
 *    when the paragraph's top reaches 40% of the viewport, and the last
 *    paragraph on a page can run out of document before it ever gets that high
 *    — leaving the closing lines of every case study permanently dim, the one
 *    failure mode worth engineering against here. So a page-bottom check
 *    forces the reveal to 1. It is one shared scroll listener for all
 *    instances, not one per paragraph.
 *
 * 5. Type/spacing come from the caller (`className`), not from the component.
 *    Upstream hardcodes `text-3xl font-semibold` and fakes line spacing with
 *    `leading-[0.5]` plus a `mt-[12px]` per word inside a `flex flex-wrap` —
 *    a display-size trick that collapses the line-height of wrapping prose.
 *    Words are plain inline spans separated by real spaces, so the paragraph
 *    wraps, breaks and inherits leading like the `<p>` it replaces.
 *
 * 6. `progress` is a `MotionValue<number>`, not `any`.
 */

/** Resting opacity of an unread word. Mirrored into CSS as `--magic-text-dim`. */
const DIM_OPACITY = 0.28;

/**
 * Progress window, in Motion's `useScroll` offset terms: 0 when the
 * paragraph's top edge sits at 90% of the viewport height (just entering from
 * below), 1 when it reaches 40% (settled into the reading band).
 */
const REVEAL_OFFSET = ["start 0.9", "start 0.4"] as const;

export interface MagicTextProps {
  text: string;
  /** Type, colour and leading for the paragraph. */
  className?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [DIM_OPACITY, 1]);

  return (
    <motion.span data-magic-word="" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export function MagicText({ text, className }: MagicTextProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: [...REVEAL_OFFSET],
  });

  /** Latched scroll progress — see departure 3. */
  const revealed = useMotionValue(0);
  const atPageBottom = useAtPageBottom();

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > revealed.get()) revealed.set(value);
  });

  useIsomorphicLayoutEffect(() => {
    if (atPageBottom) {
      revealed.set(1);
      return;
    }
    // Covers a load that starts part-way down the page (a restored scroll
    // position, a hash link): `change` has not fired yet, so read the value
    // Motion measured on mount.
    const measured = scrollYProgress.get();
    if (measured > revealed.get()) revealed.set(measured);
  }, [atPageBottom, revealed, scrollYProgress]);

  const words = text.split(" ");

  return (
    <p ref={container} className={className} style={dimStyle}>
      {words.map((word, index) => (
        <Fragment key={index}>
          {/* The space lives outside the animated span, in the text flow, so
              wrapping happens where it would in a plain paragraph. */}
          {index > 0 ? " " : null}
          {animate ? (
            <Word
              progress={revealed}
              range={[index / words.length, (index + 1) / words.length]}
            >
              {word}
            </Word>
          ) : (
            <span data-magic-word="">{word}</span>
          )}
        </Fragment>
      ))}
    </p>
  );
}

const dimStyle = {
  "--magic-text-dim": DIM_OPACITY,
} as React.CSSProperties;

/* ------------------------------------------------------------------
   Page-bottom store — one listener, however many paragraphs subscribe.
   ------------------------------------------------------------------ */

/** Sub-pixel layout rounding means the sum rarely lands exactly on equal. */
const BOTTOM_SLACK_PX = 4;

let atBottom = false;
const subscribers = new Set<() => void>();

function measure() {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - BOTTOM_SLACK_PX
  );
}

function handleScroll() {
  const next = measure();
  if (next === atBottom) return;
  atBottom = next;
  subscribers.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  subscribers.add(notify);
  if (subscribers.size === 1) {
    atBottom = measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    // The document can also grow or shrink under a still scroll position —
    // fonts landing, an orientation change.
    window.addEventListener("resize", handleScroll);
  }

  return () => {
    subscribers.delete(notify);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  };
}

function useAtPageBottom() {
  return useSyncExternalStore(
    subscribe,
    () => atBottom,
    () => false,
  );
}
