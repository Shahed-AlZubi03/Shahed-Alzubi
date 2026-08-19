import Link from "next/link";

import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section width="prose" size="lg">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-3 text-h1">Page not found</h1>
      <p className="mt-4 text-fg-muted">
        That route doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-accent hover:text-accent-hover"
      >
        Back home &rarr;
      </Link>
    </Section>
  );
}
