import Link from "next/link";

import { CaseSection, Prose } from "@/components/projects/CaseSection";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/projects";

export function CaseStudy({
  project,
  next,
}: {
  project: Project;
  /** The following case study, for the footer hand-off. */
  next?: Project;
}) {
  const links = Object.entries(project.links ?? {}).filter(
    ([, href]) => Boolean(href),
  ) as [string, string][];

  return (
    <>
      <Container width="prose" className="pb-16 pt-12 md:pt-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">&larr;</span> All projects
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">
          Case study
        </p>
        <h1 className="mt-4 text-h1 text-fg">{project.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-5">
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-fg-muted">
              Role
            </dt>
            <dd className="mt-1.5 text-sm text-fg">{project.role}</dd>
          </div>
          {project.timeframe ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                When
              </dt>
              <dd className="mt-1.5 text-sm text-fg">{project.timeframe}</dd>
            </div>
          ) : null}
          {links.length > 0 || project.linksNote ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                Links
              </dt>
              {links.length > 0 ? (
                <dd className="mt-1.5 flex gap-4 text-sm">
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-accent transition-colors hover:text-accent-hover"
                    >
                      {linkLabels[label] ?? label}
                    </a>
                  ))}
                </dd>
              ) : (
                <dd className="mt-1.5 text-sm text-fg-muted">
                  {project.linksNote}
                </dd>
              )}
            </div>
          ) : null}
        </dl>
      </Container>

      <Container width="prose" className="pb-section-lg">
        <div className="flex flex-col gap-12">
          <CaseSection label="Problem">
            <Prose paragraphs={project.problem} />
          </CaseSection>

          <CaseSection label="Approach & Architecture">
            <div className="flex flex-col gap-8">
              {project.approach.map((block) => (
                <div key={block.heading}>
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {block.heading}
                  </h3>
                  <div className="mt-3">
                    <Prose paragraphs={block.body} />
                  </div>
                </div>
              ))}
            </div>
          </CaseSection>

          <CaseSection label="My Role">
            <Prose paragraphs={project.contribution} />
          </CaseSection>

          <CaseSection label="Tech Stack">
            <dl className="flex flex-col gap-5">
              {project.stack.map((group) => (
                <div
                  key={group.group}
                  className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6"
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
          </CaseSection>

          <CaseSection label="Outcome">
            <Prose paragraphs={project.outcome} />
          </CaseSection>

          <CaseSection label="Learnings">
            <Prose paragraphs={project.learnings} />
          </CaseSection>
        </div>

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-16 flex items-center justify-between gap-6 rounded-card border border-border bg-surface/90 p-6 transition-colors hover:border-accent-line hover:bg-surface"
          >
            <span>
              <span className="font-mono text-xs uppercase tracking-widest text-fg-muted">
                Next case study
              </span>
              <span className="mt-2 block font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        ) : null}
      </Container>
    </>
  );
}

const linkLabels: Record<string, string> = {
  repo: "Repository",
  demo: "Live demo",
  writeup: "Write-up",
};
