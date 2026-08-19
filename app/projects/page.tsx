import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Deep case studies — the problem, the architecture, what I built, and what shipped.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Section size="lg">
      <SectionHeading eyebrow="Projects" title="Case studies">
        The problem, the architecture, what I actually built, and what came out
        of it.
      </SectionHeading>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
