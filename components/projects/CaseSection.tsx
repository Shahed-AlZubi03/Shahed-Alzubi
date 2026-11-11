import { MagicText } from "@/components/ui/magic-text";

/** One labelled, numbered block of a case study. Label sits above a hairline. */
export function CaseSection({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border pt-8">
      <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
        <span className="text-fg-subtle">{String(index).padStart(2, "0")}</span>
        {label}
      </h2>
      <div className="mt-6">{children}</div>
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
