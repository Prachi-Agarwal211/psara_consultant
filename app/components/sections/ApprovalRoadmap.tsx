"use client";

import { useState } from "react";
import {
  FileCheck,
  Building2,
  ShieldCheck,
  Scale,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";

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
    icon: BookOpenIcon,
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

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return <FileCheck {...props} />;
}

export default function ApprovalRoadmap() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-24 bg-gradient-to-b from-[#0A233F] via-[#0F3C65] to-[#07192C] text-white overflow-hidden" data-parallax-root>
      {/* Background glow lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
        <div className="absolute top-1/3 right-0 w-[50vw] h-[500px] bg-[#C89B3C] blur-3xl" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#78A2D2] blur-3xl" />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#FFF2BA]" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#C89B3C]" />
              Proven Licensing Methodology
            </div>
            <h2 className="mt-3 font-black text-white leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-display)" }}>
              From first call <span className="text-[#FFF2BA]">to PSARA licence grant</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-slate-200 leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
            Our 5-phase structured roadmap eliminates documentation errors, prepares your premises for inspection, and tracks police verifications daily.
          </p>
        </div>

        {/* Phase Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PHASES.map((p, idx) => {
            const isActive = activeStep === idx;

            return (
              <button
                key={p.num}
                onClick={() => setActiveStep(idx)}
                className={`group relative flex flex-col justify-between p-5 text-left border rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "border-[#C89B3C] bg-[#FFF2BA] text-[#0F3C65] shadow-xl"
                    : "border-white/15 bg-white/10 text-white hover:border-[#FFF2BA] hover:bg-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`font-mono text-xs font-black ${isActive ? "text-[#0F3C65]" : "text-[#FFF2BA]"}`}>
                    {p.num}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[0.6rem] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                      isActive
                        ? "border-[#0F3C65]/30 bg-[#0F3C65]/10 text-[#0F3C65]"
                        : "border-white/20 text-white/80"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <Clock className="h-2.5 w-2.5" />
                    {p.window}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3
                    className={`text-sm font-black leading-snug transition-colors duration-300 ${
                      isActive ? "text-[#0F3C65]" : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Showcase Card */}
        {(() => {
          const p = PHASES[activeStep]!;
          const IconComp = p.icon;

          return (
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#C89B3C]/50 bg-[#07192C]/90 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Col: Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg border border-[#C89B3C] bg-[#FFF2BA] px-3.5 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#0F3C65]">
                      {p.phase} • {p.statusTag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                      <Clock className="h-3.5 w-3.5 text-[#C89B3C]" />
                      Estimated Window: {p.window}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {p.title}
                  </h3>

                  <p className="text-base text-slate-200 leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    {p.desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-3 border-t border-white/15 pt-6">
                    <span className="block text-xs font-black uppercase tracking-[0.2em] text-[#FFF2BA]" style={{ fontFamily: "var(--font-body)" }}>
                      Phase Key Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {p.deliverables.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-3 text-xs font-black text-white">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C89B3C]" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Interactive Visual Box */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-2xl border border-white/15 bg-white/10 p-7 md:p-8">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl border border-[#C89B3C] bg-[#FFF2BA] text-[#0F3C65]">
                        <IconComp className="h-6 w-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="block text-xs text-[#FFF2BA] uppercase font-mono font-bold">Step {p.num} of 05</span>
                        <span className="text-sm font-black text-white">{p.tagline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-xs text-slate-200 leading-relaxed font-medium">
                      Have questions about this phase for your specific State or office city? Speak directly with our regulatory liaison desk.
                    </div>

                    <a
                      href={DEFAULT_WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#FFF2BA] px-6 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-[#0F3C65] transition-all duration-300 hover:bg-white shadow-lg"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <MessageSquare className="h-4 w-4 stroke-[2.5]" />
                      <span>Discuss {p.phase} Requirements</span>
                    </a>
                  </div>

                  {/* Step Switcher Navigation */}
                  <div className="flex items-center justify-between border-t border-white/15 pt-4 text-xs font-black text-slate-200">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                      className="hover:text-[#FFF2BA] disabled:opacity-30 transition-colors"
                    >
                      ← Previous Phase
                    </button>
                    <span>{activeStep + 1} / 5</span>
                    <button
                      disabled={activeStep === PHASES.length - 1}
                      onClick={() => setActiveStep((prev) => Math.min(PHASES.length - 1, prev + 1))}
                      className="hover:text-[#FFF2BA] disabled:opacity-30 transition-colors flex items-center gap-1"
                    >
                      Next Phase <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
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
