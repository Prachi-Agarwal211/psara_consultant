"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/gsap";

/**
 * SectionDivider — Minimal gold diamond ornament between narrative acts.
 * Provides visual breathing room and signals a shift in the story.
 * Luke Baffait / Jasmine Gunarto inspired: empty space IS the design.
 */
type Props = {
  /** Optional label shown below the divider (e.g., "01 — THE SEAL") */
  label?: string;
  /** Fade in on scroll */
  animate?: boolean;
};

export default function SectionDivider({ label, animate = true }: Props) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current || !animate) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [animate]);

  return (
    <div
      ref={root}
      className="flex flex-col items-center justify-center select-none"
      style={{
        paddingTop: "clamp(2rem, 5vh, 4rem)",
        paddingBottom: "clamp(2rem, 5vh, 4rem)",
      }}
      aria-hidden="true"
    >
      {/* Gold diamond */}
      <div
        className="h-2 w-2 rotate-45"
        style={{
          backgroundColor: "color-mix(in srgb, var(--gold) 60%, transparent)",
        }}
      />
      {/* Thin horizontal rule */}
      <div
        className="mt-3 h-px w-16"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--line-gold) 50%, transparent 100%)",
        }}
      />
      {label && (
        <span
          className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{
            color: "color-mix(in srgb, var(--gold) 40%, transparent)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
