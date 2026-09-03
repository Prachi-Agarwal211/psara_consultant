"use client";

import { useState } from "react";
import { CheckCircle2, Shield, MessageSquare, Info, Sparkles } from "lucide-react";
import { formatEnquiryWhatsAppMessage, openWhatsApp } from "../../../lib/whatsapp";
import { FEES, formatINR } from "../../../lib/config";

const COVERAGE_OPTIONS = [
  { id: "district", label: "Single-District Setup", govtFee: FEES.govt.singleDistrict, desc: "Single District operations within State" },
  { id: "multi-district", label: "Up to 5 Districts", govtFee: FEES.govt.upToFiveDistricts, desc: "Multi-district regional coverage" },
  { id: "statewide", label: "All-State PSARA Setup", govtFee: FEES.govt.entireState, desc: "Full State-wide licensing & deployment" },
];

const OTHER_COSTS = [
  {
    title: "Police Verification & Antecedent Clearance",
    range: "₹3,000 – ₹8,000",
    desc: "SP/CP office antecedent verification and CCTNS database clearance per director/promoter.",
  },
  {
    title: "Notarization, Stamp Duty & Affidavits",
    range: "₹2,000 – ₹5,000",
    desc: "State non-judicial e-stamp paper, notarized director declarations, and lease deed attestation.",
  },
  {
    title: "ROC Object Clause Amendment / Setup",
    range: "₹5,000 – ₹12,000",
    desc: "Company/LLP incorporation or MOA main object clause amendment for security operations (if applicable).",
  },
  {
    title: "Armed Guard Endorsement Preparation",
    range: "₹15,000",
    desc: "Armed license vetting, weapon custodian protocols, and specialized armor/training documentation.",
  },
];

export default function PsaraEstimator() {
  const [selectedState, setSelectedState] = useState("Rajasthan");
  const [coverageId, setCoverageId] = useState("statewide");
  const [needArmed, setNeedArmed] = useState(false);

  const selectedCoverage = COVERAGE_OPTIONS.find((c) => c.id === coverageId) || COVERAGE_OPTIONS[2];
  const govtFee = selectedCoverage.govtFee;
  const totalEst = govtFee + FEES.consultancy + FEES.mouTraining + FEES.documents + (needArmed ? FEES.armedGuard : 0);

  const handleWhatsAppConsultation = () => {
    const text = formatEnquiryWhatsAppMessage({
      name: "Calculator User",
      phone: "Required",
      state: selectedState,
      service: "PSARA License Registration",
      formType: "PSARA Fee Estimator",
      extra: {
        "Coverage Scope": selectedCoverage.label,
        "Consultancy & Professional": formatINR(FEES.consultancy),
        "Training MOU Fee": formatINR(FEES.mouTraining),
        "Statutory Govt Fee": formatINR(govtFee),
        "Documentation & Affidavits": formatINR(FEES.documents),
        "Armed Endorsement": needArmed ? formatINR(FEES.armedGuard) : "Not Selected",
        "Total Estimate": formatINR(totalEst),
      },
    });
    openWhatsApp(text);
  };

  return (
    <section className="relative w-full my-12 rounded-xl border border-white/10 p-6 md:p-10 bg-[var(--surface-card-dark)] text-white shadow-[var(--shadow-card)] overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" /> Statutory Cost Transparency
          </div>
            <h3 className="font-bold text-2xl md:text-4xl text-white" style={{ fontFamily: "var(--font-display)" }}>
            Complete Cost of <span className="gold-text-gradient">PSARA License</span>
          </h3>
          <p className="mt-2 text-sm text-[#E2E8F0] font-normal max-w-2xl">
            Transparent fee structure — professional consultancy, training MOU, statutory government fee, and document costs under the PSARA Act, 2005.
          </p>
        </div>
        <div className="shrink-0">
          <span className="badge-metallic-gold">
            <Shield className="h-3.5 w-3.5 text-[#D4AF37]" /> PSARA Act 2005
          </span>
        </div>
      </div>

      {/* Main Grid Body */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Configuration */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target State */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2">
              1. Select Target Operating State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-xl border border-violet-200/25 bg-[#120C27] p-3.5 text-sm font-bold text-white focus:border-[#D4AF37] outline-none shadow-inner"
            >
              <option>Rajasthan</option>
              <option>Delhi NCR</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Haryana</option>
              <option>Uttar Pradesh</option>
              <option>Gujarat</option>
              <option>Madhya Pradesh</option>
              <option>Punjab</option>
              <option>Bihar</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>West Bengal</option>
              <option>Other State / UT</option>
            </select>
          </div>

          {/* Coverage Scope */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2">
              2. Select District Coverage Scale (Statutory Govt Fee)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {COVERAGE_OPTIONS.map((c) => {
                const active = coverageId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    data-cursor="Set scope"
                    onClick={() => setCoverageId(c.id)}
                    className={`text-left p-4 rounded-xl border transition-[border-color,box-shadow,transform,filter] duration-200 ${
                      active
                        ? "border-[#D4AF37] bg-gradient-to-br from-[#3B2374] to-[#180D36] text-white shadow-xl shadow-[0_20px_40px_-24px_rgba(8,6,17,0.65)]"
                        : "border-white/12 bg-[#180D36] text-[#CBD5E1] hover:border-violet-300/50"
                    }`}
                  >
                    <span className="font-bold text-xs block leading-snug text-white">{c.label}</span>
                    <span className={`text-base font-bold font-mono mt-1 block ${active ? "text-[#F5D061]" : "text-[#D4AF37]"}`}>
                      {formatINR(c.govtFee)}
                    </span>
                    <p className="mt-1 text-[11px] text-[#94A3B8] line-clamp-1">{c.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Armed Endorsement */}
          <div className="rounded-xl border border-violet-200/15 bg-[#180D36] p-4">
            <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-white">
              <input
                type="checkbox"
                checked={needArmed}
                onChange={(e) => setNeedArmed(e.target.checked)}
                className="h-4 w-4 accent-[#D4AF37] rounded"
              />
              <span>Include Armed Guard Endorsement Preparation (+₹15,000)</span>
            </label>
            <p className="mt-1 text-xs text-[#94A3B8] pl-7">
              Required if your agency deploys armed security personnel or cash-in-transit escorts.
            </p>
          </div>

          {/* Additional / Other Costs Section — flat */}
          <div className="rounded-xl border border-white/10 bg-[var(--canvas-void-2)] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <Info className="h-4 w-4" /> Other Third-Party / Statutory Expenses
            </div>
            <p className="text-xs text-[#CBD5E1]">
              Additional expenses required during processing, billed on actuals or handled directly with authorities:
            </p>
            <div className="space-y-2.5 pt-1">
              {OTHER_COSTS.map((oc) => (
                <div key={oc.title} className="text-xs border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold">{oc.title}</strong>
                    <span className="font-mono font-bold text-[#F5D061]">{oc.range}</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">{oc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Fee Grid — flat */}
        <div className="lg:col-span-5 rounded-xl border border-white/10 p-6 bg-[var(--canvas-void-2)] space-y-6 shadow-[var(--shadow-card)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
              Structured Cost Breakdown
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              {selectedState} • {selectedCoverage.label}
            </h4>
          </div>

          {/* Fee Table Grid (Fee Type | Amount | Notes) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-[#D4AF37] uppercase tracking-wider text-[10px]">
                  <th className="pb-2.5 font-bold">Fee Type</th>
                  <th className="pb-2.5 font-bold text-right">Amount (₹)</th>
                  <th className="pb-2.5 font-bold pl-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#E2E8F0]">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-medium">Consultancy &amp; Professional</td>
                  <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(FEES.consultancy)}</td>
                  <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Dossier &amp; follow-up</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-medium">Training MOU Fee</td>
                  <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(FEES.mouTraining)}</td>
                  <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Institute affiliation</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-medium">Statutory Govt Fee</td>
                  <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(govtFee)}</td>
                  <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">{selectedCoverage.label}</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 font-medium">Documentation &amp; Affidavits</td>
                  <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(FEES.documents)}</td>
                  <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Legal drafting</td>
                </tr>
                {needArmed && (
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 font-medium">Armed Guard Endorsement</td>
                    <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(FEES.armedGuard)}</td>
                    <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Weapons vetting</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Row */}
          <div className="border-t-2 border-[#D4AF37]/40 pt-4 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Total Estimated Cost</span>
            <span className="text-2xl font-bold gold-text-gradient font-mono">
              {formatINR(totalEst)}
            </span>
          </div>

          {/* Inclusions */}
          <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-[#CBD5E1]">
            {[
              "Complete Form-I filing & dossier preparation",
              "Recognized Security Guard Training MOU execution",
              "Police antecedent verification tracking",
              "Office inspection readiness & uniform vetting",
              "Direct liaison till official license issuance",
            ].map((f) => (
              <div key={f} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <button
            type="button"
            onClick={handleWhatsAppConsultation}
            data-cursor="Get estimate"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] text-white transition-[border-color,box-shadow,transform] shadow-xl shadow-green-950/40"
          >
            <MessageSquare className="h-4 w-4 fill-white" />
            <span>Get Official Fee Breakdown on WhatsApp</span>
          </button>

          {/* Disclaimer */}
          <p className="text-[11px] text-[#94A3B8] font-normal leading-relaxed border-t border-white/10 pt-3">
            * Disclaimer: Government charges and third-party costs may vary by state and district.
          </p>
        </div>
      </div>
    </section>
  );
}
