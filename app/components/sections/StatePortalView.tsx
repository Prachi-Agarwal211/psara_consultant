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
    <div className="space-y-10">
      {/* Search Bar */}
      <div data-section-transition data-transition="fade" className="border border-white/10 bg-white/[0.02] p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--gold-bright)]" />
          <input
            type="text"
            placeholder="Search State, Union Territory, or Capital…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-sm text-white outline-none placeholder-[var(--white-40)] transition-colors focus:border-[var(--gold)]"
          />
        </div>
      </div>

      {/* State Cards Grid — each card gets its own deterministic accent */}
      <div data-stagger className="state-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((s) => {
          const acc = getLocationAccent(s.slug);
          const accVars = accentStyleVars(acc) as CSSProperties;
          return (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              style={accVars}
              className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-[color,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-acc  flex flex-col justify-between"
            >
              {/* Ghost index */}
              <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 font-mono text-5xl font-bold text-acc opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.16]">
                {s.slug.slice(0, 2).toUpperCase()}
              </span>
              {/* Corner accent */}
              <span
                className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 bg-acc transition-[color,border-color,background-color] duration-500 group-hover:w-full"
                aria-hidden
              />
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-acc-bright">
                    <MapPin className="h-3 w-3" /> {s.validityYears}-Year License
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--white-40)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc-bright" />
                </div>

                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold text-white transition-colors group-hover:text-acc-bright">
                  {s.name}
                </h3>

                <p className="mt-2 text-xs text-[var(--white-55)] line-clamp-2">
                  {s.authority}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-[var(--white-40)]">
                <span>{s.cities ? `${s.cities.length} Cities` : "Statewide Coverage"}</span>
                <span className="font-bold text-acc-bright">View Guide →</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredStates.length === 0 && (
        <div className="border border-white/10 bg-white/[0.01] py-12 text-center">
          <p className="text-sm text-[var(--white-55)]">No States found matching &quot;{search}&quot;.</p>
        </div>
      )}
    </div>
  );
}
