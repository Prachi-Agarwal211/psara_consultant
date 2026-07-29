"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { ensureGsap, prefersReducedMotion, storyEnter } from "../../lib/gsap";

export type ChapterTone = "ink" | "warm-dark" | "sky" | "emerald" | "aurora" | "paper" | "paper-gold" | "paper-lemon";

type Props = {
  id: string;
  children: ReactNode;
  bgImage?: string;
  paper?: boolean;
  tone?: ChapterTone;
  className?: string;
};

export default function Chapter({
  id,
  children,
  bgImage,
  paper = false,
  tone,
  className = "",
}: Props) {
  const root = useRef<HTMLElement | null>(null);
  const bg = useRef<HTMLDivElement | null>(null);

  const isPaperLemon = tone === "paper-lemon";
  const isPaper = paper || tone === "paper" || tone === "paper-gold" || isPaperLemon;
  const isWarmDark = tone === "warm-dark";
  const themeClass = isPaperLemon ? "theme-paper-lemon" : isPaper ? "theme-paper" : isWarmDark ? "theme-warm-dark" : "theme-ink";

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    if (prefersReducedMotion()) {
      storyEnter(root.current);
      return;
    }

    const ctx = gsap.context(() => {
      if (bg.current) {
        gsap.fromTo(
          bg.current,
          { opacity: 0.15 },
          {
            opacity: isPaper ? 0.08 : 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 92%",
              end: "top 30%",
              scrub: 0.75,
            },
          }
        );
      }
      storyEnter(root.current!, "[data-story]", "top 72%");
    }, root);

    return () => ctx.revert();
  }, [isPaper]);

  return (
    <section
      id={id}
      ref={root}
      className={`section relative overflow-hidden ${themeClass} ${className}`}
    >
      {bgImage && (
        <div
          ref={bg}
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
          aria-hidden
        >
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${isPaper ? "opacity-[0.08]" : "opacity-[0.2]"}`}
          />
          <div
            className="absolute inset-0"
            style={{
              background: isPaper
                ? "linear-gradient(180deg, var(--paper) 0%, rgba(246, 250, 253, 0.85) 100%)"
                : isWarmDark
                ? "linear-gradient(180deg, var(--warm-dark) 0%, rgba(26, 21, 16, 0.88) 100%)"
                : "linear-gradient(180deg, var(--obsidian) 0%, rgba(10, 22, 40, 0.88) 100%)",
            }}
          />
        </div>
      )}

      <div className="section-inner relative z-[2]">{children}</div>
    </section>
  );
}
