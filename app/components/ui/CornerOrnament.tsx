"use client";

import type { CSSProperties } from "react";

type CornerPosition = "tl" | "tr" | "bl" | "br";
type CornerSize = "sm" | "lg";

type Props = {
  /** Position: top-left, top-right, bottom-left, bottom-right */
  position?: CornerPosition;
  /** Size: sm (21x19) or lg (29x24) */
  size?: CornerSize;
  /** CSS color value for the stroke (default: var(--gold)) */
  color?: string;
  /** Stroke opacity (default: 1) */
  opacity?: number;
  /** Additional inline styles for the container */
  style?: CSSProperties;
  /** Additional class names for the container */
  className?: string;
};

const POSITION_CLASS: Record<CornerPosition, string> = {
  tl: "corner-frame-tl",
  tr: "corner-frame-tr",
  bl: "corner-frame-bl",
  br: "corner-frame-br",
};

const SM_PATH = "M21 2H2v16.5";
const LG_PATH = "M28 1H1v23";

/**
 * CornerOrnament — Jasmine Gunarto inspired SVG corner bracket ornament.
 * Usage: <CornerOrnament position="tl" size="sm" />
 *
 * Replaces ~20 inline SVG copies across all section components.
 */
export default function CornerOrnament({
  position = "tl",
  size = "sm",
  color = "var(--gold)",
  opacity = 1,
  style,
  className = "",
}: Props) {
  const posClass = POSITION_CLASS[position];
  const isLg = size === "lg";

  // For right-side corners, we need mirrored paths
  const isRight = position === "tr" || position === "br";
  const pathD = isLg
    ? isRight
      ? "M29 1H2v23"
      : LG_PATH
    : SM_PATH;

  const cls = [
    "corner-frame",
    posClass,
    isLg ? "corner-frame-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={style} aria-hidden>
      <svg
        viewBox={isLg ? "0 0 29 24" : "0 0 21 19"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathD}
          stroke={color}
          strokeWidth={isLg ? 1.5 : 2}
          opacity={opacity}
          fill="none"
        />
      </svg>
    </div>
  );
}
