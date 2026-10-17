/**
 * PSARA quotation engine — internal pricing desk.
 *
 * Fee-head structure + defaults fixed by ops (13-10-2026 quotation, totals
 * ₹3,65,000 for a standard whole-state filing). Every amount is editable per
 * client; the Government Fees row auto-fills from `data/states.ts` for the
 * selected state and coverage scale.
 *
 *   Consultancy ₹30,000 · MOU ₹20,000 + Training ₹15,000 · Govt fee (state) ·
 *   Office ₹30,000 + Rent Agreement ₹10,000 · Documents ₹20,000 ·
 *   Police Verification ₹35,000 · Other Processing ₹1,80,000
 */

import { STATES } from "../data/states";

export type CoverageScale = "single-district" | "up-to-five-districts" | "entire-state";

export const COVERAGE_LABELS: Record<CoverageScale, string> = {
  "single-district": "Single District",
  "up-to-five-districts": "Up to 5 Districts",
  "entire-state": "Whole State",
};

export interface QuoteItemDef {
  key: string;
  label: string;
  default: number;
  /** Government fee row — auto-filled from selected state + coverage */
  stateDriven?: boolean;
}

export const QUOTE_ITEMS: QuoteItemDef[] = [
  { key: "consultancy", label: "Professional Consultancy Fees", default: 30000 },
  { key: "mou", label: "MOU Preparation & Execution", default: 20000 },
  { key: "training", label: "Training Certificate", default: 15000 },
  { key: "govt", label: "Government Fees", default: 25000, stateDriven: true },
  { key: "office", label: "Office Rent / Office Arrangement", default: 30000 },
  { key: "rentAgreement", label: "Rent Agreement", default: 10000 },
  { key: "documents", label: "Affidavit Drafting, Company Profile, Forms 1, 2 & 3, and NOC", default: 20000 },
  { key: "police", label: "Police Verification & Departmental Coordination (Thana, ACP, DCP, CP/Licensing Branch, etc., as applicable)", default: 35000 },
  { key: "other", label: "Other Professional & Processing Expenses", default: 180000 },
];

export const GOVT_ITEM_INDEX = QUOTE_ITEMS.findIndex((i) => i.stateDriven);

/** Optional add-on offered on the public estimators: armed guard endorsement preparation. */
export const ARMED_GUARD_ADDON = 15000;

/** One-line notes shown beside each fee head in the public estimators. */
export const FEE_HEAD_NOTES: Record<string, string> = {
  consultancy: "Dossier & liaison",
  mou: "Recognized institute",
  training: "Certificate & records",
  govt: "Per state & coverage",
  office: "Office setup support",
  rentAgreement: "Stamping & notary",
  documents: "Legal drafting",
  police: "Thana–ACP–DCP liaison",
  other: "Filing & processing",
};

/** Section 7(2) PSARA Act slabs — used when state data carries no parseable figure */
const STANDARD_SLAB: Record<CoverageScale, number> = {
  "single-district": 5000,
  "up-to-five-districts": 10000,
  "entire-state": 25000,
};

/** ponytail: Karnataka whole-state fee is commonly cited at ₹50,000 (see PSARA_COMPLETE_RESEARCH.md) — only known deviation from the slab. Verify ISD notification on every quote. */
const GOVT_FEE_OVERRIDES: Record<string, Partial<Record<CoverageScale, number>>> = {
  karnataka: { "entire-state": 50000 },
};

const COVERAGE_FIELD: Record<CoverageScale, "feeOneDistrict" | "feeMultiDistrict" | "feeEntireState"> = {
  "single-district": "feeOneDistrict",
  "up-to-five-districts": "feeMultiDistrict",
  "entire-state": "feeEntireState",
};

export function parseIndicativeFee(value: string | undefined): number | null {
  const match = value?.match(/₹\s*([\d,]+)/);
  return match ? Number(match[1]!.replace(/,/g, "")) : null;
}

export interface StateGovFee {
  amount: number;
  /** Raw fee string from state data — shown beside the input for desk verification */
  raw: string | null;
  /** true when the amount came from the slab/override, not parsed state data */
  derived: boolean;
}

export function getStateGovFee(stateSlug: string, coverage: CoverageScale): StateGovFee {
  const state = STATES.find((s) => s.slug === stateSlug);
  const raw = state ? state[COVERAGE_FIELD[coverage]] : null;
  const parsed = parseIndicativeFee(raw ?? undefined);
  if (parsed !== null) return { amount: parsed, raw, derived: false };
  const override = GOVT_FEE_OVERRIDES[stateSlug]?.[coverage];
  if (override !== undefined) return { amount: override, raw, derived: true };
  return { amount: STANDARD_SLAB[coverage], raw, derived: true };
}

export function buildDefaultAmounts(stateSlug: string, coverage: CoverageScale): number[] {
  const amounts = QUOTE_ITEMS.map((i) => i.default);
  amounts[GOVT_ITEM_INDEX] = getStateGovFee(stateSlug, coverage).amount;
  return amounts;
}

export const GST_RATE = 0.18;

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface QuoteResult {
  lines: QuoteLine[];
  grandTotal: number;
  gstEnabled: boolean;
  gstAmount: number;
  totalPayable: number;
  words: string;
}

export function computeQuote(amounts: number[], opts: { gstEnabled?: boolean } = {}): QuoteResult {
  const lines = QUOTE_ITEMS.map((item, i) => ({
    label: item.label,
    amount: Math.max(0, Math.round(amounts[i] ?? 0)),
  }));
  const grandTotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const gstEnabled = opts.gstEnabled ?? false;
  const gstAmount = gstEnabled ? Math.round(grandTotal * GST_RATE) : 0;
  const totalPayable = grandTotal + gstAmount;
  return { lines, grandTotal, gstEnabled, gstAmount, totalPayable, words: amountInWordsINR(totalPayable) };
}

const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
  "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function under100(n: number): string {
  return n < 20 ? ONES[n]! : `${TENS[Math.floor(n / 10)]}${n % 10 ? " " + ONES[n % 10] : ""}`;
}

function under1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return [h ? `${ONES[h]} Hundred` : "", r ? under100(r) : ""].filter(Boolean).join(" ");
}

/** Indian numbering (crore / lakh / thousand) — covers up to 999 crore, far beyond any quote. */
export function amountInWordsINR(value: number): string {
  const n = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  if (n === 0) return "Rupees Zero Only";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${under1000(crore)} Crore`);
  if (lakh) parts.push(`${under100(lakh)} Lakh`);
  if (thousand) parts.push(`${under100(thousand)} Thousand`);
  if (rest) parts.push(under1000(rest));
  return `Rupees ${parts.join(" ")} Only`;
}
