"use client";

import { useState, type CSSProperties } from "react";
import {
  Shield,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  BadgeCheck,
  Calculator,
  CheckSquare,
  Square,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import { FAQ, GlassCard, Section } from "../../../components/v3/PagePrimitives";
import FormattedText from "../../../components/FormattedText";
import { getCaContact } from "../../../data/ca-contacts";
import type { StateInfo } from "../../../data/states";
import type { generateStateContent } from "../../../lib/seo-content";
import { getLocationAccent, accentStyleVars, type LocationAccent } from "../../lib/location-accent";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";
import {
  GOVT_ITEM_INDEX,
  buildDefaultAmounts,
  computeQuote,
  type CoverageScale,
} from "../../../lib/quote-engine";

type StateContent = ReturnType<typeof generateStateContent>;

interface StateDossierViewProps {
  state: StateInfo;
  content: StateContent;
  accent?: LocationAccent;
}

function DossierTitle({ children }: { index?: string; children: React.ReactNode }) {
  return <h2 className="min-w-0 font-[family-name:var(--font-display)] text-3xl font-normal leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl">{children}</h2>;
}

export default function StateDossierView({
  state,
  content,
  accent,
}: StateDossierViewProps) {
  const [activeTab, setActiveTab] = useState<"process" | "documents" | "calculator">("process");
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [calcScale, setCalcScale] = useState<"d1" | "d5" | "state">("state");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const acc = accent ?? getLocationAccent(state.slug);
  const accVars = accentStyleVars(acc) as CSSProperties;
  const ca = getCaContact(state.slug);

  const hasCa = !!(ca && ca.name && ca.name !== "—");

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Standard fee structure (single source of truth: lib/quote-engine.ts)
  const coverage: CoverageScale = calcScale === "d1" ? "single-district" : calcScale === "d5" ? "up-to-five-districts" : "entire-state";
  const feeAmounts = buildDefaultAmounts(state.slug, coverage);
  const govFee = feeAmounts[GOVT_ITEM_INDEX] ?? 0;
  const consultancyBundle = (feeAmounts[0] ?? 0) + (feeAmounts[1] ?? 0) + (feeAmounts[2] ?? 0);
  const officeDocBundle = (feeAmounts[4] ?? 0) + (feeAmounts[5] ?? 0) + (feeAmounts[6] ?? 0);
  const policeProcessingBundle = (feeAmounts[7] ?? 0) + (feeAmounts[8] ?? 0);
  const totalStateEst = computeQuote(feeAmounts).grandTotal;

  return (
    <div
      className="v3-dossier min-w-0 space-y-16 py-4 text-white"
      itemScope
      itemType="https://schema.org/HowTo"
      style={accVars}
    >
      <meta itemProp="name" content={`How to apply for PSARA License in ${state.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* 1. EXECUTIVE DOSSIER HERO SUMMARY — flat */}
      <GlassCard className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <span className="badge-metallic-gold">
              <Shield className="h-3.5 w-3.5 text-[#FF7A00]" />
              State Statutory Framework
            </span>
            <span className="text-xs tabular-nums font-bold tracking-widest uppercase text-[#FF7A00]">
              Ref: PSARA-{state.slug.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#E2E8F0]">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#FF7A00]" /> Capital: <strong className="text-white font-bold">{state.capital}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#FF7A00]" /> Validity: <strong className="text-white font-bold">{state.validityYears} Years</strong>
            </span>
          </div>
        </div>

        {/* Intro text */}
        <div className="mt-6 space-y-4">
          {content.intro.map((p, idx) => (
            <FormattedText
              key={idx}
              text={p}
              as="p"
              className="text-base md:text-lg leading-relaxed text-[#E2E8F0] font-normal block"
            />
          ))}
        </div>

        {/* Key Framework Parameters */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="border-t border-white/15 pt-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Application Mode</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.applicationMode}</span>
          </div>
          <div className="border-t border-white/15 pt-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Rules Framework</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.rulesNote}</span>
          </div>
          <div className="border-t border-white/15 pt-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Coverage Scale</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.cities.length}+ Major Districts</span>
          </div>
        </div>
      </GlassCard>

      {/* 2. STATE AT A GLANCE */}
      <Section className="space-y-6">
        <DossierTitle>State at a Glance</DossierTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <div className="border-b border-white/15 py-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Controlling Authority</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.authority}</span>
          </div>
          <div className="border-b border-white/15 py-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Indicative Timeline</span>
            <span className="mt-1.5 block text-lg font-bold text-white tabular-nums">{state.timeline}</span>
          </div>
          <div className="border-b border-white/15 py-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Application Mode</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.applicationMode}</span>
          </div>
          <div className="border-b border-white/15 py-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Licence Validity</span>
            <span className="mt-1.5 block text-lg font-bold text-white tabular-nums">{state.validityYears} year{state.validityYears > 1 ? "s" : ""}</span>
          </div>
          <div className="border-b border-white/15 py-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">State Capital</span>
            <span className="mt-1.5 block text-sm font-bold text-white">{state.capital}</span>
          </div>
          <div className="border-b border-white/15 py-4">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#FF7A00]">Fee Slabs (Govt)</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">₹5,000 / ₹10,000 / ₹25,000</span>
          </div>
        </div>
      </Section>

      {/* 3. CA CONTACT CARD WITH ONE-CLICK COPY */}
      {hasCa && (
        <Section className="space-y-6">
          <DossierTitle>{`Controlling Authority — Officer & Contact Details`}</DossierTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="border-b border-white/15 py-4">
              <BadgeCheck className="h-4 w-4 text-[#FF7A00] mb-2" />
              <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#FF7A00]">Officer on Record</span>
              <span className="mt-1 block text-sm font-bold text-white leading-snug">{ca.name}</span>
            </div>
            {ca.phone && ca.phone !== "—" && (
              <div className="border-b border-white/15 py-4">
                <div className="flex items-center justify-between">
                  <Phone className="h-4 w-4 text-[#FF7A00] mb-2" />
                  <button
                    onClick={() => copyToClipboard(ca.phone, "phone")}
                    className="text-[10px] text-[#FF7A00] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedField === "phone" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedField === "phone" ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#FF7A00]">Phone</span>
                <a href={`tel:${ca.phone}`} className="mt-1 block text-sm font-bold text-white hover:text-[#FFB25E] break-all">{ca.phone}</a>
              </div>
            )}
            {ca.email && ca.email !== "—" && (
              <div className="border-b border-white/15 py-4">
                <div className="flex items-center justify-between">
                  <Mail className="h-4 w-4 text-[#FF7A00] mb-2" />
                  <button
                    onClick={() => copyToClipboard(ca.email, "email")}
                    className="text-[10px] text-[#FF7A00] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedField === "email" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedField === "email" ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#FF7A00]">Email</span>
                <a href={`mailto:${ca.email}`} className="mt-1 block text-sm font-bold text-white hover:text-[#FFB25E] break-all">{ca.email}</a>
              </div>
            )}
            {ca.portal && (
              <div className="border-b border-white/15 py-4">
                <Globe className="h-4 w-4 text-[#FF7A00] mb-2" />
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#FF7A00]">Portal</span>
                <span className="mt-1 block text-xs font-bold text-white break-all">{ca.portal}</span>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 4. INTERACTIVE TABS: PROCESS / CHECKLIST / LIVE FEE CALCULATOR */}
      <Section className="space-y-8">
        <div className="flex flex-col items-start justify-between gap-5 border-b border-white/10 pb-4">
          <DossierTitle>{`Compliance Toolkit for ${state.name}`}</DossierTitle>

          <div className="flex w-full flex-wrap gap-2 rounded-xl border border-white/10 bg-[#132E57] p-1.5 sm:w-auto sm:flex-nowrap">
            {(["process", "documents", "calculator"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider transition-[border-color,box-shadow,transform] sm:flex-none sm:px-4 ${
                  activeTab === tab
                    ? "text-[#0B1E3B] shadow-md bg-[#E76F00]"
                    : "text-[#CBD5E1] hover:text-white"
                }`}
              >
                {tab === "process" ? "Roadmap" : tab === "documents" ? "Checklist" : "Fee Calculator"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Step-by-Step Approval Process */}
        {activeTab === "process" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              const title = parts.length > 1 ? parts[0] : `Phase ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;

              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1E3B] p-6 shadow-md transition-[border-color,box-shadow,transform,filter] duration-200 hover:border-[#FF7A00]"
                >
                  <div className="flex items-center justify-between">
                    <span className="badge-metallic-gold text-[0.6rem]">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-normal text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-normal leading-relaxed text-[#E2E8F0]">
                    {desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-[#94A3B8]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#FF7A00]" /> Verified Track
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#FF7A00] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Interactive Document Verification Checklist */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <h3 className="flex min-w-0 items-start gap-2 text-lg font-bold leading-tight text-white">
                <FileCheck className="h-5 w-5 text-[#FF7A00]" /> Mandatory Document Checklist ({state.name})
              </h3>
              <span className="text-xs text-[#FFB25E] tabular-nums font-bold">
                {Object.values(checkedDocs).filter(Boolean).length} of {content.documents.length} Checked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.documents.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDoc(idx)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-[border-color,box-shadow,transform] ${
                      isChecked
                        ? "border-[#046A38] bg-[#0B1E3B]/80 shadow-md"
                        : "border-white/10 bg-[#0B1E3B] hover:border-white/30"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-[#FF7A00]">
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 text-[#046A38]" />
                      ) : (
                        <Square className="h-5 w-5 text-white/40" />
                      )}
                    </span>
                    <div>
                      <span className={`block text-sm font-bold ${isChecked ? "text-white line-through opacity-80" : "text-white"}`}>
                        {doc}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-normal">
                        Required for Controlling Authority dossier verification
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Interactive State Fee Calculator */}
        {activeTab === "calculator" && (
          <div className="rounded-3xl border border-[rgba(231,111,0,0.35)] bg-[#0B1E3B] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="badge-metallic-gold mb-2">
                  <Calculator className="h-3.5 w-3.5 text-[#FF7A00]" /> State Fee Calculator
                </span>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {state.name} Cost Breakdown
                </h3>
              </div>
              <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
                <button
                  onClick={() => setCalcScale("d1")}
                  className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-bold sm:flex-none ${calcScale === "d1" ? "bg-[#E76F00] border-[#FF7A00] text-[#0B1E3B]" : "border-white/10 text-[#CBD5E1]"}`}
                >
                  1 District
                </button>
                <button
                  onClick={() => setCalcScale("d5")}
                  className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-bold sm:flex-none ${calcScale === "d5" ? "bg-[#E76F00] border-[#FF7A00] text-[#0B1E3B]" : "border-white/10 text-[#CBD5E1]"}`}
                >
                  5 Districts
                </button>
                <button
                  onClick={() => setCalcScale("state")}
                  className={`flex-1 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-bold sm:flex-none ${calcScale === "state" ? "bg-[#E76F00] border-[#FF7A00] text-[#0B1E3B]" : "border-white/10 text-[#CBD5E1]"}`}
                >
                  Whole State
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0B1E3B] border border-white/10">
                <span className="text-[#94A3B8] block">Statutory Govt Fee</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">₹{govFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0B1E3B] border border-white/10">
                <span className="text-[#94A3B8] block">Consultancy + MOU &amp; Training</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">₹{consultancyBundle.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0B1E3B] border border-white/10">
                <span className="text-[#94A3B8] block">Office, Rent Agreement &amp; Documentation</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">₹{officeDocBundle.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0B1E3B] border border-white/10">
                <span className="text-[#94A3B8] block">Police Verification &amp; Processing</span>
                <span className="text-lg font-bold text-white tabular-nums mt-1 block">₹{policeProcessingBundle.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#FF7A00]/40">
              <div>
                <span className="text-xs text-[#CBD5E1] font-bold">Total Estimated Budget:</span>
                <span className="text-2xl font-bold text-[#FFB25E] tabular-nums block">₹{totalStateEst.toLocaleString("en-IN")}</span>
              </div>

              <a
                href={buildWhatsAppUrl(`Hi, I am enquiring for PSARA License in ${state.name}. Estimated Total: ₹${totalStateEst.toLocaleString("en-IN")}. Please guide with filing.`)}
                target="_blank"
                rel="noopener noreferrer"
                data-v3-magnetic
                className="btn-whatsapp"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Start {state.name} Application</span>
              </a>
            </div>
          </div>
        )}
      </Section>

      <FAQ title={`Frequently Asked Questions — ${state.name}`} items={content.faqs} />
    </div>
  );
}
