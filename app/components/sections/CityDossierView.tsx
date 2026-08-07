"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import {
  MapPin,
  Scale,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Building2,
  FileText,
  Phone,
  Mail,
  Globe,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import type { CityInfo } from "../../../data/cities";
import type { StateInfo } from "../../../data/states";
import type { generateCityContent } from "../../../lib/seo-content";
import { getLocationAccent, accentStyleVars, hashSlug, type LocationAccent } from "../../lib/location-accent";
import { getCaContact } from "../../../data/ca-contacts";

type CityContent = ReturnType<typeof generateCityContent>;

interface CityDossierViewProps {
  city: CityInfo;
  state?: StateInfo;
  content: CityContent;
  /** Optional — accent overrides the gold default with per-city identity */
  accent?: LocationAccent;
}

function DossierTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden className="font-mono text-xs font-bold tracking-widest text-acc" style={{ opacity: 0.75 }}>
        {index}
      </span>
      <div className="hairline-acc h-px w-10" aria-hidden />
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
        {children}
      </h2>
    </div>
  );
}

/** Tier-based positioning — makes each city's identity copy genuinely different */
function tierLabel(tier: 1 | 2 | 3): string {
  if (tier === 1) return "Major Metro Hub";
  if (tier === 2) return "Growth Market";
  return "Emerging Market";
}

export default function CityDossierView({
  city,
  state,
  content,
  accent,
}: CityDossierViewProps) {
  const [activeTab, setActiveTab] = useState<"process" | "documents">("process");
  const acc = accent ?? getLocationAccent(city.slug);
  const accVars = accentStyleVars(acc) as CSSProperties;
  const ca = state ? getCaContact(state.slug) : undefined;
  const hasCa = !!(ca && ca.name && ca.name !== "—");

  /**
   * Per-city layout variant (0–3, deterministic by slug hash).
   * Each variant changes section ORDER and PROCESS STYLE so no two city
   * pages render the same template — a strong anti-doorway signal.
   */
  const variant = hashSlug(city.slug) % 4;
  const processAsTimeline = variant % 2 === 1; // odd variants: timeline, even: cards
  const marketFirst = variant >= 2; // variants 2-3: market before training/rejection

  // Sequential dossier numbering across the variant-dependent section order.
  // demand(01) + framework + CA + variant-extra, then process, market, why, faq
  const hasDemand = city.economyTags.length > 0;
  const extraIdx = (hasDemand ? 1 : 0) + (hasCa ? 1 : 0) + 2; // demand + framework + CA + extra = position
  const processIdx = extraIdx + 1;
  const marketIdx = processIdx + 1;
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
      <meta itemProp="name" content={`PSARA License in ${city.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* 1. CITY DOSSIER HERO SUMMARY */}
      <section
        data-section-transition
        data-transition="clip-up"
        className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-10"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: `radial-gradient(circle, ${acc.base}22 0%, transparent 70%)` }}
          aria-hidden
        />
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 border border-acc bg-acc-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-acc-bright">
              <MapPin className="h-3.5 w-3.5" />
              City Security Desk
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--white-40)]">
              Ref: CITY-{city.slug.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[var(--white-55)]">
            <span className="border border-acc bg-acc-soft px-2.5 py-1 text-acc-bright">{tierLabel(city.tier)}</span>
            {state && (
              <>
                <span>•</span>
                <Link href={`/states/${state.slug}`} className="text-acc-bright hover:underline">
                  {state.name} State Framework
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4" data-ai-answer="city-overview">
          {content.intro.map((p, idx) => (
            <FormattedText
              key={idx}
              text={p}
              as="p"
              className="text-base md:text-lg leading-relaxed text-[var(--white-70)] font-normal block"
            />
          ))}
        </div>
      </section>

      {/* 2. LOCAL DEMAND DRIVERS — unique per city via economyTags */}
      {city.economyTags.length > 0 && (
        <section data-section-transition data-transition="blur" className="space-y-8">
          <DossierTitle index="01">{`Security demand profile of ${city.name}`}</DossierTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {city.economyTags.map((tag, idx) => (
              <div
                key={tag}
                className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color,transform] duration-[250ms] ease-out hover:-translate-y-0.5 hover:border-acc"
              >
                <span aria-hidden className="pointer-events-none absolute -right-2 -top-4 font-mono text-5xl font-bold text-acc opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.16]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <TrendingUp className="h-4 w-4 text-acc-bright mb-3" />
                <span className="block text-sm font-bold text-white uppercase leading-snug">{tag}</span>
                <span className="mt-2 block text-xs font-normal leading-relaxed text-[var(--white-55)]">
                  {[
                    `Regular PSARA-licensed manpower procurement in the ${tag.toLowerCase()} space drives recurring demand across ${city.name}.`,
                    `Tenders and vendor empanelment for ${tag.toLowerCase()} activities prefer verified, PSARA-licensed agencies operating in ${city.name}.`,
                    `${tag} establishments in ${city.name} need trained, licensed guards to meet client-side compliance and insurance norms.`,
                    `Security spend in ${city.name}'s ${tag.toLowerCase()} sector is growing — licensed agencies win these mandates.`,
                  ][idx % 4]}
                </span>
              </div>
            ))}
          </div>
          <p className="max-w-3xl text-xs font-normal leading-relaxed text-[var(--white-55)]">
            Institutional and industrial clients in {city.name} increasingly shortlist PSARA-licensed
            vendors with verified training records and labour hygiene — unlicensed manpower is
            excluded from serious tenders.
          </p>
        </section>
      )}

      {/* 3. STATE JURISDICTION & AUTHORITY FRAMEWORK */}
      <section data-section-transition data-transition="clip-left" className="space-y-8">
        <DossierTitle index={hasDemand ? "02" : "01"}>{`State Licensing Framework for ${city.name}`}</DossierTitle>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="relative md:col-span-8 overflow-hidden border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-4">
            <div
              className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full"
              style={{ background: `radial-gradient(circle, ${acc.base}14 0%, transparent 70%)` }}
              aria-hidden
            />
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-acc-bright">
              <Scale className="h-4 w-4" />
              Controlling Authority Pathway
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
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-acc-bright">City Operations Desk</span>
              <h3 className="mt-2 text-lg font-bold text-white uppercase">Headquartered Office Filing</h3>
              <p className="mt-2 text-xs font-normal leading-relaxed text-[var(--white-55)]">
                Ensure commercial premises proof and promoter police antecedent records align with local {city.name} inspection culture.
              </p>
            </div>
            <a href="#city-contact" className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider transition-[color,border-color,background-color] duration-[250ms] ease-out hover:translate-x-1" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Contact {city.name} Desk
            </a>
          </div>
        </div>
      </section>

      {/* 4. CA CONTACT CARD (when CA data available) */}
      {hasCa && (
        <section data-section-transition data-transition="fade" className="space-y-8">
          <DossierTitle index={hasDemand ? "03" : "02"}>{`Controlling Authority Contact — ${state?.name ?? city.stateName}`}</DossierTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc hover:bg-acc-soft">
              <BadgeCheck className="h-4 w-4 text-acc-bright mb-2" />
              <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Officer</span>
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
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Licences Issued</span>
                  <span className="mt-1 block text-2xl font-bold text-white font-mono">{ca.licensesIssued}</span>
                  {ca.licensesActive && <span className="text-xs text-[var(--white-55)]">{ca.licensesActive} currently active</span>}
                </div>
              )}
              {ca.policeVerification && (
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Police Verification</span>
                  <span className="mt-1 block text-sm font-bold text-white">{ca.policeVerification}</span>
                </div>
              )}
              {ca.bond && (
                <div className="border border-white/10 bg-white/[0.02] p-4">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-acc-bright">Security Bond</span>
                  <span className="mt-1 block text-sm font-bold text-white">{ca.bond}</span>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 5. VARIANT-SPECIFIC SECTION — different type + data per layout variant */}
      {variant === 0 && <SectorSpotlight city={city} index={pad(extraIdx)} />}
      {variant === 1 && <FeeSnapshot city={city} state={state} index={pad(extraIdx)} />}
      {variant === 2 && <ComplianceNotes city={city} state={state} index={pad(extraIdx)} />}
      {variant === 3 && <FormsChecklist city={city} state={state} index={pad(extraIdx)} />}

      {/* 6. INTERACTIVE PROCESS & DOCUMENTS — style varies per variant */}
      <section data-section-transition data-transition="clip-right" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <DossierTitle index={pad(processIdx)}>{content.processHeading}</DossierTitle>

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

        {activeTab === "process" && !processAsTimeline && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              const title = parts.length > 1 ? parts[0] : `Phase ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-[color,border-color,background-color,transform] duration-[250ms] ease-out hover:-translate-y-1 hover:border-acc"
                >
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
                  <div className="border border-white/10 bg-white/[0.02] p-5 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc">
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

        {activeTab === "documents" && (
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <FileCheck className="h-5 w-5 text-acc-bright" /> Document Checklist ({city.name})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color] duration-[250ms] ease-out hover:border-acc hover:bg-acc-soft">
                  <span className="mt-0.5 shrink-0 rounded bg-acc-soft p-1 text-acc-bright">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-white">{doc}</span>
                    <span className="text-xs text-[var(--white-55)]">Required for Controlling Authority dossier</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6+7. MARKET / TRAINING & REJECTION — order varies per variant */}
      {marketFirst ? (
        <>
          <MarketSection city={city} content={content} acc={acc} index={pad(marketIdx)} />
          <TrainingRejectionSection content={content} />
        </>
      ) : (
        <>
          <TrainingRejectionSection content={content} />
          <MarketSection city={city} content={content} acc={acc} index={pad(marketIdx)} />
        </>
      )}

      {/* 8. WHY CHOOSE US */}
      <section data-section-transition data-transition="fade" className="space-y-8">
        <DossierTitle index={pad(whyIdx)}>{content.whyHeading}</DossierTitle>
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.whyPoints.map((pt, idx) => (
            <div key={idx} className="group flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color,transform] duration-[250ms] ease-out hover:-translate-y-0.5 hover:border-acc">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-acc-bright" />
              <span className="text-sm font-bold text-white">{pt}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CITY FAQs */}
      <section data-section-transition data-transition="clip-up" className="space-y-8">
        <DossierTitle index={pad(faqIdx)}>{`Frequently Asked Questions — ${city.name}`}</DossierTitle>
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

/** MARKET OPPORTUNITY — shared by both orderings */
function MarketSection({ city, content, acc, index }: { city: CityInfo; content: CityContent; acc: LocationAccent; index: string }) {
  return (
    <section data-section-transition data-transition="blur" className="space-y-8">
      <DossierTitle index={index}>{content.marketHeading}</DossierTitle>
      <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 space-y-4">
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
        {city.economyTags.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-acc-bright">
              High-Demand Security Sectors in {city.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {city.economyTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-acc bg-acc-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-acc-bright transition-colors hover:bg-acc-strong"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** VARIANT 0 — SECTOR SPOTLIGHT: ranked local demand sectors (unique per city) */
function SectorSpotlight({ city, index }: { city: CityInfo; index: string }) {
  const top = city.economyTags.slice(0, 5);
  if (top.length === 0) return null;
  return (
    <section data-section-transition data-transition="blur" className="space-y-8">
      <DossierTitle index={index}>{`Where security demand comes from in ${city.name}`}</DossierTitle>
      <ol className="space-y-3">
        {top.map((tag, idx) => (
          <li
            key={tag}
            className="group relative overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-[color,border-color,background-color,transform] duration-[250ms] ease-out hover:-translate-x-0.5 hover:border-acc"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="font-mono text-2xl font-bold text-acc opacity-40 group-hover:opacity-70 transition-opacity">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-bold uppercase tracking-wide text-white">{tag}</span>
              <TrendingUp className="h-4 w-4 shrink-0 text-acc-bright" />
            </div>
            <p className="mt-2 pl-11 text-xs font-normal leading-relaxed text-[var(--white-55)]">
              {[
                `PSARA-licensed guarding is shortlisted for ${tag} premises, event security and asset protection across ${city.name}.`,
                `Tenders in ${city.name}'s ${tag} segment require licensed manpower with police-verified records.`,
                `Training-ready guards for ${tag} establishments form a steady, repeatable revenue line for ${city.name} agencies.`,
                `Institutional buyers in ${city.name} prefer agencies with verified ${tag} deployment references.`,
                `Renewal and re-deployment cycles in ${city.name}'s ${tag} sector keep licensed agencies in continuous demand.`,
              ][idx % 5]}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** VARIANT 1 — FEE SNAPSHOT: state fee table + validity (unique per state) */
function FeeSnapshot({ city, state, index }: { city: CityInfo; state?: StateInfo; index: string }) {
  if (!state) return null;
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
      <p className="max-w-3xl text-xs font-normal leading-relaxed text-[var(--white-55)]">
        Fees for a PSARA application from {city.name} follow the {state.name} rules — the table above is
        indicative and is confirmed against the current Controlling Authority schedule at filing time.
      </p>
    </section>
  );
}

/** VARIANT 2 — COMPLIANCE NOTES: state-specific rules (unique per state) */
function ComplianceNotes({ city, state, index }: { city: CityInfo; state?: StateInfo; index: string }) {
  const rules = state?.specialRules ?? [];
  return (
    <section data-section-transition data-transition="fade" className="space-y-8">
      <DossierTitle index={index}>{`Compliance notes that trip up ${city.name} applicants`}</DossierTitle>
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
              No additional state-specific rules have been notified for {state?.name ?? city.stateName}; the standard PSARA Model Rules apply to {city.name} filings.
            </span>
          </div>
        )}
      </div>
      <p className="max-w-3xl text-xs font-normal leading-relaxed text-[var(--white-55)]">
        {state?.rulesNote ?? "State-specific rules are verified against the current Rules before filing."}
      </p>
    </section>
  );
}

/** VARIANT 3 — FORMS CHECKLIST: state forms + extra documents (unique per state) */
function FormsChecklist({ city, state, index }: { city: CityInfo; state?: StateInfo; index: string }) {
  const forms = state?.forms ?? [];
  const extra = state?.documentsExtra ?? [];
  const stateLabel = state?.name ?? city.stateName;
  return (
    <section data-section-transition data-transition="clip-right" className="space-y-8">
      <DossierTitle index={index}>{`Forms & extra documents — ${stateLabel}`}</DossierTitle>
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
        {state?.trainingNote ?? `A training MOU with a recognised institute is confirmed for ${city.name} filings.`}
      </p>
    </section>
  );
}

/** TRAINING & REJECTION — shared by both orderings */
function TrainingRejectionSection({ content }: { content: CityContent }) {
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
