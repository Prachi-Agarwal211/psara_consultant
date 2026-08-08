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
            Calculate Statutory Fee &amp; Requirements
          </h3>
          <p className="mt-1 text-sm text-slate-300 font-medium">
            Select your target State and operational scale to view official government fees and timeline expectations.
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
              className="w-full rounded-xl border border-white/20 bg-[#07192C] p-3.5 text-sm font-bold text-white outline-none focus:border-[#C89B3C] shadow-inner"
            >
              {STATES.map((s) => (
                <option key={s.slug} value={s.name} className="bg-[#0A233F] text-white">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Coverage Level */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-2">
              2. Select Coverage Radius
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
                    <span className={`text-xs font-black ${coverageId === c.id ? "text-[#0F3C65]" : "text-[#C89B3C]"}`}>{c.fee}</span>
                  </div>
                  <p className={`mt-1 text-xs font-medium line-clamp-1 ${coverageId === c.id ? "text-[#0F3C65]/80" : "text-slate-400"}`}>{c.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Estimation Result Card */}
        <div className="lg:col-span-5 rounded-2xl border border-white/20 p-6 bg-[#07192C] space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Estimated Breakdown</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-lg font-black text-white">{selectedState} — {selectedCoverage.label}</span>
              <span className="text-2xl font-black text-[#FFF2BA]">{selectedCoverage.fee}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Official Controlling Authority Application Fee under PSARA Section 7.
            </p>
          </div>

          {/* Included Features */}
          <ul className="space-y-3 border-t border-b border-white/10 py-4 text-xs font-medium text-slate-200">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#C89B3C] shrink-0" />
              <span>Training Institute MOU execution assistance included</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#C89B3C] shrink-0" />
              <span>Promoter antecedent &amp; police verification filing</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#C89B3C] shrink-0" />
              <span>Estimated timeline: <strong className="text-white">30–45 Working Days</strong></span>
            </li>
          </ul>

          {/* Call to action */}
          <div>
            <button
              type="button"
              onClick={handleWhatsAppConsultation}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-black uppercase tracking-wider bg-[#C89B3C] text-[#0F3C65] hover:bg-[#FFF2BA] transition-colors shadow-lg"
            >
              <MessageSquare className="h-4 w-4 stroke-[2.5]" />
              <span>Get Custom Quote on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

