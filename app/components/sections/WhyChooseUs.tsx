"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { lineByLineReveal, initDossierTilt } from "../../lib/gsap";

const ADVANTAGES = [
  {
    title: "Direct Controlling Authority Filing",
    subtitle: "Jaipur HQ & Regional Desks",
    desc: "Physical dossier submission and manual verification with state Home Department Controlling Officers in all 28 states.",
    highlights: ["No brokers or third-party intermediaries", "Direct officer-level tracking", "Official acknowledgement receipt within 48h"],
    image: "/assets/images/generated/theme-govt-corridor.jpg",
    meta: "FILE-01",
  },
  {
    title: "State Training Institute MOU",
    subtitle: "End-to-End Guard Alignment",
    desc: "Guaranteed MOU execution with State-recognized security training establishments for unarmed, supervisor, and armed guard syllabi.",
    highlights: ["State-rules-compliant syllabus alignment", "Instant MOU certificate procurement", "Valid for 5-Year license term"],
    image: "/assets/images/generated/theme-guard-patrol.jpg",
    meta: "FILE-02",
  },
  {
    title: "Rejection-Root-Cause Dossier Audit",
    subtitle: "Pre-Submission Audit Layer",
    desc: "Every legal clause, MOA object string, and director antecedent document is audited against state-specific PSARA Rules before portal upload.",
    highlights: ["MOA/AOA object clause verification", "Director PAN/Aadhaar/Antecedent check", "Registered office lease agreement audit"],
    image: "/assets/images/generated/theme-industrial-night.jpg",
    meta: "FILE-03",
  },
  {
    title: "5-Year Cover & Annual Audits",
    subtitle: "Post-Grant Peace of Mind",
    desc: "Continuous advisory covering 5-year renewal filings, multi-district expansion, and annual statutory compliance audits.",
    highlights: ["Automated 5-year renewal alerts", "Multi-state expansion desks", "Annual register maintenance advice"],
    image: "/assets/images/cinematic/services-atmosphere.jpg",
    meta: "FILE-04",
  },
];

export default function WhyChooseUs() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    if (headingRef.current) lineByLineReveal(headingRef.current);

    const cardEls = rootRef.current.querySelectorAll<HTMLElement>(".dossier-card");
    const cleanups: (() => void)[] = [];
    cardEls.forEach((card) => {
      const clean = initDossierTilt(card);
      if (clean) cleanups.push(clean);
    });

    return () => {
      cleanups.forEach((c) => typeof c === "function" && c());
    };
  }, []);

  return (
    <section
      id="why"
      ref={rootRef}
      data-section-transition
      data-transition="clip-up"
      className="relative overflow-hidden bg-[#FFFEF9] py-20 lg:py-28 text-[#0F3C65]"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#0F3C65]/15 pb-8 mb-16 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C] block mb-2" style={{ fontFamily: "var(--font-body)" }}>
              ( WHY PSARA CONSULTANT )
            </span>
            <h2
              ref={headingRef}
              className="font-black leading-[0.98] text-[#0F3C65] tracking-tight mt-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", fontFamily: "var(--font-display)" }}
            >
              Why Security Agencies<br className="hidden md:block" /> Choose <span className="text-[#C89B3C]">PSARA Consultant</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#334E68] max-w-md leading-relaxed font-medium">
            We operate as an exclusive regulatory advisory practice. We prepare, audit, and clear your official Controlling Authority dossier from start to license grant.
          </p>
        </div>

        {/* Asymmetrical Editorial Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Dossier Card */}
          <div className="lg:col-span-7 dossier-card relative rounded-3xl border-2 border-[#C89B3C]/40 bg-[#FFFDF5] p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-xl group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-block rounded-lg border border-[#C89B3C]/50 bg-[#FFF2BA] px-3.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#0F3C65]">
                  {ADVANTAGES[0].subtitle}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[#0F3C65] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                  {ADVANTAGES[0].title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-[#334E68] leading-relaxed font-medium">
                  {ADVANTAGES[0].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#0F3C65]/15">
                {ADVANTAGES[0].highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 text-sm text-[#0F3C65] font-bold">
                    <CheckCircle2 className="h-4 w-4 text-[#C89B3C] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-[#0F3C65]/15 flex items-center justify-between">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#486581]">Direct State Filing</span>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black text-[#0F3C65] hover:text-[#C89B3C] transition-colors"
              >
                Discuss Filing Desk <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* 3 Right Side Editorial Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {ADVANTAGES.slice(1).map((item) => (
              <div
                key={item.title}
                className="dossier-card relative rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-6 shadow-sm transition-all duration-300 hover:border-[#C89B3C] hover:bg-white group overflow-hidden"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-[#C89B3C]" aria-hidden />
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#C89B3C]">{item.subtitle}</span>
                </div>

                <h4 className="text-lg font-black text-[#0F3C65] group-hover:text-[#0A233F] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h4>

                <p className="mt-2 text-sm text-[#334E68] leading-relaxed font-medium">
                  {item.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-[#0F3C65]/10 flex items-center justify-between text-xs">
                  <span className="text-[#486581] font-bold">{item.highlights[0]}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#0F3C65] transition-transform group-hover:text-[#C89B3C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
