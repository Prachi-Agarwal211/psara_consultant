"use client";

import { useState, type CSSProperties } from "react";
import {
  Shield,
  FileCheck,
  Building2,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  FileText,
  Phone,
  Mail,
  Globe,
  BadgeCheck,
  IndianRupee,
} from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import { getCaContact } from "../../../data/ca-contacts";
import type { StateInfo } from "../../../data/states";
import type { generateStateContent } from "../../../lib/seo-content";
import { getLocationAccent, accentStyleVars, hashSlug, type LocationAccent } from "../../lib/location-accent";

type StateContent = ReturnType<typeof generateStateContent>;

interface StateDossierViewProps {
  state: StateInfo;
  content: StateContent;
  /** Optional — accent overrides the gold default with per-state identity */
  accent?: LocationAccent;
}

/** Section title with accent hairline — dossier identity */
function DossierTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className="font-mono text-xs font-bold tracking-widest text-acc"
        style={{ opacity: 0.75 }}
      >
        {index}
      </span>
      <div className="hairline-acc h-px w-10" aria-hidden />
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
        {children}
      </h2>
    </div>
  );
}

export default function StateDossierView({
  state,
  content,
  accent,
}: StateDossierViewProps) {
  const [activeTab, setActiveTab] = useState<"process" | "documents">("process");
  const acc = accent ?? getLocationAccent(state.slug);
  const accVars = accentStyleVars(acc) as CSSProperties;
  const ca = getCaContact(state.slug);

  /**
   * Per-state layout variant (0–3, deterministic by slug hash).
   * Each variant changes PROCESS STYLE and the ORDER of fees vs training
   * so no two state pages render the same template.
   */
  const variant = hashSlug(state.slug) % 4;
  const processAsTimeline = variant % 2 === 1;
  const hasCa = !!(ca && ca.name && ca.name !== "—");
  // Numbering: glance(01) + statutory(02) + [CA(03)] + variant section + process...
  const variantIdx = hasCa ? 4 : 3;
  const processIdx = variantIdx + 1;
  const feesIdx = processIdx + 1;
  const marketIdx = feesIdx + 1;
  const whyIdx = marketIdx + 1;
  const faqIdx = marketIdx + 2;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="space-y-20 py-6"
      itemScope
      itemType="https://schema.org/HowTo"
      style={accVars}
    >
      <meta itemProp="name" content={`How to apply for PSARA License in ${state.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* 1. EXECUTIVE DOSSIER HERO SUMMARY */}
      <section
        data-section-transition
        data-transition="clip-up"
        className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-10"
      >
        {/* Accent aura */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${acc.base}22 0%, transparent 70%)` }}
          aria-hidden
        />
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 border border-acc px-3 py-1 text-xs font-bold uppercase tracking-wider text-acc-bright bg-acc-soft">
              <Shield className="h-3.5 w-3.5" />
              State Licensing Framework
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--white-40)]">
              Ref: PSARA-{state.slug.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-[var(--white-55)] uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-acc-bright" /> Capital: <strong className="text-white">{state.capital}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-acc-bright" /> Validity: <strong className="text-white">{state.validityYears} Years</strong>
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
              className="text-base md:text-lg leading-relaxed text-[var(--white-70)] font-normal block"
            />
          ))}
        </div>

        {/* Key Framework Parameters */}
        <div data-stagger className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:border-acc hover:bg-acc-soft">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Application Mode</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.applicationMode}</span>
          </div>
          <div className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:border-acc hover:bg-acc-soft">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Rules Framework</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.rulesNote}</span>
          </div>
          <div className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:border-acc hover:bg-acc-soft">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Coverage Potential</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.cities.length}+ Major Districts</span>
          </div>
        </div>
      </section>

      {/* 2. STATE AT A GLANCE — unique statutory fact band per state */}
      <section data-section-transition data-transition="blur" className="space-y-6">
        <DossierTitle index="01">State at a glance</DossierTitle>
        <div data-stagger className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative overflow-hidden border border-acc bg-acc-soft p-4">
            <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Controlling Authority</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.authority}</span>
          </div>
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-4">
            <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Indicative Timeline</span>
            <span className="mt-1.5 block text-lg font-bold text-white font-mono">{state.timeline}</span>
          </div>
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-4">
            <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Application Mode</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.applicationMode}</span>
          </div>
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-4">
            <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Licence Validity</span>
            <span className="mt-1.5 block text-lg font-bold text-white font-mono">{state.validityYears} year{state.validityYears > 1 ? "s" : ""}</span>
          </div>
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-4">
            <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">State Capital</span>
            <span className="mt-1.5 block text-sm font-bold text-white">{state.capital}</span>
          </div>
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-4">
            <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Fee Slabs (Indicative)</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.feeOneDistrict} / {state.feeMultiDistrict} / {state.feeEntireState}</span>
          </div>
        </div>
      </section>

      {/* 3. CONTROLLING AUTHORITY INFOCARD */}
      <section data-section-transition data-transition="fade" className="space-y-8">
        <DossierTitle index="02">{`Statutory Rules & Application Pathway`}</DossierTitle>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="relative md:col-span-8 overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-4">
            <div
              className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full"
              style={{ background: `radial-gradient(circle, ${acc.base}14 0%, transparent 70%)` }}
              aria-hidden
            />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-acc-bright">
              <Scale className="h-4 w-4" />
              Jurisdiction & Administration
            </div>
            {content.authorityBlock.map((p, idx) => (
              <FormattedText
                key={idx}
                text={p}
                as="p"
                className="text-sm font-normal leading-relaxed text-[var(--white-70)] block"
              />
            ))}
          </div>

          <div className="md:col-span-4 flex flex-col justify-between space-y-4 border border-acc bg-acc-soft p-6">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Fast-Track Compliance Checklist</span>
              <h3 className="mt-2 text-lg font-bold text-white">Ready for Authority Inspection?</h3>
              <p className="mt-2 text-xs text-[var(--white-55)] leading-relaxed">
                Ensure your office address proof and training institute agreement conform strictly with state-notified rules before submission.
              </p>
            </div>
            <a href="#state-enquiry" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-[color,border-color,background-color] duration-200 hover:translate-x-1" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Verify Your Documents Now
            </a>
          </div>
        </div>
      </section>

      {/* 3. CA CONTACT CARD */}
      {hasCa && (
        <section data-section-transition data-transition="fade" className="space-y-6">
          <DossierTitle index="03">{`Controlling Authority — Officer & Contact Details`}</DossierTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc hover:bg-acc-soft">
              <BadgeCheck className="h-4 w-4 text-acc-bright mb-2" />
              <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Officer on Record</span>
              <span className="mt-1 block text-sm font-bold text-white leading-snug">{ca.name}</span>
            </div>
            {ca.phone && ca.phone !== "—" && (
              <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc hover:bg-acc-soft">
                <Phone className="h-4 w-4 text-acc-bright mb-2" />
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Phone</span>
                <a href={`tel:${ca.phone}`} className="mt-1 block text-sm font-bold text-white hover:text-acc-bright break-all">{ca.phone}</a>
              </div>
            )}
            {ca.email && ca.email !== "—" && (
              <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc hover:bg-acc-soft">
                <Mail className="h-4 w-4 text-acc-bright mb-2" />
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Email</span>
                <a href={`mailto:${ca.email}`} className="mt-1 block text-sm font-bold text-white hover:text-acc-bright break-all">{ca.email}</a>
              </div>
            )}
            {ca.portal && (
              <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc hover:bg-acc-soft">
                <Globe className="h-4 w-4 text-acc-bright mb-2" />
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Portal</span>
                <span className="mt-1 block text-sm font-bold text-white break-all">{ca.portal}</span>
              </div>
            )}
          </div>

          {(ca.licensesIssued || ca.policeVerification || ca.bond) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ca.licensesIssued && ca.licensesIssued !== "—" && (
                <div className="border border-acc bg-acc-soft p-5">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Licences Issued (psara.gov.in)</span>
                  <span className="mt-2 block text-3xl font-bold text-white font-mono">{ca.licensesIssued}</span>
                  {ca.licensesActive && <span className="text-xs text-[var(--white-55)]">{ca.licensesActive} currently active</span>}
                </div>
              )}
              {ca.policeVerification && (
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Police Verification Window</span>
                  <span className="mt-2 block text-sm font-bold text-white">{ca.policeVerification}</span>
                </div>
              )}
              {ca.bond && (
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Security Bond / Deposit</span>
                  <span className="mt-2 block text-sm font-bold text-white">{ca.bond}</span>
                </div>
              )}
              {ca.address && (
                <div className="border border-white/10 bg-white/[0.02] p-5">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Office Address</span>
                  <span className="mt-2 block text-xs font-normal text-[var(--white-70)] leading-relaxed">{ca.address}</span>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 3b. VARIANT-SPECIFIC SECTION — different type + data per layout variant */}
      {variant === 0 && <StateSpecialRules state={state} index={pad(variantIdx)} />}
      {variant === 1 && <StateFeeSlabs state={state} index={pad(variantIdx)} />}
      {variant === 2 && <StateFormsDocuments state={state} index={pad(variantIdx)} />}
      {variant === 3 && <StateStatutoryNotes state={state} index={pad(variantIdx)} />}

      {/* 4. INTERACTIVE PROCESS ROADMAP & TABS */}
      <section data-section-transition data-transition="clip-left" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <DossierTitle index={pad(processIdx)}>{content.processHeading}</DossierTitle>

          {/* Tab selectors for quick navigation */}
          <div className="flex gap-2 border border-white/10 bg-white/[0.03] p-1">
            {(["process", "documents"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? "bg-acc-bright text-[var(--void)]"
                    : "text-[var(--white-55)] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Step-by-Step Approval Process — style varies per variant */}
        {activeTab === "process" && !processAsTimeline && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              const title = parts.length > 1 ? parts[0] : `Phase ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;

              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-[color,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-acc "
                >
                  {/* Ghost number */}
                  <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 font-mono text-6xl font-bold text-acc opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.18]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="border border-acc bg-acc-soft px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-acc-bright">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-white transition-colors group-hover:text-acc-bright">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm font-normal leading-relaxed text-[var(--white-70)]">
                    {desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-[var(--white-55)]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-acc-bright" /> Verified Track
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-acc-bright opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 1b: Timeline variant for odd hash variants */}
        {activeTab === "process" && processAsTimeline && (
          <ol className="relative space-y-8 border-l-2 border-acc/30 pl-8">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              // Strip a leading "Phase N" prefix so the Stage label isn't doubled up
              const rawTitle = parts.length > 1 ? parts[0] : `Step ${idx + 1}`;
              const title = rawTitle.replace(/^Phase\s*\d+[:\s-]*/i, "").trim() || `Step ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;
              return (
                <li key={idx} className="relative">
                  <span aria-hidden className="absolute -left-[41px] top-0 flex h-5 w-5 items-center justify-center rounded-full border border-acc bg-acc-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-acc-bright" />
                  </span>
                  <div className="border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-300 hover:border-acc">
                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">
                      Stage {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1.5 text-sm font-normal leading-relaxed text-[var(--white-70)]">{desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {/* Tab 2: Document Checklist Grid */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <FileCheck className="h-5 w-5 text-acc-bright" /> Mandatory Document Checklist ({state.name})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-acc hover:bg-acc-soft">
                  <span className="mt-0.5 shrink-0 rounded bg-acc-soft p-1 text-acc-bright">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-white">{doc}</span>
                    <span className="text-xs text-[var(--white-55)]">Required for Controlling Authority dossier verification</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4b. FEES, COVERAGE & VALIDITY — rendered via shared section */}
      <FeesSection content={content} acc={acc} index={pad(feesIdx)} />

      {/* 5. STATUTORY REQUIREMENTS: TRAINING & REJECTION — rendered via shared section */}
      <TrainingRejectionSection content={content} />

      {/* 6. MARKET SECTORS */}
      <section data-section-transition data-transition="blur" className="space-y-8">
        <DossierTitle index={pad(marketIdx)}>{content.marketHeading}</DossierTitle>

        <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 space-y-6">
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full"
            style={{ background: `radial-gradient(circle, ${acc.base}12 0%, transparent 70%)` }}
            aria-hidden
          />
          {content.market.map((p, idx) => (
            <p key={idx} className="text-sm font-normal leading-relaxed text-[var(--white-70)]">
              {p}
            </p>
          ))}

          {state.sectors.length > 0 && (
            <div className="border-t border-white/10 pt-4">
              <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-acc-bright">
                High-Demand Security Sectors in {state.name}:
              </span>
              <div className="flex flex-wrap gap-2">
                {state.sectors.map((sec) => (
                  <span
                    key={sec}
                    className="border border-acc bg-acc-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-acc-bright transition-colors hover:bg-acc-strong"
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
      <section data-section-transition data-transition="fade" className="space-y-8">
        <DossierTitle index={pad(whyIdx)}>{content.whyHeading}</DossierTitle>

        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.whyPoints.map((pt, idx) => (
            <div key={idx} className="group flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-acc">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-acc-bright" />
              <span className="text-sm font-bold text-white">{pt}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE STATE FAQS */}
      <section data-section-transition data-transition="clip-up" className="space-y-8">
        <DossierTitle index={pad(faqIdx)}>{`Frequently Asked Questions — ${state.name}`}</DossierTitle>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {content.faqs.map((faq, idx) => (
            <details key={idx} className="group py-5 transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-2 font-[family-name:var(--font-display)] text-base font-bold text-white">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="font-mono text-[0.6rem] text-acc opacity-60">{String(idx + 1).padStart(2, "0")}</span>
                  {faq.q}
                </span>
                <span className="text-acc-bright text-sm transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-3 max-w-3xl px-2 text-sm font-normal leading-relaxed text-[var(--white-70)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

/** FEES, COVERAGE & VALIDITY — shared section */
function FeesSection({ content, acc, index }: { content: StateContent; acc: LocationAccent; index: string }) {
  return (
    <section data-section-transition data-transition="fade" className="space-y-8">
      <DossierTitle index={index}>{content.feesHeading}</DossierTitle>

      <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-4">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full"
          style={{ background: `radial-gradient(circle, ${acc.base}14 0%, transparent 70%)` }}
          aria-hidden
        />
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-acc-bright">
          <IndianRupee className="h-4 w-4" />
          Government Fees, Coverage Slabs & Deposit
        </div>
        {content.fees.map((p, idx) => (
          <FormattedText
            key={idx}
            text={p}
            as="p"
            className="text-sm font-normal leading-relaxed text-[var(--white-70)] block"
          />
        ))}
      </div>
    </section>
  );
}

/** VARIANT 0 — SPECIAL RULES: state-specific statutory quirks (unique per state) */
function StateSpecialRules({ state, index }: { state: StateInfo; index: string }) {
  const rules = state.specialRules ?? [];
  return (
    <section data-section-transition data-transition="fade" className="space-y-8">
      <DossierTitle index={index}>{`Special rules that trip up ${state.name} applicants`}</DossierTitle>
      <div className="space-y-3">
        {rules.length > 0 ? (
          rules.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc"
            >
              <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-acc bg-acc-soft">
                <AlertTriangle className="h-3 w-3 text-acc-bright" />
              </span>
              <span className="text-sm font-normal leading-relaxed text-[var(--white-70)]">{rule}</span>
            </div>
          ))
        ) : (
          <div className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4">
            <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-acc bg-acc-soft">
              <AlertTriangle className="h-3 w-3 text-acc-bright" />
            </span>
            <span className="text-sm font-normal leading-relaxed text-[var(--white-70)]">
              No additional state-specific rules have been notified for {state.name}; the standard PSARA Model Rules apply.
            </span>
          </div>
        )}
      </div>
      <p className="max-w-3xl text-xs font-normal leading-relaxed text-[var(--white-55)]">
        {state.rulesNote}
      </p>
    </section>
  );
}

/** VARIANT 1 — FEE SLABS: three fee cards + validity band (unique per state) */
function StateFeeSlabs({ state, index }: { state: StateInfo; index: string }) {
  const rows = [
    { label: "Single District", value: state.feeOneDistrict },
    { label: "Multiple Districts", value: state.feeMultiDistrict },
    { label: "Entire State", value: state.feeEntireState },
  ];
  return (
    <section data-section-transition data-transition="clip-left" className="space-y-8">
      <DossierTitle index={index}>{`PSARA fee structure — ${state.name}`}</DossierTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rows.map((r) => (
          <div key={r.label} className="relative overflow-hidden border border-acc bg-acc-soft p-5">
            <span aria-hidden className="pointer-events-none absolute -right-2 -top-4 font-mono text-5xl font-bold text-acc opacity-[0.12]">₹</span>
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">{r.label}</span>
            <span className="mt-2 block font-mono text-lg font-bold text-white leading-snug">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border border-white/10 bg-white/[0.02] px-5 py-4 text-xs font-semibold text-[var(--white-70)]">
        <span>Validity: <span className="text-acc-bright">{state.validityYears} years</span></span>
        <span>Timeline: <span className="text-acc-bright">{state.timeline}</span></span>
        <span>Mode: <span className="text-acc-bright">{state.applicationMode}</span></span>
        <span className="basis-full text-[var(--white-55)] font-normal">{state.feeNote}</span>
      </div>
    </section>
  );
}

/** VARIANT 2 — FORMS & DOCUMENTS: official forms + state-extra documents (unique per state) */
function StateFormsDocuments({ state, index }: { state: StateInfo; index: string }) {
  const forms = state.forms ?? [];
  const extra = state.documentsExtra ?? [];
  return (
    <section data-section-transition data-transition="clip-right" className="space-y-8">
      <DossierTitle index={index}>{`Forms & extra documents — ${state.name}`}</DossierTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-white/10 bg-white/[0.02] p-6 space-y-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-acc-bright">Official Forms</span>
          <ul className="space-y-3">
            {forms.length > 0 ? (
              forms.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm font-normal text-[var(--white-70)]">
                  <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-acc-bright" />
                  <span>{f}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2 text-sm font-normal text-[var(--white-55)]">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-acc-bright" />
                <span>Standard PSARA application forms as per the Central Model Rules.</span>
              </li>
            )}
          </ul>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-6 space-y-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-acc-bright">State-Extra Documents</span>
          <ul className="space-y-3">
            {extra.length > 0 ? (
              extra.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm font-normal text-[var(--white-70)]">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-acc-bright" />
                  <span>{d}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2 text-sm font-normal text-[var(--white-55)]">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-acc-bright" />
                <span>No state-extra documents notified; national checklist applies.</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="max-w-3xl text-xs font-normal leading-relaxed text-[var(--white-55)]">
        {state.trainingNote}
      </p>
    </section>
  );
}

/** VARIANT 3 — STATUTORY NOTES: mode, timeline, training + rules band (unique per state) */
function StateStatutoryNotes({ state, index }: { state: StateInfo; index: string }) {
  return (
    <section data-section-transition data-transition="blur" className="space-y-8">
      <DossierTitle index={index}>{`How ${state.name} processes PSARA applications`}</DossierTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative overflow-hidden border border-acc bg-acc-soft p-5">
          <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Application Mode</span>
          <span className="mt-2 block text-sm font-bold text-white leading-snug">{state.applicationMode}</span>
        </div>
        <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5">
          <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Indicative Timeline</span>
          <span className="mt-2 block font-mono text-lg font-bold text-white">{state.timeline}</span>
        </div>
        <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5">
          <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">Coverage Districts</span>
          <span className="mt-2 block font-mono text-lg font-bold text-white">{state.cities.length}+</span>
        </div>
      </div>
      <div className="space-y-4 border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-start gap-2 text-sm font-normal leading-relaxed text-[var(--white-70)]">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-acc-bright" />
          <span><strong className="text-white">Training:</strong> {state.trainingNote}</span>
        </div>
        <div className="flex items-start gap-2 text-sm font-normal leading-relaxed text-[var(--white-70)]">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-acc-bright" />
          <span><strong className="text-white">Rules:</strong> {state.rulesNote}</span>
        </div>
      </div>
    </section>
  );
}

/** TRAINING & REJECTION — shared section */
function TrainingRejectionSection({ content }: { content: StateContent }) {
  return (
    <section data-section-transition data-transition="clip-right" className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-4">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full"
          style={{ background: `radial-gradient(circle, rgba(212,184,114,0.08) 0%, transparent 70%)` }}
          aria-hidden
        />
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-acc-bright">
          <Building2 className="h-4 w-4" />
          {content.trainingHeading}
        </div>
        {content.training.map((p, idx) => (
          <p key={idx} className="text-sm font-normal leading-relaxed text-[var(--white-70)]">
            {p}
          </p>
        ))}
      </div>

      <div className="border border-[var(--signal-red)]/20 bg-[var(--signal-red)]/[0.04] p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--signal-red)]">
          <AlertTriangle className="h-4 w-4" />
          {content.rejectionHeading}
        </div>
        <ul className="space-y-3">
          {content.rejections.map((rej, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm font-normal text-[var(--white-70)]">
              <span className="font-bold text-[var(--signal-red)]">•</span>
              <span>{rej}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
