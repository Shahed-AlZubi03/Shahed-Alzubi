import Link from "next/link";

import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { StackTicker } from "@/components/home/StackTicker";
import { PageTransition } from "@/components/motion/PageTransition";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSkillGroups } from "@/lib/content";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";

/** Terms long enough to wreck the ticker's rhythm stay in the bento only. */
const TICKER_MAX_CHARS = 18;

export default function HomePage() {
  const projects = getFeaturedProjects();
  const allProjects = getAllProjects();
  const skillGroups = getSkillGroups();

  const technologyCount = skillGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const stats = [
    { value: String(allProjects.length).padStart(2, "0"), label: "Case studies" },
    {
      value: String(
        allProjects.filter((project) => /solo/i.test(project.role)).length,
      ).padStart(2, "0"),
      label: "Solo builds",
    },
    { value: `${technologyCount}+`, label: "Technologies" },
  ];

  const short = (items: string[]) =>
    items.filter((item) => item.length <= TICKER_MAX_CHARS);
  const ai = skillGroups.find((group) => group.group === "AI / ML");
  const rest = skillGroups.filter((group) => group !== ai);
  const tickerRows: [string[], string[]] = [
    short(ai?.items ?? []),
    short(rest.flatMap((group) => group.items)),
  ];

  return (
    <PageTransition>
      <Hero stats={stats} />

      <StackTicker rows={tickerRows} />

      <Section id="projects" size="lg">
        <SectionHeading index={1} eyebrow="Selected work" title="Case studies">
          Systems taken past the prototype stage — how they were architected,
          what I built, and what shipped.
        </SectionHeading>

        <div className="mt-14 flex flex-col gap-8 md:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Link
          href="/projects"
          className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-accent"
        >
          All projects
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </Section>

      <Section id="skills">
        <SectionHeading index={2} eyebrow="Capabilities" title="What I work with">
          The stack behind the products above — frontend through to model
          deployment.
        </SectionHeading>

        <div className="mt-14">
          <Skills groups={skillGroups} />
        </div>
      </Section>

      <Section size="lg">
        <ContactCta />
      </Section>
    </PageTransition>
  );
}
