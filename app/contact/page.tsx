import type { Metadata } from "next";

import { ContactLinks } from "@/components/contact/ContactLinks";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about freelance and collaborative work on AI-powered products.",
};

export default function ContactPage() {
  return (
    <Section size="lg">
      <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Contact
          </p>
          <h1 className="mt-4 text-balance text-h1 text-fg">
            Let&apos;s talk
          </h1>
          <p className="mt-5 max-w-reading text-lg leading-relaxed text-fg-muted">
            Open to freelance and collaborative work — especially projects where
            AI has to be integrated into a real product, not just demoed. Email
            is the fastest way to reach me.
          </p>
        </div>

        <div className="rounded-card border border-border bg-surface/90 p-6 md:p-8">
          <ContactLinks />
        </div>
      </div>
    </Section>
  );
}
