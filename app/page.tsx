import Link from "next/link";

import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSkillGroups } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const skillGroups = getSkillGroups();

  return (
    <>
      <Hero />

      <Section id="projects">
        <ProjectCarousel
          projects={projects}
          heading={
            <SectionHeading eyebrow="Selected work" title="Case studies">
              Systems taken past the prototype stage — how they were
              architected, what I built, and what shipped.
            </SectionHeading>
          }
        />

        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
        >
          All projects <span aria-hidden="true">&rarr;</span>
        </Link>
      </Section>

      <Section id="skills">
        <SectionHeading eyebrow="Capabilities" title="What I work with">
          The stack behind the products above — frontend through to model
          deployment.
        </SectionHeading>

        <div className="mt-12">
          <Skills groups={skillGroups} />
        </div>
      </Section>

      <Section size="lg">
        <ContactCta />
      </Section>
    </>
  );
}
