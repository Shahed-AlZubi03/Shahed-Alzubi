import type { NextConfig } from "next";

/**
 * The repo is a *project* repo (`Shahed-Alzubi`), not `<user>.github.io`, so
 * Pages serves it from `/Shahed-Alzubi/` rather than the domain root. Both of
 * these have to match that path or every asset and internal link 404s and the
 * page renders as unstyled HTML.
 *
 * If the repo is ever renamed back to `<user>.github.io`, drop both.
 */
const basePath = "/Shahed-Alzubi";

const nextConfig: NextConfig = {
  /**
   * GitHub Pages is plain static file hosting — there is no Node server to
   * render on. Every route here is already static (no API routes, server
   * actions or middleware), so exporting to HTML/CSS/JS at build time costs
   * nothing.
   */
  output: "export",

  basePath,
  assetPrefix: basePath,

  /**
   * Pages has no rewrite layer, so `/projects` must be a real
   * `projects/index.html` on disk rather than a `projects.html` that only a
   * server could route to.
   */
  trailingSlash: true,
};

export default nextConfig;
