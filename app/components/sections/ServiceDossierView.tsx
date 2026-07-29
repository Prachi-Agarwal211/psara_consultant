"use client";

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Users,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import type { Service } from "../../../data/services";

interface ServiceDossierViewProps {
  service: Service;
}

export default function ServiceDossierView({ service }: ServiceDossierViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "deliverables" | "process" | "audience">("overview");

  return (
    <div className="space-y-16 py-6" itemScope itemType="https://schema.org/Service">
      <meta itemProp="name" content={service.title} />
      <meta itemProp="description" content={service.short} />

      {/* ════════════════════════════════════════════
          1. SERVICE DOSSIER HERO SUMMARY
          ════════════════════════════════════════════ */}
      <div className="relative border border-[var(--line-gold)] bg-[color-mix(in_srgb,var(--warm-dark-2)_70%,transparent)] p-6 md:p-10 backdrop-blur-md overflow-hidden ambient-glow-bg shimmer-border">
        {/* Corner ticks */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--gold-faint)] border border-[var(--gold)] text-[var(--gold)] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            Specialized Practice
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--cream-dim)]">
            Service Dossier: {service.slug.toUpperCase()}
          </span>
        </div>

        <FormattedText
          text={service.description}
          as="p"
          className="mt-6 text-base md:text-lg leading-relaxed text-[var(--cream-soft)] font-medium block"
        />

        {/* Dynamic Section Blocks */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--line)]">
          {service.sections.map((sec, idx) => (
            <div key={idx} className="p-5 border border-[var(--line)] bg-[var(--obsidian-soft)] space-y-2">
              <h3 className="text-sm font-bold text-[var(--gold)] uppercase tracking-wider">{sec.h}</h3>
              <FormattedText text={sec.p} as="p" className="text-xs font-medium leading-relaxed text-[var(--text-dim)] block" />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. DELIVERABLES & SCOPE GRID
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
              What Is Included
            </h2>
          </div>

          <div className="flex gap-2 p-1 border border-[var(--line)] bg-[var(--obsidian)]">
            {(["overview", "deliverables", "process", "audience"] as const).map((tab) => (
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

        {/* Deliverables Tab */}
        {(activeTab === "deliverables" || activeTab === "overview") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.bullets.map((b, idx) => (
              <div key={idx} className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] flex items-start gap-3 hover:border-[var(--gold)] transition-colors">
                <CheckCircle2 className="h-4 w-4 text-[var(--gold)] shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-[var(--cream)]">{b}</span>
              </div>
            ))}
          </div>
        )}

        {/* Process Tab */}
        {activeTab === "process" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--gold)] opacity-80">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-bold text-[var(--cream)]">{step}</p>
              </div>
            ))}
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === "audience" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.whoFor.map((w, idx) => (
              <div key={idx} className="p-5 border border-[var(--line)] bg-[var(--obsidian-soft)] flex items-center gap-3">
                <Users className="h-5 w-5 text-[var(--gold)] shrink-0" />
                <span className="text-sm font-bold text-[var(--cream)]">{w}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════
          3. PROCESS & AUDIENCE MATRICES
          ════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <>
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
                Execution Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--gold)] opacity-80">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-bold text-[var(--cream)]">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
                Who This Service Is For
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.whoFor.map((w, idx) => (
                <div key={idx} className="p-5 border border-[var(--line)] bg-[var(--obsidian-soft)] flex items-center gap-3">
                  <Users className="h-5 w-5 text-[var(--gold)] shrink-0" />
                  <span className="text-sm font-bold text-[var(--cream)]">{w}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ════════════════════════════════════════════
          4. SERVICE FAQS
          ════════════════════════════════════════════ */}
      {service.faqs.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
              Service FAQs
            </h2>
          </div>

          <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
            {service.faqs.map((faq, idx) => (
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
      )}
    </div>
  );
}
