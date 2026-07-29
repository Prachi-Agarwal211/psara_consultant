"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Shield,
  FileCheck,
  Building2,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  FileText
} from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import type { StateInfo } from "../../../data/states";
import type { CityInfo } from "../../../data/cities";
import type { generateStateContent } from "../../../lib/seo-content";

type StateContent = ReturnType<typeof generateStateContent>;

interface StateDossierViewProps {
  state: StateInfo;
  content: StateContent;
  cities: CityInfo[];
  offices: Array<{ city: string; badge: string; address: string; pin: string; mapUrl?: string }>;
}

export default function StateDossierView({
  state,
  content,
  cities,
}: StateDossierViewProps) {
  const [activeTab, setActiveTab] = useState<"process" | "documents">("process");

  return (
    <div className="space-y-16 py-6" itemScope itemType="https://schema.org/HowTo">
      <meta itemProp="name" content={`How to apply for PSARA License in ${state.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* ════════════════════════════════════════════
          1. EXECUTIVE DOSSIER HERO SUMMARY
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
              <Shield className="h-3.5 w-3.5" />
              State Licensing Dossier
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--cream-dim)]">
              Ref: PSARA-{state.slug.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-[var(--cream-dim)]">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" /> Capital: <strong className="text-[var(--cream)]">{state.capital}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[var(--gold)]" /> Validity: <strong className="text-[var(--cream)]">{state.validityYears} Years</strong>
            </span>
          </div>
        </div>

        {/* Intro text cards with AI-answer markup */}
        <div className="mt-6 space-y-4" data-ai-answer="state-overview">
          {content.intro.map((p, idx) => (
            <FormattedText
              key={idx}
              text={p}
              as="p"
              className="text-base md:text-lg leading-relaxed text-[var(--cream-soft)] font-medium block"
            />
          ))}
        </div>

        {/* Key Framework Parameters */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--line)]">
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] hover:border-[var(--gold)] transition-colors">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold)]">Application Mode</span>
            <span className="mt-1 block text-sm font-bold text-[var(--cream)]">{state.applicationMode}</span>
          </div>
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] hover:border-[var(--gold)] transition-colors">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold)]">Rules Framework</span>
            <span className="mt-1 block text-sm font-bold text-[var(--cream)]">{state.rulesNote}</span>
          </div>
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] hover:border-[var(--gold)] transition-colors">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold)]">Coverage Potential</span>
            <span className="mt-1 block text-sm font-bold text-[var(--cream)]">{state.cities.length}+ Major Districts</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. CONTROLLING AUTHORITY INFOCARD
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-gold-metallic">
            Controlling Authority & Statutory Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-6 md:p-8 border border-[var(--line)] bg-[var(--obsidian-soft)] space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
              <Scale className="h-4 w-4" />
              Jurisdiction & Administration
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

          <div className="md:col-span-4 p-6 border border-[var(--line-gold)] bg-[color-mix(in_srgb,var(--warm-dark-2)_40%,transparent)] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold)]">Fast-Track Compliance Checklist</span>
              <h3 className="mt-2 text-lg font-bold text-[var(--cream)]">Ready for Authority Inspection?</h3>
              <p className="mt-2 text-xs text-[var(--text-dim)] leading-relaxed">
                Ensure your office address proof and training institute agreement conform strictly with state-notified rules before submission.
              </p>
            </div>
            <a href="#state-enquiry" className="btn-gold w-full text-center text-xs py-3 font-bold uppercase tracking-wider">
              Verify Your Documents Now
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. INTERACTIVE PROCESS ROADMAP & TABS
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
              {content.processHeading}
            </h2>
          </div>

          {/* Tab selectors for quick navigation */}
          <div className="flex gap-2 p-1 border border-[var(--line)] bg-[var(--obsidian)]">
            {(["process", "documents"] as const).map((tab) => (
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

        {/* Tab 1: Step-by-Step Approval Process Cards */}
        {activeTab === "process" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              const title = parts.length > 1 ? parts[0] : `Step ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;

              return (
                <div
                  key={idx}
                  className="group relative border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 transition-all hover:border-[var(--gold)] hover:bg-[color-mix(in_srgb,var(--warm-dark-2)_80%,transparent)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--gold)] opacity-80 group-hover:opacity-100 transition-opacity">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider border border-[var(--line-gold)] text-[var(--gold-soft)]">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--text-dim)]">
                    {desc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-semibold text-[var(--cream-dim)]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--gold)]" /> Verified Track
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Document Checklist Grid */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[var(--cream)] flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-[var(--gold)]" /> Mandatory Document Checklist ({state.name})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-[var(--line)] bg-[var(--obsidian-soft)]">
                  <span className="p-1 rounded bg-[var(--gold-faint)] text-[var(--gold)] shrink-0 mt-0.5">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-[var(--cream)]">{doc}</span>
                    <span className="text-xs text-[var(--text-dim)]">Required for Controlling Authority dossier verification</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* ════════════════════════════════════════════
          4. STATUTORY REQUIREMENTS: TRAINING & REJECTION
          ════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Training Institute MOU */}
        <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
            <Building2 className="h-4 w-4" />
            {content.trainingHeading}
          </div>
          {content.training.map((p, idx) => (
            <p key={idx} className="text-sm font-medium leading-relaxed text-[var(--text-dim)]">
              {p}
            </p>
          ))}
        </div>

        {/* Rejection Reasons Warning Card */}
        <div className="border border-red-900/40 bg-[color-mix(in_srgb,red_5%,var(--obsidian-soft))] p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-400">
            <AlertTriangle className="h-4 w-4" />
            {content.rejectionHeading}
          </div>
          <ul className="space-y-3">
            {content.rejections.map((rej, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm font-medium text-[var(--cream-dim)]">
                <span className="text-red-400 font-bold">•</span>
                <span>{rej}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. MARKET SECTORS & WHY CHOOSE US
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            {content.marketHeading}
          </h2>
        </div>

        <div className="p-6 border border-[var(--line)] bg-[var(--obsidian-soft)] space-y-6">
          {content.market.map((p, idx) => (
            <p key={idx} className="text-sm font-medium leading-relaxed text-[var(--text-dim)]">
              {p}
            </p>
          ))}

          {state.sectors.length > 0 && (
            <div className="pt-4 border-t border-[var(--line)]">
              <span className="block text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-3">
                High-Demand Security Sectors in {state.name}:
              </span>
              <div className="flex flex-wrap gap-2">
                {state.sectors.map((sec) => (
                  <span
                    key={sec}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-[var(--line-gold)] bg-[var(--obsidian)] text-[var(--cream)]"
                  >
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Points */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            {content.whyHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.whyPoints.map((pt, idx) => (
            <div key={idx} className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-[var(--gold)] shrink-0 mt-1" />
              <span className="text-sm font-bold text-[var(--cream)]">{pt}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. INTERACTIVE STATE FAQS
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Frequently Asked Questions — {state.name}
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
