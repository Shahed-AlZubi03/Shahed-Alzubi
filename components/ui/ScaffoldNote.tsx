/**
 * Temporary marker for routes that exist but aren't built yet.
 * Delete each instance as its phase lands.
 */
export function ScaffoldNote({
  phase,
  children,
}: {
  phase: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-dashed border-border-strong bg-surface/40 p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {phase}
      </p>
      <p className="mt-2 text-sm text-fg-muted">{children}</p>
    </div>
  );
}
