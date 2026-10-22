"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { GlassCard } from "../../../components/v3/PagePrimitives";
import { STATES } from "../../../data/states";

export default function StatePortalView() {
  const [search, setSearch] = useState("");

  const filteredStates = STATES.filter((s) => {
    return s.name.toLowerCase().includes(search.toLowerCase()) ||
           s.slug.toLowerCase().includes(search.toLowerCase()) ||
           s.capital.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="state-portal space-y-10 text-white">
      {/* Header Info */}
      <div className="flex flex-col justify-between gap-5 border-b border-white/15 pb-7 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FFB25E] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Jurisdiction Directory
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white leading-[1.1]" style={{ fontFamily: "var(--font-display)" }}>
            Find Your State &amp; Union Territory Desk
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#E2E8F0]">
            Open a state dossier for authority guidelines, license fees, police verification procedures, and city-level filing desks.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[.08em] text-[#CBD5E1]">
          <span className="grid h-10 w-10 place-items-center rounded-xl text-[#FFFFFF] tabular-nums font-bold" style={{ background: "var(--grad-gold-metallic)" }}>{STATES.length}</span>
          <span>State Desks<br />Indexed</span>
        </div>
      </div>

      {/* Search Bar */}
      <GlassCard className="p-3 sm:p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FFB25E]" />
          <input
            type="search"
            aria-label="Search by State, Union Territory, or Capital city"
            placeholder="Search by State, Union Territory, or Capital city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0B1E3B] pl-12 pr-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/40 transition-[border-color,box-shadow,transform] focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20"
          />
        </div>
      </GlassCard>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 gap-x-9 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStates.map((s) => (
          <Link
            key={s.slug}
            href={`/states/${s.slug}`}
            className="v3-directory-link group relative flex min-w-0 flex-col justify-between gap-6 border-b border-white/20 py-7 transition-colors duration-200 hover:border-[#FFB25E]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.1em] text-[#FFB25E]">
                  <MapPin className="h-3.5 w-3.5 text-[#FF7A00]" /> {s.validityYears}-Year License
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFB25E]" />
              </div>

              <h3 className="text-3xl font-normal text-white group-hover:text-[#FFB25E] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                {s.name}
              </h3>

              <p className="mt-2 text-xs font-normal leading-relaxed text-[#CBD5E1]">
                {s.authority}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-bold text-[#94A3B8]">
              <span>{s.cities ? `${s.cities.length} Cities` : "Statewide Coverage"}</span>
              <span className="font-bold text-[#FFB25E] group-hover:underline">View Guide &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="rounded-xl border border-white/15 py-12 text-center">
          <p className="text-sm text-[#CBD5E1]">No States found matching &quot;{search}&quot;.</p>
        </div>
      )}
    </div>
  );
}
