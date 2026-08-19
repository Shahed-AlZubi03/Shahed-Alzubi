import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered by next/og at build time. Kept to system-default fonts on purpose —
 * fetching a webfont here would make the build depend on network access.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#06090f",
          // Matches the hero's accent bloom, top-left.
          backgroundImage:
            "radial-gradient(900px circle at 0% 0%, rgba(77,141,255,0.22), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "24px",
            color: "#94a6c4",
            letterSpacing: "0.18em",
          }}
        >
          <span style={{ color: "#4d8dff" }}>●</span>
          AVAILABLE FOR FREELANCE WORK
        </div>

        <div
          style={{
            marginTop: "36px",
            fontSize: "88px",
            fontWeight: 700,
            color: "#e9effa",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "40px",
            color: "#94a6c4",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
          }}
        >
          <span>{site.roleLead}&nbsp;</span>
          <span style={{ color: "#4d8dff" }}>{site.roleHighlight}</span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: "20px",
            fontSize: "22px",
            color: "#63748f",
          }}
        >
          <span>LLMs</span>
          <span>·</span>
          <span>Multi-Agent Systems</span>
          <span>·</span>
          <span>FastAPI</span>
          <span>·</span>
          <span>React</span>
        </div>
      </div>
    ),
    size,
  );
}
