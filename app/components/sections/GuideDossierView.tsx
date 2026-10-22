"use client";

import { GlassCard, Section } from "../../../components/v3/PagePrimitives";
import FormattedText from "../../../components/FormattedText";
import type { Guide } from "../../../data/guides";

interface GuideDossierViewProps {
  guide: Guide;
}

export default function GuideDossierView({ guide }: GuideDossierViewProps) {
  return (
    <div className="space-y-12 py-6">
      {/* Executive Hero Summary */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-[var(--gold)]/30 text-[var(--gold-bright)] text-xs font-bold uppercase tracking-wider">
            Statutory Guide
          </span>
          <span className="break-words text-xs font-medium tracking-wide text-[var(--white-70)]">
            Ref: GUIDE-{guide.slug.toUpperCase()}
          </span>
        </div>

        <FormattedText
          text={guide.description}
          as="p"
          className="mt-6 text-base md:text-lg leading-relaxed text-[var(--white-70)] font-normal block"
        />
      </GlassCard>

      {/* Guide Sections */}
      <div className="space-y-8">
        {guide.sections.map((sec: { h: string; p: string }, idx: number) => (
          <Section key={idx} className="space-y-5 border-b border-white/15 pb-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-[1.12] text-white tracking-[-0.025em] sm:text-4xl">
              {sec.h}
            </h2>
            <FormattedText
              text={sec.p}
              as="p"
              className="max-w-[70ch] text-base font-normal leading-relaxed text-[var(--white-70)] block"
            />
          </Section>
        ))}
      </div>
    </div>
  );
}

