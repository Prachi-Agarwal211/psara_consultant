"use client";

import { GlassCard } from "../../components/v3/PagePrimitives";

import { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  FileDown,
  Info,
  Loader2,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import StageShell from "../components/ui/StageShell";
import { PageHero, PageMain } from "../../components/PageShell";
import { STATES } from "../../data/states";
import { formatINR } from "../../lib/config";
import {
  COVERAGE_LABELS,
  GOVT_ITEM_INDEX,
  QUOTE_ITEMS,
  buildDefaultAmounts,
  computeQuote,
  getStateGovFee,
  type CoverageScale,
} from "../../lib/quote-engine";
import { buildQuoteNumber, downloadQuotePdf, todayISO } from "../../lib/quote-pdf";

const DEFAULT_STATE = "rajasthan";
const DEFAULT_COVERAGE: CoverageScale = "entire-state";

const inputCls =
  "w-full rounded-xl border border-white/20 bg-[#0B1E3B] px-3.5 py-2.5 text-sm font-bold text-white focus:border-[#FF7A00] outline-none";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-[#CBD5E1] mb-2";

function replaceGovFee(amounts: number[], fee: number): number[] {
  return amounts.map((a, i) => (i === GOVT_ITEM_INDEX ? fee : a));
}

export default function QuoteTool() {
  const [stateSlug, setStateSlug] = useState(DEFAULT_STATE);
  const [coverage, setCoverage] = useState<CoverageScale>(DEFAULT_COVERAGE);
  const [amounts, setAmounts] = useState<number[]>(() => buildDefaultAmounts(DEFAULT_STATE, DEFAULT_COVERAGE));
  /** Once the desk edits the govt fee by hand, state/coverage changes stop overwriting it */
  const [govTouched, setGovTouched] = useState(false);
  const [gstEnabled, setGstEnabled] = useState(false);
  const [clientName, setClientName] = useState("");
  const [city, setCity] = useState("");
  /** Quote number & date are generated after mount — keeps SSR/CSR markup identical */
  const [quoteNumber, setQuoteNumber] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setQuoteNumber(buildQuoteNumber());
      setIssuedDate(todayISO());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const state = STATES.find((s) => s.slug === stateSlug);
  const govFee = useMemo(() => getStateGovFee(stateSlug, coverage), [stateSlug, coverage]);
  const result = useMemo(() => computeQuote(amounts, { gstEnabled }), [amounts, gstEnabled]);

  const applyState = (slug: string) => {
    setStateSlug(slug);
    if (!govTouched) setAmounts((prev) => replaceGovFee(prev, getStateGovFee(slug, coverage).amount));
  };

  const applyCoverage = (next: CoverageScale) => {
    setCoverage(next);
    if (!govTouched) setAmounts((prev) => replaceGovFee(prev, getStateGovFee(stateSlug, next).amount));
  };

  const setAmount = (index: number, value: number) => {
    setAmounts((prev) => prev.map((a, i) => (i === index ? Math.max(0, value) : a)));
    if (index === GOVT_ITEM_INDEX) setGovTouched(true);
  };

  const loadDefaults = () => {
    setAmounts(buildDefaultAmounts(stateSlug, coverage));
    setGovTouched(false);
  };

  const resyncGovFee = () => {
    setAmounts((prev) => replaceGovFee(prev, govFee.amount));
    setGovTouched(false);
  };

  const doDownload = async () => {
    if (!quoteNumber || !issuedDate) return;
    setDownloading(true);
    try {
      await downloadQuotePdf({
        quoteNumber,
        issuedDate,
        clientName,
        city,
        stateName: state?.name ?? stateSlug,
        coverageLabel: COVERAGE_LABELS[coverage],
        result,
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <StageShell>
      <PageHero
        title="PSARA Quotation Generator"
        kicker="Internal pricing desk"
        lead="Build a client-ready quotation for PSARA license filing. Amounts follow the standard ops structure; the government fee auto-fills for every state and coverage scale, and every line stays editable."
        crumbs={[{ label: "Quote Tool" }]}
      />

      <PageMain className="v3-tool">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* ── Left: inputs ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Applicant & coverage */}
            <GlassCard className="p-6 md:p-7 space-y-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <ShieldCheck className="h-5 w-5 text-[#FF7A00]" /> Applicant & License Coverage
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state-select" className={labelCls}>Target State / UT</label>
                  <select id="state-select" data-testid="state-select" value={stateSlug} onChange={(e) => applyState(e.target.value)} className={inputCls}>
                    {STATES.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="coverage-select" className={labelCls}>License Coverage</label>
                  <select id="coverage-select" data-testid="coverage-select" value={coverage} onChange={(e) => applyCoverage(e.target.value as CoverageScale)} className={inputCls}>
                    {(Object.keys(COVERAGE_LABELS) as CoverageScale[]).map((c) => (
                      <option key={c} value={c}>{COVERAGE_LABELS[c]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="client-name" className={labelCls}>Client / Company Name</label>
                  <input id="client-name" data-testid="client-name" type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Sharma Security Services Pvt. Ltd." className={inputCls} />
                </div>

                <div>
                  <label htmlFor="client-city" className={labelCls}>City (optional)</label>
                  <input id="client-city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Jaipur" className={inputCls} />
                </div>
              </div>
            </GlassCard>

            {/* Fee particulars */}
            <GlassCard className="p-6 md:p-7 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h2 className="text-lg font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Calculator className="h-5 w-5 text-[#FF7A00]" /> Fee Particulars
                </h2>
                <button
                  type="button"
                  data-testid="load-defaults"
                  onClick={loadDefaults}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#132E57] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#CBD5E1] hover:border-[#FF7A00] hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Load standard defaults
                </button>
              </div>

              <div className="divide-y divide-white/8">
                {QUOTE_ITEMS.map((item, i) => (
                  <div key={item.key} className="py-3 first:pt-1 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <label htmlFor={`amount-${i}`} className="text-sm font-medium text-[#E2E8F0]">
                          <span className="font-mono text-xs text-[#FFB25E] mr-2">{i + 1}.</span>
                          {item.label}
                        </label>
                        {i === GOVT_ITEM_INDEX && (
                          <p className="mt-1 text-[11px] text-[#94A3B8]">
                            Auto from {state?.name ?? "state"}: {govFee.raw ?? "standard slab (₹5,000 / ₹10,000 / ₹25,000)"}
                            {govFee.derived ? " — verify latest notification" : ""}
                            {govTouched && (
                              <>
                                {" · "}
                                <button type="button" onClick={resyncGovFee} className="text-[#FFB25E] underline underline-offset-2 hover:text-[#FF7A00]">
                                  re-sync from state data
                                </button>
                              </>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-xs font-bold text-[#94A3B8]">₹</span>
                        <input
                          id={`amount-${i}`}
                          data-testid={i === GOVT_ITEM_INDEX ? "gov-fee-input" : undefined}
                          type="number"
                          min={0}
                          step={500}
                          inputMode="numeric"
                          value={Number.isFinite(amounts[i]) ? amounts[i] : 0}
                          onChange={(e) => setAmount(i, Number(e.target.value) || 0)}
                          className="w-36 rounded-lg border border-white/20 bg-[#0B1E3B] px-3 py-2 text-right font-mono text-sm font-bold text-white focus:border-[#FF7A00] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <label className="flex flex-wrap items-center gap-3 cursor-pointer rounded-xl border border-white/12 bg-[#132E57] p-4">
                <input type="checkbox" data-testid="gst-toggle" checked={gstEnabled} onChange={(e) => setGstEnabled(e.target.checked)} className="h-4 w-4 accent-[#FF7A00] rounded" />
                <span className="text-sm font-bold text-white">Add GST @18% (optional)</span>
                <span className="text-xs text-[#94A3B8]">— shows a GST line and a Total Payable above</span>
              </label>

              <div className="flex items-start gap-2 rounded-xl border border-white/12 bg-[#132E57] p-4 text-[11px] text-[#94A3B8]">
                <Info className="h-4 w-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <p>
                  Standard whole-state structure totals ₹3,65,000. Edits are per quotation only — the desk values in this tool are
                  defaults, not saved overrides. Government fee follows the selected state and coverage.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* ── Right: live preview ── */}
          <div className="lg:col-span-5">
            <GlassCard className="lg:sticky lg:top-24 text-white p-6 md:p-7 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] block">Quotation Preview</span>
                  <p data-testid="quote-meta" className="mt-1 font-mono text-xs text-[#CBD5E1]">
                    {quoteNumber || "…"} · {issuedDate || "…"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuoteNumber(buildQuoteNumber())}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#CBD5E1] hover:border-[#FF7A00] hover:text-white transition-colors"
                  aria-label="Generate a new quote number"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> New No.
                </button>
              </div>

              <div className="rounded-2xl border border-white/12 bg-[#0B1E3B]/60 p-4 space-y-2.5">
                {result.lines.map((line, i) => (
                  <div key={QUOTE_ITEMS[i]!.key} className="flex items-baseline justify-between gap-3 text-xs">
                    <span className="text-[#CBD5E1] leading-snug" title={line.label}>
                      {i + 1}. {line.label}
                    </span>
                    <span className="font-mono font-bold text-white shrink-0">{formatINR(line.amount)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-[#FF7A00]/50 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Grand Total</span>
                  <span data-testid="quote-grand-total" className="font-mono text-2xl font-bold text-[#FFB25E]">
                    {formatINR(result.grandTotal)}
                  </span>
                </div>
                {result.gstEnabled && (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#CBD5E1]">GST @18%</span>
                      <span className="font-mono font-bold text-white">{formatINR(result.gstAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Total Payable</span>
                      <span data-testid="quote-total-payable" className="font-mono text-lg font-bold text-[#FFB25E]">
                        {formatINR(result.totalPayable)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-[rgba(231,111,0,0.35)] bg-[#0B1E3B]/60 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00] block mb-1">Amount in Words</span>
                <p data-testid="quote-words" className="text-sm font-bold text-white leading-relaxed">{result.words}</p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  data-testid="download-pdf"
                  onClick={doDownload}
                  disabled={downloading || !quoteNumber}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold uppercase tracking-wider bg-[#E76F00] hover:bg-[#FF7A00] disabled:opacity-60 text-white transition-colors shadow-xl"
                >
                  {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                  {downloading ? "Generating…" : "Download PDF Quotation"}
                </button>
                <p className="text-[11px] text-center text-[#94A3B8]">
                  A4 PDF in the standard ops format — 9 fee heads, grand total, amount in words, notes & signature block.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
