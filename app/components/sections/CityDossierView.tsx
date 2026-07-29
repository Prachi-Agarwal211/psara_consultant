"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Building,
  Shield,
  FileCheck,
  ChevronDown,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  FileText,
  Layers
} from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import type { CityInfo } from "../../../data/cities";
import type { StateInfo } from "../../../data/states";
import type { generateCityContent } from "../../../lib/seo-content";

type CityContent = ReturnType<typeof generateCityContent>;

interface CityDossierViewProps {
  city: CityInfo;
  state?: StateInfo;
  content: CityContent;
  siblings: CityInfo[];
}

export default function CityDossierView({
  city,
  state,
  content,
  siblings,
}: CityDossierViewProps) {
  const [activeTab, setActiveTab] = useState<"process" | "documents" | "market">("process");

  return (
    <div className="space-y-16 py-6" itemScope itemType="https://schema.org/HowTo">
      <meta itemProp="name" content={`PSARA License in ${city.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* ════════════════════════════════════════════
          1. CITY DOSSIER HERO BADGE SUMMARY
          ════════════════════════════════════════════ */}
      <div className="relative border border-[var(--line-gold)] bg-[color-mix(in_srgb,var(--warm-dark-2)_70%,transparent)] p-6 md:p-10 backdrop-blur-md overflow-hidden ambient-glow-bg shimmer-border">
        {/* Corner ticks */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--gold-faint)] border border-[var(--gold)] text-[var(--gold)] text-xs font-bold uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5" />
              City Security Desk
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--cream-dim)]">
              {city.name}, {city.stateName}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-[var(--cream-dim)]">
            <span className="px-2 py-0.5 border border-[var(--line-gold)] text-[var(--gold)] font-bold uppercase text-[0.65rem]">
              Tier {city.tier} Market
            </span>
          </div>
        </div>

        {/* Intro text */}
        <div className="mt-6 space-y-4" data-ai-answer="city-overview">
          {content.intro.map((p, idx) => (
            <FormattedText
              key={idx}
              text={p}
              as="p"
              className="text-base md:text-lg leading-relaxed text-[var(--cream-soft)] font-medium block"
            />
          ))}
        </div>

        {/* Economy Tags / Key Sectors */}
        {city.economyTags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[var(--line)]">
            <span className="block text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-3">
              Key Local Commercial Sectors in {city.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {city.economyTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-[var(--line-gold)] bg-[var(--obsidian)] text-[var(--cream)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════
          2. STATE JURISDICTION & AUTHORITY FRAMEWORK
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            State Licensing Framework for {city.name}
          </h2>
        </div>

        <div className="p-6 md:p-8 border border-[var(--line)] bg-[var(--obsidian-soft)] space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[var(--line)]">
            <span className="text-sm font-bold text-[var(--gold)] flex items-center gap-2">
              <Shield className="h-4 w-4" /> Controlling Authority: {city.stateName}
            </span>
            {state && (
              <Link
                href={`/states/${state.slug}`}
                className="text-xs font-bold text-[var(--gold-soft)] underline flex items-center gap-1 hover:text-[var(--gold)]"
              >
                View Full State Rules for {state.name} <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
          {content.authorityBlock.map((p, idx) => (
            <FormattedText
              key={idx}
              text={p}
              as="p"
              className="text-sm font-medium leading-relaxed text-[var(--text-dim)] block"
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. INTERACTIVE PROCESS & DOCUMENTS
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
              {content.processHeading}
            </h2>
          </div>

          <div className="flex gap-2 p-1 border border-[var(--line)] bg-[var(--obsidian)]">
            {(["process", "documents", "market"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? "bg-[var(--gold)] text-[var(--obsidian)]"
                    : "text-[var(--cream-dim)] hover:text-[var(--cream)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Process Tab */}
        {activeTab === "process" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              const title = parts.length > 1 ? parts[0] : `Step ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;

              return (
                <div
                  key={idx}
                  className="group relative border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 transition-all hover:border-[var(--gold)]"
                >
                  <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--gold)] opacity-80">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-bold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--text-dim)]">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.documents.map((doc, idx) => (
              <div key={idx} className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] flex items-start gap-3">
                <FileText className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-[var(--cream)]">{doc}</span>
              </div>
            ))}
          </div>
        )}

        {/* Market Tab */}
        {activeTab === "market" && (
          <div className="p-6 border border-[var(--line)] bg-[var(--obsidian-soft)] space-y-4">
            <h3 className="text-lg font-bold text-[var(--cream)] flex items-center gap-2">
              <Building className="h-5 w-5 text-[var(--gold)]" /> Market Demand & Opportunity in {city.name}
            </h3>
            {content.market.map((p, idx) => (
              <p key={idx} className="text-sm font-medium leading-relaxed text-[var(--text-dim)]">
                {p}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════
          4. REJECTION WARNINGS & WHY CHOOSE US
          ════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-red-900/40 bg-[color-mix(in_srgb,red_5%,var(--obsidian-soft))] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-400">
            <AlertTriangle className="h-4 w-4" />
            {content.rejectionHeading}
          </div>
          <ul className="space-y-2 text-xs md:text-sm font-medium text-[var(--cream-dim)]">
            {content.rejections.map((rej, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>{rej}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
            <Sparkles className="h-4 w-4" />
            {content.whyHeading}
          </div>
          <ul className="space-y-2 text-xs md:text-sm font-medium text-[var(--cream)]">
            {content.whyPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[var(--gold)] font-bold">✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. CITY FAQS
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            FAQs — PSARA in {city.name}
          </h2>
        </div>

        <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
          {content.faqs.map((faq, idx) => (
            <details key={idx} className="group py-5 transition-colors hover:bg-[var(--obsidian-soft)]">
              <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-base font-bold text-[var(--cream)] flex items-center justify-between gap-4 px-2">
                <span className="flex items-center gap-2">
                  <span className="text-[var(--gold)] font-mono">Q{idx + 1}.</span>
                  {faq.q}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[var(--gold)] group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 px-2 text-sm font-medium leading-relaxed text-[var(--text-dim)] max-w-3xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
