import { Tag } from "@/components/ui/Tag";
import type { SkillGroup } from "@/lib/content";

/**
 * Deliberately unboxed. The case-study cards above are the heavy elements on
 * this page; repeating that shell here made the section compete with them and
 * turned a simple list into four containers. Separation comes from whitespace
 * alone — no rules, no panels — so the block reads as one calm run down the
 * page and the ambient gradient stays visible through it.
 *
 * The label stays `--fg-muted` rather than the accent: at small mono sizes the
 * accent only clears AA on a solid card, not over the ambient wash.
 */
export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <dl className="flex flex-col gap-12 sm:gap-14">
      {groups.map((group) => (
        <div
          key={group.group}
          className="sm:grid sm:grid-cols-[10rem_1fr] sm:gap-10"
        >
          <dt className="font-mono text-xs uppercase tracking-widest text-fg-muted sm:pt-1">
            {group.group}
          </dt>

          <dd className="mt-4 flex flex-wrap gap-2.5 sm:mt-0">
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
