"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, Shield, MessageSquare } from "lucide-react";
import { STATES } from "../../../data/states";
import { formatEnquiryWhatsAppMessage, openWhatsApp } from "../../../lib/whatsapp";

const COVERAGE_OPTIONS = [
  { id: "district", label: "1 District", fee: "₹5,000", desc: "Single District operations within State" },
  { id: "multi-district", label: "Up to 5 Districts", fee: "₹10,000", desc: "Multi-district regional coverage" },
  { id: "statewide", label: "Entire State", fee: "₹25,000", desc: "Full State-wide licensing & deployment" },
  { id: "multi-state", label: "Multi-State Plan", fee: "Custom", desc: "Strategic expansion across 2+ States" },
];

export default function PsaraEstimator() {
  const [selectedState, setSelectedState] = useState("Rajasthan");
  const [coverageId, setCoverageId] = useState("statewide");

  const selectedCoverage = COVERAGE_OPTIONS.find((c) => c.id === coverageId) || COVERAGE_OPTIONS[2];

  const handleWhatsAppConsultation = () => {
    const text = formatEnquiryWhatsAppMessage({
      name: "Calculator User",
      phone: "Required",
      state: selectedState,
      service: "PSARA License Registration",
      formType: "PSARA Fee Estimator",
      extra: {
        "Coverage Plan": selectedCoverage.label,
        "Est Govt Fee": selectedCoverage.fee,
      },
    });
    openWhatsApp(text);
  };

  return (
    <section className="relative w-full my-12 border border-white/10 p-6 md:p-10" style={{ backgroundColor: "rgba(2,8,20,0.4)" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] flex items-center gap-2">
            <Calculator className="h-4 w-4" /> PSARA Fee & License Estimator
          </span>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
            Calculate Statutory Fee & Requirements
          </h3>
          <p className="mt-1 text-sm text-[var(--white-70)]">
            Select your target State and operational scale to view official government fees and timeline expectations.
          </p>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] bg-white/5">
            <Shield className="h-3.5 w-3.5" /> 2005 Act Rules
          </span>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Select State */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
              1. Select Target Operating State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-white/5 p-3 text-sm font-medium text-white outline-none focus:border-[var(--gold)]"
            >
              {STATES.map((s) => (
                <option key={s.slug} value={s.name} className="bg-[var(--void)] text-white">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Coverage Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
              2. Select Coverage Radius
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COVERAGE_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCoverageId(c.id)}
                  className={`text-left p-4 rounded-md border transition-colors duration-200 ${
                    coverageId === c.id
                      ? "border-[var(--gold)] bg-white/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-[var(--white-70)] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{c.label}</span>
                    <span className="text-xs font-bold text-[var(--gold-bright)]">{c.fee}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--white-55)] line-clamp-1">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Estimation Result Card */}
        <div className="lg:col-span-5 border border-white/15 p-6 bg-white/[0.03] space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--white-40)]">Estimated Breakdown</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-lg font-bold text-white">{selectedState} — {selectedCoverage.label}</span>
              <span className="text-2xl font-bold text-[var(--gold-bright)]">{selectedCoverage.fee}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--white-55)]">
              Official Controlling Authority Application Fee under PSARA Section 7.
            </p>
          </div>

          {/* Included Features */}
          <ul className="space-y-2.5 border-t border-b border-white/10 py-4 text-xs font-normal text-[var(--white-70)]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
              <span>Training Institute MOU execution assistance included</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
              <span>Promoter antecedent & police verification filing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
              <span>Estimated timeline: <strong>30–45 Working Days</strong></span>
            </li>
          </ul>

          {/* Call to action */}
          <div>
            <button
              type="button"
              onClick={handleWhatsAppConsultation}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ background: "var(--grad-metal)", color: "var(--void)" }}
            >
              <MessageSquare className="h-4 w-4" /> Get Custom Quote on WhatsApp
            </button>
            <p className="mt-2 text-center text-xs text-[var(--white-40)]">
              Free consultation with senior licensing advisor within 4 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
