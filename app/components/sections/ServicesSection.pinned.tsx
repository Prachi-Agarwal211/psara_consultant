"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SERVICES } from "../../../data/services";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";
import { TiltCard } from "../ui/TiltCard";
import { MaskReveal } from "../ui/MaskReveal";
import { ArrowRight, Sparkles } from "lucide-react";

// quick stub for pinned horizontal showcase — uses first 6 services as featured
const FEATURED = SERVICES.slice(0, 6);

export function ServicesPinnedHorizontal() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinRef.current || !trackRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const pin = pinRef.current;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      const getX = () => -(track.scrollWidth - pin.clientWidth + 32);
      gsap.to(track, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${track.scrollWidth - pin.clientWidth + 240}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, pin);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinRef} className="relative overflow-hidden bg-[#080714] border-y border-white/10 hidden lg:block" style={{ height: "84vh" }}>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.32)] to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }} />
      <div className="relative z-10 h-full flex flex-col justify-center px-[var(--gutter)]">
        <div className="mb-8 flex items-baseline justify-between">
          <MaskReveal direction="left"><h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Statutory core — <span className="gold-text-gradient">scroll to explore</span></h3></MaskReveal>
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Drag or scroll ↓</span>
        </div>
        <div ref={trackRef} className="flex gap-6 will-change-transform pr-10">
          {FEATURED.map((s, i) => (
            <TiltCard key={s.slug} className="shrink-0 w-[380px]">
              <Link href={`/services/${s.slug}`} className="group block h-[360px] rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md p-6 flex flex-col justify-between hover:border-[rgba(212,175,55,0.38)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] tracking-[0.18em] uppercase text-[#D4AF37]">SRV — {String(i+1).padStart(2,"0")}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/70" />
                  </div>
                  <h4 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-3">{s.short}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/80 group-hover:text-[#F5D061]">View requirements <ArrowRight className="h-4 w-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            </TiltCard>
          ))}
          <div className="shrink-0 w-[360px] h-[360px] rounded-[20px] border border-dashed border-white/15 bg-white/[0.02] grid place-items-center p-8 text-center">
            <div>
              <Sparkles className="h-6 w-6 text-[#D4AF37] mx-auto mb-3" />
              <p className="text-white font-bold">26 services total</p>
              <Link href="/services" className="mt-3 inline-flex text-xs tracking-[0.14em] uppercase text-[#D4AF37] underline">Full index →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
