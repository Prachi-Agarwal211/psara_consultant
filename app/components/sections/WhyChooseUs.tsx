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
      className="relative overflow-hidden section-metal py-[var(--section-y)] text-white"
    >
      {/* Dot grid + grain atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle, var(--gold) 1px, transparent 1px)", backgroundSize: "36px 36px" }} aria-hidden />

      <div className="relative z-10 px-[var(--gutter)] max-w-[var(--page-max)] mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <span className="meta-bracket mb-4 text-xs! text-[var(--gold)]! border-[var(--gold)]/30! inline-block" style={{ fontFamily: "var(--font-body)" }}>
              ( WHY PSARA CONSULTANT )
            </span>
            <h2
              ref={headingRef}
              className="font-bold leading-[0.98] text-white tracking-tight mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", fontFamily: "var(--font-display)" }}
            >
              Why Security Agencies<br className="hidden md:block" /> Choose <span className="text-metal">PSARA Consultant</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[var(--white-70)] max-w-md leading-relaxed">
            We operate as an exclusive regulatory advisory practice. We prepare, audit, and clear your official Controlling Authority dossier from start to license grant.
          </p>
        </div>

        {/* Asymmetrical Editorial Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Dossier Card */}
          <div className="lg:col-span-7 dossier-card relative border border-[var(--gold)]/40 bg-white/[0.02] p-8 md:p-10 flex flex-col justify-between overflow-hidden group">
            {/* Background Image Scrim — decorative */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity duration-700">
              <Image
                src={ADVANTAGES[0].image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover scale-105 transition-transform duration-700 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] via-[var(--void)]/70 to-transparent" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-block border border-[var(--gold)]/40 bg-black/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--gold-bright)]">
                  {ADVANTAGES[0].subtitle}
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                  {ADVANTAGES[0].title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-[var(--white-90)] leading-relaxed">
                  {ADVANTAGES[0].desc}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                {ADVANTAGES[0].highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 text-sm text-[var(--white-90)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">Direct State Filing</span>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold-bright)] group-hover:underline"
              >
                Discuss Filing Desk <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 3 Right Side Editorial Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {ADVANTAGES.slice(1).map((item) => (
              <div
                key={item.title}
                className="dossier-card relative border border-white/10 bg-white/[0.02] p-6 transition-[color,border-color,background-color] duration-300 hover:border-[var(--gold)]/50 hover:bg-white/[0.05] group overflow-hidden"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-6 bg-[var(--gold)]/40" aria-hidden />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold-bright)]">{item.subtitle}</span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-[var(--gold-bright)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h4>

                <p className="mt-2 text-sm text-[var(--white-70)] leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[var(--white-55)]">{item.highlights[0]}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[var(--white-40)] transition-transform group-hover:text-[var(--gold-bright)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
