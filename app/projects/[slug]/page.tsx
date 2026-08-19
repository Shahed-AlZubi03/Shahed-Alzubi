import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/CaseStudy";
import { getAllProjects, getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getAllProjects().find((entry) => entry.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const projects = getAllProjects();
  const index = projects.findIndex((entry) => entry.slug === slug);

  if (index === -1) notFound();

  return (
    <CaseStudy project={projects[index]} next={projects[index + 1]} />
  );
}
