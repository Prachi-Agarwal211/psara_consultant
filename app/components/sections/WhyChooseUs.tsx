"use client";

import { ArrowRight, CheckCircle2, Sparkles, Shield } from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";

const ADVANTAGES = [
  {
    title: "Direct Controlling Authority Filing",
    subtitle: "Jaipur HQ & Regional Desks",
    desc: "Physical dossier submission and manual verification with State Home Department Controlling Officers across 28 states.",
    highlights: ["No brokers or third-party intermediaries", "Direct officer-level tracking", "Official acknowledgement receipt within 48h"],
    meta: "FILE-01",
  },
  {
    title: "State Training Institute MOU",
    subtitle: "Guard Syllabus Compliance",
    desc: "Guaranteed MOU execution with State-recognized security training establishments for unarmed, supervisor, and armed guard syllabi.",
    highlights: ["State-rules-compliant syllabus alignment", "Instant MOU certificate procurement", "Valid for 5-Year license term"],
    meta: "FILE-02",
  },
  {
    title: "Rejection-Root-Cause Dossier Audit",
    subtitle: "Pre-Submission Audit Layer",
    desc: "Every legal clause, MOA object string, and director antecedent document is audited against state-specific PSARA Rules before portal upload.",
    highlights: ["MOA/AOA object clause verification", "Director PAN/Aadhaar/Antecedent check", "Registered office lease agreement audit"],
    meta: "FILE-03",
  },
  {
    title: "5-Year Cover & Annual Audits",
    subtitle: "Post-Grant Peace of Mind",
    desc: "Continuous advisory covering 5-year renewal filings, multi-district expansion, and annual statutory compliance registers.",
    highlights: ["Automated 5-year renewal alerts", "Multi-state expansion desks", "Annual register maintenance advice"],
    meta: "FILE-04",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-[#FFFFFF] py-20 lg:py-28 text-[#0F172A] border-b border-slate-200"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-slate-200 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C89B3C] mb-2" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#C89B3C]" />
              Why Choose PSARA Consultant
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A213D] leading-tight mt-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why Security Agencies Choose <span className="text-[#C89B3C]">Our Legal Desk</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#334155] max-w-md leading-relaxed font-normal">
            We operate as an exclusive regulatory advisory practice. We prepare, audit, and clear your official Controlling Authority dossier from start to license grant.
          </p>
        </div>

        {/* Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Deep Navy Dossier Card */}
          <div className="lg:col-span-7 rounded-3xl border border-[rgba(200,155,60,0.3)] bg-gradient-to-b from-[#0E1B33] via-[#0A1428] to-[#080F1E] p-8 md:p-10 flex flex-col justify-between shadow-2xl text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="badge-metallic-gold">
                  <Shield className="h-3 w-3 text-[#D4AF37]" />
                  {ADVANTAGES[0].subtitle}
                </span>
                <span className="font-mono text-xs font-bold text-[#D4AF37]">
                  {ADVANTAGES[0].meta}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                  {ADVANTAGES[0].title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-[#CBD5E1] leading-relaxed font-normal">
                  {ADVANTAGES[0].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                {ADVANTAGES[0].highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 text-sm text-white font-medium">
                    <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Direct State Filing</span>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5D061] hover:underline"
              >
                <span>Discuss Filing Desk</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 3 Right Side Shaded Light Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {ADVANTAGES.slice(1).map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#FFFFFF] to-[#F8F9FD] p-6 shadow-sm transition-all duration-200 hover:border-[#C89B3C] hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C89B3C]">{item.subtitle}</span>
                  <span className="font-mono text-xs font-bold text-[#64748B]">{item.meta}</span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#0A213D]" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h4>

                <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
