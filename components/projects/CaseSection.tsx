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

/** Body copy for a case section — one <p> per string. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-fg-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
