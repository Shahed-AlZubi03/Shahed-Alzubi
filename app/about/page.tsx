import type { Metadata } from "next";

import { Skills } from "@/components/home/Skills";
import { PageTransition } from "@/components/motion/PageTransition";
import AnimatedText from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBio, getSkillGroups } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.tagline,
};

export default function AboutPage() {
  const bio = getBio();
  const [lead, ...rest] = bio;

  return (
    <PageTransition>
      <Section size="lg">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="animate-rise font-mono text-xs uppercase tracking-widest text-accent">
              About
            </p>
            <AnimatedText
              as="h1"
              text={site.name}
              className="mt-4 text-h1 text-fg"
              animationType="letters"
              duration={0.5}
              staggerDelay={0.035}
              initialY={14}
            />
            <p
              className="mt-4 max-w-sm animate-rise text-balance font-display text-xl text-fg-muted"
              style={{ animationDelay: "120ms" }}
            >
              {site.role}
            </p>

            <div
              className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "200ms" }}
            >
              <ButtonLink href="/projects">View case studies</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <div
            className="animate-rise space-y-6"
            style={{ animationDelay: "160ms" }}
          >
            <p className="text-balance font-display text-2xl leading-snug tracking-tight text-fg md:text-[1.75rem]">
              {lead}
            </p>
            {rest.map((paragraph, index) => (
              <p
                key={index}
                className="reveal text-lg leading-relaxed text-fg-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Capabilities" title="What I work with" />
        <div className="mt-14">
          <Skills groups={getSkillGroups()} />
        </div>
      </Section>
    </PageTransition>
  );
}
