import Link from "next/link";

import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/projects";

/**
 * Full-width rather than a grid cell — with a small number of deep case
 * studies, wide cards read as substantial where a sparse 2-up grid reads as
 * unfinished.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-card border border-border bg-surface/90 p-6 transition-colors duration-300 hover:border-accent-line hover:bg-surface md:p-8"
      >
        {/* Stacks on mobile — side by side the rule collapses and the role
            wraps against the index. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="font-mono text-xs text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-border sm:block"
          />
          <span className="font-mono text-xs text-fg-subtle">
            {project.role}
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent md:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 max-w-reading leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Read case study
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
