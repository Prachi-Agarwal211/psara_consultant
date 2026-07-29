"use client";

import { Shield } from "lucide-react";

export default function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full p-px" style={{ background: "var(--grad-gold)" }}>
        <div
          className="flex h-full w-full items-center justify-center rounded-full"
          style={{ background: "var(--obsidian)" }}
        >
          <Shield className="h-5 w-5" style={{ color: "var(--gold-soft)" }} />
        </div>
      </div>
      <div className="text-left">
        <span className="block font-[family-name:var(--font-display)] text-sm font-medium uppercase tracking-[0.14em] text-[var(--gold-soft)]">
          PSARA
        </span>
        <span className="block font-[family-name:var(--font-label)] text-[9px] tracking-[0.22em] text-[var(--cream-dim)]">
          CONSULTANT INDIA
        </span>
      </div>
    </div>
  );
}
