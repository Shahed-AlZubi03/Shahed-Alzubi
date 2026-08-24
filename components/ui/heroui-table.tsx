"use client";

import { Table } from "@heroui/react";

/**
 * HeroUI v3 Table, re-exported as the project's table primitive.
 *
 * The upstream snippet ships `import "@heroui/styles/css"` here. That is
 * deliberately omitted — see the HEROUI BRIDGE block in `app/globals.css`.
 * Short version: that entry point re-imports Tailwind and HeroUI's default
 * theme, and the theme redefines `--color-surface`, `--color-accent`,
 * `--color-border` (and three more) on a bare `:root`. Loading it would
 * repoint this site's palette everywhere `bg-surface` / `text-accent` /
 * `border-border` is used, and HeroUI's dark values key off `.dark` —
 * a selector this site never sets, since dark here is the `:root` default.
 *
 * So `globals.css` imports HeroUI's *structural* table CSS only and maps the
 * handful of token names it expects onto our own. One Tailwind context, our
 * palette, both themes intact.
 */
export { Table };
export default Table;
