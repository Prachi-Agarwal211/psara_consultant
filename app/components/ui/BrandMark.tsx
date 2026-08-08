"use client";

import Image from "next/image";

interface BrandMarkProps {
  variant?: "dark" | "light";
}

export default function BrandMark({ variant = "light" }: BrandMarkProps) {
  const isDark = variant === "dark";

  return (
    <div
      data-cursor="PSARA Desk"
      className="group flex items-center gap-3.5 transition-transform duration-200"
    >
      <div
        className={`relative h-13 w-13 md:h-14 md:w-14 shrink-0 rounded border-2 p-1 shadow-lg transition-colors duration-200 ${
          isDark
            ? "border-[#0A233F]/30 bg-white shadow-[#0A233F]/10 group-hover:border-[#C59B27]"
            : "border-[var(--gold)]/50 bg-[#040D21] shadow-[var(--gold)]/10 group-hover:border-[var(--gold-bright)]"
        }`}
      >
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
          className={`block text-sm md:text-base font-black uppercase tracking-[0.2em] transition-colors ${
            isDark
              ? "text-[#0A233F] group-hover:text-[#C59B27]"
              : "text-white group-hover:text-[var(--gold-bright)]"
          }`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          PSARA
        </span>
        <span
          className={`block text-[0.58rem] md:text-[0.62rem] font-extrabold tracking-[0.24em] uppercase transition-colors ${
            isDark
              ? "text-[#0D3459] group-hover:text-[#0A233F]"
              : "text-sky-300 group-hover:text-white"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          Consultant India
        </span>
      </div>
    </div>
  );
}

