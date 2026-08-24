import AnimatedText from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

/**
 * Left-aligned and asymmetric on purpose — a centred hero is the templated
 * default. Motion is a single staggered fade-up on load, nothing on scroll —
 * CSS for the block-level lines, Motion per letter for the name.
 *
 * The ambient mesh gradient behind this lives at the page level (app/page.tsx)
 * so it spans the whole home page rather than stopping at the hero's edge.
 */
export function Hero() {
  return (
    <section>
      <Container className="pb-section pt-16 md:pt-24">
        {/* Not `animate-rise` — the per-letter stagger IS this line's
            entrance, and running both would fade the block up while its
            letters were still arriving. `initialY` matches the 14px in the
            `rise` keyframe so the name lifts the same distance as everything
            under it, and the last letter lands at ~0.98s, just as the
            240ms-delayed buttons finish their own 0.7s rise. */}
        <AnimatedText
          as="h1"
          text={site.name}
          className="text-display text-fg"
          animationType="letters"
          duration={0.5}
          staggerDelay={0.04}
          initialY={14}
        />

        <p
          className="mt-5 max-w-3xl animate-rise text-balance font-display text-h2 text-fg-muted"
          style={{ animationDelay: "80ms" }}
        >
          {site.roleLead}{" "}
          <span className="text-accent">{site.roleHighlight}</span>
        </p>

        <p
          className="mt-7 max-w-reading animate-rise text-base leading-relaxed text-fg-muted md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {site.tagline}
        </p>

        <div
          className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
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
