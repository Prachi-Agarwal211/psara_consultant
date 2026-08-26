"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ShieldCheck, FileCheck, ArrowRight, MessageSquare } from "lucide-react";
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080714]/85 p-4 backdrop-blur-md transition-opacity duration-300"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-[#D4AF37] bg-[#0A1022] p-6 sm:p-8 text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-2 text-white/80 transition-colors hover:border-[#D4AF37] hover:bg-white/20 hover:text-white"
          aria-label="Close dialogue"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="relative z-10 space-y-5">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#F5D061]">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              <span>Before You Leave</span>
            </div>
            <Image
              src="/apple-touch-icon.png"
              alt="PSARA Consultant India"
              width={48}
              height={48}
              className="h-10 w-10 object-contain drop-shadow-md"
            />
          </div>

          {/* Heading */}
          <h3
            id="exit-modal-title"
            className="text-2xl sm:text-3xl font-bold leading-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get Your Free <span className="gold-text-gradient">PSARA License Eligibility &amp; Checklist</span>
          </h3>

          {/* Subtitle */}
          <p className="text-sm font-normal leading-relaxed text-[#E2E8F0]" style={{ fontFamily: "var(--font-body)" }}>
            Don&apos;t let mandatory state requirements halt your security business launch. Speak directly with a senior PSARA legal consultant on WhatsApp for instant fee breakdowns and eligibility verification.
          </p>

          {/* Key Checklist Highlights */}
          <div className="space-y-3 rounded-2xl border border-white/12 bg-[#080714] p-4 text-xs">
            <div className="flex items-start gap-3">
              <FileCheck className="h-4 w-4 shrink-0 text-[#F5D061] mt-0.5" />
              <span className="font-bold text-[#F8FAFC]">
                State-by-state statutory fee schedule (1 to 5 Districts &amp; Whole State)
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FileCheck className="h-4 w-4 shrink-0 text-[#F5D061] mt-0.5" />
              <span className="font-bold text-[#F8FAFC]">
                Director MOU &amp; Security Training Institute verification checklist
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FileCheck className="h-4 w-4 shrink-0 text-[#F5D061] mt-0.5" />
              <span className="font-bold text-[#F8FAFC]">
                Expected approval timeline &amp; police antecedent clearance roadmap
              </span>
            </div>
          </div>

          {/* Single Primary CTA & Secondary Dismiss */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#241703] transition-all active:scale-95"
              style={{
                background: "var(--grad-gold-metallic)",
                boxShadow: "inset 0 1px 0 rgba(255,250,230,0.85), inset 0 -1px 0 rgba(88,58,8,0.5), 0 12px 30px -10px rgba(200,155,60,0.5)",
                fontFamily: "var(--font-body)",
              }}
            >
              <MessageSquare className="h-4 w-4 fill-current" />
              <span>Chat with PSARA Specialist</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#CBD5E1] transition-all hover:bg-white/10 hover:text-white"
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
