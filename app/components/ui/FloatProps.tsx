"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../../lib/motion";

type PropName =
  | "shield-gold"
  | "wax-seal"
  | "gavel"
  | "document-scroll"
  | "laurel"
  | "ribbon-banner"
  | "ink-pen"
  | "corner-ornament"
  | "portfolio-binder"
  | "seal-and-pen";

type Slot = {
  name: PropName;
  /** Tailwind position classes e.g. "top-8 right-6" */
  className: string;
  /** width in px at md+ */
  size?: number;
  /** opacity 0–1 */
  opacity?: number;
  /** rotate degrees */
  rotate?: number;
  /** show only from md breakpoint */
  desktopOnly?: boolean;
  /** slow drift amplitude */
  drift?: number;
};

const SRC = (name: PropName) => `/assets/images/props/${name}.webp`;

/**
 * Decorative transparent props for section atmosphere.
 * Always pointer-events-none + aria-hidden — never blocks content.
 */
export default function FloatProps({
  slots,
  className = "",
}: {
  slots: Slot[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const nodes = rootRef.current.querySelectorAll<HTMLElement>("[data-float-prop]");
    // Animate y only so any static CSS rotate on the node is preserved via gsap.quickTo pattern
    const tweens = [...nodes].map((el, i) => {
      const amp = Number(el.dataset.drift || 10);
      return gsap.to(el, {
        y: amp,
        duration: 3.2 + i * 0.35,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [slots]);

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden
    >
      {slots.map((s) => (
        <img
          key={`${s.name}-${s.className}`}
          data-float-prop
          data-drift={s.drift ?? 12}
          src={SRC(s.name)}
          alt=""
          width={s.size ?? 120}
          height={s.size ?? 120}
          draggable={false}
          className={[
            "absolute select-none will-change-transform",
            s.desktopOnly ? "hidden md:block" : "block",
            s.className,
          ].join(" ")}
          style={{
            width: s.size ?? 120,
            height: "auto",
            opacity: s.opacity ?? 0.55,
            transform: s.rotate ? `rotate(${s.rotate}deg)` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/** Preset packs for common sections */
export const PROPS = {
  stats: [
    {
      name: "shield-gold" as const,
      className: "-left-6 top-6 md:left-8 md:top-10",
      size: 110,
      opacity: 0.28,
      rotate: -12,
      desktopOnly: true,
      drift: 14,
    },
    {
      name: "wax-seal" as const,
      className: "right-2 bottom-4 md:right-10 md:bottom-8",
      size: 88,
      opacity: 0.35,
      rotate: 8,
      desktopOnly: true,
      drift: 10,
    },
  ],
  statement: [
    {
      name: "laurel" as const,
      // avoid translate-* — GSAP owns transform for drift
      className: "left-[calc(50%-5rem)] top-8 md:top-12",
      size: 160,
      opacity: 0.22,
      desktopOnly: false,
      drift: 8,
    },
    {
      name: "corner-ornament" as const,
      className: "left-4 top-4 md:left-10 md:top-10",
      size: 96,
      opacity: 0.45,
      desktopOnly: true,
    },
    {
      name: "corner-ornament" as const,
      className: "right-4 bottom-4 md:right-10 md:bottom-10",
      size: 96,
      opacity: 0.45,
      rotate: 180,
      desktopOnly: true,
    },
    {
      name: "document-scroll" as const,
      className: "-right-4 bottom-16 md:right-8 md:bottom-20",
      size: 100,
      opacity: 0.2,
      rotate: 12,
      desktopOnly: true,
      drift: 16,
    },
  ],
  services: [
    {
      name: "gavel" as const,
      className: "right-0 top-8 md:right-6 md:top-12",
      size: 140,
      opacity: 0.18,
      rotate: -8,
      desktopOnly: true,
      drift: 12,
    },
    {
      name: "ink-pen" as const,
      className: "left-4 bottom-8 md:left-10",
      size: 150,
      opacity: 0.22,
      rotate: -6,
      desktopOnly: true,
      drift: 9,
    },
  ],
  closing: [
    {
      name: "shield-gold" as const,
      className: "left-[calc(50%-3rem)] top-10",
      size: 96,
      opacity: 0.25,
      drift: 10,
    },
    {
      name: "wax-seal" as const,
      className: "left-6 bottom-24 md:left-16",
      size: 72,
      opacity: 0.3,
      rotate: -14,
      desktopOnly: true,
    },
    {
      name: "document-scroll" as const,
      className: "right-6 bottom-24 md:right-16",
      size: 80,
      opacity: 0.25,
      rotate: 10,
      desktopOnly: true,
    },
  ],
  about: [
    {
      name: "portfolio-binder" as const,
      className: "right-0 -top-4 md:right-4 md:-top-8",
      size: 150,
      opacity: 0.55,
      rotate: 8,
      desktopOnly: true,
      drift: 11,
    },
    {
      name: "seal-and-pen" as const,
      className: "left-2 bottom-2 md:left-6 md:bottom-6",
      size: 120,
      opacity: 0.45,
      rotate: -6,
      desktopOnly: true,
      drift: 9,
    },
  ],
};
