"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { clsx } from "@/lib/clsx";
import type { NavItem } from "@/lib/site";

type TubelightNavProps = {
  items: readonly NavItem[];
  /** Href of the item that owns the lamp; pass undefined for no active item. */
  activeHref?: string;
  className?: string;
};

/**
 * Pill nav where the active tab carries a "tubelight" — a glowing bar above it
 * that slides between tabs. The glow is a layout-animated shared element, so
 * only one lamp exists at a time and it tweens on route change.
 *
 * Unlike the upstream component this is not `fixed`; it sits inside the header
 * next to the logo and theme toggle, and the active tab comes from the route
 * rather than from click state, so it stays correct on back/forward.
 */
export function TubelightNav({
  items,
  activeHref,
  className,
}: TubelightNavProps) {
  return (
    <ul
      className={clsx(
        "flex items-center gap-1 rounded-full border border-border bg-surface/40 p-1 backdrop-blur-md",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.href === activeHref;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "relative block rounded-full px-4 py-1.5 text-sm transition-colors",
                active ? "text-accent" : "text-fg-muted hover:text-fg",
              )}
            >
              {item.label}
              {active ? (
                <motion.span
                  layoutId="tubelight"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                  initial={false}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                >
                  {/* The lamp itself: a short bar on the pill's top edge, with
                      three stacked blurs standing in for the light spill. */}
                  <span className="absolute -top-px left-1/2 h-px w-8 -translate-x-1/2 rounded-full bg-accent">
                    <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/25 blur-md" />
                    <span className="absolute -top-1 h-6 w-8 rounded-full bg-accent/25 blur-md" />
                    <span className="absolute left-2 top-0 h-4 w-4 rounded-full bg-accent/25 blur-sm" />
                  </span>
                </motion.span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
