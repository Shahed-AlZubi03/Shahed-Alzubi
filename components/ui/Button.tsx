import Link from "next/link";

import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary:
    "border border-border text-fg hover:border-border-strong hover:bg-surface",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens in a new tab with the usual rel hardening. */
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonLinkProps) {
  const classes = clsx(base, variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
