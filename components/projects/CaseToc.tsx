"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { clsx } from "@/lib/clsx";

export type TocItem = { id: string; label: string };

/**
 * Sticky contents for a case study, with the current section tracked as you
 * read. The marker is a shared-layout element, so it slides between entries
 * rather than jumping.
 *
 * "Current" is the last section whose top has crossed 35% of the viewport —
 * an IntersectionObserver band rather than a scroll listener, so it costs
 * nothing between crossings.
 */
export function CaseToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
        On this page
      </p>
      <ol className="mt-5 space-y-1 border-l border-border">
        {items.map((item, index) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="relative">
              {isActive ? (
                <motion.span
                  layoutId="toc-marker"
                  aria-hidden="true"
                  className="absolute -left-px top-0 h-full w-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={clsx(
                  "flex gap-3 py-1.5 pl-4 text-sm transition-colors",
                  isActive ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                )}
              >
                <span className="font-mono text-[0.7rem] leading-5 text-fg-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
