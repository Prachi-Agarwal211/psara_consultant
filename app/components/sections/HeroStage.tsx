"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, Phone, Mail } from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { CONTACT } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { ensureGsap, prefersReducedMotion, initMouseParallax, initFloatDrift } from "../../../app/lib/motion";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "States", href: "/states" },
  { label: "Calculator", href: "/calculator" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Certifications", href: "/certification" },
  { label: "Contact", href: "/contact" },
];

export default function HeroStage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const root = rootRef.current;

    // Parallax background
    let ctx: gsap.Context | undefined;
    if (visualRef.current) {
      ctx = gsap.context(() => {
        gsap.to(visualRef.current, {
          yPercent: -15,
          scale: 1.03,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "80% top", scrub: 1.2 },
        });
      }, root);
    }

    let killMouse: (() => void) | undefined;
    if (propsRef.current) {
      initFloatDrift(propsRef.current);
      killMouse = initMouseParallax(propsRef.current, 15);
    }

    return () => {
      ctx?.revert();
      killMouse?.();
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className="relative min-h-[100dvh] w-full overflow-hidden section-void" data-parallax-root>
      {/* Background image with parallax */}
      <div ref={visualRef} className="pointer-events-none absolute inset-0 z-[1] h-full w-full will-change-transform" aria-hidden>
        <div
          data-scrub-visual
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: "url('/hero-background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(2,8,20,0.55) 80%, rgba(2,8,20,0.92) 100%), linear-gradient(180deg, rgba(2,8,20,0.4) 0%, transparent 20%, transparent 70%, #0a0f2a 100%)",
          }}
        />
      </div>

      {/* Top-Left Logo / Brand Mark */}
      <div className="absolute top-6 left-6 md:left-10 z-40">
        <Link href="/" className="inline-block">
          <BrandMark />
        </Link>
      </div>

      {/* Left Rail Navigation — Vertical menu linking to main pages */}
      <aside className="absolute left-6 md:left-10 top-[52%] -translate-y-1/2 z-30 hidden md:flex flex-col justify-center space-y-4">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" aria-hidden />
        <nav aria-label="Main Navigation" className="flex flex-col space-y-3 pl-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center text-[0.62rem] font-bold uppercase tracking-[0.26em] text-white/70 transition-colors duration-200 hover:text-[var(--gold-bright)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="h-1 w-1 rounded-full bg-[var(--gold)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 mr-2.5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="pt-3 border-t border-white/10 flex items-center gap-4 text-white/60">
          <a href={TEL_HREF} aria-label="Call Desk" className="hover:text-[var(--gold-bright)] transition-colors">
            <Phone className="h-3.5 w-3.5" />
          </a>
          <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Desk" className="hover:text-[var(--gold-bright)] transition-colors">
            <MessageSquare className="h-3.5 w-3.5" />
          </a>
          <a href={`mailto:${CONTACT.email}`} aria-label="Email Us" className="hover:text-[var(--gold-bright)] transition-colors">
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
      </aside>

      {/* Mobile nav dots */}
      <div className="absolute left-4 top-[52%] -translate-y-1/2 z-30 md:hidden flex flex-col gap-2.5">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-1.5 h-1.5 rounded-full bg-white/30 hover:bg-[var(--gold-bright)] transition-colors"
            aria-label={item.label}
          />
        ))}
      </div>

      {/* Hero Copy — Deeply positioned in the upper-right marked space */}
      <div className="absolute inset-x-0 top-[9dvh] md:top-[12dvh] lg:top-[14dvh] z-20 flex justify-end pointer-events-none">
        <div className="w-full px-6 md:pr-12 lg:pr-20 md:w-[48%] lg:w-[42%] max-w-xl pointer-events-auto">
          <div className="text-left space-y-4">
            {/* Headline — High contrast, bright bold text */}
            <h1
              className="font-extrabold leading-[0.96] text-white"
              style={{
                fontSize: "clamp(2.4rem, 4.2vw, 4.5rem)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              Built for <span className="text-[var(--gold-bright)] font-extrabold drop-shadow-[0_0_20px_rgba(245,230,186,0.4)]">Trust.</span>
            </h1>

            {/* Subtitle */}
            <div className="flex items-center gap-3">
              <span className="accent-line w-8 shrink-0 bg-sky-400" />
              <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.26em] text-sky-300 drop-shadow" style={{ fontFamily: "var(--font-body)" }}>
                Clarity in Statutory Filing
              </p>
            </div>

            {/* Bracket metadata — Sky Blue pill badges */}
            <div className="flex flex-wrap gap-2">
              {["( PSARA CONSULTANCY )", "( PAN INDIA )", "( 28 STATES & 8 UTs )", "( 300+ FILES )"].map((m) => (
                <span key={m} className="border border-sky-400/50 bg-sky-950/80 text-sky-200 font-extrabold text-[0.68rem] tracking-wider px-2.5 py-1 rounded-sm shadow-sm" style={{ fontFamily: "var(--font-body)" }}>
                  {m}
                </span>
              ))}
            </div>

            {/* Description — Solid contrast backdrop */}
            <div className="max-w-md border border-white/15 bg-[#040D21]/90 p-4 rounded backdrop-blur-md shadow-xl">
              <p className="text-xs md:text-sm lg:text-base font-semibold leading-relaxed text-white" style={{ fontFamily: "var(--font-body)" }}>
                Pan-India PSARA licensing, training MOUs, police verification, and multi-state compliance.
              </p>
            </div>

            {/* CTAs — Ultra-bright high visibility buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-bright)] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-black shadow-lg shadow-[var(--gold)]/30 hover:scale-105 transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>Explore Services</span>
                <ArrowUpRight className="h-4 w-4 text-black stroke-[3]" />
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border-2 border-emerald-400 bg-emerald-950/90 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300 shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 text-emerald-400 stroke-[2.5]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative prop */}
      <div ref={propsRef} className="absolute right-4 md:right-8 top-10 z-[5] pointer-events-none hidden md:block" aria-hidden>
        <div data-float data-amp="14" className="w-[80px] opacity-15">
          <Image src="/assets/images/float/shield-gold.svg" alt="" width={80} height={80} priority={false} className="h-auto w-full" style={{ height: "auto" }} />
        </div>
      </div>

      {/* Bottom-Left Info & Branding */}
      <div className="absolute bottom-6 left-6 md:left-10 z-30 flex flex-col md:flex-row md:items-center gap-4 text-white/50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <div className="flex flex-wrap items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/60" style={{ fontFamily: "var(--font-body)" }}>
            <span>28 States &amp; UTs</span>
            <span>•</span>
            <span>500+ Licenses Cleared</span>
            <span>•</span>
            <span>Jaipur · Delhi · Gurugram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
