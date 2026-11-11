type SectionHeadingProps = {
  /** Small mono label above the title. */
  eyebrow: string;
  title: string;
  /** Section number, shown as a large faint numeral beside the eyebrow. */
  index?: number;
  /** Optional lead paragraph under the title. */
  children?: React.ReactNode;
  /** Use h1 on pages where this is the page title. */
  as?: "h1" | "h2";
};

/** Eyebrow + title + lead, revealed on scroll (see SCROLL REVEAL in globals.css). */
export function SectionHeading({
  eyebrow,
  title,
  index,
  children,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
          {index !== undefined ? (
            <span className="text-fg-subtle">
              {String(index).padStart(2, "0")} /
            </span>
          ) : null}
          {eyebrow}
          <span aria-hidden="true" className="h-px w-10 bg-accent-line" />
        </p>
        <Heading
          className={
            Heading === "h1"
              ? "mt-4 text-balance text-h1 text-fg"
              : "mt-4 text-balance text-h2 text-fg md:text-h1"
          }
        >
          {title}
        </Heading>
      </div>
      {children ? (
        <p className="max-w-sm leading-relaxed text-fg-muted md:pb-2">{children}</p>
      ) : null}
    </div>
  );
}
