"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { clsx } from "@/lib/clsx";
import type { Project } from "@/lib/projects";

/** Sub-pixel scroll positions mean `scrollLeft === 0` is not reliable. */
const EDGE_EPSILON = 2;
/** Below this, a mouse-down is a click on a card, not a drag of the row. */
const DRAG_THRESHOLD = 6;

/**
 * Horizontal case-study rail: native scrolling with snap points, plus mouse
 * drag and vertical-wheel translation for pointers that have no horizontal
 * axis.
 *
 * All of it is wired with native listeners rather than React's synthetic
 * events, because two of them need capabilities JSX props do not give us: the
 * wheel handler has to be non-passive to call `preventDefault`, and the drag
 * has to keep tracking once the pointer leaves the element. Pointer *capture*
 * would be the tidier way to do that, but it retargets the trailing `click`
 * to the capturing element and the card links would stop navigating.
 */
export function ProjectCarousel({
  projects,
  heading,
  className,
}: {
  projects: Project[];
  /**
   * The section's <SectionHeading>, passed in rather than rendered here so
   * the arrows can share its baseline. Server-rendered on the page and
   * slotted through — this component stays the only client boundary.
   */
  heading?: React.ReactNode;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const drag = { down: false, moved: false, startX: 0, startScroll: 0 };

    const syncEdges = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= EDGE_EPSILON);
      setAtEnd(el.scrollLeft >= max - EDGE_EPSILON);
    };

    /**
     * A plain wheel only reports deltaY, so without this a mouse can't move
     * the rail at all. It deliberately stops short of trapping the page:
     * once the rail is against the end the event is left alone and the
     * document scrolls as usual.
     */
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch-zoom
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // already horizontal
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const done =
        event.deltaY > 0
          ? el.scrollLeft >= max - EDGE_EPSILON
          : el.scrollLeft <= EDGE_EPSILON;
      if (done) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    const onPointerMove = (event: PointerEvent) => {
      const dx = event.clientX - drag.startX;
      if (!drag.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        drag.moved = true;
        setDragging(true);
      }
      el.scrollLeft = drag.startScroll - dx;
    };

    const endDrag = () => {
      drag.down = false;
      // `moved` is left set until the next pointer-down: the click that
      // follows a drag has not fired yet, and onClickCapture needs to see it.
      if (drag.moved) setDragging(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };

    // Touch and pen already pan natively; hijacking them would fight momentum.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      drag.down = true;
      drag.moved = false;
      drag.startX = event.clientX;
      drag.startScroll = el.scrollLeft;
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
    };

    /** A drag that happens to end over a card must not open it. */
    const onClickCapture = (event: MouseEvent) => {
      if (!drag.moved) return;
      event.preventDefault();
      event.stopPropagation();
    };

    /** Anchors are natively draggable, which would abort the pan. */
    const onDragStart = (event: DragEvent) => event.preventDefault();

    el.addEventListener("scroll", syncEdges, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);

    const observer = new ResizeObserver(syncEdges);
    observer.observe(el);
    syncEdges();

    return () => {
      el.removeEventListener("scroll", syncEdges);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
      observer.disconnect();
      if (drag.down) endDrag();
    };
  }, []);

  /** One card per press, measured off the DOM so the width can stay fluid. */
  const step = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (items.length === 0) return;
    const distance =
      items.length > 1
        ? items[1].offsetLeft - items[0].offsetLeft
        : items[0].offsetWidth;
    el.scrollBy({
      left: distance * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        {heading}
        {/* Touch users swipe, so the arrows are a pointer-screen affordance. */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <ArrowButton
            label="Previous case studies"
            disabled={atStart}
            onClick={() => step(-1)}
            path="M13 8H3M7 4 3 8l4 4"
          />
          <ArrowButton
            label="Next case studies"
            disabled={atEnd}
            onClick={() => step(1)}
            path="M3 8h10M9 4l4 4-4 4"
          />
        </div>
      </div>

      <div
        ref={scrollerRef}
        role="group"
        aria-label="Case studies — scroll horizontally"
        tabIndex={0}
        // Negative margins let cards run out to the container edge and under
        // the fade, while the matching padding keeps the first one aligned
        // with the heading above it. `py` is headroom for the focus ring,
        // which `overflow-x` would otherwise clip.
        className={clsx(
          "carousel-rail mt-12 -mx-6 flex gap-6 overflow-x-auto overscroll-x-contain px-6 py-1.5 scroll-px-6 md:-mx-8 md:px-8 md:scroll-px-8",
          dragging
            ? "cursor-grabbing select-none [&_a]:cursor-grabbing"
            : "cursor-grab snap-x snap-mandatory",
        )}
        style={
          {
            "--fade-start": atStart ? "0px" : "2rem",
            "--fade-end": atEnd ? "0px" : "2.5rem",
          } as CSSProperties
        }
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            className="w-[min(82vw,35rem)] shrink-0 snap-start"
          />
        ))}
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  path,
  disabled,
  onClick,
}: {
  label: string;
  /** 16×16 stroked arrow, matching the one on the card's CTA. */
  path: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-9 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg disabled:pointer-events-none disabled:opacity-40"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </button>
  );
}
