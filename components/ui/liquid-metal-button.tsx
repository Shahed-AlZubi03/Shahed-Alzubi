"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { clsx } from "@/lib/clsx";

/**
 * Plum liquid-metal CTA. The WebGL sheen is a decorative layer painted
 * behind the label — the anchor itself stays a plain link, so the button works
 * with JS off, keyboard nav, and `prefers-reduced-motion` (where the shader is
 * skipped entirely and the token fill shows through instead).
 *
 * Uniform names and the mount signature track @paper-design/shaders 0.0.80;
 * the shader needs its full uniform set up front or the program fails to link.
 */

/** Plum accent, as the RGBA vec4s the shader wants (0–1, not 0–255). */
const COLOR_BACK: [number, number, number, number] = [0.19, 0.12, 0.2, 1];
const COLOR_TINT: [number, number, number, number] = [0.62, 0.48, 0.63, 1];

const IDLE_SPEED = 0.6;
const HOVER_SPEED = 1;
const PRESS_SPEED = 2.4;

type LiquidMetalButtonProps = {
  href: string;
  children: React.ReactNode;
  /** Opens in a new tab with the usual rel hardening. */
  external?: boolean;
  className?: string;
};

export function LiquidMetalButton({
  href,
  children,
  external = false,
  className,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const shaderHost = useRef<HTMLSpanElement>(null);
  const shader = useRef<ShaderMount | null>(null);

  useEffect(() => {
    const host = shaderHost.current;
    if (!host) return;

    // Respect the same motion preference the rest of the site honours. No
    // shader at all rather than a paused one: nothing to tear down, and the
    // accent fill underneath is already the finished fallback.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mount = new ShaderMount(
      host,
      liquidMetalFragmentShader,
      {
        u_colorBack: COLOR_BACK,
        u_colorTint: COLOR_TINT,
        u_image: undefined,
        u_isImage: false,
        u_repetition: 4,
        u_softness: 0.5,
        u_shiftRed: 0.3,
        u_shiftBlue: 0.3,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 45,
        u_shape: 1,
        // Sizing uniforms are required by the vertex shader — omitting any of
        // them leaves the program unlinked and the canvas blank.
        u_fit: 2,
        u_scale: 8,
        u_rotation: 0,
        u_originX: 0.5,
        u_originY: 0.5,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
        u_worldWidth: 0,
        u_worldHeight: 0,
      },
      undefined,
      IDLE_SPEED,
    );

    shader.current = mount;

    return () => {
      mount.dispose();
      shader.current = null;
    };
  }, []);

  const setSpeed = (speed: number) => shader.current?.setSpeed(speed);

  const content = (
    <>
      {/* Decorative sheen. Sits under the label and never intercepts a click. */}
      <span
        ref={shaderHost}
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-lg",
          "opacity-90 transition-opacity duration-300 [&>canvas]:size-full",
          isHovered && "opacity-100",
        )}
      />
      <span className="relative z-10 drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]">
        {children}
      </span>
    </>
  );

  const classes = clsx(
    "group relative isolate inline-flex items-center justify-center gap-2",
    "overflow-hidden rounded-lg bg-accent px-5 py-3",
    "text-sm font-medium text-accent-contrast",
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.35)]",
    "transition-[transform,box-shadow] duration-200",
    isPressed
      ? "translate-y-px shadow-[inset_0_2px_4px_rgb(0_0_0/0.35)]"
      : "hover:-translate-y-px",
    className,
  );

  const handlers = {
    onMouseEnter: () => {
      setIsHovered(true);
      setSpeed(HOVER_SPEED);
    },
    onMouseLeave: () => {
      setIsHovered(false);
      setIsPressed(false);
      setSpeed(IDLE_SPEED);
    },
    onMouseDown: () => {
      setIsPressed(true);
      setSpeed(PRESS_SPEED);
    },
    onMouseUp: () => {
      setIsPressed(false);
      setSpeed(isHovered ? HOVER_SPEED : IDLE_SPEED);
    },
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        {...handlers}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...handlers}>
      {content}
    </Link>
  );
}
