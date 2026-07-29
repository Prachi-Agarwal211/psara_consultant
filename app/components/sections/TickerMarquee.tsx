"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/gsap";

const states = [
  "Rajasthan","Delhi","Uttar Pradesh","Madhya Pradesh","Gujarat","Maharashtra",
  "Haryana","Punjab","Uttarakhand","Bihar","West Bengal","Odisha","Chhattisgarh",
  "Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala","Jharkhand",
  "Assam","Himachal Pradesh","Jammu & Kashmir","Chandigarh","Goa","Puducherry",
  "Ladakh","Sikkim","Manipur",
];

export default function TickerMarquee() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current!.querySelector(".ticker-track"),
        { xPercent: 0 },
        { xPercent: -50, ease: "none", duration: 30, repeat: -1 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="ticker-band relative overflow-hidden"
      style={{
        padding: "0.85rem 0",
        backgroundColor: "var(--obsidian-card)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Blue vertical gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(90deg, var(--obsidian-card) 0%, transparent 8%, transparent 92%, var(--obsidian-card) 100%)",
        }}
        aria-hidden
      />

      <div
        className="ticker-track"
        style={{
          maskImage: "linear-gradient(90deg, transparent 2%, black 8%, black 92%, transparent 98%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 2%, black 8%, black 92%, transparent 98%)",
        }}
      >
        {[...Array(2)].map((_, loop) => (
          <div key={loop} className="flex items-center" style={{ gap: "2rem" }}>
            <span
              className="font-bold uppercase tracking-widest text-[0.62rem] whitespace-nowrap"
              style={{ color: "var(--blue-bright)" }}
            >
              PSARA LICENSE CLEARANCE
            </span>
            <span
              className="w-1 h-1 rounded-full inline-block"
              style={{ backgroundColor: "var(--blue)" }}
            />
            {states.map((state, i) => (
              <span key={state + i} className="flex items-center" style={{ gap: "2rem" }}>
                <span
                  className="font-medium uppercase tracking-wider text-[0.62rem] whitespace-nowrap"
                  style={{ color: i % 4 === 0 ? "var(--gold)" : "var(--white-50)" }}
                >
                  {state}
                </span>
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ backgroundColor: "var(--line-strong)" }}
                />
              </span>
            ))}
            <span
              className="font-bold uppercase tracking-widest text-[0.62rem] whitespace-nowrap"
              style={{ color: "var(--gold)" }}
            >
              APPLY NOW
            </span>
            <span
              className="w-1 h-1 rounded-full inline-block"
              style={{ backgroundColor: "var(--blue)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
