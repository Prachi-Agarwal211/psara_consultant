"use client";

import { useEffect, useRef } from "react";
import { counterStampAnimation } from "../../lib/gsap";

const METRICS = [
  { num: "28", suffix: "", label: "( 01 )", sub: "States & UTs Covered", note: "Controlling Authority filing desks" },
  { num: "570", suffix: "+", label: "( 02 )", sub: "City Desks", note: "One desk per district HQ" },
  { num: "500", suffix: "+", label: "( 03 )", sub: "Licenses Cleared", note: "Agencies served pan-India" },
  { num: "10", suffix: " Yrs", label: "( 04 )", sub: "Statutory Practice", note: "PSARA Act, 2005 specialists" },
];

export default function StatsBar() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (rootRef.current) counterStampAnimation(rootRef.current);
  }, []);

  return (
    <section
      ref={rootRef}
      data-section-transition
      data-transition="clip-up"
      className="relative overflow-hidden bg-transparent"
    >
      {/* Dot-matrix technical field — nudot DNA */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" aria-hidden />

      <div className="relative z-10 px-[var(--gutter)] py-16 md:py-20">
        <div className="mx-auto max-w-[var(--page-max)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10 border-x border-t border-b border-white/10 bg-white/[0.015] backdrop-blur-[2px]">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="group relative flex flex-col justify-between gap-6 px-6 py-8 md:px-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.04]"
              >
                <div
                  className="counter-num text-[clamp(2.6rem,5vw,4.2rem)]!"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span data-count={m.num} data-suffix={m.suffix}>
                    {m.num}{m.suffix}
                  </span>
                </div>
                <div>
                  <div className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-white/80" style={{ fontFamily: "var(--font-body)" }}>
                    {m.sub}
                  </div>
                  <div className="mt-1 text-xs font-normal text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                    {m.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
