"use client";

import { useEffect, useState } from "react";
import { X, Shield, FileCheck, ArrowRight, MessageCircle } from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only trigger once per session
    const dismissed = sessionStorage.getItem("psara_exit_dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("psara_exit_dismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full max-w-lg overflow-hidden border-2 border-[#C89B3C] bg-[#07192C] text-white p-7 md:p-9 shadow-2xl rounded-3xl">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89B3C] blur-3xl" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-2 text-slate-300 transition-colors hover:border-white hover:bg-white/20 hover:text-white"
          aria-label="Close dialogue"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#C89B3C]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#FFF2BA]">
              Before You Leave
            </span>
          </div>

          <h3 className="mt-3 text-2xl md:text-3xl font-black text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Get Your Free PSARA License <span className="text-[#FFF2BA]">Eligibility &amp; Checklist</span>
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-200 font-medium">
            Don&apos;t let mandatory state requirements halt your security business setup. Speak directly with a PSARA legal consultant on WhatsApp to get instant state fee breakdowns &amp; document checklists.
          </p>

          <div className="mt-6 space-y-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-white">
            <div className="flex items-center gap-3">
              <FileCheck className="h-4 w-4 text-[#C89B3C] shrink-0" />
              <span className="font-bold text-slate-100">State-by-state statutory fee schedule (1 to 5 Districts)</span>
            </div>
            <div className="flex items-center gap-3">
              <FileCheck className="h-4 w-4 text-[#C89B3C] shrink-0" />
              <span className="font-bold text-slate-100">Director MOU &amp; Security Training Institute Verification format</span>
            </div>
            <div className="flex items-center gap-3">
              <FileCheck className="h-4 w-4 text-[#C89B3C] shrink-0" />
              <span className="font-bold text-slate-100">Expected approval timeline &amp; police clearance roadmap</span>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFF2BA] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-white transition-all shadow-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <MessageCircle className="h-4 w-4 fill-[#0F3C65] text-[#0F3C65]" />
              <span>Chat with PSARA Specialist</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs font-black uppercase tracking-wider text-slate-200 hover:border-white/40 hover:bg-white/10 hover:text-white transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No thanks, I will browse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
