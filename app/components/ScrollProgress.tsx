"use client";

import { useEffect, useRef } from "react";
import { initScrollProgress } from "../lib/gsap";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "why-us", label: "Value" },
  { id: "coverage", label: "Coverage" },
  { id: "process", label: "Process" },
  { id: "services", label: "Services" },
  { id: "trust", label: "Trust" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cleanup = initScrollProgress();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }, []);

  return (
    <div
      id="scroll-progress"
      ref={root}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex pointer-events-none"
    >
      {sections.map((s) => (
        <div
          key={s.id}
          data-section={`#${s.id}`}
          className="sp-segment group relative flex items-center justify-center"
        >
          <div className="h-2 w-2 rounded-full border border-[var(--gold)]/40 bg-[var(--obsidian)] transition-all duration-300 group-hover:bg-[var(--gold)]/30 sp-active:bg-[var(--gold)] sp-active:border-[var(--gold)] sp-active:scale-125" />
          <span className="pointer-events-none absolute right-4 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]/0 transition-all duration-300 group-hover:text-[var(--gold)]/70 group-hover:right-5 sp-active:text-[var(--gold)] sp-active:right-5">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
