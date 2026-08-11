"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, Shield, MessageSquare } from "lucide-react";
import { STATES } from "../../../data/states";
import { formatEnquiryWhatsAppMessage, openWhatsApp } from "../../../lib/whatsapp";

const COVERAGE_OPTIONS = [
  { id: "district", label: "1 District", govtFee: 5000, desc: "Single District operations within State" },
  { id: "multi-district", label: "Up to 5 Districts", govtFee: 10000, desc: "Multi-district regional coverage" },
  { id: "statewide", label: "Entire State", govtFee: 25000, desc: "Full State-wide licensing & deployment" },
  { id: "multi-state", label: "Multi-State Plan", govtFee: null, desc: "Strategic expansion across 2+ States" },
];

const CONSULTANCY_FEE = 30000;
const MOU_TRAINING_FEE = 25000;
const DOCUMENTS_FEE = 5000;
const ARMED_GUARD_FEE = 15000;

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function PsaraEstimator() {
  const [selectedState, setSelectedState] = useState("Rajasthan");
  const [coverageId, setCoverageId] = useState("statewide");
  const [needArmed, setNeedArmed] = useState(false);

  const selectedCoverage = COVERAGE_OPTIONS.find((c) => c.id === coverageId) || COVERAGE_OPTIONS[2];

  const govtFee = selectedCoverage.govtFee ?? 0;
  const isCustom = selectedCoverage.govtFee === null;
  const totalEst = isCustom ? null : govtFee + CONSULTANCY_FEE + MOU_TRAINING_FEE + DOCUMENTS_FEE + (needArmed ? ARMED_GUARD_FEE : 0);

  const handleWhatsAppConsultation = () => {
    const text = formatEnquiryWhatsAppMessage({
      name: "Calculator User",
      phone: "Required",
      state: selectedState,
      service: "PSARA License Registration",
      formType: "PSARA Fee Estimator",
      extra: {
        "Coverage Plan": selectedCoverage.label,
        "Consultancy Fee": formatINR(CONSULTANCY_FEE),
        "Govt Fee": selectedCoverage.govtFee ? formatINR(selectedCoverage.govtFee) : "Custom",
        "MOU Training": formatINR(MOU_TRAINING_FEE),
        "Documents": formatINR(DOCUMENTS_FEE),
        "Armed Endorsement": needArmed ? formatINR(ARMED_GUARD_FEE) : "Not Required",
      },
    });
    openWhatsApp(text);
  };

  return (
    <section className="relative w-full my-12 rounded-3xl border-2 border-[#C89B3C]/40 p-6 md:p-10 bg-[#0A233F] text-white shadow-2xl overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#C89B3C]/10 blur-3xl" aria-hidden />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C] flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#C89B3C]" /> PSARA Fee &amp; License Estimator
          </span>
          <h3 className="mt-2 font-black text-2xl md:text-3xl text-white" style={{ fontFamily: "var(--font-display)" }}>
            Complete Cost of PSARA License
          </h3>
          <p className="mt-1 text-sm text-slate-300 font-medium">
            Full transparent breakdown — consultancy, training MOU, statutory government fee, and document costs.
          </p>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C89B3C]/50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#FFF2BA] bg-[#FFF2BA]/10">
            <Shield className="h-3.5 w-3.5 text-[#C89B3C]" /> 2005 Act Rules
          </span>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Select State */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-2">
              1. Select Target Operating State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#07192C] p-3.5 text-sm font-bold text-white focus:border-[#C89B3C] outline-none"
            >
              <option>Rajasthan</option>
              <option>Delhi</option>
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

          {/* Coverage */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-2">
              2. District Coverage Scale
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COVERAGE_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCoverageId(c.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                    coverageId === c.id
                      ? "border-[#C89B3C] bg-[#FFF2BA] text-[#0F3C65] shadow-lg"
                      : "border-white/15 bg-[#07192C]/80 text-slate-300 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm">{c.label}</span>
                    <span className={`text-xs font-black ${coverageId === c.id ? "text-[#0F3C65]" : "text-[#C89B3C]"}`}>
                      {c.govtFee ? formatINR(c.govtFee) : "Custom"}
                    </span>
                  </div>
                  <p className={`mt-1 text-xs font-medium line-clamp-1 ${coverageId === c.id ? "text-[#0F3C65]/80" : "text-slate-400"}`}>{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Armed endorsement */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-white">
              <input
                type="checkbox"
                checked={needArmed}
                onChange={(e) => setNeedArmed(e.target.checked)}
                className="h-4 w-4 accent-[#C89B3C] rounded"
              />
              <span>Include Armed Guard Endorsement Preparation (+₹15,000)</span>
            </label>
          </div>
        </div>

        {/* Right Estimation Result Card */}
        <div className="lg:col-span-5 rounded-2xl border border-white/20 p-6 bg-[#07192C] space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Estimated Breakdown</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-lg font-black text-white">{selectedState} — {selectedCoverage.label}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Complete PSARA license cost estimate, all-inclusive.
            </p>
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-3 border-t border-b border-white/10 py-4 text-xs font-medium">
            <div className="flex justify-between text-slate-300">
              <span>Consultancy / Professional Fees</span>
              <span className="font-black text-white">{formatINR(CONSULTANCY_FEE)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Training Institute MOU Tie-up</span>
              <span className="font-black text-white">{formatINR(MOU_TRAINING_FEE)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Statutory Govt Fee ({selectedCoverage.label})</span>
              <span className="font-black text-white">{selectedCoverage.govtFee ? formatINR(selectedCoverage.govtFee) : "Custom"}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Documents, Affidavits &amp; Notarization</span>
              <span className="font-black text-white">{formatINR(DOCUMENTS_FEE)}</span>
            </div>
            {needArmed && (
              <div className="flex justify-between text-slate-300">
                <span>Armed Guard Endorsement</span>
                <span className="font-black text-white">{formatINR(ARMED_GUARD_FEE)}</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-white">Total Estimated Cost</span>
            <span className="text-2xl font-black text-[#FFF2BA] font-mono">
              {totalEst ? formatINR(totalEst) : "Custom"}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">*Government fee subject to State Controlling Authority rules. Multi-state licensing custom quoted.</p>

          {/* Included Features */}
          <ul className="space-y-2 text-xs text-slate-300 font-medium">
            {[
              "Complete dossier preparation & Form-I filing",
              "Training MOU execution with recognized institute",
              "Police verification & antecedent filing",
              "Office inspection preparation & liaison",
              "End-to-end follow-up till licence grant",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#C89B3C] shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Call to action */}
          <div>
            <button
              type="button"
              onClick={handleWhatsAppConsultation}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-black uppercase tracking-wider bg-[#C89B3C] text-[#0F3C65] hover:bg-[#FFF2BA] transition-colors shadow-lg"
            >
              <MessageSquare className="h-4 w-4 stroke-[2.5]" />
              <span>Get Detailed Quote on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
