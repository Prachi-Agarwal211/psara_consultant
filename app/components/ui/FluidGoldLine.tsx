"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { initFluidLine, prefersReducedMotion } from "../../lib/gsap";

/**
 * FluidGoldLine — Organic SVG decorative line that draws itself on scroll.
 * Luke Baffait-inspired, using the existing initFluidLine GSAP helper.
 * Place between sections or at the end of hero for a premium narrative thread.
 *
 * Usage:
 *   <FluidGoldLine className="h-24 my-16" variant="wave" />
 *   <FluidGoldLine variant="curve" />
 */
export default function FluidGoldLine({
  className = "",
  variant = "wave",
  color = "#e0b84a",
  opacity = 0.35,
  width = "100%",
  height = "auto",
  viewBox = "0 0 1200 80",
}: {
  className?: string;
  variant?: "wave" | "curve" | "spiral" | "double";
  color?: string;
  opacity?: number;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion()) return;
    const cleanup = initFluidLine(svgRef.current as unknown as HTMLElement, {
      pathSelector: ".fluid-path",
      start: "top 85%",
      end: "bottom 15%",
    });
    return cleanup;
  }, []);

  const paths: Record<string, ReactNode> = {
    wave: (
      <g>
        <path
          className="fluid-path"
          d="M 0 40 Q 150 0 300 40 T 600 40 T 900 40 T 1200 40"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
      </g>
    ),
    curve: (
      <g>
        <path
          className="fluid-path"
          d="M 0 60 C 300 60, 400 10, 600 10 C 800 10, 900 60, 1200 60"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={opacity}
        />
      </g>
    ),
    spiral: (
      <g>
        <path
          className="fluid-path"
          d="M 0 40 C 100 40, 150 10, 200 10 C 300 10, 350 70, 450 70 C 550 70, 600 10, 700 10 C 800 10, 850 70, 950 70 C 1050 70, 1100 10, 1200 10"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={opacity}
        />
      </g>
    ),
    double: (
      <g>
        <path
          className="fluid-path"
          d="M 0 30 Q 300 10 600 30 T 1200 30"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.7}
        />
        <path
          className="fluid-path"
          d="M 0 50 Q 300 70 600 50 T 1200 50"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={opacity * 0.7}
        />
      </g>
    ),
  };

  return (
    <div
      className={`fluid-gold-line w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        width={width}
        height={height}
        preserveAspectRatio="none"
        className="block w-full h-full"
        style={{ minHeight: "40px" }}
      >
        {paths[variant] || paths.wave}
        {/* Subtle shimmer gradient overlay */}
        <defs>
          <linearGradient id="fluid-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={color} stopOpacity={opacity * 0.3} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect
          className="fluid-shimmer"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#fluid-shimmer)"
          opacity="0"
        />
      </svg>
    </div>
  );
}
