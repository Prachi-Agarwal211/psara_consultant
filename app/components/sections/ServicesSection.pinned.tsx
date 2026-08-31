"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "../../../data/services";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";
import { TiltCard } from "../ui/TiltCard";
import { MaskReveal } from "../ui/MaskReveal";
import { ArrowRight, ShieldCheck } from "lucide-react";

// The six most important routes get a calm editorial introduction before the full index.
// Keep this separate from the filterable service grid below so the homepage does not
// duplicate a clipped horizontal carousel and a second set of cards.
const FEATURED = SERVICES.slice(0, 6);

export function ServicesPinnedHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const section = sectionRef.current;
    const cards = section.querySelectorAll<HTMLElement>("[data-featured-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#080611] via-[#180D36] to-[#332066]" style={{ contain: "paint" }}>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.32)] to-transparent" />
      <div className="absolute -right-32 top-16 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-[var(--gutter)] py-14 sm:py-16 lg:py-20">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <MaskReveal direction="left">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Statutory advisory desk
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                The statutory core — <span className="gold-text-gradient">six routes</span>
              </h3>
            </div>
          </MaskReveal>
          <p className="max-w-sm text-sm leading-relaxed text-white/60 sm:text-right">
            Start with the route that matches your agency. Open the full index below for every filing and compliance service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((s, i) => (
            <TiltCard key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                data-featured-card
                data-cursor="View service"
                className="cursor-surface group flex min-h-[238px] flex-col justify-between rounded-2xl border border-violet-200/15 bg-gradient-to-br from-[#2A1853] via-[#1A1236] to-[#0E0821] p-5 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.95)] transition-[border-color,background,box-shadow,transform] hover:-translate-y-1 hover:border-[rgba(212,175,55,0.6)] hover:from-[#3B2374] hover:to-[#1A1236] sm:p-6"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">SRV — {String(i + 1).padStart(2, "0")}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#F5D061]" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h4>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">{s.short}</p>
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 transition-colors group-hover:text-[#F5D061]">
                  <span>View requirements</span>
                  <ArrowRight className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  );
}
