import { AgentPipeline } from "@/components/motion/AgentPipeline";
import AnimatedText from "@/components/ui/animated-text";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

type HeroProps = {
  /** Derived from /content so the numbers can never drift from the site. */
  stats: { value: string; label: string }[];
};

/**
 * Split hero: the pitch on the left, a live system diagram on the right that
 * shows the pitch — one request moving through UI, API, agent, retrieval and
 * model. Text enters on load (per-letter for the name, a staggered rise for
 * the rest); the diagram rises last so it doesn't compete with the name.
 */
export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 -z-10" />

      <Container className="grid items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-24">
        <div>
          <p
            className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-2.5 pr-3.5 font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted backdrop-blur"
          >
            <span className="size-2 animate-pulse-dot rounded-full bg-accent" />
            Open to freelance work
          </p>

          {/* The per-letter stagger IS this line's entrance — no animate-rise
              on top of it. `initialY` matches the 14px `rise` keyframe. */}
          <AnimatedText
            as="h1"
            text={site.name}
            className="mt-6 text-display text-fg"
            animationType="letters"
            duration={0.5}
            staggerDelay={0.04}
            initialY={14}
          />

          <p
            className="mt-5 max-w-2xl animate-rise text-balance font-display text-h2 text-fg-muted"
            style={{ animationDelay: "80ms" }}
          >
            {site.roleLead}{" "}
            <span className="relative whitespace-nowrap text-accent">
              {site.roleHighlight}
              <Underline />
            </span>
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
              View case studies
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>

          <dl
            className="mt-12 grid max-w-md animate-rise grid-cols-3 gap-6 border-t border-border pt-6"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold tracking-tight text-fg">
                    {stat.value}
                  </span>
                  <span aria-hidden="true" className="mt-1 block font-mono text-[0.7rem] uppercase tracking-widest text-fg-subtle">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise lg:pl-4" style={{ animationDelay: "380ms" }}>
          <div className="mg-float">
            <AgentPipeline />
          </div>
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}

/** Hand-drawn stroke under the accented phrase; draws in once on load. */
function Underline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className="absolute -bottom-1.5 left-0 h-2.5 w-full overflow-visible"
      fill="none"
    >
      <path
        d="M2 8 C 60 2, 140 2, 200 6 S 280 9, 298 4"
        pathLength={100}
        className="stroke-accent/45"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: 100,
          animation: "underline-draw 1.1s var(--ease-out-expo) 0.9s forwards",
        }}
      />
    </svg>
  );
}

function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-fg-subtle">
        Scroll
      </span>
      <span className="relative h-10 w-px overflow-hidden bg-border">
        <span
          className="absolute inset-x-0 top-0 h-1/2 bg-accent"
          style={{ animation: "cue 1.8s var(--ease-out-expo) infinite" }}
        />
      </span>
    </div>
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
      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
