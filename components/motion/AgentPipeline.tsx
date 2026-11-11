import { MotionStage } from "@/components/motion/MotionStage";

/**
 * Hero motion graphic: one request travelling through the kind of system the
 * site is selling — a product UI, an API, an agent that plans, retrieval and
 * a model, and a cited answer streamed back to the client.
 *
 * Everything runs on one 6s CSS cycle (MOTION GRAPHICS in globals.css). Each
 * connector's comet and each node's highlight carry a `--d` delay that places
 * them on that shared clock, so the packet visibly hands off node to node, and
 * the trace log underneath lights up in step with it.
 *
 * Decorative: the whole panel is `aria-hidden`. The hero copy beside it says
 * the same thing in words.
 */

const CYCLE = "6s";

type Node = {
  id: string;
  x: number;
  y: number;
  title: string;
  sub: string;
  /** When in the cycle this node lights up. */
  at: string;
};

const W = 132;
const H = 48;

const nodes: Node[] = [
  { id: "client", x: 14, y: 22, title: "Product UI", sub: "react · next", at: "0s" },
  { id: "api", x: 194, y: 22, title: "API", sub: "fastapi · auth", at: "0.8s" },
  { id: "agent", x: 374, y: 22, title: "Agent", sub: "plan · route", at: "1.6s" },
  { id: "retrieve", x: 194, y: 132, title: "Retrieval", sub: "vectors · rag", at: "2.4s" },
  { id: "llm", x: 374, y: 132, title: "LLM", sub: "reason · tools", at: "3.2s" },
  { id: "answer", x: 194, y: 242, title: "Response", sub: "cited · streamed", at: "4s" },
];

/** Connector paths, in the order the packet travels them. */
const edges = [
  { d: "M146 46 H194", at: "0s" },
  { d: "M326 46 H374", at: "0.8s" },
  { d: "M410 70 C410 104 260 96 260 132", at: "1.6s" },
  { d: "M474 70 V132", at: "1.6s" },
  { d: "M326 156 H374", at: "2.4s" },
  { d: "M440 180 C440 224 380 266 326 266", at: "3.2s" },
  { d: "M194 266 C96 266 80 170 80 70", at: "4s" },
];

const trace = [
  { glyph: "→", text: "POST /ask", tag: "client", at: "0s" },
  { glyph: "✓", text: "auth · rate limit", tag: "api", at: "0.8s" },
  { glyph: "⟳", text: "plan: retrieve → reason", tag: "agent", at: "1.6s" },
  { glyph: "✓", text: "top-k chunks ranked", tag: "rag", at: "2.4s" },
  { glyph: "⟳", text: "streaming tokens", tag: "llm", at: "3.2s" },
  { glyph: "✓", text: "answer + citations", tag: "200", at: "4s" },
];

export function AgentPipeline() {
  return (
    <MotionStage
      className="relative overflow-hidden rounded-[1.25rem] border border-ink-line bg-ink text-ink-fg shadow-lift"
      style={{ "--dur": CYCLE } as React.CSSProperties}
    >
      <div aria-hidden="true">
        {/* Window chrome — reads as a tool, not an illustration. */}
        <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-ink-line" />
          <span className="size-2.5 rounded-full bg-ink-line" />
          <span className="size-2.5 rounded-full bg-ink-line" />
          <span className="ml-3 font-mono text-[0.7rem] text-ink-muted">
            request.trace
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            <span className="size-1.5 rounded-full bg-signal mg-node" style={{ "--d": "0s", "--dur": "1.5s" } as React.CSSProperties} />
            live
          </span>
        </div>

        <svg
          viewBox="0 0 520 312"
          className="block h-auto w-full px-2 pt-3"
          fill="none"
        >
          {/* Static wiring under the comets. */}
          {edges.map((edge) => (
            <path
              key={`base-${edge.d}`}
              d={edge.d}
              className="stroke-ink-line"
              strokeWidth="1.25"
              strokeDasharray="2 4"
            />
          ))}

          {/* Packets. */}
          {edges.map((edge) => (
            <path
              key={`flow-${edge.d}`}
              d={edge.d}
              pathLength={100}
              className="mg-flow stroke-ink-accent"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ "--d": edge.at } as React.CSSProperties}
            />
          ))}

          {nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={W}
                height={H}
                rx="10"
                className="fill-ink-raised stroke-ink-line"
              />
              {/* Highlight, faded in when the packet arrives. */}
              <rect
                x={node.x - 3}
                y={node.y - 3}
                width={W + 6}
                height={H + 6}
                rx="12"
                className="mg-node stroke-ink-accent"
                strokeWidth="1.5"
                style={{
                  "--d": node.at,
                  filter: "drop-shadow(0 0 8px var(--ink-accent))",
                } as React.CSSProperties}
              />
              <circle
                cx={node.x + 16}
                cy={node.y + H / 2}
                r="3.5"
                className="fill-ink-line"
              />
              <circle
                cx={node.x + 16}
                cy={node.y + H / 2}
                r="3.5"
                className="mg-node fill-signal"
                style={{ "--d": node.at } as React.CSSProperties}
              />
              <text
                x={node.x + 30}
                y={node.y + 21}
                className="fill-ink-fg font-display"
                fontSize="13"
                fontWeight="600"
              >
                {node.title}
              </text>
              <text
                x={node.x + 30}
                y={node.y + 36}
                className="fill-ink-muted font-mono"
                fontSize="9.5"
              >
                {node.sub}
              </text>
            </g>
          ))}

          {/* A slow orbit behind the agent — it is the one thinking. */}
          <circle
            cx="440"
            cy="46"
            r="40"
            className="mg-spin stroke-ink-line"
            strokeDasharray="1 7"
            style={{ "--dur": "18s" } as React.CSSProperties}
          />
        </svg>

        <ol className="space-y-1 border-t border-ink-line px-5 py-4 font-mono text-[0.7rem] leading-relaxed sm:text-xs">
          {trace.map((line) => (
            <li
              key={line.text}
              className="mg-log flex items-center gap-3"
              style={{ "--d": line.at } as React.CSSProperties}
            >
              <span className="w-3 text-ink-accent">{line.glyph}</span>
              <span className="text-ink-fg">{line.text}</span>
              <span className="ml-auto text-ink-muted">{line.tag}</span>
            </li>
          ))}
        </ol>
      </div>
    </MotionStage>
  );
}
