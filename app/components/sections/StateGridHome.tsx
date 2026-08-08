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
      className="relative overflow-hidden bg-[#FBF7F0] text-[#0F3C65] py-20 lg:py-28"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-[#0F3C65]/15">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C] block mb-2" style={{ fontFamily: "var(--font-body)" }}>
              ( STATUTORY JURISDICTIONS )
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0F3C65]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              28 States <span className="text-[#C89B3C]">&amp; UTs</span>
            </h2>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#334E68]" style={{ fontFamily: "var(--font-body)" }}>
            Controlling Authorities · Direct Dossier Filing
          </span>
        </div>

        {/* State Tiles */}
        <div className="state-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {featuredStates.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              data-cursor="State Dossier"
              className="state-tile group relative flex flex-col justify-between h-[135px] p-4 rounded-2xl border border-[#0F3C65]/15 bg-white shadow-sm transition-all duration-300 hover:border-[#C89B3C] hover:bg-[#0A233F] hover:text-white"
            >
              <span className="font-mono text-xs font-black uppercase tracking-widest text-[#C89B3C] group-hover:text-[#FFF2BA] transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                {s.slug.toUpperCase()} · STATE
              </span>

              <div>
                <h3 className="font-black line-clamp-1 text-sm md:text-base text-[#0F3C65] group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {s.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[0.68rem] font-black uppercase tracking-wider text-[#486581] group-hover:text-slate-300">
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
