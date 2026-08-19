"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { clsx } from "@/lib/clsx";
import { navItems, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile panel whenever the route changes, including on browser
  // back/forward. Adjusting during render rather than in an effect avoids a
  // second paint with the panel still open.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // The bar is transparent over the hero and only gains a background once the
  // page scrolls under it.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-[0.95rem] font-semibold tracking-tight text-fg"
        >
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-1 h-px bg-accent"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="size-4"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="animate-rise border-t border-border bg-bg md:hidden"
          style={{ animationDuration: "220ms" }}
        >
          <Container className="py-2">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 border-b border-border/60 py-3.5 text-sm last:border-b-0",
                        active ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "h-4 w-px",
                          active ? "bg-accent" : "bg-transparent",
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}

function isActive(pathname: string, href: string): boolean {
  // Anchor links never own the active state — they point at homepage sections.
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
