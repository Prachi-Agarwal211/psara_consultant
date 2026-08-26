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
  Calculator,
  CheckSquare,
  Square,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import { getCaContact } from "../../../data/ca-contacts";
import type { StateInfo } from "../../../data/states";
import type { generateStateContent } from "../../../lib/seo-content";
import { getLocationAccent, accentStyleVars, hashSlug, type LocationAccent } from "../../lib/location-accent";
import { DEFAULT_WA } from "../../../lib/whatsapp";

type StateContent = ReturnType<typeof generateStateContent>;

interface StateDossierViewProps {
  state: StateInfo;
  content: StateContent;
  accent?: LocationAccent;
}

function DossierTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className="font-mono text-xs font-bold tracking-widest text-[#D4AF37]"
      >
        {index}
      </span>
      <div className="h-px w-10 bg-[#D4AF37]" aria-hidden />
      <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
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
  const [activeTab, setActiveTab] = useState<"process" | "documents" | "calculator">("process");
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [calcScale, setCalcScale] = useState<"d1" | "d5" | "state">("state");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const acc = accent ?? getLocationAccent(state.slug);
  const accVars = accentStyleVars(acc) as CSSProperties;
  const ca = getCaContact(state.slug);

  const variant = hashSlug(state.slug) % 4;
  const hasCa = !!(ca && ca.name && ca.name !== "—");
  const variantIdx = hasCa ? 4 : 3;
  const processIdx = variantIdx + 1;
  const feesIdx = processIdx + 1;
  const marketIdx = feesIdx + 1;
  const whyIdx = marketIdx + 1;
  const faqIdx = marketIdx + 2;
  const pad = (n: number) => String(n).padStart(2, "0");

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Fee calculation numbers
  const govFee = calcScale === "d1" ? 5000 : calcScale === "d5" ? 10000 : 25000;
  const consultancyFee = 30000;
  const mouFee = 35000;
  const docFee = 5000;
  const totalStateEst = govFee + consultancyFee + mouFee + docFee;

  return (
    <div
      className="space-y-16 py-4 text-white"
      itemScope
      itemType="https://schema.org/HowTo"
      style={accVars}
    >
      <meta itemProp="name" content={`How to apply for PSARA License in ${state.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* 1. EXECUTIVE DOSSIER HERO SUMMARY */}
      <section className="relative overflow-hidden rounded-3xl border border-[rgba(212,175,55,0.28)] bg-gradient-to-b from-[#14102A] via-[#0A1428] to-[#080714] p-6 md:p-10 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="badge-metallic-gold">
              <Shield className="h-3.5 w-3.5 text-[#D4AF37]" />
              State Statutory Framework
            </span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D4AF37]">
              Ref: PSARA-{state.slug.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-[#E2E8F0] uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" /> Capital: <strong className="text-white font-bold">{state.capital}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#D4AF37]" /> Validity: <strong className="text-white font-bold">{state.validityYears} Years</strong>
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
          <div className="rounded-2xl border border-white/10 bg-[#0F0C1F] p-4 shadow-inner">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Application Mode</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.applicationMode}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0F0C1F] p-4 shadow-inner">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Rules Framework</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.rulesNote}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0F0C1F] p-4 shadow-inner">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Coverage Scale</span>
            <span className="mt-1 block text-sm font-bold text-white">{state.cities.length}+ Major Districts</span>
          </div>
        </div>
      </section>

      {/* 2. STATE AT A GLANCE */}
      <section className="space-y-6">
        <DossierTitle index="01">State at a Glance</DossierTitle>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[rgba(212,175,55,0.28)] bg-gradient-to-br from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Controlling Authority</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.authority}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Indicative Timeline</span>
            <span className="mt-1.5 block text-lg font-bold text-white font-mono">{state.timeline}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Application Mode</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">{state.applicationMode}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Licence Validity</span>
            <span className="mt-1.5 block text-lg font-bold text-white font-mono">{state.validityYears} year{state.validityYears > 1 ? "s" : ""}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">State Capital</span>
            <span className="mt-1.5 block text-sm font-bold text-white">{state.capital}</span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
            <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-[#D4AF37]">Fee Slabs (Govt)</span>
            <span className="mt-1.5 block text-xs font-bold text-white leading-snug">₹5,000 / ₹10,000 / ₹25,000</span>
          </div>
        </div>
      </section>

      {/* 3. CA CONTACT CARD WITH ONE-CLICK COPY */}
      {hasCa && (
        <section className="space-y-6">
          <DossierTitle index="02">{`Controlling Authority — Officer & Contact Details`}</DossierTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
              <BadgeCheck className="h-4 w-4 text-[#D4AF37] mb-2" />
              <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#D4AF37]">Officer on Record</span>
              <span className="mt-1 block text-sm font-bold text-white leading-snug">{ca.name}</span>
            </div>
            {ca.phone && ca.phone !== "—" && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
                <div className="flex items-center justify-between">
                  <Phone className="h-4 w-4 text-[#D4AF37] mb-2" />
                  <button
                    onClick={() => copyToClipboard(ca.phone, "phone")}
                    className="text-[10px] text-[#D4AF37] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedField === "phone" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedField === "phone" ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#D4AF37]">Phone</span>
                <a href={`tel:${ca.phone}`} className="mt-1 block text-sm font-bold text-white hover:text-[#F5D061] break-all">{ca.phone}</a>
              </div>
            )}
            {ca.email && ca.email !== "—" && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
                <div className="flex items-center justify-between">
                  <Mail className="h-4 w-4 text-[#D4AF37] mb-2" />
                  <button
                    onClick={() => copyToClipboard(ca.email, "email")}
                    className="text-[10px] text-[#D4AF37] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedField === "email" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedField === "email" ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#D4AF37]">Email</span>
                <a href={`mailto:${ca.email}`} className="mt-1 block text-sm font-bold text-white hover:text-[#F5D061] break-all">{ca.email}</a>
              </div>
            )}
            {ca.portal && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-5 shadow-md">
                <Globe className="h-4 w-4 text-[#D4AF37] mb-2" />
                <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#D4AF37]">Portal</span>
                <span className="mt-1 block text-xs font-bold text-white break-all">{ca.portal}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. INTERACTIVE TABS: PROCESS / CHECKLIST / LIVE FEE CALCULATOR */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <DossierTitle index={pad(processIdx)}>{`Compliance Toolkit for ${state.name}`}</DossierTitle>

          <div className="flex gap-2 border border-white/10 bg-[#0F0C1F] p-1.5 rounded-xl">
            {(["process", "documents", "calculator"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab
                    ? "text-[#241703] shadow-md bg-[#C89B3C]"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.process.map((stepText, idx) => {
              const parts = stepText.split(":");
              const title = parts.length > 1 ? parts[0] : `Phase ${idx + 1}`;
              const desc = parts.length > 1 ? parts.slice(1).join(":") : stepText;

              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 shadow-md transition-all duration-200 hover:border-[#D4AF37]"
                >
                  <div className="flex items-center justify-between">
                    <span className="badge-metallic-gold text-[0.6rem]">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-normal leading-relaxed text-[#E2E8F0]">
                    {desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-[#94A3B8]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" /> Verified Track
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Interactive Document Verification Checklist */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <FileCheck className="h-5 w-5 text-[#D4AF37]" /> Mandatory Document Checklist ({state.name})
              </h3>
              <span className="text-xs text-[#F5D061] font-mono font-bold">
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
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      isChecked
                        ? "border-[#25D366] bg-[#14102A]/80 shadow-md"
                        : "border-white/10 bg-[#0F0C1F] hover:border-white/30"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-[#D4AF37]">
                      {isChecked ? (
                        <CheckSquare className="h-5 w-5 text-[#25D366]" />
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
          <div className="rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="badge-metallic-gold mb-2">
                  <Calculator className="h-3.5 w-3.5 text-[#D4AF37]" /> State Fee Calculator
                </span>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {state.name} Cost Breakdown
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCalcScale("d1")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${calcScale === "d1" ? "bg-[#C89B3C] border-[#D4AF37] text-[#241703]" : "border-white/10 text-[#CBD5E1]"}`}
                >
                  1 District
                </button>
                <button
                  onClick={() => setCalcScale("d5")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${calcScale === "d5" ? "bg-[#C89B3C] border-[#D4AF37] text-[#241703]" : "border-white/10 text-[#CBD5E1]"}`}
                >
                  5 Districts
                </button>
                <button
                  onClick={() => setCalcScale("state")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${calcScale === "state" ? "bg-[#C89B3C] border-[#D4AF37] text-[#241703]" : "border-white/10 text-[#CBD5E1]"}`}
                >
                  Whole State
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0F0C1F] border border-white/10">
                <span className="text-[#94A3B8] block">Statutory Govt Fee</span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">₹{govFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0F0C1F] border border-white/10">
                <span className="text-[#94A3B8] block">Training MOU Fee</span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">₹{mouFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0F0C1F] border border-white/10">
                <span className="text-[#94A3B8] block">Consultancy Fee</span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">₹{consultancyFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0F0C1F] border border-white/10">
                <span className="text-[#94A3B8] block">Documentation &amp; Affidavits</span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">₹{docFee.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/40">
              <div>
                <span className="text-xs text-[#CBD5E1] font-bold">Total Estimated Budget:</span>
                <span className="text-2xl font-bold gold-text-gradient font-mono block">₹{totalStateEst.toLocaleString("en-IN")}</span>
              </div>

              <a
                href={`${DEFAULT_WA}&text=Hi,%20I%20am%20enquiring%20for%20PSARA%20License%20in%20${state.name}.%20Estimated%20Total:%20₹${totalStateEst.toLocaleString("en-IN")}.%20Please%20guide%20with%20filing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Start {state.name} Application</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* 5. INTERACTIVE STATE FAQS */}
      <section className="space-y-8">
        <DossierTitle index={pad(faqIdx)}>{`Frequently Asked Questions — ${state.name}`}</DossierTitle>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {content.faqs.map((faq, idx) => (
            <details key={idx} className="group py-5 transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-2 font-[family-name:var(--font-display)] text-base font-bold text-white hover:text-[#F5D061]">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="font-mono text-xs text-[#D4AF37]">{String(idx + 1).padStart(2, "0")}</span>
                  {faq.q}
                </span>
                <span className="text-[#D4AF37] text-sm transition-transform group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-3 max-w-3xl px-2 text-sm font-normal leading-relaxed text-[#E2E8F0]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
