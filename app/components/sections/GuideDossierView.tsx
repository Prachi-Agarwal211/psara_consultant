"use client";

import { BookOpen, CheckCircle, FileText, ArrowRight } from "lucide-react";
import type { Guide } from "../../../data/guides";

import FormattedText from "../../../components/FormattedText";

interface GuideDossierViewProps {
  guide: Guide;
}

export default function GuideDossierView({ guide }: GuideDossierViewProps) {
  return (
    <div className="space-y-12 py-6" itemScope itemType="https://schema.org/Article">
      <meta itemProp="headline" content={guide.title} />
      <meta itemProp="description" content={guide.description} />

      {/* ════════════════════════════════════════════
          1. GUIDE DOSSIER HERO SUMMARY
          ════════════════════════════════════════════ */}
      <div className="relative border border-[var(--line-gold)] bg-[color-mix(in_srgb,var(--warm-dark-2)_70%,transparent)] p-6 md:p-10 backdrop-blur-md overflow-hidden ambient-glow-bg shimmer-border">
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />

        <div className="flex items-center gap-3 pb-4 border-b border-[var(--line)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--gold-faint)] border border-[var(--gold)] text-[var(--gold)] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            Statutory Practice Guide
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--cream-dim)]">
            Ref: GUIDE-{guide.slug.toUpperCase()}
          </span>
        </div>

        <FormattedText
          text={guide.description}
          as="p"
          className="mt-6 text-base md:text-lg leading-relaxed text-[var(--cream-soft)] font-medium block"
        />
      </div>

      {/* ════════════════════════════════════════════
          2. STRUCTURED SECTIONS
          ════════════════════════════════════════════ */}
      <div className="space-y-8">
        {guide.sections.map((sec, idx) => (
          <section key={idx} className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--gold)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
                {sec.h}
              </h2>
            </div>
            <FormattedText
              text={sec.p}
              as="p"
              className="text-sm md:text-base font-medium leading-relaxed text-[var(--text-dim)] block"
            />
          </section>
        ))}
      </div>
    </div>
  );
}
