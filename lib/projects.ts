import fs from "node:fs";
import path from "node:path";

/**
 * Case-study content lives as JSON in /content/projects/*.json so copy can be
 * edited without touching components. Server-only — reads from disk at build.
 */

export type ProjectLinks = {
  repo?: string;
  demo?: string;
  writeup?: string;
};

/** A titled block of body copy in the Approach / Architecture section. */
export type ApproachBlock = {
  heading: string;
  body: string[];
};

export type StackGroup = {
  group: string;
  items: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One line, used on the homepage card. */
  summary: string;
  /** e.g. "Solo build" / "Frontend lead" — shown on the card and case study. */
  role: string;
  timeframe?: string;
  /** Short tags on the card. Keep to ~5. */
  tags: string[];
  featured: boolean;
  /** Ascending; controls card order. */
  order: number;
  /** Written but not ready — hidden from every route, including its own. */
  draft?: boolean;
  links?: ProjectLinks;
  /** Shown in place of links when there's nothing public to link to. */
  linksNote?: string;

  /* ---- Case-study sections ---- */
  problem: string[];
  approach: ApproachBlock[];
  contribution: string[];
  stack: StackGroup[];
  outcome: string[];
  learnings: string[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function readProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const project = JSON.parse(raw) as Project;
      // Filename is the source of truth for the slug, so the two can't drift.
      return { ...project, slug: file.replace(/\.json$/, "") };
    })
    .filter((project) => !project.draft)
    .sort((a, b) => a.order - b.order);
}

export function getAllProjects(): Project[] {
  return readProjects();
}

export function getFeaturedProjects(): Project[] {
  return readProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return readProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return readProjects().map((project) => project.slug);
}
