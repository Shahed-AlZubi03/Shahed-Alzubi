import { ViewTransition } from "react";

import { MotionStage } from "@/components/motion/MotionStage";
import { clsx } from "@/lib/clsx";

/**
 * Animated cover art for a case study. There are no product screenshots to
 * show (most of these repos are private), so each project gets a small motion
 * graphic of its own core mechanism instead — drawn in SVG, animated in CSS
 * (MOTION GRAPHICS in globals.css), paused off-screen by <MotionStage>.
 *
 * The same cover renders on the card and in the case-study hero under one
 * view-transition name, so opening a project morphs the card's cover into the
 * page instead of cutting to it.
 *
 * A project without a bespoke graphic gets the generic one, so adding a JSON
 * file to /content/projects never breaks the grid.
 */
export function ProjectCover({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Graphic = covers[slug] ?? GenericCover;

  return (
    <ViewTransition name={`cover-${slug}`} share="morph" default="none">
      <MotionStage
        className={clsx(
          "relative overflow-hidden rounded-[1rem] border border-ink-line bg-ink",
          className,
        )}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--ink-accent)_16%,transparent),transparent_60%)]" />
        <svg
          viewBox="0 0 400 260"
          preserveAspectRatio="xMidYMid meet"
          className="relative block size-full"
          fill="none"
          aria-hidden="true"
        >
          <Graphic />
        </svg>
      </MotionStage>
    </ViewTransition>
  );
}

type Vars = React.CSSProperties & Record<`--${string}`, string>;
const v = (vars: Record<string, string>) => vars as Vars;

/* ------------------------------------------------------------------
   Smart Traffic Management — an intersection seen from above. Cars
   flow on both axes; an ambulance carries a YOLO-style detection box
   and a siren ring (the audio model hears it before the camera sees
   it), and the signal holds green for it.
   ------------------------------------------------------------------ */
function TrafficCover() {
  return (
    <>
      {/* Roads */}
      <rect x="0" y="104" width="400" height="56" className="fill-ink-raised" />
      <rect x="236" y="0" width="56" height="260" className="fill-ink-raised" />
      <path d="M0 132 H236 M292 132 H400" className="stroke-ink-line" strokeDasharray="10 10" strokeWidth="1.5" />
      <path d="M264 0 V104 M264 160 V260" className="stroke-ink-line" strokeDasharray="10 10" strokeWidth="1.5" />
      {/* Stop lines */}
      <path d="M232 106 V158 M238 102 H290" className="stroke-ink-muted" strokeWidth="2" opacity="0.4" />

      {/* Cross traffic */}
      <g className="mg-drive-y" style={v({ "--dur": "6.5s", "--d": "-2s" })}>
        <rect x="270" y="0" width="14" height="24" rx="4" className="fill-ink-muted" />
      </g>
      <g className="mg-drive-y" style={v({ "--dur": "6.5s", "--d": "-5.2s" })}>
        <rect x="270" y="0" width="14" height="24" rx="4" className="fill-ink-muted" opacity="0.6" />
      </g>
      <g className="mg-drive-x" style={v({ "--dur": "8s", "--d": "-6s" })}>
        <rect x="0" y="138" width="26" height="14" rx="4" className="fill-ink-muted" opacity="0.7" />
      </g>

      {/* The ambulance — detection box, label and siren travel with it. */}
      <g className="mg-drive-x" style={v({ "--dur": "7s" })}>
        <circle cx="16" cy="118" r="10" className="mg-ring stroke-signal" strokeWidth="1.5" />
        <circle cx="16" cy="118" r="10" className="mg-ring stroke-signal" strokeWidth="1.5" style={v({ "--d": "1.2s" })} />
        <rect x="0" y="111" width="32" height="15" rx="4" className="fill-ink-fg" />
        <rect x="12" y="113" width="8" height="2.5" rx="1" className="fill-signal" />
        <rect x="-6" y="104" width="44" height="28" rx="3" className="stroke-ink-accent" strokeWidth="1.25" strokeDasharray="4 3" />
        <rect x="-6" y="91" width="76" height="12" rx="2" className="fill-ink-accent" />
        <text x="-2" y="100" className="fill-ink font-mono" fontSize="8" fontWeight="600">
          ambulance 0.94
        </text>
      </g>

      {/* Signal head, held green on the ambulance's axis. */}
      <g transform="translate(300 62)">
        <rect width="16" height="38" rx="5" className="fill-ink stroke-ink-line" />
        <circle cx="8" cy="9" r="4" className="fill-ink-line" />
        <circle cx="8" cy="19" r="4" className="fill-ink-line" />
        <circle cx="8" cy="29" r="4" className="mg-lamp fill-ink-accent" />
      </g>

      {/* Audio meter — "hearing before seeing". */}
      <g transform="translate(22 26)">
        <rect width="132" height="52" rx="8" className="fill-ink stroke-ink-line" />
        <text x="10" y="17" className="fill-ink-muted font-mono" fontSize="8.5">
          yamnet · siren
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <rect
            key={i}
            x={10 + i * 9.5}
            y="24"
            width="5"
            height="20"
            rx="1.5"
            className="mg-bar fill-signal"
            style={v({ "--d": `${-((i * 0.37) % 1.1)}s` })}
          />
        ))}
      </g>

      {/* Camera frustum */}
      <g transform="translate(340 196)">
        <path d="M0 0 L-60 -40 M0 0 L-24 -58" className="stroke-ink-line" strokeDasharray="3 4" />
        <rect x="-6" y="-5" width="22" height="12" rx="3" className="fill-ink-raised stroke-ink-line" />
        <circle cx="-4" cy="1" r="2" className="mg-lamp fill-ink-accent" style={v({ "--d": "-3s" })} />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------
   National Policy Intelligence — documents feed an orchestrator that
   fans out to specialist agents; a cited answer with a confidence
   score comes out the other side.
   ------------------------------------------------------------------ */
function PolicyCover() {
  const agents = [
    { y: 52, label: "retrieve" },
    { y: 118, label: "analyse" },
    { y: 184, label: "verify" },
  ];

  return (
    <g style={v({ "--dur": "6s" })}>
      {/* Document stack */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${26 + i * 6} ${70 + i * 8})`}>
          <rect width="64" height="84" rx="6" className="fill-ink-raised stroke-ink-line" />
          {[0, 1, 2, 3, 4, 5].map((l) => (
            <rect key={l} x={i === 2 ? 14 : 10} y={14 + l * 10} width={l % 3 === 2 ? 26 : 40} height="3" rx="1.5" className="fill-ink-line" />
          ))}
        </g>
      ))}
      <text x="34" y="186" className="fill-ink-muted font-mono" fontSize="8.5">
        ar · legal corpus
      </text>

      {/* Orchestrator hub */}
      <path d="M102 130 H150" className="stroke-ink-line" strokeDasharray="2 4" />
      <path d="M102 130 H150" pathLength={100} className="mg-flow stroke-ink-accent" strokeWidth="2.5" strokeLinecap="round" style={v({ "--d": "0s" })} />
      <circle cx="172" cy="130" r="22" className="fill-ink-raised stroke-ink-line" />
      <circle cx="172" cy="130" r="22" className="mg-node stroke-ink-accent" strokeWidth="1.5" style={v({ "--d": "0.7s" })} />
      <circle cx="172" cy="130" r="34" className="mg-spin stroke-ink-line" strokeDasharray="2 6" style={v({ "--dur": "16s" })} />
      <text x="172" y="133" textAnchor="middle" className="fill-ink-fg font-mono" fontSize="8.5">
        router
      </text>

      {agents.map((agent, i) => {
        const path = `M194 130 C 214 130, 214 ${agent.y + 14}, 236 ${agent.y + 14}`;
        const back = `M316 ${agent.y + 14} C 330 ${agent.y + 14}, 330 130, 342 130`;
        return (
          <g key={agent.label}>
            <path d={path} className="stroke-ink-line" strokeDasharray="2 4" />
            <path d={path} pathLength={100} className="mg-flow stroke-ink-accent" strokeWidth="2" strokeLinecap="round" style={v({ "--d": `${0.9 + i * 0.25}s` })} />
            <path d={back} className="stroke-ink-line" strokeDasharray="2 4" />
            <path d={back} pathLength={100} className="mg-flow stroke-signal" strokeWidth="2" strokeLinecap="round" style={v({ "--d": `${2.4 + i * 0.2}s` })} />
            <rect x="236" y={agent.y} width="80" height="28" rx="8" className="fill-ink-raised stroke-ink-line" />
            <rect x="236" y={agent.y} width="80" height="28" rx="8" className="mg-node stroke-ink-accent" strokeWidth="1.5" style={v({ "--d": `${1.6 + i * 0.25}s` })} />
            <circle cx="250" cy={agent.y + 14} r="3" className="fill-ink-accent" />
            <text x="260" y={agent.y + 17} className="fill-ink-fg font-mono" fontSize="9">
              {agent.label}
            </text>
          </g>
        );
      })}

      {/* Cited answer */}
      <g transform="translate(342 72)">
        <rect width="48" height="116" rx="8" className="fill-ink-fg" />
        {[0, 1, 2, 3, 4].map((l) => (
          <rect key={l} x="8" y={12 + l * 9} width={l === 4 ? 18 : 32} height="3" rx="1.5" className="fill-ink-muted" opacity="0.5" />
        ))}
        <rect x="8" y="62" width="14" height="10" rx="3" className="mg-seq fill-ink-accent" style={v({ "--d": "3s", "--dur": "6s" })} />
        <rect x="25" y="62" width="14" height="10" rx="3" className="mg-seq fill-ink-accent" style={v({ "--d": "3.2s", "--dur": "6s" })} />
        <rect x="8" y="88" width="32" height="4" rx="2" className="fill-ink-muted" opacity="0.25" />
        <rect x="8" y="88" width="29" height="4" rx="2" className="mg-fill fill-signal" style={v({ "--dur": "6s" })} />
        <text x="8" y="106" className="fill-ink font-mono" fontSize="7.5" fontWeight="600">
          conf
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------
   Meeting Intelligence — audio in, eight resumable stages, a speaker-
   attributed transcript and an action item out.
   ------------------------------------------------------------------ */
const STAGES = ["validate", "normalize", "transcribe", "diarize", "attribute", "extract", "persist", "push"];

function MeetingCover() {
  return (
    <g style={v({ "--dur": "8s" })}>
      {/* Waveform */}
      <g transform="translate(24 30)">
        <rect width="150" height="64" rx="10" className="fill-ink-raised stroke-ink-line" />
        <circle cx="18" cy="20" r="4" className="fill-signal" />
        <circle cx="18" cy="20" r="4" className="mg-ring stroke-signal" />
        <text x="30" y="23" className="fill-ink-muted font-mono" fontSize="8.5">
          weekly-sync.m4a
        </text>
        {Array.from({ length: 22 }).map((_, i) => (
          <rect
            key={i}
            x={14 + i * 5.8}
            y="34"
            width="3"
            height="20"
            rx="1.5"
            className="mg-bar fill-ink-accent"
            style={v({ "--d": `${-((i * 0.29) % 1.1)}s` })}
          />
        ))}
      </g>

      {/* Stage track */}
      <g transform="translate(24 128)">
        <rect width="352" height="4" rx="2" className="fill-ink-raised" />
        <rect width="352" height="4" rx="2" className="mg-fill fill-ink-accent" />
        {STAGES.map((stage, i) => {
          const x = 4 + i * (344 / 7);
          return (
            <g key={stage}>
              <circle cx={x} cy="2" r="6" className="fill-ink stroke-ink-line" strokeWidth="1.5" />
              <circle cx={x} cy="2" r="3.5" className="mg-seq fill-signal" style={v({ "--d": `${(i * 6.4) / 8}s` })} />
              <text
                x={x}
                y="24"
                textAnchor="middle"
                className="fill-ink-muted font-mono"
                fontSize="7.5"
              >
                {stage}
              </text>
            </g>
          );
        })}
      </g>

      {/* Transcript + action item */}
      <g transform="translate(198 30)">
        <rect width="178" height="64" rx="10" className="fill-ink-fg" />
        {[
          { who: "S1", w: 104, d: "2.6s" },
          { who: "S2", w: 82, d: "3.2s" },
          { who: "S1", w: 118, d: "3.8s" },
        ].map((line, i) => (
          <g key={i} className="mg-seq" style={v({ "--d": line.d })}>
            <rect x="10" y={10 + i * 16} width="18" height="11" rx="3" className={i === 1 ? "fill-signal" : "fill-ink-accent"} />
            <text x="13" y={18.5 + i * 16} className="fill-ink font-mono" fontSize="7" fontWeight="600">
              {line.who}
            </text>
            <rect x="34" y={14 + i * 16} width={line.w} height="3.5" rx="1.75" className="fill-ink-muted" opacity="0.55" />
          </g>
        ))}
      </g>

      <g transform="translate(24 188)">
        <g className="mg-seq" style={v({ "--d": "5s" })}>
        <rect width="230" height="42" rx="10" className="fill-ink-raised stroke-ink-line" />
        <rect x="12" y="13" width="16" height="16" rx="4" className="stroke-signal" strokeWidth="1.5" />
        <path d="M16 21 l3 3 l6 -7" className="stroke-signal" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <text x="38" y="20" className="fill-ink-fg font-mono" fontSize="8.5">
          action item → owner
        </text>
        <text x="38" y="32" className="fill-ink-muted font-mono" fontSize="7.5">
          linked to 2 earlier meetings
        </text>
        </g>
      </g>
      <g transform="translate(268 196)">
        <g className="mg-seq" style={v({ "--d": "5.6s" })}>
        <rect width="108" height="26" rx="13" className="stroke-ink-line" />
        <text x="54" y="16.5" textAnchor="middle" className="fill-ink-muted font-mono" fontSize="8">
          ws · progress 100%
        </text>
        </g>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------
   Musée — a painting is scanned and identified, then the conversation
   about it starts.
   ------------------------------------------------------------------ */
function MuseeCover() {
  return (
    <g style={v({ "--dur": "8s" })}>
      {/* Frame + abstract painting */}
      <g transform="translate(34 34)">
        <rect width="150" height="192" rx="4" className="fill-ink-raised stroke-ink-muted" strokeWidth="5" opacity="0.9" />
        <rect x="12" y="12" width="126" height="168" className="fill-ink" />
        <circle cx="96" cy="64" r="26" className="fill-signal" opacity="0.85" />
        <path d="M12 140 C 44 104, 70 128, 92 112 S 128 96, 138 108 V180 H12 Z" className="fill-ink-accent" opacity="0.7" />
        <path d="M12 160 C 50 140, 90 162, 138 146 V180 H12 Z" className="fill-ink-accent" opacity="0.4" />
        <path d="M30 40 L 54 92" className="stroke-ink-fg" strokeWidth="2" opacity="0.5" />

        {/* Scan */}
        <g className="mg-scan" style={v({ "--scan": "160px" })}>
          <rect x="6" y="10" width="138" height="2" className="fill-ink-accent" />
          <rect x="6" y="12" width="138" height="18" className="fill-ink-accent" opacity="0.12" />
        </g>
        {/* Detection corners */}
        <path d="M2 18 V2 H18 M132 2 H148 V18 M148 174 V190 H132 M18 190 H2 V174" className="stroke-ink-accent" strokeWidth="2" />
      </g>

      <g transform="translate(34 236)">
        <g className="mg-seq" style={v({ "--d": "1.2s" })}>
        <rect width="118" height="16" rx="8" className="fill-ink-accent" />
        <text x="9" y="11" className="fill-ink font-mono" fontSize="7.5" fontWeight="600">
          identified · 0.97
        </text>
        </g>
      </g>

      {/* Conversation */}
      <g transform="translate(206 40)">
        {[
          { x: 0, w: 156, h: 40, fill: "fill-ink-raised", lines: [120, 92], d: "1.8s", user: false },
          { x: 46, w: 124, h: 28, fill: "fill-ink-fg", lines: [86], d: "3s", user: true },
          { x: 0, w: 164, h: 52, fill: "fill-ink-raised", lines: [132, 118, 64], d: "4.2s", user: false },
        ].map((bubble, i, all) => {
          const y = all.slice(0, i).reduce((sum, b) => sum + b.h + 12, 0);
          return (
            <g key={i} className="mg-seq" style={v({ "--d": bubble.d })}>
              <rect x={bubble.x} y={y} width={bubble.w} height={bubble.h} rx="10" className={clsx(bubble.fill, !bubble.user && "stroke-ink-line")} />
              {bubble.lines.map((w, l) => (
                <rect
                  key={l}
                  x={bubble.x + 12}
                  y={y + 12 + l * 10}
                  width={w}
                  height="3.5"
                  rx="1.75"
                  className={bubble.user ? "fill-ink-muted" : "fill-ink-line"}
                  opacity={bubble.user ? 0.6 : 1}
                />
              ))}
            </g>
          );
        })}
        <g transform="translate(0 168)">
          <g className="mg-seq" style={v({ "--d": "5.4s" })}>
          <rect width="76" height="20" rx="10" className="stroke-ink-accent" />
          <text x="38" y="13.5" textAnchor="middle" className="fill-ink-accent font-mono" fontSize="8">
            quiz me
          </text>
          <rect x="84" width="80" height="20" rx="10" className="stroke-ink-line" />
          <text x="124" y="13.5" textAnchor="middle" className="fill-ink-muted font-mono" fontSize="8">
            save · share
          </text>
          </g>
        </g>
        <text x="0" y="-12" className="fill-ink-muted font-mono" fontSize="8.5">
          grounded in curator notes
        </text>
      </g>
    </g>
  );
}

/** Fallback for any project without a bespoke cover. */
function GenericCover() {
  return (
    <g style={v({ "--dur": "6s" })}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={40 + i * 86} y="104" width="62" height="52" rx="10" className="fill-ink-raised stroke-ink-line" />
          <rect x={40 + i * 86} y="104" width="62" height="52" rx="10" className="mg-node stroke-ink-accent" strokeWidth="1.5" style={v({ "--d": `${i * 0.8}s` })} />
          {i < 3 ? (
            <path d={`M${102 + i * 86} 130 H${126 + i * 86}`} pathLength={100} className="mg-flow stroke-ink-accent" strokeWidth="2.5" strokeLinecap="round" style={v({ "--d": `${i * 0.8}s` })} />
          ) : null}
        </g>
      ))}
    </g>
  );
}

const covers: Record<string, () => React.JSX.Element> = {
  "smart-traffic-management-system": TrafficCover,
  "jordan-national-policy-intelligence-platform": PolicyCover,
  "meeting-intelligence-engine": MeetingCover,
  musee: MuseeCover,
};
