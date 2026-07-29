"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, X, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { CONTACT } from "../../../lib/config";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";
import { ensureGsap, ease } from "../../lib/gsap";

export default function EligibilityQuiz({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    companyType: "",
    directorBg: "",
    officeType: "",
  });
  const panel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setAnswers({ companyType: "", directorBg: "", officeType: "" });
      return;
    }
    if (!panel.current) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(
      panel.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.3, ease: ease.expo }
    );
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const flags: string[] = [];
  if (answers.officeType === "Virtual Office") {
    flags.push("Virtual offices frequently fail PSARA inspection / address proof tests.");
  }
  if (answers.officeType === "Residential") {
    flags.push(
      "Several States prefer or require commercial principal place of business (e.g. Haryana practice)."
    );
  }
  if (answers.companyType === "Sole Proprietorship") {
    flags.push("Proprietorship works in many States but can be weaker for institutional tenders.");
  }

  const score = (() => {
    let s = 55;
    if (answers.companyType.includes("Pvt Ltd")) s += 18;
    else if (answers.companyType.includes("LLP")) s += 12;
    else if (answers.companyType.includes("OPC")) s += 10;
    else s += 5;
    if (answers.directorBg.includes("Ex-Serviceman")) s += 12;
    if (answers.officeType.includes("Commercial") || answers.officeType.includes("Owned")) s += 15;
    if (answers.officeType === "Residential") s -= 8;
    if (answers.officeType === "Virtual Office") s -= 25;
    return Math.max(35, Math.min(96, s));
  })();

  const readiness =
    score >= 80 ? "Strong foundation" : score >= 65 ? "Workable with fixes" : "Gaps to close first";

  const waText = [
    `*PSARA Readiness Check — ${CONTACT.phoneDisplay}*`,
    "",
    `*Score:* ${score}% (${readiness})`,
    `*Entity:* ${answers.companyType}`,
    `*Director profile:* ${answers.directorBg}`,
    `*Office:* ${answers.officeType}`,
    flags.length ? `*Flags:* ${flags.join(" ")}` : "",
    "",
    "Please share a State-specific document checklist.",
  ]
    .filter(Boolean)
    .join("\n");

  const opt = (active: boolean) =>
    `p-3 rounded border text-xs text-left font-bold uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer ${
      active
        ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--obsidian)]"
        : "border-[var(--line-gold)] bg-[var(--obsidian)] text-[var(--cream)] hover:border-[var(--gold)]"
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panel}
        className="relative w-full max-w-xl rounded-[var(--radius)] border border-[var(--line-gold)] bg-[var(--obsidian-2)] p-6 shadow-2xl md:p-8 text-[var(--cream)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded border border-[var(--line-gold)] p-2 text-[var(--cream)] hover:border-[var(--gold)]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex items-center gap-3 border-b border-[var(--line-gold)] pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-[var(--line-gold)] bg-[var(--obsidian)] text-[var(--gold)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
              PSARA Readiness Check
            </h3>
            <p className="text-xs text-[var(--text-dim)]">
              60-second statutory orientation
            </p>
          </div>
        </div>

        <div className="progress-rail mb-5">
          {[1, 2, 3, 4].map((s) => (
            <i key={s} className={s <= step ? "on" : ""} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[var(--cream)]">1. Planned entity type?</h4>
            <div className="grid grid-cols-2 gap-3">
              {["Pvt Ltd Company", "LLP (Partnership)", "OPC", "Sole Proprietorship"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={opt(answers.companyType === item)}
                  onClick={() => {
                    setAnswers({ ...answers, companyType: item });
                    setStep(2);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[var(--cream)]">
              2. Any ex-serviceman / ex-police director?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {["Ex-Serviceman / Police", "Civilian Director"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={opt(answers.directorBg === item)}
                  onClick={() => {
                    setAnswers({ ...answers, directorBg: item });
                    setStep(3);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[var(--cream)]">
              3. Principal place of business?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {["Commercial Lease", "Owned Commercial", "Residential", "Virtual Office"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className={opt(answers.officeType === item)}
                    onClick={() => {
                      setAnswers({ ...answers, officeType: item });
                      setStep(4);
                    }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded border-2 border-[var(--gold)] bg-[var(--obsidian)]">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--gold)]">
                {score}%
              </span>
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                {readiness}
              </h4>
              <p className="mt-1 text-xs text-[var(--cream-warm)]">
                Indicative orientation only. Final grant depends on State Rules, police
                verification, and a complete dossier.
              </p>
            </div>
            <div className="space-y-2 rounded border border-[var(--line-gold)] bg-[var(--obsidian)] p-4 text-left text-xs">
              {[answers.companyType, answers.directorBg, answers.officeType].map((v) => (
                <div
                  key={v}
                  className="flex items-center justify-between text-[var(--cream-warm)]"
                >
                  <span>{v}</span>
                  <CheckCircle className="h-3.5 w-3.5 text-[var(--gold)]" />
                </div>
              ))}
            </div>
            {flags.length > 0 && (
              <div className="rounded border border-[var(--line-gold)] bg-[var(--obsidian)] p-3 text-left text-xs text-[var(--gold)]">
                {flags.map((f) => (
                  <p key={f} className="mb-1 flex gap-2 last:mb-0">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {f}
                  </p>
                ))}
              </div>
            )}
            <a
              href={buildWhatsAppUrl(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full"
            >
              Get checklist on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" onClick={onClose} className="block text-xs font-bold text-[var(--gold)] underline">
              Or use the full contact form
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
