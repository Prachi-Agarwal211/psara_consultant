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

export default function CalculatorClient() {
  const [selectedState, setSelectedState] = useState("rajasthan");
  const [scale, setScale] = useState<"d1" | "d5" | "state">("d5");
  const [needMou, setNeedMou] = useState(true);
  const [needArmed, setNeedArmed] = useState(false);

  const baseGovFee = STATE_FEE_MAP[selectedState]?.[scale] || 10000;
  const mouEst = needMou ? 35000 : 0;
  const armedEst = needArmed ? 15000 : 0;
  const totalEst = baseGovFee + mouEst + armedEst;

  return (
    <StageShell>
      <PageHero
        title="PSARA License Fee &amp; Timeline Estimator"
        lead="Calculate statutory government fees, training MOU costs, and expected clearance timelines based on your state and operational scale."
        crumbs={[{ label: "Fee Calculator" }]}
      />

      <PageMain>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls */}
          <div className="lg:col-span-7 border border-white/10 bg-[var(--void-2)] p-6 md:p-8 space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[var(--gold-bright)]" /> Configure License Parameters
            </h2>

            {/* State Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] mb-2">
                1. Target Operating State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded border border-white/20 bg-white/5 p-3 text-sm text-white focus:border-[var(--gold)] outline-none"
              >
                <option value="rajasthan" className="bg-[var(--void-2)]">Rajasthan</option>
                <option value="delhi" className="bg-[var(--void-2)]">Delhi NCR</option>
                <option value="maharashtra" className="bg-[var(--void-2)]">Maharashtra</option>
                <option value="karnataka" className="bg-[var(--void-2)]">Karnataka</option>
                <option value="haryana" className="bg-[var(--void-2)]">Haryana</option>
                <option value="uttar-pradesh" className="bg-[var(--void-2)]">Uttar Pradesh</option>
                <option value="other" className="bg-[var(--void-2)]">Other State / UT</option>
              </select>
            </div>

            {/* Territory Scale */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] mb-2">
                2. District Coverage Scale
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setScale("d1")}
                  className={`p-3 rounded border text-xs font-bold transition-colors duration-200 ${
                    scale === "d1"
                      ? "border-[var(--gold)] bg-[var(--gold)]/20 text-white"
                      : "border-white/10 bg-white/5 text-[var(--white-70)]"
                  }`}
                >
                  1 District
                  <span className="block text-[10px] font-normal text-[var(--white-55)] mt-0.5">Govt Fee: ₹5,000</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScale("d5")}
                  className={`p-3 rounded border text-xs font-bold transition-colors duration-200 ${
                    scale === "d5"
                      ? "border-[var(--gold)] bg-[var(--gold)]/20 text-white"
                      : "border-white/10 bg-white/5 text-[var(--white-70)]"
                  }`}
                >
                  5 Districts
                  <span className="block text-[10px] font-normal text-[var(--white-55)] mt-0.5">Govt Fee: ₹10,000</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScale("state")}
                  className={`p-3 rounded border text-xs font-bold transition-colors duration-200 ${
                    scale === "state"
                      ? "border-[var(--gold)] bg-[var(--gold)]/20 text-white"
                      : "border-white/10 bg-white/5 text-[var(--white-70)]"
                  }`}
                >
                  Entire State
                  <span className="block text-[10px] font-normal text-[var(--white-55)] mt-0.5">Govt Fee: ₹25,000</span>
                </button>
              </div>
            </div>

            {/* Addons */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needMou}
                  onChange={(e) => setNeedMou(e.target.checked)}
                  className="h-4 w-4 accent-[var(--gold)] rounded"
                />
                <span className="text-xs text-white">Include Security Training Institute MOU Tie-up</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needArmed}
                  onChange={(e) => setNeedArmed(e.target.checked)}
                  className="h-4 w-4 accent-[var(--gold)] rounded"
                />
                <span className="text-xs text-white">Include Armed Guard Endorsement Preparation</span>
              </label>
            </div>
          </div>

          {/* Breakdown Result */}
          <div className="lg:col-span-5 border border-[var(--gold)]/40 bg-[var(--void-2)] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                Estimated Breakdown
              </span>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-white/10 text-[var(--white-70)]">
                  <span>Statutory Government Fee:</span>
                  <span className="font-bold text-white">₹{baseGovFee.toLocaleString("en-IN")}</span>
                </div>

                {needMou && (
                  <div className="flex justify-between py-2 border-b border-white/10 text-[var(--white-70)]">
                    <span>Training Institute MOU Execution:</span>
                    <span className="font-bold text-white">₹{mouEst.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {needArmed && (
                  <div className="flex justify-between py-2 border-b border-white/10 text-[var(--white-70)]">
                    <span>Armed Weapon Clearance Prep:</span>
                    <span className="font-bold text-white">₹{armedEst.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-white">Estimated Base Budget:</span>
                  <span className="text-2xl font-bold text-metal font-mono">₹{totalEst.toLocaleString("en-IN")}*</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/[0.03] border border-white/10 text-[11px] text-[var(--white-70)] space-y-1">
                <p><strong className="text-white">Timeline:</strong> 45 to 60 Business Days</p>
                <p><strong className="text-white">Validity:</strong> 5 Years (Renewable)</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={`${DEFAULT_WA}&text=Hi,%20I%20used%20the%20PSARA%20Calculator%20for%20${selectedState}%20(${scale}).%20Total%20estimate:%20₹${totalEst}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold uppercase tracking-wider"
                style={{ background: "var(--grad-metal)", color: "var(--void)" }}
              >
                Lock Your Estimate on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <span className="block text-[10px] text-center text-[var(--white-40)] mt-2">*Official government fee subject to state controlling authority rules.</span>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
