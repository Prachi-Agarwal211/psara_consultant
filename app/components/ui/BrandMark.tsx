"use client";

import Image from "next/image";

export default function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0">
        <Image
          src="/logo.png"
          alt="PSARA Consultant India"
          fill
          className="object-contain"
          sizes="48px"
          priority
        />
      </div>
      <div className="text-left">
        <span className="block font-[family-name:var(--font-display)] text-base font-medium uppercase tracking-[0.14em] text-[var(--gold-soft)]">
          PSARA
        </span>
        <span className="block font-[family-name:var(--font-label)] text-[10px] tracking-[0.22em] text-[var(--cream-dim)]">
          CONSULTANT INDIA
        </span>
      </div>
    </div>
  );
}
