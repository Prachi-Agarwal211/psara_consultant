"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Entity & Object Hygiene",
    desc: "Verification of Private Limited, LLP, or proprietorship structure to ensure main objects explicitly permit private security agency business in the target State.",
    tag: "DAY 01–05",
  },
  {
    step: "02",
    title: "Training Institute MOU",
    desc: "Execution of mandatory training MOU with a State-recognised security institute covering unarmed and armed curricula under Model Rules culture.",
    tag: "DAY 05–15",
  },
  {
    step: "03",
    title: "Controlling Authority Filing",
    desc: "Compilation of promoter KYC, affidavits, registered office proof, and official fee payment before the State Controlling Authority portal/desk.",
    tag: "DAY 15–35",
  },
  {
    step: "04",
    title: "Police Antecedent Clearance",
    desc: "Liaison for promoter character & antecedent verification, office premises inspection, and final PSARA License grant issue.",
    tag: "DAY 35–60",
  },
];

export default function ApprovalRoadmap() {
  const [active, setActive] = useState<number>(0);

  return (
    <section
      id="process"
      className="py-24 md:py-36 px-[var(--gutter)]"
      style={{
        backgroundColor: "var(--obsidian)",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="max-w-[var(--page-max)] mx-auto relative">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between pb-10 mb-14 gap-6"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-px" style={{ backgroundColor: "var(--blue)" }} />
              <span
                className="text-[0.58rem] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--blue-bright)" }}
              >
                STATUTORY WORKFLOW
              </span>
            </div>
            <h2
              className="font-extrabold tracking-tighter uppercase leading-[0.90]"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                fontFamily: "var(--font-display)",
                color: "var(--white)",
              }}
            >
              APPROVAL ROADMAP
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-[0.58rem] font-bold uppercase tracking-widest"
              style={{ color: "var(--white-30)" }}
            >
              4-STAGE SEQUENCING · NO SHORTCUTS
            </span>
          </div>
        </div>

        {/* Connector line for desktop */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-8 left-0 right-0 h-px"
            style={{ backgroundColor: "var(--line)" }}
            aria-hidden
          />

          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((s, idx) => {
              const isActive = active === idx;
              return (
                <div
                  key={s.step}
                  onMouseEnter={() => setActive(idx)}
                  className="relative p-6 sm:p-8 rounded-2xl flex flex-col cursor-pointer transition-all duration-400"
                  style={{
                    backgroundColor: isActive ? "var(--obsidian-lift)" : "var(--obsidian-card)",
                    border: `1px solid ${isActive ? "var(--blue-border)" : "var(--line)"}`,
                    boxShadow: isActive ? "0 0 32px var(--blue-glow-soft), inset 0 0 0 1px var(--blue-border)" : "none",
                  }}
                >
                  {/* Step number — large */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="font-extrabold leading-none"
                      style={{
                        fontSize: "2.8rem",
                        fontFamily: "var(--font-display)",
                        color: isActive ? "var(--blue)" : "var(--white-20)",
                        letterSpacing: "-0.04em",
                        textShadow: isActive ? "0 0 24px var(--blue-glow)" : "none",
                        transition: "all 0.3s",
                      }}
                    >
                      {s.step}
                    </span>
                    <span
                      className="text-[0.52rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border"
                      style={{
                        color: isActive ? "var(--gold)" : "var(--white-40)",
                        borderColor: isActive ? "var(--gold-glow)" : "var(--line-strong)",
                        backgroundColor: isActive ? "rgba(212,175,55,0.08)" : "transparent",
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  <h3
                    className="font-bold mb-3 leading-snug"
                    style={{
                      fontSize: "1.05rem",
                      fontFamily: "var(--font-display)",
                      color: "var(--white)",
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    className="text-xs font-medium leading-relaxed mb-auto"
                    style={{ color: "var(--white-50)" }}
                  >
                    {s.desc}
                  </p>

                  <div
                    className="flex items-center justify-between pt-5 mt-5"
                    style={{ borderTop: "1px solid var(--line)" }}
                  >
                    <span
                      className="flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-widest"
                      style={{ color: isActive ? "var(--blue-bright)" : "var(--white-30)" }}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Mandatory
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-all duration-300"
                      style={{
                        color: isActive ? "var(--blue-bright)" : "var(--white-20)",
                        transform: isActive ? "translateX(3px)" : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
