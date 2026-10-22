"use client";

import { GlassCard } from "../../components/v3/PagePrimitives";

import { useState } from "react";
import { Calculator, ShieldCheck, Info, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { STATES } from "../../data/states";
import { buildWhatsAppUrl, formatEnquiryWhatsAppMessage } from "../../lib/whatsapp";
import { formatINR } from "../../lib/config";
import {
  ARMED_GUARD_ADDON,
  FEE_HEAD_NOTES,
  GOVT_ITEM_INDEX,
  QUOTE_ITEMS,
  buildDefaultAmounts,
  computeQuote,
  getStateGovFee,
  type CoverageScale,
} from "../../lib/quote-engine";

const SCALES: Array<{ id: CoverageScale; label: string; desc: string }> = [
  { id: "single-district", label: "Single-District Setup", desc: "Single District operations within State" },
  { id: "up-to-five-districts", label: "Up to 5 Districts", desc: "Multi-district regional coverage" },
  { id: "entire-state", label: "All-State PSARA Setup", desc: "Full State-wide licensing & deployment" },
];

export default function CalculatorClient() {
  const [stateSlug, setStateSlug] = useState("rajasthan");
  const [coverage, setCoverage] = useState<CoverageScale>("entire-state");
  const [needArmed, setNeedArmed] = useState(false);

  const selectedStateInfo = STATES.find((state) => state.slug === stateSlug);
  const amounts = buildDefaultAmounts(stateSlug, coverage);
  const result = computeQuote(amounts);
  const govFee = amounts[GOVT_ITEM_INDEX] ?? getStateGovFee(stateSlug, coverage).amount;
  const totalEst = result.grandTotal + (needArmed ? ARMED_GUARD_ADDON : 0);

  const scaleLabel = SCALES.find((s) => s.id === coverage)?.label ?? "";

  return (
    <StageShell>
      <PageHero
        title="PSARA License Fee & Timeline Estimator"
        lead="Transparent cost breakdown for PSARA license registration — professional consultancy, MOU &amp; training certification, statutory government fees, office &amp; documentation support, and processing."
        crumbs={[{ label: "Fee Calculator" }]}
      />

      <PageMain className="v3-tool">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Controls */}
          <GlassCard className="lg:col-span-7 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <Calculator className="h-5 w-5 text-[#FF7A00]" /> Configure License Parameters
            </h2>

            {/* State Selection */}
            <div>
              <label htmlFor="calc-state" className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2">
                1. Target Operating State / UT
              </label>
              <select
                id="calc-state"
                value={stateSlug}
                onChange={(e) => setStateSlug(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-[#132E57] p-3.5 text-sm font-bold text-white focus:border-[#FF7A00] outline-none shadow-inner"
              >
                {STATES.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Territory Scale */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2">
                2. District Coverage Scale (Statutory Govt Fee)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCALES.map((s) => {
                  const active = coverage === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCoverage(s.id)}
                      aria-pressed={active}
                      className={`p-4 rounded-xl border text-xs font-bold transition-all text-left ${
                        active
                          ? "border-[#FF7A00] bg-gradient-to-br from-[#1A3A6B] to-[#132E57] text-white shadow-lg"
                          : "border-white/12 bg-[#132E57] text-[#CBD5E1] hover:border-white/30"
                      }`}
                    >
                      <span className="block font-bold">{s.label}</span>
                      <span className="block font-mono text-sm mt-1 text-[#FFB25E]">{formatINR(getStateGovFee(stateSlug, s.id).amount)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Armed Guard Option */}
            <div className="rounded-xl border border-white/12 bg-[#132E57] p-4">
              <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-white">
                <input
                  type="checkbox"
                  checked={needArmed}
                  onChange={(e) => setNeedArmed(e.target.checked)}
                  className="h-4 w-4 accent-[#FF7A00] rounded"
                />
                <span>Include Armed Guard Endorsement Preparation (+{formatINR(ARMED_GUARD_ADDON)})</span>
              </label>
              <p className="mt-1 text-xs text-[#94A3B8] pl-7">
                Covers armed license registration, weapon custodian vetting, and arms register setup.
              </p>
            </div>

            {/* How this estimate works */}
            <div className="flex items-start gap-2 rounded-2xl border border-white/12 bg-[#132E57] p-5 text-xs text-[#CBD5E1] shadow-inner">
              <Info className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                This estimate mirrors the standard full-service quotation used for PSARA filings — all nine
                heads are included for the selected coverage. The government fee follows the{" "}
                {selectedStateInfo?.name ?? "selected state"} schedule; where a state notification differs from
                the standard slab, the desk confirms it before filing. GST, where applicable, is charged
                additionally as per law.
              </p>
            </div>
          </GlassCard>

          {/* Breakdown Table Card */}
          <GlassCard className="lg:col-span-5 text-white p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] block">
                Structured Fee Schedule
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedStateInfo?.name ?? stateSlug} • {scaleLabel}
              </h3>

              {/* Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-[#FF7A00] uppercase tracking-wider text-[10px]">
                      <th className="pb-2.5 font-bold">Fee Type</th>
                      <th className="pb-2.5 font-bold text-right">Amount (₹)</th>
                      <th className="pb-2.5 font-bold pl-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-[#E2E8F0]">
                    {QUOTE_ITEMS.map((item, i) => (
                      <tr key={item.key} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 font-medium">{item.label}</td>
                        <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(amounts[i] ?? 0)}</td>
                        <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">
                          {i === GOVT_ITEM_INDEX ? scaleLabel : FEE_HEAD_NOTES[item.key]}
                        </td>
                      </tr>
                    ))}
                    {needArmed && (
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 font-medium">Armed Guard Endorsement (Optional)</td>
                        <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(ARMED_GUARD_ADDON)}</td>
                        <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Weapons vetting</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="border-t-2 border-[#FF7A00]/50 mt-6 pt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total Estimated Cost:</span>
                <span className="text-right text-2xl font-bold text-[#FFB547] font-mono">{formatINR(totalEst)}</span>
              </div>

              <div className="mt-6 p-4 bg-[#132E57] border border-white/10 rounded-2xl text-xs text-[#CBD5E1] space-y-1.5 shadow-inner">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#FF7A00] shrink-0" />
                  <span><strong>Timeline:</strong> {selectedStateInfo?.timeline || "Confirm with desk"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#FF7A00] shrink-0" />
                  <span><strong>Validity:</strong> {selectedStateInfo?.validityYears ? `${selectedStateInfo.validityYears} year${selectedStateInfo.validityYears === 1 ? "" : "s"}` : "Confirm with desk"}</span>
                </div>
                <p className="pt-1 text-[11px] leading-relaxed text-[#94A3B8]">{selectedStateInfo?.feeNote || "State notification and district scope determine the payable government fee."}</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl(formatEnquiryWhatsAppMessage({
                  formType: "PSARA Fee Calculator",
                  state: selectedStateInfo?.name || stateSlug,
                  extra: {
                    Coverage: scaleLabel,
                    "Statutory government fee": formatINR(govFee),
                    "Standard structure total": formatINR(totalEst),
                  },
                  message: "Please share the detailed filing breakdown for this coverage.",
                }))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold uppercase tracking-wider bg-[#046A38] hover:bg-[#03522B] text-white transition-all shadow-xl shadow-green-950/40"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Get Detailed Quote on WhatsApp</span>
              </a>
              <span className="block text-[11px] text-center text-[#94A3B8] mt-2.5">
                * Government charges and third-party costs may vary by state and district. GST extra as applicable.
              </span>
            </div>
          </GlassCard>
        </div>
      </PageMain>
    </StageShell>
  );
}
