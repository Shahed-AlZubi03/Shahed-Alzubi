type SectionHeadingProps = {
  /** Small mono label above the title. */
  eyebrow: string;
  title: string;
  /** Optional lead paragraph under the title. */
  children?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
        {eyebrow}
        <span aria-hidden="true" className="h-px w-8 bg-accent-line" />
      </p>
      <h2 className="mt-4 text-h2 text-fg">{title}</h2>
      {children ? (
        <p className="mt-4 max-w-reading text-fg-muted">{children}</p>
      ) : null}
    </div>
  );
}
