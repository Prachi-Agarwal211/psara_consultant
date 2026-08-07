"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { CITIES } from "../../../data/cities";
import { getLocationAccent, accentStyleVars } from "../../lib/location-accent";

const PAGE_SIZE = 72;

export default function CityExplorerView() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const stateNames = useMemo(
    () => Array.from(new Set(CITIES.map((c) => c.stateName))).sort(),
    []
  );

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CITIES.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.stateName.toLowerCase().includes(q);
      const matchesState =
        selectedState === "All" || c.stateName === selectedState;
      return matchesSearch && matchesState;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [search, selectedState]);

  // Reset the progressive window whenever the filter changes
  const shown = filteredCities.slice(0, visible);

  const handleFilterChange = (fn: () => void) => {
    setVisible(PAGE_SIZE);
    fn();
  };

  return (
    <div className="space-y-8">
      {/* Search & State Selector */}
      <div data-section-transition data-transition="fade" className="grid grid-cols-1 md:grid-cols-12 gap-4 border border-white/10 bg-white/[0.02] p-4">
        {/* Search */}
        <div className="relative md:col-span-8">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--gold-bright)]" />
          <input
            type="text"
            placeholder={`Search ${CITIES.length}+ Indian cities or districts…`}
            value={search}
            onChange={(e) => handleFilterChange(() => setSearch(e.target.value))}
            className="w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white outline-none placeholder-[var(--white-40)] transition-colors focus:border-[var(--gold)]"
            aria-label="Search cities"
          />
        </div>

        {/* State filter */}
        <div className="md:col-span-4">
          <select
            value={selectedState}
            onChange={(e) => handleFilterChange(() => setSelectedState(e.target.value))}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-white outline-none transition-colors focus:border-[var(--gold)]"
            aria-label="Filter by state"
          >
            <option value="All" className="bg-[var(--void)] text-white">All States ({stateNames.length})</option>
            {stateNames.map((s) => (
              <option key={s} value={s} className="bg-[var(--void)] text-white">{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-[var(--white-55)]">
        <span>Showing <strong className="text-white">{shown.length}</strong> of <strong className="text-white">{filteredCities.length}</strong> cities</span>
        {selectedState !== "All" && (
          <button type="button" onClick={() => handleFilterChange(() => setSelectedState("All"))} className="text-[var(--gold-bright)] underline">
            Clear filter
          </button>
        )}
      </div>

      {/* City Grid — each tile carries its own deterministic accent */}
      <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {shown.map((c) => {
          const acc = getLocationAccent(c.slug);
          const accVars = accentStyleVars(acc) as CSSProperties;
          return (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              style={accVars}
              className="group relative flex items-center justify-between overflow-hidden rounded border border-white/10 bg-white/[0.02] p-3.5 transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc hover:bg-acc-soft"
            >
              <span
                className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-acc transition-[color,border-color,background-color] duration-500 group-hover:w-full"
                aria-hidden
              />
              <div>
                <p className="text-sm font-bold text-white transition-colors group-hover:text-acc-bright">
                  {c.name}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[var(--white-40)]">
                  {c.stateName}
                </p>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--white-40)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc-bright" />
            </Link>
          );
        })}
      </div>

      {/* Load more */}
      {visible < filteredCities.length && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn-magnetic"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Load {Math.min(PAGE_SIZE, filteredCities.length - visible)} more cities</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {filteredCities.length === 0 && (
        <div className="border border-white/10 bg-white/[0.01] py-12 text-center">
          <p className="text-sm text-[var(--white-55)]">No cities found matching &quot;{search}&quot;.</p>
        </div>
      )}
    </div>
  );
}
