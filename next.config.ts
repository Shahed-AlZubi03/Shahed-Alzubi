import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * GitHub Pages is plain static file hosting — there is no Node server to
   * render on. Every route here is already static (no API routes, server
   * actions or middleware), so exporting to HTML/CSS/JS at build time costs
   * nothing.
   *
   * The repo is named <user>.github.io, so the site is served from the domain
   * root and needs no basePath. If it is ever renamed back to a project repo,
   * `basePath` and `assetPrefix` both have to be set to "/<repo>" or every
   * asset and link will 404.
   */
  output: "export",
};

export default nextConfig;
