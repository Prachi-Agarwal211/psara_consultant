"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileCheck,
  Building2,
  ShieldCheck,
  Scale,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";

const PHASES = [
  {
    num: "01",
    phase: "Phase 01",
    title: "Entity Hygiene & Scope Strategy",
    window: "Days 1–3",
    tagline: "Corporate structure alignment & district coverage mapping",
    icon: Building2,
    desc: "We examine your incorporation documents (MOA/LLP agreement) to ensure main object clauses explicitly permit private security agency operations. We audit registered office proof against State inspection norms and map whether single-district, multi-district, or whole-state coverage suits your commercial roadmap.",
    deliverables: [
      "ROC Object Clause & MOA Audit",
      "Commercial Premises Proof Verification",
      "District Scope & Fee Slab Mapping",
    ],
    statusTag: "Initial Hygiene",
  },
  {
    num: "02",
    phase: "Phase 02",
    title: "Training MOU & Dossier Compilation",
    window: "Days 4–10",
    tagline: "State-recognized institute empanelment & affidavit drafting",
    icon: FileCheck,
    desc: "A mandatory requirement in every State is a live MOU with a recognized security guard training institute. We facilitate MOU execution, draft promoter affidavits in prescribed State formats, and assemble director KYC, photos, and legal declarations into an inspection-ready dossier.",
    deliverables: [
      "Recognized Training Institute MOU",
      "Director Affidavits & Character Declarations",
      "Form-I Application Dossier Assembly",
    ],
    statusTag: "Document Pack",
  },
  {
    num: "03",
    phase: "Phase 03",
    title: "Police Antecedent & Verification Track",
    window: "Days 11–30",
    tagline: "Director police clearance & CCTNS background checks",
    icon: ShieldCheck,
    desc: "Police character verification is the core gating item in PSARA licensing. We coordinate filings with District SP / Police Commissionerate desks, monitor CCTNS database checks, and ensure promoter background clearances move smoothly without administrative bottlenecks.",
    deliverables: [
      "District SP Office Clearance Track",
      "CCTNS Database Verification",
      "Local Police Station Antecedent Report",
    ],
    statusTag: "Police Track",
  },
  {
    num: "04",
    phase: "Phase 04",
    title: "Controlling Authority Filing & Inspection",
    window: "Days 31–55",
    tagline: "State Home Department filing & premises readiness",
    icon: Scale,
    desc: "We submit the complete application pack to the State Controlling Authority along with Treasury fee proof. We prepare your team for physical office inspection, uniform pattern review, and handle any statutory queries raised by the authority.",
    deliverables: [
      "Controlling Authority Official Filing",
      "Treasury Challan / Fee Payment Receipt",
      "Premises Inspection & Uniform Pattern Prep",
    ],
    statusTag: "Authority Filing",
  },
  {
    num: "05",
    phase: "Phase 05",
    title: "Licence Grant & Compliance Handover",
    window: "Post-Grant",
    tagline: "Official licence delivery & post-grant statutory setup",
    icon: Award,
    desc: "Upon grant by the Controlling Authority, we deliver your official PSARA Licence grant letter. We brief your management on statutory guard registers, ESIC/PF threshold compliance, and empanel your agency into our automated 5-year renewal monitoring system.",
    deliverables: [
      "Official PSARA Licence Grant Letter",
      "Statutory Guard Registers & Compliance Brief",
      "5-Year Renewal Calendar Integration",
    ],
    statusTag: "Licence Issued",
  },
];

export default function ApprovalRoadmap() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion() || typeof window === "undefined" || window.innerWidth < 900) return;
    const { gsap } = ensureGsap();
    const section = sectionRef.current;
    const line = lineRef.current;
    const tabs = section.querySelectorAll<HTMLElement>("[data-roadmap-tab]");
    const setActive = (i: number) => setActiveStep(i);

    gsap.set(tabs, { opacity: 0.45 });
    if (tabs[0]) gsap.set(tabs[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    if (line) {
      gsap.set(line, { scaleY: 0, transformOrigin: "top" });
      tl.to(line, { scaleY: 1, ease: "none" }, 0);
    }

    tabs.forEach((_, i) => {
      if (i === 0) return;
      const t = i / (tabs.length - 1);
      tl.to(tabs[i - 1], { opacity: 0.45, duration: 0.01 }, t - 0.02);
      tl.to(tabs[i], { opacity: 1, duration: 0.01 }, t - 0.02);
      tl.call(setActive, [i], t - 0.02);
    });
    tl.call(setActive, [0], 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-20 lg:py-28 bg-[#050B14] text-white border-b border-white/10">
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37]" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              Proven Licensing Methodology
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              From First Call <span className="gold-text-gradient">to PSARA Licence Grant</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-[#E2E8F0] leading-relaxed font-normal" style={{ fontFamily: "var(--font-body)" }}>
            Our 5-phase structured roadmap eliminates documentation errors, prepares your premises for inspection, and tracks police verifications daily.
          </p>
        </div>

        {/* Phase Stepper — pinned scrub line (desktop) + click fallback */}
        <div className="relative">
          <div ref={lineRef} className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#D4AF37] to-[#8F681B] hidden lg:block" style={{ transform: "scaleX(0)" }} aria-hidden />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PHASES.map((p, idx) => {
              const isActive = activeStep === idx;

              return (
                <button
                  key={p.num}
                  data-roadmap-tab
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex flex-col justify-between p-5 text-left border rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "border-[#D4AF37] bg-gradient-to-b from-[#163A54] to-[#0B1728] text-white shadow-xl shadow-black/60"
                      : "border-white/12 bg-[#0B1728] text-[#CBD5E1] hover:border-white/30 hover:text-white"
                  }`}
                >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`font-mono text-xs font-bold ${isActive ? "text-[#F5D061]" : "text-[#D4AF37]"}`}>
                    {p.num}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                      isActive
                        ? "border-[#D4AF37]/50 bg-[#050B14] text-[#F5D061]"
                        : "border-white/10 text-[#94A3B8]"
                    }`}
                  >
                    <Clock className="h-2.5 w-2.5" />
                    {p.window}
                  </span>
                </div>

                <span
                  className="text-sm font-bold leading-snug block text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </span>
              </button>
            );
          })}
          </div>
        </div>

        {/* Selected Phase Detail Showcase Card with Deep Gradient Surface — camera-move: detail fades as next phase scrubs */}
        {(() => {
          const p = PHASES[activeStep]!;
          const IconComp = p.icon;

          return (
            <div className="rounded-3xl border border-[rgba(212,175,55,0.28)] bg-gradient-to-b from-[#10243A] via-[#0B1728] to-[#050B14] p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Col: Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="badge-metallic-gold">
                      {p.phase} • {p.statusTag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#CBD5E1] font-mono">
                      <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                      Estimated Window: {p.window}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {p.title}
                  </h3>

                  <p className="text-base text-[#E2E8F0] leading-relaxed font-normal" style={{ fontFamily: "var(--font-body)" }}>
                    {p.desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-3 border-t border-white/10 pt-6">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Phase Key Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {p.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B1728] p-3 text-xs font-bold text-white shadow-inner">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Action Box */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[#0B1728] p-6 sm:p-8 shadow-inner">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#163A54] to-[#0B1728] border border-[#D4AF37]/30 text-[#D4AF37]">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="block text-xs text-[#D4AF37] uppercase font-mono font-bold">Step {p.num} of 05</span>
                      <span className="text-sm font-bold text-white">{p.tagline}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      Have questions about this phase for your specific State or office city? Speak directly with our regulatory liaison desk.
                    </p>

                    <a
                      href={DEFAULT_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full"
                    >
                      <MessageSquare className="h-4 w-4 fill-white" />
                      <span>Discuss {p.phase} Requirements</span>
                    </a>
                  </div>

                  {/* Step Switcher Navigation */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-[#CBD5E1]">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                      className="hover:text-white disabled:opacity-30 transition-colors"
                    >
                      ← Previous Phase
                    </button>
                    <span>{activeStep + 1} / 5</span>
                    <button
                      disabled={activeStep === PHASES.length - 1}
                      onClick={() => setActiveStep((prev) => Math.min(PHASES.length - 1, prev + 1))}
                      className="hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1"
                    >
                      Next Phase <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
