import { clsx } from "@/lib/clsx";

/** Small mono chip for tech names. Used on cards and in the stack table. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-xs text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
