"use client";

import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { DEFAULT_WA } from "../../lib/whatsapp";

const STATE_FEE_MAP: Record<string, { d1: number; d5: number; state: number }> = {
  rajasthan: { d1: 5000, d5: 10000, state: 25000 },
  delhi: { d1: 5000, d5: 10000, state: 25000 },
  maharashtra: { d1: 5000, d5: 10000, state: 25000 },
  karnataka: { d1: 5000, d5: 10000, state: 25000 },
  haryana: { d1: 5000, d5: 10000, state: 25000 },
  "uttar-pradesh": { d1: 5000, d5: 10000, state: 25000 },
  other: { d1: 5000, d5: 10000, state: 25000 },
};

const CONSULTANCY_FEE = 30000;
const MOU_TRAINING_FEE = 25000;
const DOCUMENTS_FEE = 5000;
const ARMED_GUARD_FEE = 15000;

export default function CalculatorClient() {
  const [selectedState, setSelectedState] = useState("rajasthan");
  const [scale, setScale] = useState<"d1" | "d5" | "state">("d5");
  const [needMou, setNeedMou] = useState(true);
  const [needArmed, setNeedArmed] = useState(false);

  const baseGovFee = STATE_FEE_MAP[selectedState]?.[scale] || 10000;
  const totalEst = baseGovFee + CONSULTANCY_FEE + MOU_TRAINING_FEE + DOCUMENTS_FEE + (needArmed ? ARMED_GUARD_FEE : 0);

  const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <StageShell>
      <PageHero
        title="PSARA License Fee &amp; Timeline Estimator"
        lead="Complete cost breakdown for PSARA license registration — government fees, consultancy, training MOU, documents, and optional armed guard endorsement."
        crumbs={[{ label: "Fee Calculator" }]}
      />

      <PageMain className="bg-[#FFFEF9] text-[#0F3C65]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls */}
          <div className="lg:col-span-7 rounded-3xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-6 md:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-black text-[#0F3C65] flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <Calculator className="h-5 w-5 text-[#C89B3C]" /> Configure License Parameters
            </h2>

            {/* State Selection */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#C89B3C] mb-2">
                1. Target Operating State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-xl border border-[#0F3C65]/20 bg-white p-3.5 text-sm font-bold text-[#0F3C65] focus:border-[#C89B3C] outline-none shadow-sm"
              >
                <option value="rajasthan">Rajasthan</option>
                <option value="delhi">Delhi NCR</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="karnataka">Karnataka</option>
                <option value="haryana">Haryana</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="other">Other State / UT</option>
              </select>
            </div>

            {/* Territory Scale */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#C89B3C] mb-2">
                2. District Coverage Scale
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setScale("d1")}
                  className={`p-3.5 rounded-2xl border text-xs font-black transition-all ${
                    scale === "d1"
                      ? "border-[#C89B3C] bg-[#0A233F] text-white shadow-md"
                      : "border-[#0F3C65]/15 bg-white text-[#0F3C65] hover:bg-[#FFF2BA]"
                  }`}
                >
                  1 District
                  <span className="block text-[10px] font-medium opacity-80 mt-0.5">Govt Fee: ₹5,000</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScale("d5")}
                  className={`p-3.5 rounded-2xl border text-xs font-black transition-all ${
                    scale === "d5"
                      ? "border-[#C89B3C] bg-[#0A233F] text-white shadow-md"
                      : "border-[#0F3C65]/15 bg-white text-[#0F3C65] hover:bg-[#FFF2BA]"
                  }`}
                >
                  5 Districts
                  <span className="block text-[10px] font-medium opacity-80 mt-0.5">Govt Fee: ₹10,000</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScale("state")}
                  className={`p-3.5 rounded-2xl border text-xs font-black transition-all ${
                    scale === "state"
                      ? "border-[#C89B3C] bg-[#0A233F] text-white shadow-md"
                      : "border-[#0F3C65]/15 bg-white text-[#0F3C65] hover:bg-[#FFF2BA]"
                  }`}
                >
                  Entire State
                  <span className="block text-[10px] font-medium opacity-80 mt-0.5">Govt Fee: ₹25,000</span>
                </button>
              </div>
            </div>

            {/* Addons */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer font-bold text-xs text-[#0F3C65]">
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

          {/* Breakdown Result */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-[#C89B3C]/40 bg-[#0A233F] text-white p-6 md:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#C89B3C]">
                Complete Fee Breakdown
              </span>

              <div className="mt-6 space-y-4 text-xs font-medium">
                <div className="flex justify-between py-2 border-b border-white/10 text-slate-300">
                  <span>Consultancy / Professional Fees</span>
                  <span className="font-bold text-white">{formatINR(CONSULTANCY_FEE)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/10 text-slate-300">
                  <span>Training Institute MOU Tie-up</span>
                  <span className="font-bold text-white">{formatINR(MOU_TRAINING_FEE)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/10 text-slate-300">
                  <span>Statutory Government Fee ({scale === "d1" ? "1 District" : scale === "d5" ? "5 Districts" : "Entire State"})</span>
                  <span className="font-bold text-white">{formatINR(baseGovFee)}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-white/10 text-slate-300">
                  <span>Documents, Affidavits &amp; Notarization</span>
                  <span className="font-bold text-white">{formatINR(DOCUMENTS_FEE)}</span>
                </div>

                {needArmed && (
                  <div className="flex justify-between py-2 border-b border-white/10 text-slate-300">
                    <span>Armed Guard Endorsement Preparation</span>
                    <span className="font-bold text-white">{formatINR(ARMED_GUARD_FEE)}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <span className="text-sm font-black text-white">Total Estimated Cost:</span>
                  <span className="text-2xl font-black text-[#FFF2BA] font-mono">{formatINR(totalEst)}*</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-slate-300 space-y-1">
                <p><strong className="text-white">Timeline:</strong> 30 to 45 Business Days</p>
                <p><strong className="text-white">Validity:</strong> 5 Years (Renewable)</p>
                <p><strong className="text-white">Includes:</strong> Full dossier preparation, police verification filing, authority liaison, training MOU execution, and application follow-up.</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={`${DEFAULT_WA}&text=Hi,%20I%20used%20the%20PSARA%20Calculator.%20State:%20${selectedState},%20Scale:%20${scale},%20Total:%20${formatINR(totalEst)}.%20Please%20share%20detailed%20breakdown.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-black uppercase tracking-wider bg-[#FFF2BA] text-[#0F3C65] hover:bg-[#C89B3C] hover:text-white transition-all shadow-lg"
              >
                Get Detailed Quote on WhatsApp <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </a>
              <span className="block text-[10px] text-center text-slate-400 mt-2.5">*Government fee subject to state controlling authority rules. Multi-state licensing custom quoted.</span>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
