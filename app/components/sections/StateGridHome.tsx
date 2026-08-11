"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { STATES } from "../../../data/states";

export default function StateGridHome() {
  const [showAll, setShowAll] = useState(false);
  const featuredStates = STATES.slice(0, 12);
  const visibleStates = showAll ? featuredStates : featuredStates.slice(0, 6);

  return (
    <section
      id="states"
      data-section-transition
      data-transition="clip-right"
      className="relative overflow-hidden bg-gradient-to-b from-[#0A233F] via-[#0F3C65] to-[#07192C] text-white py-16 lg:py-24"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#C89B3C] blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#78A2D2] blur-3xl" />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 gap-6 border-b border-white/15">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#FFF2BA] block mb-2" style={{ fontFamily: "var(--font-body)" }}>
              ( STATUTORY JURISDICTIONS )
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              28 States <span className="text-[#FFF2BA]">&amp; UTs</span>
            </h2>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-300" style={{ fontFamily: "var(--font-body)" }}>
            Controlling Authorities · Direct Dossier Filing
          </span>
        </div>

        {/* State Tiles */}
        <div className="state-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleStates.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              className="state-tile group relative flex flex-col justify-between h-[130px] p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-[#FFF2BA] hover:bg-[#FFF2BA] hover:text-[#0F3C65]"
            >
              <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#FFF2BA] group-hover:text-[#0F3C65] transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                {s.slug.toUpperCase()}
              </span>

              <div>
                <span className="font-black line-clamp-1 text-sm md:text-base text-white group-hover:text-[#0F3C65] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {s.name}
                </span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[0.68rem] font-black uppercase tracking-wider text-slate-300 group-hover:text-[#0F3C65]/80">
                    {s.validityYears}-Yr · {s.applicationMode?.split(" ")[0] ?? "Online"}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-[#FFF2BA] transition-all duration-300 group-hover:text-[#0F3C65] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All / Toggle CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C89B3C] bg-[#FFF2BA] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-white transition-all shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>{showAll ? "Show Fewer States" : "See More States (+6 More)"}</span>
            <ArrowUpRight className={`h-4 w-4 stroke-[2.5] transition-transform duration-300 ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </button>

          <Link
            href="/states"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/20 transition-all"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>All 28 State Dossiers</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
