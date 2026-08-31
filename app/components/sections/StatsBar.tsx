"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Building2,
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

const STATS = [
  { num: "36", suffix: "", title: "States & UTs covered", desc: "Controlling Authority filing desks across India.", icon: MapPin },
  { num: "587", suffix: "+", title: "City coverage", desc: "City-specific filing guidance and coordination across India.", icon: Building2 },
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
      const compactViewport = window.matchMedia("(max-width: 639px)").matches;
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
        x: compactViewport ? 0 : -30,
        y: compactViewport ? 14 : 0,
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
    <section ref={rootRef} id="proof" className="section-atmosphere mood-proof relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#080611] via-[#1A1236] to-[#080611] py-16 text-white sm:py-20 lg:py-24" aria-label="PSARA proof and coverage">
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
        <div className="flex flex-col gap-6 border-b border-white/15 pb-7 text-center md:flex-row md:items-end md:justify-between md:gap-10 md:text-left">
          <div className="mx-auto max-w-xl md:mx-0">
            <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#D4AF37] md:justify-start">
              <span className="h-px w-8 bg-[#D4AF37]" /> The PSARA Ledger
            </p>
            <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-white" style={{ fontFamily: "var(--font-display)" }}>
              Evidence that moves <br /><span className="gold-text-gradient">a file forward.</span>
            </h2>
          </div>
          <p className="mx-auto max-w-xs text-sm font-normal leading-relaxed text-[#E2E8F0] md:mx-0 md:pb-1" style={{ fontFamily: "var(--font-body)" }}>
            Statute-first guidance, verification-ready dossiers, and filing support across India&apos;s controlling authorities.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-b border-white/15 py-5 text-center md:justify-start md:text-left" aria-label="Core capabilities">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <div key={label} data-proof-category className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[.14em] text-white">
              <Icon className="h-4 w-4 text-[#D4AF37]" strokeWidth={2} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Stats Row List */}
        <div data-proof-list className="mt-6 grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2">
          {STATS.map(({ num, suffix, title, desc, icon: Icon }, index) => (
            <div key={title} data-proof-row className="group relative flex min-h-[184px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#2A1853] via-[#1A1236] to-[#0E0821] p-5 text-left shadow-[0_18px_36px_-28px_rgba(0,0,0,0.9)] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.55)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(196,181,253,0.38)] bg-[#120C27] text-[#F5D061] transition-colors duration-300 group-hover:border-[#D4AF37] group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="font-mono text-[10px] font-bold tracking-[.2em] text-[#D4AF37]">0{index + 1}</span>
              </div>
              <div className="mt-7 flex items-end justify-between gap-4">
                <div>
                  <div className="counter-num whitespace-nowrap text-4xl font-bold leading-none gold-text-gradient sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                    <span data-count={num} data-suffix={suffix}>{num}{suffix}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold uppercase tracking-[.12em] text-white sm:text-base" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                  <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[#CBD5E1] sm:text-sm">{desc}</p>
                </div>
                {index === 0 && <span className="hidden text-right text-[10px] font-bold uppercase tracking-[.14em] text-white/55 sm:block">Pan-India<br />coverage</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 text-xs font-bold uppercase tracking-[.16em] text-white/60">
          <span>PSARA Act · 2005</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Verification-ready practice</span>
        </div>
      </div>
    </section>
  );
}
