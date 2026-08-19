import { Tag } from "@/components/ui/Tag";
import type { SkillGroup } from "@/lib/content";

/**
 * Label-left / chips-right, matching the Tech Stack block on a case study —
 * the groups are wildly different sizes, so even columns would leave gaps.
 */
export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <dl className="flex flex-col">
      {groups.map((group) => (
        <div
          key={group.group}
          className="border-t border-border py-6 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-8"
        >
          <dt className="font-mono text-xs uppercase tracking-widest text-fg-subtle sm:pt-1.5">
            {group.group}
          </dt>
          <dd className="mt-3 flex flex-wrap gap-2 sm:mt-0">
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
