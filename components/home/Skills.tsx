import { clsx } from "@/lib/clsx";
import type { SkillGroup } from "@/lib/content";

/**
 * Capabilities as a bento grid, one tile per area in content/skills.json.
 *
 * The AI / ML tile is the heaviest — widest span, and the only ink tile — on
 * purpose: it is the positioning ("AI-powered applications"), and the rest of
 * the stack is what makes it shippable. It is pulled to the front with
 * `order` so the two smaller tiles stack beside it instead of above it.
 * Tiles are matched by group name, so a renamed or added group still
 * renders; it just gets the default span.
 */
const layout: Record<string, { span: string; ink?: boolean }> = {
  "AI / ML": { span: "md:order-first md:col-span-4 md:row-span-2", ink: true },
  Frontend: { span: "md:col-span-2" },
  Backend: { span: "md:col-span-2" },
  "Tools & Workflow": { span: "md:col-span-6" },
};

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-6">
      {groups.map((group, index) => {
        const tile = layout[group.group] ?? { span: "md:col-span-3" };
        return (
          <li
            key={group.group}
            className={clsx(
              "reveal group relative overflow-hidden rounded-[1.25rem] border p-6 md:p-8",
              tile.span,
              tile.ink
                ? "border-ink-line bg-ink text-ink-fg"
                : "border-border bg-surface/85 backdrop-blur",
            )}
            style={{ "--reveal-delay": `${index * 6}%` } as React.CSSProperties}
          >
            {tile.ink ? <InkOrbit /> : null}

            <div className="relative flex items-baseline justify-between gap-4">
              <h3
                className={clsx(
                  "font-display text-xl font-semibold tracking-tight",
                  tile.ink ? "text-ink-fg" : "text-fg",
                )}
              >
                {group.group}
              </h3>
              <span
                className={clsx(
                  "font-mono text-xs",
                  tile.ink ? "text-ink-muted" : "text-fg-subtle",
                )}
              >
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="relative mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={clsx(
                    "rounded-full border px-2.5 py-1 font-mono text-xs transition-colors duration-300",
                    tile.ink
                      ? "border-ink-line text-ink-muted hover:border-ink-accent hover:text-ink-fg"
                      : "border-border text-fg-muted hover:border-accent-line hover:text-accent",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

/** Slow concentric orbits in the corner of the AI tile. Decorative. */
function InkOrbit() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -bottom-20 -right-20 size-72 opacity-70"
      fill="none"
    >
      <circle cx="100" cy="100" r="40" className="stroke-ink-line" />
      <circle cx="100" cy="100" r="64" className="mg-spin stroke-ink-line" strokeDasharray="2 6" style={{ "--dur": "40s" } as React.CSSProperties} />
      <circle cx="100" cy="100" r="88" className="stroke-ink-line" />
      <g className="mg-spin" style={{ "--dur": "14s" } as React.CSSProperties}>
        <circle cx="100" cy="100" r="64" className="stroke-transparent" />
        <circle cx="164" cy="100" r="4" className="fill-ink-accent" />
      </g>
      <g className="mg-spin" style={{ "--dur": "22s" } as React.CSSProperties}>
        <circle cx="100" cy="100" r="88" className="stroke-transparent" />
        <circle cx="100" cy="12" r="3" className="fill-signal" />
      </g>
      <circle cx="100" cy="100" r="6" className="fill-ink-accent" />
    </svg>
  );
}
