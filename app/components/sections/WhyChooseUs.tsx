"use client";

import { useEffect, useRef } from "react";
import { FileCheck2, ShieldAlert, Award, Headphones, ChevronRight } from "lucide-react";
import Chapter from "../layout/Chapter";
import CornerOrnament from "../ui/CornerOrnament";
import { lineByLineReveal, cardStaggerReveal, initDossierTilt } from "../../lib/gsap";

const features = [
  {
    title: "Direct Controlling Authority Filing",
    desc: "Jaipur HQ & Regional Desks handle physical dossier submissions directly with state Home Department officers.",
    icon: FileCheck2,
    badge: "No Middlemen",
  },
  {
    title: "Training MOU & Antecedent Clearance",
    desc: "Guaranteed Security Guard Training Institute MOU + Director Police Verification antecedent processing.",
    icon: ShieldAlert,
    badge: "End-to-End",
  },
  {
    title: "100% Rejection-Free Dossier Setup",
    desc: "Every legal clause, MOA objective string, and compliance document is verified before portal upload.",
    icon: Award,
    badge: "Zero Rejection",
  },
  {
    title: "Post-Grant Renewal & Compliance",
    desc: "Full support for 5-year PSARA renewals, state expansion, and annual compliance audit filings.",
    icon: Headphones,
    badge: "5-Year Cover",
  },
];

export default function WhyChooseUs() {
  const root = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    cardStaggerReveal(root.current, ".feature-card");

    const cardEls = root.current.querySelectorAll<HTMLElement>(".feature-card");
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
    <Chapter id="why-us" tone="paper-lemon" className="bg-noise-lemon border-y border-[var(--lemon-green)]/30">
      <div ref={root} className="py-6">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          {/* Jasmine-style decorative section heading frame */}
          <div className="section-heading-frame justify-center mb-3">
            <div className="i-line"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] px-4 py-1.5 shrink-0 text-[var(--royal-blue)] border border-[var(--royal-blue)]/20 rounded-full bg-[var(--lemon-soft)]">
              Value Advantage · Proven Clearance
            </span>
            <div className="i-line"></div>
          </div>
          <h2 ref={headingRef} className="display-xl text-[var(--royal-blue)] font-bold split-heading relative pl-4 md:pl-8">
            <span className="side-caption" aria-hidden>VALUE ADVANTAGE</span>
            Why Security Agency Owners Trust <span className="text-[var(--lemon-green)]">PSARA Consultant</span>
          </h2>
          <p className="body-copy mt-4 text-[var(--ink-muted)] text-base mx-auto">
            We don&apos;t just hand you a generic checklist. We build, verify, and clear
            your official Controlling Authority dossier from start to grant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="feature-card tilt-card card-glow-hover flex flex-col justify-between border border-[var(--royal-blue)]/15 bg-white p-6 rounded-[var(--radius)] shadow-sm hover:border-[var(--lemon-green)] hover:shadow-md cursor-pointer relative"
              >
                {/* Corner ornaments — Jasmine style */}
                <CornerOrnament position="tl" color="var(--lemon-green)" opacity={0.4} />
                <CornerOrnament position="br" color="var(--lemon-green)" opacity={0.4} />

                <div>
                  {/* Number marker */}
                  <span className="num-marker num-marker-sm block mb-2">{String(idx + 1).padStart(2, '0')}</span>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded border border-[var(--lemon-green)]/40 bg-[var(--lemon-soft)] text-[var(--royal-blue)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[var(--royal-blue)] text-white">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--royal-blue)]">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)] font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-royal-blue">
            Start Your PSARA Application
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Chapter>
  );
}
