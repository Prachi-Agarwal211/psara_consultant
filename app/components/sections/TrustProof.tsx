"use client";

import { ShieldCheck, FileCheck, CheckCircle2, Award } from "lucide-react";

const trustPoints = [
  {
    title: "100% Statute Compliance",
    desc: "Every filing strictly adheres to State-specific Private Security Agencies Rules and official Controlling Authority checklists.",
    icon: <ShieldCheck className="w-6 h-6 text-[var(--amber)]" />,
  },
  {
    title: "Training MOU Facilitation",
    desc: "Direct coordination with State-recognised security institutes for mandatory training certificates before dossier submission.",
    icon: <FileCheck className="w-6 h-6 text-[var(--amber)]" />,
  },
  {
    title: "Antecedent Liaison",
    desc: "End-to-end guidance for promoter character verification, police clearance, and premises inspection readiness.",
    icon: <CheckCircle2 className="w-6 h-6 text-[var(--amber)]" />,
  },
  {
    title: "Post-Grant Discipline",
    desc: "Comprehensive handover covering guard registers, labour registrations, renewal tracking, and multi-district expansion rules.",
    icon: <Award className="w-6 h-6 text-[var(--amber)]" />,
  },
];

/**
 * Abstract Kinetic Trust Proof Component
 * Features: High-contrast 4-column feature grid with statutory assurances.
 */
export default function TrustProof({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  return (
    <section
      id="trust"
      className="py-20 md:py-32 px-[var(--gutter)] theme-obsidian-dark border-b border-white/10"
    >
      <div className="max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--amber)] mb-2">
              <span>WHY OPERATORS TRUST US</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white uppercase">
              STATUTORY PROOF
            </h2>
          </div>

          <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
            <span>NO TEMPLATE ADVICE</span>
            <span>·</span>
            <span>DIRECT COUNSEL</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((tp, idx) => (
            <div
              key={tp.title}
              className="p-8 rounded-lg border border-white/10 bg-[var(--obsidian-card)] flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 p-3 rounded bg-white/5 border border-white/10 w-fit">
                  {tp.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3">
                  {tp.title}
                </h3>
                <p className="text-xs font-medium text-white/60 leading-relaxed">
                  {tp.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-[0.55rem] font-bold uppercase tracking-widest text-[var(--amber)]">
                PILLAR 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
