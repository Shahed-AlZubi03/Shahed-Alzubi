import { MagicText } from "@/components/ui/magic-text";

/** One labelled block of a case study. Label sits above a hairline rule. */
export function CaseSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
        {label}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/**
 * Body copy for a case section — one paragraph per string, each revealed
 * word-by-word as it scrolls into the reading band. `MagicText` renders the
 * `<p>`; without JS or under reduced motion it degrades to exactly the plain
 * paragraph this used to be.
 */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <MagicText
          key={index}
          text={paragraph}
          className="leading-relaxed text-fg-muted"
        />
      ))}
    </div>
  );
}
