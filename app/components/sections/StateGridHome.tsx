"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { STATES } from "../../../data/states";
import Reveal from "../ui/Reveal";

const STATE_IMAGES: Record<string, string> = {
  delhi: "/assets/images/generated/state-delhi-ncr.jpg",
  maharashtra: "/assets/images/generated/state-maharashtra.jpg",
  karnataka: "/assets/images/generated/state-karnataka.jpg",
  "tamil-nadu": "/assets/images/generated/state-tamil-nadu.jpg",
  "uttar-pradesh": "/assets/images/generated/state-uttar-pradesh.jpg",
  rajasthan: "/assets/images/generated/theme-govt-corridor.jpg",
  haryana: "/assets/images/generated/theme-industrial-night.jpg",
  gujarat: "/assets/images/generated/theme-guard-patrol.jpg",
};

export default function StateGridHome() {
  const [showAll, setShowAll] = useState(false);
  const featuredStates = STATES.slice(0, 12);
  const visibleStates = showAll ? featuredStates : featuredStates.slice(0, 6);

  return (
    <section id="states" className="relative overflow-hidden bg-[#FFFDF5] py-16 text-[#0B1E3B] sm:py-20 lg:py-24">
      {/* faint india-map backdrop */}
      <Image src="/assets/images/india-map.svg" alt="" aria-hidden width={560} height={672} className="pointer-events-none absolute -right-24 top-10 w-[min(46vw,520px)] opacity-[0.07]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
        <div className="flex flex-col justify-between gap-4 border-b border-[#E8DFC8] pb-7 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#B35400]">36 States & UTs · Live Filing Desks</p>
            <h2 className="text-balance font-black leading-[1.02]" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", fontFamily: "var(--font-display)" }}>
              Apna state chuno, <span className="text-[#B35400]">fees aur time dekho.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#33465F]">Har state ka Controlling Authority, timeline aur fee slab alag hai. Card kholo — poora checklist milega.</p>
        </div>
        </Reveal>

        <Reveal delay={110} variant="scale">
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleStates.map((s) => {
            const img = STATE_IMAGES[s.slug] ?? "/assets/images/generated/theme-govt-corridor.jpg";
            return (
              <Link key={s.slug} href={`/states/${s.slug}`} className="card-lift group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl border border-[#E8DFC8] bg-white shadow-sm hover:border-[#E76F00]">
                <Image src={img} alt={`${s.name} PSARA license guide`} fill className="zoom-slow object-cover" sizes="(max-width:1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B] via-[#0B1E3B]/45 to-transparent" />
                <div className="relative flex items-end justify-between gap-3 p-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#FFB25E]"><MapPin className="h-3 w-3" />{s.validityYears}-Yr License</div>
                    <div className="mt-1 text-lg font-black text-white">{s.name}</div>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E76F00] text-white transition group-hover:bg-white group-hover:text-[#0B1E3B]"><ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </Link>
            );
          })}
        </div>
        </Reveal>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => setShowAll((p) => !p)} className="rounded-xl border-2 border-[#0B1E3B] px-7 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0B1E3B] hover:bg-[#0B1E3B] hover:text-white">
            {showAll ? "Show Less" : "See More States (+6)"}
          </button>
          <Link href="/states" className="btn-shine rounded-xl grad-saffron px-7 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0B1E3B] hover:brightness-105">All 36 States & UTs</Link>
        </div>
      </div>
    </section>
  );
}
