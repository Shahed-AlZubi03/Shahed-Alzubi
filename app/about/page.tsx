import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getBio } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.tagline,
};

export default function AboutPage() {
  const bio = getBio();
  const [lead, ...rest] = bio;

  return (
    <Section width="prose" size="lg">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        About
      </p>
      <h1 className="mt-4 text-h1 text-fg">{site.name}</h1>

      <div className="mt-8 space-y-5">
        <p className="text-lg leading-relaxed text-fg-muted">{lead}</p>
        {rest.map((paragraph, index) => (
          <p key={index} className="leading-relaxed text-fg-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row">
        <ButtonLink href="/projects">View case studies</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Get in touch
        </ButtonLink>
      </div>
    </Section>
  );
}
