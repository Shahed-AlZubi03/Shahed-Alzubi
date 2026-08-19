import fs from "node:fs";
import path from "node:path";

/** Loaders for the single-file content in /content. Server-only. */

export type SkillGroup = {
  group: string;
  items: string[];
};

function readJson<T>(...segments: string[]): T {
  const file = path.join(process.cwd(), "content", ...segments);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

export function getSkillGroups(): SkillGroup[] {
  return readJson<SkillGroup[]>("skills.json");
}

export function getBio(): string[] {
  return readJson<{ bio: string[] }>("about.json").bio;
}
