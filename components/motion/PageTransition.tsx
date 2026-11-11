import { ViewTransition } from "react";

/**
 * Wraps a page's content so route changes fade the old page out and lift the
 * new one in. It belongs in each `page.tsx`, not the layout — layouts persist
 * across navigations, so enter/exit would never fire there.
 *
 * `default="none"` keeps it quiet for anything that isn't a mount/unmount,
 * which is what lets the named cover morph inside it run on its own.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
