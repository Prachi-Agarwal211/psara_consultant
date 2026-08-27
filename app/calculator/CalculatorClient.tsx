"use client";

import { useState } from "react";
import { Calculator, ShieldCheck, Info, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { STATES } from "../../data/states";
import { buildWhatsAppUrl, formatEnquiryWhatsAppMessage } from "../../lib/whatsapp";

const CONSULTANCY_FEE = 30000;
const MOU_TRAINING_FEE = 35000;
const DOCUMENTS_FEE = 5000;
const ARMED_GUARD_FEE = 15000;

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

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function parseIndicativeFee(value: string | undefined): number | null {
  const match = value?.match(/₹\s*([\d,]+)/);
  return match ? Number(match[1]!.replace(/,/g, "")) : null;
}

const STATE_ALIASES: Record<string, string> = {
  delhi: "delhi",
  maharashtra: "maharashtra",
  karnataka: "karnataka",
  haryana: "haryana",
  "uttar-pradesh": "uttar-pradesh",
  rajasthan: "rajasthan",
};

export default function CalculatorClient() {
  const [selectedState, setSelectedState] = useState("rajasthan");
  const [scale, setScale] = useState<"d1" | "d5" | "state">("state");
  const [needArmed, setNeedArmed] = useState(false);

  const selectedStateInfo = STATES.find((state) => state.slug === STATE_ALIASES[selectedState]);
  const feeField: "feeOneDistrict" | "feeMultiDistrict" | "feeEntireState" = scale === "d1" ? "feeOneDistrict" : scale === "d5" ? "feeMultiDistrict" : "feeEntireState";
  const baseGovFee = parseIndicativeFee(selectedStateInfo?.[feeField]);
  const totalEst = baseGovFee === null
    ? null
    : baseGovFee + CONSULTANCY_FEE + MOU_TRAINING_FEE + DOCUMENTS_FEE + (needArmed ? ARMED_GUARD_FEE : 0);

  const scaleLabel = scale === "d1" ? "Single-District Setup" : scale === "d5" ? "Up to 5 Districts" : "All-State PSARA Setup";

  return (
    <StageShell>
      <PageHero
        title="PSARA License Fee &amp; Timeline Estimator"
        lead="Transparent cost breakdown for PSARA license registration — professional consultancy, training MOU, statutory government fees, and documentation."
        crumbs={[{ label: "Fee Calculator" }]}
      />

      <PageMain className="bg-[#080714] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Controls */}
          <div className="lg:col-span-7 rounded-3xl border border-[rgba(212,175,55,0.25)] bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 md:p-8 space-y-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <Calculator className="h-5 w-5 text-[#D4AF37]" /> Configure License Parameters
            </h2>

            {/* State Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2">
                1. Target Operating State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-[#060B18] p-3.5 text-sm font-bold text-white focus:border-[#D4AF37] outline-none shadow-inner"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2">
                2. District Coverage Scale (Statutory Govt Fee)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setScale("d1")}
                  className={`p-4 rounded-xl border text-xs font-bold transition-all text-left ${
                    scale === "d1"
                      ? "border-[#D4AF37] bg-gradient-to-br from-[#14284D] to-[#0A162B] text-white shadow-lg"
                      : "border-white/12 bg-[#060B18] text-[#CBD5E1] hover:border-white/30"
                  }`}
                >
                  <span className="block font-bold">Single-District</span>
                  <span className="block font-mono text-sm mt-1 text-[#F5D061]">{parseIndicativeFee(selectedStateInfo?.feeOneDistrict) ? formatINR(parseIndicativeFee(selectedStateInfo?.feeOneDistrict)!) : "Verify"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScale("d5")}
                  className={`p-4 rounded-xl border text-xs font-bold transition-all text-left ${
                    scale === "d5"
                      ? "border-[#D4AF37] bg-gradient-to-br from-[#14284D] to-[#0A162B] text-white shadow-lg"
                      : "border-white/12 bg-[#060B18] text-[#CBD5E1] hover:border-white/30"
                  }`}
                >
                  <span className="block font-bold">Up to 5 Districts</span>
                  <span className="block font-mono text-sm mt-1 text-[#F5D061]">{parseIndicativeFee(selectedStateInfo?.feeMultiDistrict) ? formatINR(parseIndicativeFee(selectedStateInfo?.feeMultiDistrict)!) : "Verify"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScale("state")}
                  className={`p-4 rounded-xl border text-xs font-bold transition-all text-left ${
                    scale === "state"
                      ? "border-[#D4AF37] bg-gradient-to-br from-[#14284D] to-[#0A162B] text-white shadow-lg"
                      : "border-white/12 bg-[#060B18] text-[#CBD5E1] hover:border-white/30"
                  }`}
                >
                  <span className="block font-bold">All-State PSARA</span>
                  <span className="block font-mono text-sm mt-1 text-[#F5D061]">{parseIndicativeFee(selectedStateInfo?.feeEntireState) ? formatINR(parseIndicativeFee(selectedStateInfo?.feeEntireState)!) : "Verify"}</span>
                </button>
              </div>
            </div>

            {/* Armed Guard Option */}
            <div className="rounded-xl border border-white/12 bg-[#060B18] p-4">
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
                Covers armed license registration, weapon custodian vetting, and arms register setup.
              </p>
            </div>

            {/* Other Costs List */}
            <div className="rounded-2xl border border-white/12 bg-[#060B18] p-5 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <Info className="h-4 w-4" /> Other Statutory &amp; Third-Party Costs
              </div>
              <div className="space-y-2 pt-1">
                {OTHER_COSTS.map((oc) => (
                  <div key={oc.title} className="text-xs border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">{oc.title}</span>
                      <span className="font-mono font-bold text-[#F5D061]">{oc.range}</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">{oc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Breakdown Table Card */}
          <div className="lg:col-span-5 rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-b from-[#14102A] to-[#060B18] text-white p-6 md:p-8 flex flex-col justify-between shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
                Structured Fee Schedule
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedState.toUpperCase()} • {scaleLabel}
              </h3>

              {/* Table */}
              <div className="mt-6 overflow-x-auto">
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
                      <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(CONSULTANCY_FEE)}</td>
                      <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Dossier &amp; liaison</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-medium">Training MOU Fee</td>
                      <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(MOU_TRAINING_FEE)}</td>
                      <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Recognized institute</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-medium">Statutory Govt Fee</td>
                      <td className="py-2.5 font-mono font-bold text-white text-right">{baseGovFee === null ? "Verify" : formatINR(baseGovFee)}</td>
                      <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">{scaleLabel}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-medium">Documentation &amp; Affidavits</td>
                      <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(DOCUMENTS_FEE)}</td>
                      <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Legal paperwork</td>
                    </tr>
                    {needArmed && (
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 font-medium">Armed Guard Endorsement</td>
                        <td className="py-2.5 font-mono font-bold text-white text-right">{formatINR(ARMED_GUARD_FEE)}</td>
                        <td className="py-2.5 pl-4 text-[11px] text-[#94A3B8]">Weapons vetting</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="border-t-2 border-[#D4AF37]/50 mt-6 pt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total Estimated Cost:</span>
                <span className="text-right text-2xl font-bold gold-metallic-text font-mono">{totalEst === null ? "Verify with desk" : formatINR(totalEst)}</span>
              </div>

              <div className="mt-6 p-4 bg-[#060B18] border border-white/10 rounded-2xl text-xs text-[#CBD5E1] space-y-1.5 shadow-inner">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span><strong>Timeline:</strong> {selectedStateInfo?.timeline || "Confirm with desk"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span><strong>Validity:</strong> {selectedStateInfo?.validityYears ? `${selectedStateInfo.validityYears} year${selectedStateInfo.validityYears === 1 ? "" : "s"}` : "Confirm with desk"}</span>
                </div>
                <p className="pt-1 text-[11px] leading-relaxed text-[#94A3B8]">{selectedStateInfo?.feeNote || "State notification and district scope determine the payable government fee."}</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppUrl(formatEnquiryWhatsAppMessage({
                  formType: "PSARA Fee Calculator",
                  state: selectedStateInfo?.name || selectedState,
                  extra: {
                    Coverage: scaleLabel,
                    "Indicative statutory fee": baseGovFee === null ? "Verify with desk" : formatINR(baseGovFee),
                    "Indicative total": totalEst === null ? "Verify with desk" : formatINR(totalEst),
                  },
                  message: "Please share the current state-wise government fee and detailed filing breakdown.",
                }))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] text-white transition-all shadow-xl shadow-green-950/40"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Get Detailed Quote on WhatsApp</span>
              </a>
              <span className="block text-[11px] text-center text-[#94A3B8] mt-2.5">
                * Government charges and third-party costs may vary by state and district.
              </span>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
