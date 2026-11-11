import { MotionStage } from "@/components/motion/MotionStage";
import { ButtonLink } from "@/components/ui/Button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { contactEmail } from "@/lib/site";

/**
 * Closing call to action: an ink panel with a slow orbital graphic, so the
 * page ends on the same "screen" surface the hero opened with.
 */
export function ContactCta() {
  return (
    <div className="reveal relative isolate overflow-hidden rounded-[1.75rem] border border-ink-line bg-ink p-8 text-ink-fg shadow-lift md:p-14">
      <MotionStage className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[30rem] opacity-80 md:-right-10 md:-top-16">
        <Orbits />
      </MotionStage>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_85%_10%,color-mix(in_oklab,var(--ink-accent)_22%,transparent),transparent_55%)]" />

      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-ink-accent">
        <span className="size-2 rounded-full bg-signal mg-node" style={{ "--dur": "2s" } as React.CSSProperties} />
        Taking on new work
      </p>
      <h2 className="mt-6 max-w-2xl text-balance text-h1 text-ink-fg">
        Have a product that needs AI built into it properly?
      </h2>
      <p className="mt-5 max-w-reading leading-relaxed text-ink-muted md:text-lg">
        I take on freelance and collaborative work — the kind where the model is
        one part of a system that has to hold up in production.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <LiquidMetalButton href={`mailto:${contactEmail}`} external>
          Email me
        </LiquidMetalButton>
        <ButtonLink href="/contact" variant="ink">
          All contact details
        </ButtonLink>
      </div>
    </div>
  );
}

function Orbits() {
  const v = (d: string) => ({ "--dur": d }) as React.CSSProperties;
  return (
    <svg aria-hidden="true" viewBox="0 0 400 400" className="size-full" fill="none">
      <circle cx="200" cy="200" r="70" className="stroke-ink-line" />
      <circle cx="200" cy="200" r="120" className="mg-spin stroke-ink-line" strokeDasharray="2 8" style={v("60s")} />
      <circle cx="200" cy="200" r="170" className="stroke-ink-line" />
      <g className="mg-spin" style={v("16s")}>
        <circle cx="200" cy="200" r="120" className="stroke-transparent" />
        <circle cx="320" cy="200" r="5" className="fill-ink-accent" />
      </g>
      <g className="mg-spin" style={v("28s")}>
        <circle cx="200" cy="200" r="170" className="stroke-transparent" />
        <circle cx="200" cy="30" r="4" className="fill-signal" />
      </g>
      <g className="mg-spin" style={v("10s")}>
        <circle cx="200" cy="200" r="70" className="stroke-transparent" />
        <circle cx="130" cy="200" r="3" className="fill-ink-fg" />
      </g>
      <circle cx="200" cy="200" r="10" className="fill-ink-accent" />
      <circle cx="200" cy="200" r="10" className="mg-ring stroke-ink-accent" />
    </svg>
  );
}
