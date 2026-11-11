import Link from "next/link";

import { CaseSection, Prose } from "@/components/projects/CaseSection";
import { CaseToc, type TocItem } from "@/components/projects/CaseToc";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { StackMarquee } from "@/components/projects/StackMarquee";
import { Spotlight } from "@/components/motion/Spotlight";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/projects";

const sections: TocItem[] = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach & Architecture" },
  { id: "role", label: "My Role" },
  { id: "stack", label: "Tech Stack" },
  { id: "outcome", label: "Outcome" },
  { id: "learnings", label: "Learnings" },
];

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

  const meta = [
    { label: "Role", value: project.role },
    project.timeframe ? { label: "When", value: project.timeframe } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  const label = (id: string) =>
    sections.find((section) => section.id === id)?.label ?? id;
  const number = (id: string) =>
    sections.findIndex((section) => section.id === id) + 1;

  return (
    <>
      <Container className="pt-10 md:pt-14">
        <Link
          href="/projects"
          className="group inline-flex animate-rise items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
            &larr;
          </span>
          All projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div className="animate-rise" style={{ animationDelay: "60ms" }}>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Case study
            </p>
            <h1 className="mt-4 text-balance text-h1 text-fg md:text-display">
              {project.title}
            </h1>
          </div>
          <div className="animate-rise" style={{ animationDelay: "140ms" }}>
            <p className="text-lg leading-relaxed text-fg-muted">
              {project.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl
          className="mt-10 grid animate-rise grid-cols-2 gap-6 border-t border-border pt-5 sm:flex sm:flex-wrap sm:gap-x-12"
          style={{ animationDelay: "200ms" }}
        >
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm text-fg">{item.value}</dd>
            </div>
          ))}
          {links.length > 0 || project.linksNote ? (
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
                Links
              </dt>
              {links.length > 0 ? (
                <dd className="mt-1.5 flex gap-4 text-sm">
                  {links.map(([key, href]) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-accent underline decoration-accent-line underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
                    >
                      {linkLabels[key] ?? key}
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

        {/* Morph target for the card cover (see ProjectCover). */}
        <ProjectCover
          slug={project.slug}
          className="mt-10 aspect-[4/3] w-full shadow-lift sm:aspect-[16/8] lg:aspect-[16/7]"
        />
      </Container>

      <Container className="pb-section-lg pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <CaseToc items={sections} />
          </aside>

          <div className="flex max-w-reading flex-col gap-14">
            <CaseSection id="problem" index={number("problem")} label={label("problem")}>
              <Prose paragraphs={project.problem} />
            </CaseSection>

            <CaseSection id="approach" index={number("approach")} label={label("approach")}>
              {/* A timeline whose spine draws itself as the section scrolls
                  through (`draw-y`, SCROLL REVEAL in globals.css). */}
              <ol className="draw-scope relative flex flex-col gap-10 pl-9">
                <span aria-hidden="true" className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-border" />
                <span aria-hidden="true" className="draw-y absolute bottom-2 left-[0.6875rem] top-2 w-px bg-accent" />
                {project.approach.map((block, index) => (
                  <li key={block.heading} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-9 top-0.5 grid size-6 place-items-center rounded-full border border-accent-line bg-bg font-mono text-[0.6rem] text-accent"
                    >
                      {index + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-fg">
                      {block.heading}
                    </h3>
                    <div className="mt-3">
                      <Prose paragraphs={block.body} />
                    </div>
                  </li>
                ))}
              </ol>
            </CaseSection>

            <CaseSection id="role" index={number("role")} label={label("role")}>
              <Prose paragraphs={project.contribution} />
            </CaseSection>

            <CaseSection id="stack" index={number("stack")} label={label("stack")}>
              <StackMarquee groups={project.stack} />
            </CaseSection>

            <CaseSection id="outcome" index={number("outcome")} label={label("outcome")}>
              <Prose paragraphs={project.outcome} />
            </CaseSection>

            <CaseSection id="learnings" index={number("learnings")} label={label("learnings")}>
              <Prose paragraphs={project.learnings} />
            </CaseSection>
          </div>
        </div>

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group relative mt-20 grid overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-lift transition-colors duration-500 hover:border-accent-line md:grid-cols-[1fr_minmax(0,22rem)]"
          >
            <Spotlight />
            <span className="relative z-10 flex flex-col justify-center p-7 md:p-10">
              <span className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
                Next case study
              </span>
              <span className="mt-3 block text-balance font-display text-2xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent md:text-h2">
                {next.title}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                Continue
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </span>
            <span className="relative z-10 block p-2.5 md:p-3">
              <ProjectCover slug={next.slug} className="aspect-[400/260] size-full" />
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
