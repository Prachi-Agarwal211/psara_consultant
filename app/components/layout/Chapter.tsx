"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { ensureGsap, prefersReducedMotion, storyEnter } from "../../lib/gsap";

export type ChapterTone = "ink" | "warm-dark" | "warm-dark-2" | "warm-dark-3" | "obsidian-warm" | "sky" | "emerald" | "aurora" | "paper" | "paper-gold" | "paper-lemon" | "warm-cream" | "warm-parchment" | "gold" | "gold-soft" | "amber" | "terracotta";

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

  // Tone → theme class mapping
  const themeMap: Record<string, string> = {
    'ink': 'theme-ink',
    'warm-dark': 'theme-warm-dark',
    'warm-dark-2': 'theme-warm-dark-2',
    'warm-dark-3': 'theme-warm-dark-3',
    'obsidian-warm': 'theme-obsidian-warm',
    'sky': 'theme-ink',
    'emerald': 'theme-ink',
    'aurora': 'theme-ink',
    'paper': 'theme-paper',
    'paper-gold': 'theme-paper',
    'paper-lemon': 'theme-paper-lemon',
    'warm-cream': 'theme-warm-cream',
    'warm-parchment': 'theme-warm-parchment',
    'gold': 'theme-gold',
    'gold-soft': 'theme-gold-soft',
    'amber': 'theme-amber',
    'terracotta': 'theme-terracotta',
  };

  const resolvedTone = tone || (paper ? 'paper' : 'ink');
  const isPaper = ['paper', 'paper-gold', 'paper-lemon', 'warm-cream', 'warm-parchment'].includes(resolvedTone);
  const isWarmDark = ['warm-dark', 'warm-dark-2', 'warm-dark-3', 'obsidian-warm'].includes(resolvedTone);
  const themeClass = themeMap[resolvedTone] || 'theme-ink';

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
            alt="Background visual for section — PSARA Consultant India"
            fill
            sizes="100vw"
            className={`object-cover ${isPaper ? "opacity-[0.08]" : "opacity-[0.2]"}`}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background: isPaper
                ? resolvedTone === 'warm-cream'
                  ? "linear-gradient(180deg, var(--warm-cream) 0%, rgba(242, 232, 213, 0.88) 100%)"
                  : resolvedTone === 'warm-parchment'
                  ? "linear-gradient(180deg, var(--warm-parchment) 0%, rgba(232, 220, 204, 0.88) 100%)"
                  : "linear-gradient(180deg, var(--paper) 0%, rgba(246, 250, 253, 0.85) 100%)"
                : isWarmDark
                ? resolvedTone === 'warm-dark-3'
                  ? "linear-gradient(180deg, var(--warm-dark-3) 0%, rgba(46, 38, 28, 0.88) 100%)"
                  : resolvedTone === 'warm-dark-2'
                  ? "linear-gradient(180deg, var(--warm-dark-2) 0%, rgba(36, 30, 22, 0.88) 100%)"
                  : "linear-gradient(180deg, var(--warm-dark) 0%, rgba(26, 21, 16, 0.88) 100%)"
                : resolvedTone === 'gold' || resolvedTone === 'gold-soft'
                ? "linear-gradient(180deg, var(--gold-bg) 0%, rgba(184, 134, 61, 0.88) 100%)"
                : "linear-gradient(180deg, var(--obsidian) 0%, rgba(10, 22, 40, 0.88) 100%)",
            }}
          />
        </div>
      )}

      <div className="section-inner relative z-[2]">{children}</div>
    </section>
  );
}
