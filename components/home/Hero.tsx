import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

/**
 * Left-aligned and asymmetric on purpose — a centred hero is the templated
 * default. Motion is a single staggered fade-up on load, nothing on scroll.
 *
 * The ambient mesh gradient behind this lives at the page level (app/page.tsx)
 * so it spans the whole home page rather than stopping at the hero's edge.
 */
export function Hero() {
  return (
    <section>
      <Container className="pb-section pt-16 md:pt-24">
        <p
          className="inline-flex animate-rise items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-fg-muted"
          style={{ animationDelay: "0ms" }}
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-glow opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-glow" />
          </span>
          Available for freelance work
        </p>

        <h1
          className="mt-8 animate-rise text-display text-fg"
          style={{ animationDelay: "80ms" }}
        >
          {site.name}
        </h1>

        <p
          className="mt-5 max-w-3xl animate-rise text-balance font-display text-h2 text-fg-muted"
          style={{ animationDelay: "160ms" }}
        >
          {site.roleLead}{" "}
          <span className="text-accent">{site.roleHighlight}</span>
        </p>

        <p
          className="mt-7 max-w-reading animate-rise text-base leading-relaxed text-fg-muted md:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          {site.tagline}
        </p>

        <div
          className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "320ms" }}
        >
          <ButtonLink href="/projects">
            View projects
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
