"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Award, MapPin, Building2 } from "lucide-react";
import { counterStampAnimation } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

const stats = [
  {
    target: 10,
    suffix: "+ Years",
    label: "PSARA Statutory Expertise",
    desc: "Direct Controlling Authority filing experience",
    icon: ShieldCheck,
  },
  {
    target: 500,
    suffix: "+",
    label: "Licenses Issued",
    desc: "100% grant success across multiple States",
    icon: Award,
  },
  {
    target: 28,
    suffix: " States",
    label: "Pan-India Coverage",
    desc: "Dedicated state controlling authority desks",
    icon: MapPin,
  },
  {
    target: 12,
    suffix: " Offices",
    label: "Physical Presence",
    desc: "Jaipur HQ, Delhi, Mumbai, Ahmedabad, Indore & Pan-India",
    icon: Building2,
  },
];

export default function StatsBar() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    counterStampAnimation(root.current, "[data-count]");
  }, []);

  return (
    <section id="stats" ref={root} className="relative z-20 border-y border-[var(--line-gold)] bg-[var(--obsidian-2)] py-8">
      {/* Decorative ornament chain — Jasmine inspired */}
      <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 z-10">
        <div className="ornament-chain px-[var(--gutter)]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="orn-link">
              <div className="t-line">
                <div className="t-line__1"></div>
                <div className="t-line__2"></div>
                <div className="t-line__3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[var(--page-max)] px-[var(--gutter)]">
        {/* Jasmine-style section heading with decorative line */}
        <div className="section-heading-frame mb-6">
          <div className="i-line-wrapper">
            <div className="i-line"></div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] shrink-0">
            STATUTORY DOSSIER METRICS
          </span>
          <div className="i-line"></div>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between border-l border-[var(--line-gold)] pl-5 relative"
              >
                {/* Corner ornament on each stat card */}
                <CornerOrnament position="tr" size="sm" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-baseline gap-2">
                      <span className="num-marker num-marker-sm text-xs">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        data-count={item.target}
                        data-suffix={item.suffix}
                        className="text-2xl font-bold tracking-tight sm:text-3xl font-[family-name:var(--font-display)] text-[var(--gold)] will-change-transform"
                      >
                        {item.target}{item.suffix}
                      </span>
                    </span>
                    <Icon className="h-4 w-4 text-[var(--gold)]/50" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--cream)]">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-dim)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
