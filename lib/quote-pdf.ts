import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CONTACT } from "./config";
import type { QuoteResult } from "./quote-engine";

/**
 * Single-page branded quotation PDF — "QUOTATION FOR PSARA LICENSE".
 * Layout follows the ops quotation format (13-10-2026): 9 fee heads,
 * GRAND TOTAL, Amount in Words, Notes & Terms, signature block.
 */

const C = {
  navy: [11, 30, 59] as [number, number, number],
  navySoft: [19, 46, 87] as [number, number, number],
  saffron: [231, 111, 0] as [number, number, number],
  saffronDeep: [179, 84, 0] as [number, number, number],
  saffronPale: [255, 232, 209] as [number, number, number],
  cream: [255, 253, 245] as [number, number, number],
  paper: [255, 253, 245] as [number, number, number],
  ink: [51, 70, 95] as [number, number, number],
  muted: [71, 85, 105] as [number, number, number],
  line: [232, 223, 200] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const CO = {
  name: "PSARA CONSULTANT INDIA",
  tagline: "PSARA License Consultancy & Documentation Services",
  regOffice:
    "Registered Office: 5th Floor, Statesman House, Plot No. 148, Barakhamba Road, Connaught Place, New Delhi 110001",
  phone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  web: "www.psaraconsultantindia.com",
};

function formatINR_PDF(n: number): string {
  return `Rs. ${Math.round(n).toLocaleString("en-IN")}`;
}

function lastY(doc: jsPDF): number {
  const t = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable;
  return t ? t.finalY : 0;
}

async function loadImg(src: string, maxPx = 256): Promise<string | null> {
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((ok, fail) => {
      const r = new FileReader();
      r.onload = () => ok(String(r.result));
      r.onerror = fail;
      r.readAsDataURL(blob);
    });
    // jsPDF re-encodes the full-resolution PNG unless we shrink it first —
    // the mark renders at 17mm, so 256px keeps ~380 DPI and the PDF small.
    const img = await new Promise<HTMLImageElement | null>((ok) => {
      const im = new Image();
      im.onload = () => ok(im);
      im.onerror = () => ok(null);
      im.src = dataUrl;
    });
    if (!img || Math.max(img.width, img.height) <= maxPx) return dataUrl;
    const scale = maxPx / Math.max(img.width, img.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

function saffronCorners(doc: jsPDF, x: number, y: number, w: number, h: number, s = 4) {
  doc.setDrawColor(...C.saffron);
  doc.setLineWidth(0.35);
  doc.line(x, y + s, x, y); doc.line(x, y, x + s, y);
  doc.line(x + w - s, y + h, x + w, y + h); doc.line(x + w, y + h - s, x + w, y + h);
}

export interface QuotePdfMeta {
  quoteNumber: string;
  issuedDate: string;
  /** Client / Company Name — single line as per the ops template */
  clientName?: string;
  city?: string;
  stateName: string;
  coverageLabel: string;
  result: QuoteResult;
}

export async function generateQuotePdf(meta: QuotePdfMeta): Promise<jsPDF> {
  const { quoteNumber, issuedDate, stateName, coverageLabel, result } = meta;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const m = 14;

  // ── HEADER — navy band ──
  doc.setFillColor(...C.navy);
  doc.rect(0, 0, W, 27, "F");
  doc.setFillColor(...C.saffron);
  doc.rect(0, 27, W, 0.8, "F");
  doc.setFillColor(...C.saffronDeep);
  doc.rect(0, 27.8, W, 0.3, "F");

  const logo = await loadImg("/assets/images/brand/psara-consultant-india-mark-transparent.png");
  if (logo) {
    try { doc.addImage(logo, "PNG", m, 5, 17, 17); } catch { /* logo optional */ }
  }

  const lx = m + (logo ? 20 : 0);
  doc.setTextColor(...C.cream);
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5);
  doc.text("PSARA CONSULTANT INDIA", lx, 11);
  doc.setFont("helvetica", "normal"); doc.setFontSize(7.2);
  doc.setTextColor(...C.saffronPale);
  doc.text("PSARA License Consultancy & Documentation Services", lx, 16.5);

  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  doc.setTextColor(...C.cream);
  doc.text("QUOTATION", W - m, 9, { align: "right" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(7);
  doc.setTextColor(...C.saffronPale);
  doc.text(quoteNumber, W - m, 14, { align: "right" });
  doc.text(`Date: ${issuedDate}`, W - m, 18.5, { align: "right" });
  doc.text("Valid for 30 days", W - m, 23, { align: "right" });

  // ── TITLE ──
  let y = 35;
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.setTextColor(...C.saffronDeep);
  doc.text("QUOTATION FOR PSARA LICENSE", m, y);
  doc.setDrawColor(...C.saffron); doc.setLineWidth(0.25);
  doc.line(m, y + 2, m + 66, y + 2);
  y += 7;

  // ── CLIENT BOX ──
  const boxW = W - m * 2, boxH = 26;
  doc.setFillColor(...C.paper);
  doc.roundedRect(m, y, boxW, boxH, 1.2, 1.2, "F");
  doc.setDrawColor(...C.line); doc.setLineWidth(0.25);
  doc.roundedRect(m, y, boxW, boxH, 1.2, 1.2, "S");
  saffronCorners(doc, m, y, boxW, boxH);

  doc.setFont("helvetica", "bold"); doc.setFontSize(6.5);
  doc.setTextColor(...C.saffronDeep);
  doc.text("QUOTATION TO", m + 5, y + 5.5);
  doc.setFont("helvetica", "bold"); doc.setFontSize(9.5);
  doc.setTextColor(...C.navy);
  doc.text(meta.clientName?.trim() || "—", m + 5, y + 11.5);
  doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(...C.ink);
  doc.text(`${meta.city ? meta.city + ", " : ""}${stateName}  |  License Coverage: ${coverageLabel}`, m + 5, y + 17.5);
  doc.setFontSize(7); doc.setTextColor(...C.muted);
  doc.text("Statutory filings, documentation & departmental coordination for PSARA license grant.", m + 5, y + 22.5);

  const rx = W - m - 62;
  const metaRows: Array<[string, string]> = [
    ["Quotation No.", quoteNumber],
    ["Date", issuedDate],
    ["License Coverage", coverageLabel],
  ];
  let ry = y + 6;
  for (const [label, value] of metaRows) {
    doc.setFont("helvetica", "normal"); doc.setFontSize(6.3); doc.setTextColor(...C.muted);
    doc.text(label, rx, ry);
    doc.setFont("helvetica", "bold"); doc.setFontSize(7.4); doc.setTextColor(...C.navy);
    doc.text(value, rx + 30, ry);
    ry += 5.2;
  }
  y += boxH + 6;

  // ── FEE TABLE ──
  const itemRows = result.lines.map((l, i) => [String(i + 1), l.label, formatINR_PDF(l.amount)]);
  const totalRows: string[][] = [["", "GRAND TOTAL", formatINR_PDF(result.grandTotal)]];
  if (result.gstEnabled) {
    totalRows.push(["", "GST @18%", formatINR_PDF(result.gstAmount)]);
    totalRows.push(["", "TOTAL PAYABLE", formatINR_PDF(result.totalPayable)]);
  }

  autoTable(doc, {
    startY: y,
    margin: { left: m, right: m },
    head: [["S. No.", "Particulars", "Amount (Rs.)"]],
    body: [...itemRows, ...totalRows],
    theme: "grid",
    headStyles: { fillColor: C.navy, textColor: C.cream, fontSize: 8, fontStyle: "bold", cellPadding: 1.8 },
    styles: { fontSize: 8, cellPadding: 1.8, textColor: C.ink, lineColor: C.line, lineWidth: 0.12, font: "helvetica" },
    alternateRowStyles: { fillColor: [252, 250, 246] },
    columnStyles: {
      0: { cellWidth: 14, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 44, halign: "right", fontStyle: "bold" },
    },
    didParseCell: (data) => {
      if (data.section !== "body") return;
      const label = String(data.row.cells[1]?.raw ?? "");
      if (label === "GRAND TOTAL") {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = C.navy;
        data.cell.styles.textColor = C.saffronPale;
      } else if (label.startsWith("GST")) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = C.saffronPale;
        data.cell.styles.textColor = C.saffronDeep;
      } else if (label === "TOTAL PAYABLE") {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = C.navySoft;
        data.cell.styles.textColor = C.cream;
      }
    },
  });
  y = lastY(doc) + 6;

  // ── AMOUNT IN WORDS ──
  const wordsLabel = "Amount in Words";
  const wordsText = result.words;
  doc.setFont("helvetica", "bold"); doc.setFontSize(6.5);
  const wordsLines = doc.splitTextToSize(wordsText, W - m * 2 - 42);
  const wordsBoxH = Math.max(13, wordsLines.length * 4 + 7);
  doc.setFillColor(...C.saffronPale);
  doc.roundedRect(m, y, W - m * 2, wordsBoxH, 1.2, 1.2, "F");
  doc.setDrawColor(...C.saffron); doc.setLineWidth(0.25);
  doc.roundedRect(m, y, W - m * 2, wordsBoxH, 1.2, 1.2, "S");
  doc.setTextColor(...C.saffronDeep);
  doc.text(wordsLabel, m + 5, y + 5.5);
  doc.setTextColor(...C.navy);
  doc.setFont("helvetica", "bold"); doc.setFontSize(8.5);
  doc.text(wordsLines, m + 42, y + 5.5);
  y += wordsBoxH + 7;

  // ── NOTES & TERMS ──
  doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
  doc.setTextColor(...C.navy);
  doc.text("Notes & Terms", m, y);
  doc.setDrawColor(...C.saffron); doc.setLineWidth(0.2);
  doc.line(m + 23, y, m + 33, y);
  y += 3.8;

  doc.setFont("helvetica", "normal"); doc.setFontSize(6.3); doc.setTextColor(...C.muted);
  const notes = [
    "1) Government / statutory fees are payable as per the prevailing State/UT notification and the approved area of operation; any statutory revision will be charged at actuals.",
    "2) Professional scope covers documentation, filings, training MOU coordination, police verification liaison and departmental follow-up for the stated coverage.",
    "3) Quotation is valid for 30 days from the date of issue; standard timelines run from receipt of complete documents and applicable fees.",
    "4) Stamp duty, notarisation and third-party charges are included under the respective heads above unless stated otherwise.",
    result.gstEnabled
      ? "5) GST @18% is included as shown above."
      : "5) GST, where applicable, will be charged additionally as per law.",
    "6) Payments are accepted in stages as mutually agreed at the time of engagement; receipts are issued for all payments.",
  ];
  for (const n of notes) {
    const lines = doc.splitTextToSize(n, W - m * 2);
    doc.text(lines, m, y);
    y += lines.length * 2.7 + 0.5;
  }

  // ── SIGNATURE ──
  y = Math.min(Math.max(y + 6, H - 42), H - 30);
  doc.setDrawColor(...C.line); doc.setLineWidth(0.25);
  doc.line(m, y, W - m, y);
  y += 5;
  doc.setFont("helvetica", "bold"); doc.setFontSize(7);
  doc.setTextColor(...C.navy);
  doc.text("For PSARA Consultant India", m, y);
  doc.setFont("helvetica", "normal"); doc.setFontSize(6.5);
  doc.setTextColor(...C.muted);
  doc.text("Authorised Signatory", W - m, y, { align: "right" });

  // ── FOOTER — every page ──
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...C.saffron); doc.setLineWidth(0.2);
    doc.line(m, H - 12, W - m, H - 12);
    doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(...C.muted);
    doc.text(`${CO.name}  ·  ${CO.phone}  ·  ${CO.email}  ·  ${CO.web}`, W / 2, H - 9, { align: "center" });
    doc.setFontSize(5.5);
    doc.text(CO.regOffice, W / 2, H - 6, { align: "center" });
    doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(...C.saffronDeep);
    doc.text(`${i} / ${pages}`, W - m, H - 9, { align: "right" });
  }

  return doc;
}

/** Sequential-looking reference: PSARA/QT/<year>/<4-digit random>. */
export function buildQuoteNumber(): string {
  const yy = new Date().getFullYear();
  const seq = String(Math.floor(1000 + Math.random() * 9000));
  return `PSARA/QT/${yy}/${seq}`;
}

export function todayISO(): string {
  return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export async function downloadQuotePdf(meta: QuotePdfMeta): Promise<void> {
  const doc = await generateQuotePdf(meta);
  const stateBit = meta.stateName.replace(/\s+/g, "-");
  doc.save(`PSARA-Quotation-${stateBit}-${meta.quoteNumber.replace(/[/]/g, "-")}.pdf`);
}
