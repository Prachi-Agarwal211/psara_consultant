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
      <div className="relative border border-[var(--line-light)] bg-[var(--cream-bg)] p-6 md:p-10 rounded-lg shadow-sm overflow-hidden text-[var(--text-dark)]">
        <div className="flex items-center justify-between pb-6 border-b border-[var(--line-light)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--obsidian-bg)] text-white text-xs font-bold uppercase tracking-wider rounded">
            Statutory Guide
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-dark-muted)]">
            Ref: GUIDE-{guide.slug.toUpperCase()}
          </span>
        </div>

        <FormattedText
          text={guide.description}
          as="p"
          className="mt-6 text-base md:text-lg leading-relaxed text-[var(--text-dark-muted)] font-medium block"
        />
      </div>

      {/* Guide Sections */}
      <div className="space-y-8">
        {guide.sections.map((sec: { h: string; p: string }, idx: number) => (
          <div key={idx} className="p-6 md:p-8 rounded-lg border border-[var(--line-light)] bg-white shadow-sm space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--text-dark)] uppercase tracking-tight">
              {sec.h}
            </h2>
            <FormattedText
              text={sec.p}
              as="p"
              className="text-sm font-medium leading-relaxed text-[var(--text-dark-muted)] block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
