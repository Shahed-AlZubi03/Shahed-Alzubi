import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { navItems, site, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-bg-subtle/60 pt-14 backdrop-blur-sm">
      <Container>
        <div className="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold text-fg">
              {site.name}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.role}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
              Pages
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    {social.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-border py-5 font-mono text-[0.7rem] text-fg-subtle">
          <span>
            &copy; {new Date().getFullYear()} {site.name}
          </span>
          <a href="#main" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
            Back to top <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </Container>

      {/* Oversized wordmark bleeding off the bottom edge. */}
      <p
        aria-hidden="true"
        className="rise-in pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center font-display text-[clamp(4rem,17vw,15rem)] font-semibold leading-none tracking-[-0.05em] text-fg/[0.07]"
      >
        {site.shortName}.
      </p>
    </footer>
  );
}
