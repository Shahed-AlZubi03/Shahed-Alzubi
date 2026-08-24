"use client";

import { ScrollVelocityRow } from "@/components/ui/scroll-velocity-text";
import { Tag } from "@/components/ui/Tag";
import type { StackGroup } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The Tech Stack block of a case study: the whole stack on a single
 * scroll-reactive line, group labels riding the belt ahead of their chips.
 *
 * `usePrefersReducedMotion` starts `true`, which is what makes the fallback
 * the *server* render too: no-JS readers and reduced-motion readers get the
 * plain labelled chip list below, never a strip of clipped, moving text they
 * cannot pause. That fallback is also where the grouping is properly marked
 * up — a `dl` cannot survive the copies the marquee interleaves, so the moving
 * version is a flat line that still reads in order: label, then its items.
 *
 * `pixelsPerSecond` overrides the component's default speed, which is a share
 * of the repeating block per second — that would drift a two-item stack and a
 * forty-item one at wildly different rates.
 */
export function StackMarquee({ groups }: { groups: StackGroup[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <dl className="flex flex-col gap-5">
        {groups.map((group) => (
          <div
            key={group.group}
            className="sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="font-mono text-xs uppercase tracking-widest text-fg-muted sm:pt-1.5">
              {group.group}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2 sm:mt-0">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <ScrollVelocityRow
      pixelsPerSecond={26}
      className="py-1"
      style={FADE_EDGES}
    >
      {groups.map((group) => (
        <span key={group.group} className="inline-flex items-center">
          {/* The group label rides the belt instead of sitting in a fixed
              column, which is what lets the whole stack be one line. It is
              styled as a marker, not a chip, so a group still reads as a
              group while it moves. */}
          <span className="ml-7 mr-3 font-mono text-xs uppercase tracking-widest text-accent/80">
            {group.group}
          </span>
          {group.items.map((item, index) => (
            <span key={item} className="inline-flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-2 text-fg-subtle/50">
                  &middot;
                </span>
              ) : null}
              <Tag>{item}</Tag>
            </span>
          ))}
        </span>
      ))}
    </ScrollVelocityRow>
  );
}

/**
 * Chips enter and leave under a soft edge instead of being sliced by the
 * overflow box. Kept local to this file — it is a property of this treatment,
 * not a site-wide utility.
 */
const FADE_EDGES: React.CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 1.25rem, black calc(100% - 1.25rem), transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 1.25rem, black calc(100% - 1.25rem), transparent)",
};
