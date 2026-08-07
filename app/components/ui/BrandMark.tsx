"use client";

import Image from "next/image";

export default function BrandMark() {
  return (
    <div
      data-cursor="PSARA Desk"
      className="group flex items-center gap-3.5 transition-transform duration-200"
    >
      <div className="relative h-13 w-13 md:h-14 md:w-14 shrink-0 rounded border-2 border-[var(--gold)]/50 bg-[#040D21] p-1 shadow-lg shadow-[var(--gold)]/10 transition-colors duration-200 group-hover:border-[var(--gold-bright)]">
        <Image
          src="/logo.png"
          alt="PSARA Consultant India"
          fill
          className="object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
          sizes="56px"
          priority
        />
      </div>
      <div className="text-left">
        <span
          className="block text-sm md:text-base font-extrabold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-[var(--gold-bright)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PSARA
        </span>
        <span
          className="block text-[0.58rem] md:text-[0.62rem] font-bold tracking-[0.24em] uppercase text-sky-300 transition-colors group-hover:text-white"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Consultant India
        </span>
      </div>
    </div>
  );
}
