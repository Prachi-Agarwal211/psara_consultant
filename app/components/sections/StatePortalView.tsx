"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
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
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F5D061] mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Jurisdiction Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Find Your State &amp; Union Territory Desk
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#E2E8F0]">
            Open a state dossier for authority guidelines, license fees, police verification procedures, and city-level filing desks.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[.08em] text-[#CBD5E1]">
          <span className="grid h-10 w-10 place-items-center rounded-xl text-[#241703] font-mono font-bold" style={{ background: "var(--grad-gold-metallic)" }}>{STATES.length}</span>
          <span>State Desks<br />Indexed</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#2A1853] to-[#120C27] p-3 shadow-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F5D061]" />
          <input
            type="text"
            placeholder="Search by State, Union Territory, or Capital city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#080714] pl-12 pr-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/40 transition-[border-color,box-shadow,transform] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
          />
        </div>
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStates.map((s) => (
          <Link
            key={s.slug}
            href={`/states/${s.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#2A1853] to-[#120C27] p-6 shadow-md transition-[border-color,box-shadow,transform,filter] duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:from-[#332066] hover:to-[#180D36]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.1em] text-[#F5D061]">
                  <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" /> {s.validityYears}-Year License
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F5D061]" />
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#F5D061] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                {s.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-xs font-normal leading-relaxed text-[#CBD5E1]">
                {s.authority}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-bold text-[#94A3B8]">
              <span>{s.cities ? `${s.cities.length} Cities` : "Statewide Coverage"}</span>
              <span className="font-bold text-[#F5D061] group-hover:underline">View Guide &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#2A1853] to-[#120C27] py-12 text-center">
          <p className="text-sm text-[#CBD5E1]">No States found matching &quot;{search}&quot;.</p>
        </div>
      )}
    </div>
  );
}
