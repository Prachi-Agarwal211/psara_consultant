"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { STATES } from "../../../data/states";

export default function StateGridHome() {
  const featuredStates = STATES.slice(0, 12);

  return (
    <section
      id="states"
      data-section-transition
      data-transition="clip-right"
      className="relative overflow-hidden section-night py-[var(--section-y)]"
    >
      {/* Dot grid + electric glow */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
      <div className="pointer-events-none absolute top-0 right-0 w-[40vw] h-[50vh]" style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(0,102,255,0.08) 0%, transparent 60%)" }} aria-hidden />

      <div className="relative z-10 px-[var(--gutter)] max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 mb-12 gap-6 border-b border-white/10">
          <div>
            <span className="meta-bracket mb-4 text-xs! text-[var(--gold)]! border-[var(--gold)]/30! inline-block" style={{ fontFamily: "var(--font-body)" }}>
              ( STATUTORY JURISDICTIONS )
            </span>
            <h2
              className="display-mega text-white font-bold mt-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              28 States <span className="text-metal">&amp; UTs</span>
            </h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/50" style={{ fontFamily: "var(--font-body)" }}>
            Controlling Authorities · Direct Dossier Filing
          </span>
        </div>

        {/* State Tiles — hover dimming language (voyeur-verite DNA) */}
        <div className="state-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredStates.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              data-cursor="State Dossier"
              className="state-tile group relative flex flex-col justify-between h-[132px] p-4 overflow-hidden border border-white/10 bg-white/[0.02] transition-[color,border-color,background-color] duration-300 hover:border-[var(--gold)]/50 hover:bg-white/[0.05]"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-[var(--gold-bright)] transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                {s.slug.toUpperCase()} · STATE
              </span>

              <div>
                <h3 className="font-bold line-clamp-1 text-[0.95rem] text-white group-hover:text-[var(--gold-bright)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {s.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
                    {s.validityYears}-Yr · {s.applicationMode?.split(" ")[0] ?? "Online"}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-white/50 transition-[color,border-color,background-color] duration-300 group-hover:text-[var(--gold-bright)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>

              {/* Corner accent */}
              <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t border-l border-[var(--gold)]/0 transition-[color,border-color,background-color] duration-300 group-hover:border-[var(--gold)]/60" aria-hidden />
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50" style={{ fontFamily: "var(--font-body)" }}>
            State-specific rules, fees &amp; authorities — updated to 2026
          </p>
          <Link
            href="/states"
            data-cursor="All States"
            className="btn-magnetic"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Explore All 28 State Dossiers</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
