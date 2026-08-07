"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../lib/gsap";

/** Homepage section rail — matches current HomeStory IDs */
const HOME_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "proof", label: "Proof" },
  { id: "presence", label: "Presence" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const rail = root.current;
    if (!rail) return;
    const { ScrollTrigger } = ensureGsap();
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    rail.querySelectorAll<HTMLElement>(".sp-segment").forEach((seg) => {
      const sel = seg.getAttribute("data-section");
      if (!sel) return;
      const target = document.querySelector(sel);
      if (!target) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: target,
          start: "top center",
          end: "bottom center",
          onToggle: ({ isActive }) => {
            seg.classList.toggle("sp-active", isActive);
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      id="scroll-progress"
      ref={root}
      className="pointer-events-none fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      aria-hidden
    >
      {HOME_SECTIONS.map((s) => (
        <div
          key={s.id}
          data-section={`#${s.id}`}
          className="sp-segment group relative flex items-center justify-center"
        >
          <div className="h-1.5 w-1.5 rounded-full border border-[var(--gold)]/40 bg-transparent transition-[color,border-color,background-color] duration-300 sp-active:scale-150 sp-active:border-[var(--gold-bright)] sp-active:bg-[var(--gold-bright)]" />
          <span className="pointer-events-none absolute right-4 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-transparent transition-[color,border-color,background-color] duration-300 group-hover:right-5 group-hover:text-[var(--gold)]/70 sp-active:right-5 sp-active:text-[var(--gold-bright)]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
