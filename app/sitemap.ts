import type { MetadataRoute } from "next";

import { getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/about", "/contact"].map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projects = getProjectSlugs().map((slug) => ({
    url: `${site.url}/projects/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projects];
}
