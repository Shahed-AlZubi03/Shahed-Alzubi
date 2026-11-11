import type { Metadata } from "next";

import { ContactLinks } from "@/components/contact/ContactLinks";
import { PageTransition } from "@/components/motion/PageTransition";
import AnimatedText from "@/components/ui/animated-text";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about freelance and collaborative work on AI-powered products.",
};

export default function ContactPage() {
  return (
    <PageTransition>
    <Section size="lg">
      <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
        <div>
          <p className="animate-rise font-mono text-xs uppercase tracking-widest text-accent">
            Contact
          </p>
          <AnimatedText
            as="h1"
            text="Let’s talk"
            className="mt-4 text-display text-fg"
            animationType="letters"
            duration={0.5}
            staggerDelay={0.045}
            initialY={14}
          />
          <p
            className="mt-6 max-w-reading animate-rise text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: "160ms" }}
          >
            Open to freelance and collaborative work — especially projects where
            AI has to be integrated into a real product, not just demoed. Email
            is the fastest way to reach me.
          </p>
        </div>

        <div
          className="animate-rise rounded-[1.5rem] border border-border bg-surface/90 p-6 shadow-lift backdrop-blur md:p-8"
          style={{ animationDelay: "240ms" }}
        >
          <ContactLinks />
        </div>
      </div>
    </Section>
    </PageTransition>
  );
}
