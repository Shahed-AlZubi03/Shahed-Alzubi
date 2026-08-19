/** Single source of truth for identity, nav, and outbound links. */

/** Split so the hero can accent the second half; `site.role` recomposes them. */
const roleLead = "Full-Stack Developer specializing in";
const roleHighlight = "AI-powered applications";

export const site = {
  name: "Shahed Al Zu’bi",
  shortName: "Shahed",
  roleLead,
  roleHighlight,
  /** Used as the <title> suffix and in structured data. */
  role: `${roleLead} ${roleHighlight}`,
  tagline:
    "I design and ship complete AI-powered products, handling everything from API design and data pipelines to integrating LLMs and multi-agent systems into production-ready products.",
  /** Set once the domain is live; used for canonical + OG URLs. */
  url: "https://shahed.vercel.app", // TODO(shahed): final Vercel/custom domain
  locale: "en",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Anchor links to homepage sections vs. real routes. */
  kind: "route" | "anchor";
};

export const navItems: readonly NavItem[] = [
  { label: "Home", href: "/", kind: "route" },
  { label: "Projects", href: "/projects", kind: "route" },
  { label: "About", href: "/about", kind: "route" },
  { label: "Contact", href: "/contact", kind: "route" },
] as const;

export type SocialLink = {
  label: string;
  href: string;
  /** Shown next to the link in the contact section. */
  handle: string;
};

export const socials: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Shahed-AlZubi03",
    handle: "Shahed-AlZubi03",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahedalzubi/",
    handle: "in/shahedalzubi",
  },
] as const;

export const contactEmail = "shahedmowaffaq91@gmail.com";
