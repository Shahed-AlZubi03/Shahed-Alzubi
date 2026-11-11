"use client";

import { ScrollVelocityRow } from "@/components/ui/scroll-velocity-text";

/**
 * Oversized, scroll-reactive band of the stack between the hero and the work.
 * Two rows run in opposite directions; scrolling speeds them up and a scroll
 * back up flips them. Decorative — the same terms are listed, readably, in the
 * Capabilities section — so the band is hidden from assistive tech.
 */
export function StackTicker({ rows }: { rows: [string[], string[]] }) {
  return (
    <div
      aria-hidden="true"
      className="relative space-y-1 border-y border-border bg-surface/50 py-5 backdrop-blur-sm"
      style={FADE_EDGES}
    >
      {rows.map((row, rowIndex) => (
        <ScrollVelocityRow
          key={rowIndex}
          pixelsPerSecond={rowIndex === 0 ? 38 : 30}
          direction={rowIndex === 0 ? 1 : -1}
        >
          {row.map((item, index) => (
            <span key={item} className="inline-flex items-center">
              <span
                className={
                  (index + rowIndex) % 2 === 0
                    ? "font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl"
                    : "font-display text-4xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_var(--accent)] md:text-6xl"
                }
              >
                {item}
              </span>
              <Spark />
            </span>
          ))}
        </ScrollVelocityRow>
      ))}
    </div>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="mx-6 size-5 shrink-0 text-accent md:mx-9 md:size-7" fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
    </svg>
  );
}

const FADE_EDGES: React.CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
};
