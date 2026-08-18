"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { STATES } from "../../../data/states";

export default function StateGridHome() {
  const [showAll, setShowAll] = useState(false);
  const featuredStates = STATES.slice(0, 12);
  const visibleStates = showAll ? featuredStates : featuredStates.slice(0, 6);

  return (
    <section
      id="states"
      className="relative overflow-hidden bg-[#050714] text-white py-20 lg:py-28 border-b border-white/10"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6 border-b border-white/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              Statutory Jurisdictions
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              28 States <span className="gold-metallic-text">&amp; 8 UTs</span>
            </h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#CBD5E1]" style={{ fontFamily: "var(--font-body)" }}>
            Controlling Authorities · Direct Dossier Filing
          </span>
        </div>

        {/* State Tiles Grid with Multi-Shade Depth */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {visibleStates.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              className="group relative flex flex-col justify-between h-[146px] p-5 rounded-2xl border border-[rgba(200,155,60,0.22)] bg-gradient-to-b from-[#0E1B33] to-[#081020] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:from-[#14284D] hover:to-[#0A1428]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]" style={{ fontFamily: "var(--font-body)" }}>
                  {s.slug.toUpperCase()}
                </span>
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37] opacity-90" />
              </div>

              <div>
                <span className="font-bold line-clamp-1 text-base text-white group-hover:text-[#F5D061] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {s.name}
                </span>
                <div className="mt-2 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-wider text-[#94A3B8]">
                  <span>{s.validityYears}-Yr License</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#D4AF37] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All / Toggle CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-[#FFF6D9]/15 to-[#D4AF37]/20 hover:from-[#D4AF37] hover:to-[#C89B3C] hover:text-[#050714] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F5D061] transition-all duration-200 shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>{showAll ? "Show Fewer States" : "See More States (+6 More)"}</span>
            <ArrowUpRight className={`h-4 w-4 transition-transform duration-200 ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </button>

          <Link
            href="/states"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#0A1224] hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>All 28 State Dossiers</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
