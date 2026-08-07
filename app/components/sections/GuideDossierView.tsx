"use client";

import FormattedText from "../../../components/FormattedText";
import type { Guide } from "../../../data/guides";

interface GuideDossierViewProps {
  guide: Guide;
}

export default function GuideDossierView({ guide }: GuideDossierViewProps) {
  return (
    <div className="space-y-12 py-6">
      {/* Executive Hero Summary */}
      <div className="relative overflow-hidden border border-white/10 p-6 md:p-10" style={{ background: "rgba(2,8,20,0.4)" }}>
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-[var(--gold)]/30 text-[var(--gold-bright)] text-xs font-bold uppercase tracking-wider">
            Statutory Guide
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--white-40)]">
            Ref: GUIDE-{guide.slug.toUpperCase()}
          </span>
        </div>

        <FormattedText
          text={guide.description}
          as="p"
          className="mt-6 text-base md:text-lg leading-relaxed text-[var(--white-70)] font-normal block"
        />
      </div>

      {/* Guide Sections */}
      <div className="space-y-8">
        {guide.sections.map((sec: { h: string; p: string }, idx: number) => (
          <div key={idx} className="p-6 md:p-8 border border-white/10 bg-white/[0.02] space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white uppercase tracking-tight">
              {sec.h}
            </h2>
            <FormattedText
              text={sec.p}
              as="p"
              className="text-sm font-normal leading-relaxed text-[var(--white-70)] block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

