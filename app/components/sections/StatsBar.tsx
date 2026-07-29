"use client";

import { useEffect, useRef } from "react";
import { counterStampAnimation } from "../../lib/gsap";

const METRICS = [
  { num: "28",   suffix: "",    label: "01 / JURISDICTIONS", sub: "States Covered" },
  { num: "100",  suffix: "%",   label: "02 / COMPLIANCE",    sub: "Verification Rate" },
  { num: "300",  suffix: "+",   label: "03 / DOSSIERS",      sub: "Agencies Cleared" },
  { num: "12",   suffix: " Yrs",label: "04 / EXPERIENCE",    sub: "Statutory Practice" },
];

export default function StatsBar() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rootRef.current) counterStampAnimation(rootRef.current);
  }, []);

  return (
    <section
      ref={rootRef}
      className="px-[var(--gutter)] py-20"
      style={{
        backgroundColor: "var(--obsidian)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-[var(--page-max)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="group relative p-7 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-500"
            style={{
              backgroundColor: "var(--obsidian-card)",
              border: "1px solid var(--line)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--blue-border)";
              el.style.boxShadow = "0 0 24px var(--blue-glow-soft)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--line)";
              el.style.boxShadow = "none";
            }}
          >
            {/* Blue glow top-left on hover */}
            <div
              className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle, var(--blue-glow-soft) 0%, transparent 70%)",
              }}
            />

            <span
              className="text-[0.55rem] font-bold uppercase tracking-[0.2em] mb-5 block"
              style={{ color: "var(--gold)" }}
            >
              {m.label}
            </span>

            <div
              className="font-extrabold leading-none mb-2"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--white)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              <span data-count={m.num} data-suffix={m.suffix}>
                {m.num}{m.suffix}
              </span>
            </div>

            <span
              className="text-[0.68rem] font-semibold uppercase tracking-wider"
              style={{ color: "var(--white-40)" }}
            >
              {m.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
