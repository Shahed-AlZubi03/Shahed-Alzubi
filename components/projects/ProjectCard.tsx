import Link from "next/link";

import { Spotlight } from "@/components/motion/Spotlight";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Tag } from "@/components/ui/Tag";
import { clsx } from "@/lib/clsx";
import type { Project } from "@/lib/projects";

/**
 * A case study as a wide, two-panel card: the pitch, and an animated cover of
 * the system's core mechanism. Covers alternate sides down the list.
 *
 * From `md` up the cards are `sticky` with a stepped `top`, so scrolling the
 * list deals them onto a stack — each one slides up over the last and leaves
 * a sliver of the previous card's edge showing. Pure CSS: no scroll
 * listeners, and on phones they simply stack in flow.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flipped = index % 2 === 1;

  return (
    <article
      className="md:sticky"
      style={{ top: `calc(5.5rem + ${index * 1.1}rem)` }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative grid overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-lift transition-[border-color,transform] duration-500 ease-out-expo hover:border-accent-line md:grid-cols-2"
      >
        <Spotlight />

        <div
          className={clsx(
            "relative z-10 flex flex-col p-7 md:p-10",
            flipped && "md:order-2",
          )}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
              {project.timeframe ?? "Case study"}
            </span>
          </div>

          <h3 className="mt-8 text-balance font-display text-2xl font-semibold tracking-tight text-fg md:text-[2rem] md:leading-[1.1]">
            {project.title}
          </h3>
          <p className="mt-2 font-mono text-xs text-fg-subtle">{project.role}</p>

          <p className="mt-5 leading-relaxed text-fg-muted">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-3 pt-2 text-sm font-medium text-accent md:mt-auto">
            <span className="relative">
              Read case study
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
              />
            </span>
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full border border-accent-line transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-accent group-hover:text-accent-contrast"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </span>
        </div>

        <div className="relative z-10 p-2.5 md:p-3">
          <ProjectCover
            slug={project.slug}
            className="aspect-[400/260] size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.015] md:aspect-auto md:min-h-[22rem]"
          />
        </div>
      </Link>
    </article>
  );
}
