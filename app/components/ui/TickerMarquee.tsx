"use client";

import { Shield } from "lucide-react";

/** Thin factual strip — not a full horizontal card carousel */
export default function TickerMarquee() {
  const items = [
    "PSARA ACT 2005 · STATE CONTROLLING AUTHORITIES",
    "TRAINING MOU · POLICE ANTECEDENT · INSPECTION READY",
    "JAIPUR HQ · DELHI · GURUGRAM · NOIDA · AHMEDABAD",
    "28+ STATES & UTs · 200+ CITY GUIDES",
    "NO ALL-INDIA SHORTCUT · STATE-WISE LICENCES",
    "RENEWAL CALENDARS · MULTI-STATE SEQUENCING",
  ];

  return (
    <div
      id="ticker"
      className="ticker-band relative z-20 w-full overflow-hidden border-y py-3.5 text-xs select-none"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
        style={{ background: "var(--grad-spectrum-v)" }}
      />
      <div className="flex w-max animate-marquee space-x-10">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex shrink-0 items-center gap-3">
            <Shield
              className="h-3.5 w-3.5 shrink-0"
              style={{
                color: ["#f97316", "#f59e0b", "#38bdf8", "#34d399"][idx % 4],
              }}
            />
            <span className="font-bold uppercase tracking-[0.18em] text-[var(--cream)]/90">
              {text}
            </span>
          </div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-80"
        style={{ background: "var(--grad-spectrum-v)" }}
      />
    </div>
  );
}
