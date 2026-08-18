"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Award,
  Building2,
  CalendarDays,
  FileText,
  MapPin,
  PenLine,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { counterStampAnimation } from "../../lib/gsap";
import { ensureGsap, prefersReducedMotion } from "../../../app/lib/motion";

const CATEGORIES = [
  { label: "Training MOU", icon: FileText },
  { label: "Police Verification", icon: ShieldCheck },
  { label: "Multi-State", icon: Building2 },
  { label: "Company Support", icon: UsersRound },
];

const RIBBON_ITEMS = [
  { label: "Quick 30–45 day processing", icon: CalendarDays },
  { label: "Jaipur HQ · Delhi · Gurugram · Noida desks", icon: Building2 },
  { label: "500+ PSARA licenses granted", icon: Award },
  { label: "28 states & UTs covered", icon: MapPin },
];

const STATS = [
  { num: "28", suffix: "", title: "States & UTs covered", desc: "Controlling Authority filing desks across India.", icon: MapPin },
  { num: "570", suffix: "+", title: "City desks", desc: "One desk per district HQ for seamless coordination.", icon: Building2 },
  { num: "500", suffix: "+", title: "Licenses cleared", desc: "Agencies served with end-to-end support.", icon: ShieldCheck },
  { num: "10", suffix: " Yrs", title: "Statutory practice", desc: "PSARA Act, 2005 specialists with a decade of expertise.", icon: PenLine },
];

export default function StatsBar() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    counterStampAnimation(root);
    if (prefersReducedMotion()) return;

    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-proof-category]", {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      gsap.from("[data-proof-row]", {
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-proof-list]", start: "top 80%" },
      });
      gsap.to("[data-proof-watermark]", {
        yPercent: -12,
        rotate: -4,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="proof" className="relative isolate overflow-hidden bg-gradient-to-b from-[#050714] via-[#0A1224] to-[#050714] py-20 text-white sm:py-24 lg:py-28 border-b border-white/10" aria-label="PSARA proof and coverage">
      <Image
        data-proof-watermark
        src="/apple-touch-icon.png"
        alt=""
        width={640}
        height={640}
        className="pointer-events-none absolute -right-[9rem] top-16 -z-10 w-[min(52vw,620px)] opacity-[.06] mix-blend-screen sm:-right-[7rem] lg:right-[-3rem] lg:top-4"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-7 border-b border-white/15 pb-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#D4AF37]">
              <span className="h-px w-8 bg-[#D4AF37]" /> The PSARA Ledger
            </p>
            <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-white" style={{ fontFamily: "var(--font-display)" }}>
              Evidence that moves <br /><span className="gold-metallic-text">a file forward.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-normal leading-relaxed text-[#E2E8F0] md:pb-1" style={{ fontFamily: "var(--font-body)" }}>
            Statute-first guidance, verification-ready dossiers, and filing support across India&apos;s controlling authorities.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-b border-white/15 py-6" aria-label="Core capabilities">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <div key={label} data-proof-category className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[.14em] text-white">
              <Icon className="h-4 w-4 text-[#D4AF37]" strokeWidth={2} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Ribbon Items */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#D4AF37]/30 py-5 text-xs font-bold uppercase tracking-[.12em] text-[#F5D061]">
          {RIBBON_ITEMS.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-[#D4AF37]" strokeWidth={2} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Stats Row List */}
        <div data-proof-list className="mt-8 border-t border-white/15">
          {STATS.map(({ num, suffix, title, desc, icon: Icon }, index) => (
            <div key={title} data-proof-row className="group flex flex-col gap-5 border-b border-white/15 py-7 sm:flex-row sm:items-center sm:gap-8 sm:py-8 lg:gap-14">
              <div className="flex w-full items-center gap-5 sm:w-[44%] lg:w-[40%]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(200,155,60,0.4)] bg-gradient-to-br from-[#0E1B33] to-[#081020] text-[#D4AF37] transition-all group-hover:border-[#D4AF37] group-hover:text-white shadow-md">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="counter-num whitespace-nowrap text-4xl sm:text-5xl md:text-6xl font-bold leading-none gold-metallic-text" style={{ fontFamily: "var(--font-display)" }}>
                  <span data-count={num} data-suffix={suffix}>{num}{suffix}</span>
                </div>
                {index === 0 && <span className="hidden text-xs font-bold uppercase tracking-[.14em] text-white/60 sm:block">Coverage</span>}
              </div>
              <div className="flex max-w-xl flex-1 items-baseline justify-between gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[.14em] text-white sm:text-base" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#CBD5E1] font-normal">{desc}</p>
                </div>
                <span className="hidden text-xs font-mono font-bold tracking-[.2em] text-[#D4AF37] sm:block">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-7 text-xs font-bold uppercase tracking-[.16em] text-white/60">
          <span>PSARA Act · 2005</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Verification-ready practice</span>
        </div>
      </div>
    </section>
  );
}
