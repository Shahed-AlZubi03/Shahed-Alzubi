@AGENTS.md

# Portfolio — Shahed Al Zu'bi

Personal portfolio site to launch a freelancing career. Not a blog, not a
resume dump — a small set of deep case studies that prove I ship complete
products.

## Positioning

**Full-Stack Developer specializing in AI-powered applications.**

I build complete products (frontend, backend, APIs) with LLM/agent integrations
at the core — not just prototypes. Background: Data Science & AI graduate,
currently an AI Engineer on the 9XAI fellowship, with a backend foundation in
FastAPI, REST APIs, Node.js, and Python.

Audience: prospective freelance clients and collaborators. Every page should
answer "can this person build and ship the thing I need?"

## Stack

- Next.js 16 (App Router) + TypeScript, React 19
- Tailwind CSS v4 — **CSS-first config, no `tailwind.config.ts`**. All design
  tokens live in `app/globals.css`.
- Content: local JSON in `/content` — no CMS, no database
- Deploy: Vercel (free subdomain first, custom domain later)
- Framer Motion is **optional** and not installed. Only add it if animation
  stays subtle and doesn't cost measurable performance.

## Design direction

Professional, modern, dark-first, minimal. Should read as dev-built, not as a
Wix/Squarespace template. Avoid stock shadcn layouts used without
customization.

Palette: warm cream ground with a plum accent.

- **Single theme.** There is no dark mode and no theme toggle — one palette on
  `:root` in `app/globals.css`. Keep using the semantic utilities anyway; they
  are what makes a palette change a one-file edit.
- Type: Space Grotesk (headings, `font-display`), Inter (body, `font-sans`),
  JetBrains Mono (tags, labels, code, `font-mono`).
- Motion: fade/slide-in on load only. No gimmicks. Respect
  `prefers-reduced-motion`.

## Structure

```
app/          routes: / , /projects , /projects/[slug] , /about , /contact
components/
  layout/     Navbar, Footer
  ui/         Container, Section, ScaffoldNote
content/
  projects/   one JSON per case study; filename === slug
lib/
  site.ts     name, nav, socials, contact email
  projects.ts Project type + fs loader
  clsx.ts     class joiner
```

## Conventions

- Semantic color utilities only — `bg-bg`, `text-fg-muted`, `border-border`,
  `text-accent`. Never hardcode a hex or use raw Tailwind palette colors
  (`slate-800`, `blue-500`); the tokens are the only place colour is decided.
- Layout width: `<Container>` (`max-w-content`) for page shells,
  `width="prose"` (`max-w-reading`) for long-form copy.
- Vertical rhythm: `<Section>` — `py-section`, or `size="lg"` for
  `py-section-lg`.
- Server Components by default. `"use client"` only where there's real
  interactivity (Navbar menu).
- Case-study copy is edited in `content/projects/*.json`, never in components.

## Working agreement

- Work phase by phase. Confirm each phase before starting the next.
- **Ask for real content** — project write-ups, bio, links. Do not invent
  placeholder copy that survives into the shipped site. Placeholders must be
  marked `TODO(shahed)` or wrapped in `<ScaffoldNote>` so they're impossible to
  miss.
- Open `TODO(shahed)` items: socials + contact email in `lib/site.ts`,
  `site.url`, and every `TODO(phase-3)` in `content/projects/*.json`.

## Phases

1. ✅ Scaffold, tokens, layout, routing
2. Hero + navigation
3. Projects grid + `/projects/[slug]` case-study template
4. Skills, Content section, About
5. Contact, SEO, favicon, responsiveness, Lighthouse
6. Vercel deploy
