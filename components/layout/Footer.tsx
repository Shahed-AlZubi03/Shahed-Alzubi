import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-fg">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-fg-muted">{site.role}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <Link
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-fg-muted transition-colors hover:text-accent"
              >
                {social.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
