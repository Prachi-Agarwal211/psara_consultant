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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative w-full max-w-lg overflow-hidden border border-[var(--gold)]/40 bg-[var(--void-2)] p-6 md:p-8 shadow-2xl rounded-sm">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full border border-white/10 p-1.5 text-white/70 transition-colors hover:border-[var(--gold)] hover:text-white"
          aria-label="Close dialogue"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[var(--gold-bright)]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)]">
            Before You Leave
          </span>
        </div>

        <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
          Get Your Free PSARA License Eligibility &amp; Checklist
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[var(--white-70)]">
          Don&apos;t let mandatory state requirements halt your security business setup. Speak directly with a PSARA legal consultant on WhatsApp to get instant state fee breakdowns &amp; document checklists.
        </p>

        <div className="mt-6 space-y-2.5 rounded border border-white/10 bg-white/[0.03] p-4 text-xs text-[var(--white-90)]">
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
            <span>State-by-state statutory fee schedule (1 to 5 Districts)</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
            <span>Director MOU &amp; Security Training Institute Verification format</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
            <span>Expected approval timeline &amp; police clearance roadmap</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-[color,border-color,background-color] duration-200 hover:translate-x-1"
            style={{
              background: "var(--grad-metal)",
              color: "var(--void)",
            }}
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Chat with PSARA Specialist</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[var(--white-70)] hover:border-white/30 hover:text-white"
          >
            No thanks, I will browse
          </button>
        </div>
      </div>
    </div>
  );
}
