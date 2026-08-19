import { contactEmail, socials } from "@/lib/site";

type ContactRow = {
  label: string;
  value: string;
  href: string;
  external: boolean;
};

const rows: readonly ContactRow[] = [
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    external: false,
  },
  ...socials.map((social) => ({
    label: social.label,
    value: social.handle,
    href: social.href,
    external: true,
  })),
];

/** Email, GitHub and LinkedIn share one row structure: label, value, arrow. */
export function ContactLinks() {
  return (
    <ul className="flex flex-col border-t border-border">
      {rows.map((row) => (
        <li key={row.label}>
          <a
            href={row.href}
            {...(row.external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="group flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:text-accent"
          >
            <span className="shrink-0 text-sm text-fg">{row.label}</span>
            <span className="flex min-w-0 items-center gap-3">
              <span className="truncate font-mono text-xs text-fg-subtle transition-colors group-hover:text-fg-muted">
                {row.value}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-fg-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              >
                &rarr;
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
