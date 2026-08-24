"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-velocity-text";
import { Tag } from "@/components/ui/Tag";
import type { StackGroup } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The Tech Stack block of a case study: one scroll-reactive ticker per group,
 * label parked in the left column. Rows alternate direction, so the block
 * reads as a set of counter-running belts rather than one drifting line.
 *
 * `usePrefersReducedMotion` starts `true`, which is what makes the fallback
 * the *server* render too: no-JS readers and reduced-motion readers get the
 * plain wrapped chip list this replaced, never a strip of clipped, moving
 * text they cannot pause.
 *
 * Rows share one `ScrollVelocityContainer`, so the whole block costs one
 * scroll listener and one spring. `pixelsPerSecond` pins every row to the
 * same drift: the component's default speed is a share of the repeating
 * block, which would run the twelve-chip Backend row of a big stack about
 * four times faster than the four-chip AI row directly under it.
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
    <ScrollVelocityContainer>
      <dl className="flex flex-col gap-4">
        {groups.map((group, index) => (
          <div
            key={group.group}
            className="sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center sm:gap-6"
          >
            <dt className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              {group.group}
            </dt>
            <dd className="mt-2 min-w-0 sm:mt-0">
              <ScrollVelocityRow
                pixelsPerSecond={22}
                direction={index % 2 === 0 ? 1 : -1}
                style={FADE_EDGES}
              >
                {group.items.map((item) => (
                  <span key={item} className="inline-flex items-center">
                    <Tag className="mx-2">{item}</Tag>
                    <span aria-hidden="true" className="text-accent/45">
                      &middot;
                    </span>
                  </span>
                ))}
              </ScrollVelocityRow>
            </dd>
          </div>
        ))}
      </dl>
    </ScrollVelocityContainer>
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
