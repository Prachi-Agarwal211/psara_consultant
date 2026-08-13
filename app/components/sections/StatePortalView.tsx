"use client";

import { useState } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import { STATES } from "../../../data/states";
import { getLocationAccent, accentStyleVars } from "../../lib/location-accent";

export default function StatePortalView() {
  const [search, setSearch] = useState("");

  const filteredStates = STATES.filter((s) => {
    return s.name.toLowerCase().includes(search.toLowerCase()) ||
           s.slug.toLowerCase().includes(search.toLowerCase()) ||
           s.capital.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-10 bg-[#FFFEF9] text-[#0F3C65]">
      {/* Search Bar */}
      <div data-section-transition data-transition="fade" className="rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#C89B3C]" />
          <input
            type="text"
            placeholder="Search State, Union Territory, or Capital…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#0F3C65]/20 bg-white pl-12 pr-4 py-3.5 text-sm font-medium text-[#0F3C65] outline-none placeholder-[#486581] transition-all focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/20 shadow-inner"
          />
        </div>
      </div>

      {/* State Cards Grid */}
      <div data-stagger className="state-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((s) => {
          const acc = getLocationAccent(s.slug);
          const accVars = accentStyleVars(acc) as CSSProperties;
          return (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              style={accVars}
              className="group relative overflow-hidden rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-6 shadow-sm transition-all duration-300 hover:border-[#C89B3C] hover:bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#C89B3C]">
                    <MapPin className="h-3.5 w-3.5 text-[#C89B3C]" /> {s.validityYears}-Year License
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#0F3C65] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C89B3C] stroke-[2.5]" />
                </div>

                <h2 className="mt-3 text-xl font-black text-[#0F3C65] group-hover:text-[#0A233F]" style={{ fontFamily: "var(--font-display)" }}>
                  {s.name}
                </h2>

                <p className="mt-2 text-xs font-medium text-[#486581] line-clamp-2">
                  {s.authority}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#0F3C65]/10 pt-3 text-[11px] text-[#486581] font-bold">
                <span>{s.cities ? `${s.cities.length} Cities` : "Statewide Coverage"}</span>
                <span className="font-black text-[#0F3C65] group-hover:text-[#C89B3C]">View Guide &rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredStates.length === 0 && (
        <div className="rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] py-12 text-center">
          <p className="text-sm font-medium text-[#486581]">No States found matching &quot;{search}&quot;.</p>
        </div>
      )}
    </div>
  );
}
