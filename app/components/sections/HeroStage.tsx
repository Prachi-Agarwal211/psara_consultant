"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageSquare,
  Phone,
  Mail,
  User,
  Briefcase,
  MapPin,
  Calculator,
  FileText,
  Building2,
  Award,
  PhoneCall,
  Shield,
} from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { CONTACT } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { ensureGsap, prefersReducedMotion, initMouseParallax } from "../../../app/lib/motion";

const NAV = [
  { label: "ABOUT", href: "/about", icon: User },
  { label: "SERVICES", href: "/services", icon: Briefcase },
  { label: "STATES", href: "/states", icon: MapPin },
  { label: "CALCULATOR", href: "/calculator", icon: Calculator },
  { label: "CASE STUDIES", href: "/case-studies", icon: FileText },
  { label: "INDUSTRIES", href: "/industries", icon: Building2 },
  { label: "CERTIFICATIONS", href: "/certification", icon: Award },
  { label: "CONTACT", href: "/contact", icon: PhoneCall },
];

export default function HeroStage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const root = rootRef.current;

    let ctx: gsap.Context | undefined;
    if (visualRef.current) {
      ctx = gsap.context(() => {
        gsap.to(visualRef.current, {
          yPercent: -10,
          scale: 1.02,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "80% top", scrub: 1.2 },
        });
      }, root);
    }

    let killMouse: (() => void) | undefined;
    if (propsRef.current) {
      killMouse = initMouseParallax(propsRef.current, 15);
    }

    return () => {
      ctx?.revert();
      killMouse?.();
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className="relative min-h-[100dvh] w-full overflow-hidden bg-[#FBF7F0]" data-parallax-root>
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
        {/* Subtle top/bottom soft vignette */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "linear-gradient(180deg, rgba(251,247,240,0.4) 0%, transparent 20%, transparent 80%, rgba(251,247,240,0.6) 100%)",
          }}
        />
      </div>

      {/* Top-Left Logo / Brand Mark */}
      <div className="absolute top-6 left-6 md:left-10 z-40">
        <Link href="/" className="inline-block">
          <BrandMark variant="dark" />
        </Link>
      </div>

      {/* Left Rail Navigation */}
      <aside className="absolute left-6 md:left-10 top-[52%] -translate-y-1/2 z-30 hidden md:flex flex-col justify-center space-y-3.5">
        <nav aria-label="Main Navigation" className="flex flex-col space-y-2.5">
          {NAV.map((item) => {
            const IconComp = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2.5 text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#0A233F] transition-colors duration-200 hover:text-[#C59B27]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <IconComp className="h-3.5 w-3.5 text-[#0A233F]/70 group-hover:text-[#C59B27] transition-colors" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="pt-3 border-t border-[#0A233F]/15 flex items-center gap-3.5 text-[#0A233F]">
          <a href={TEL_HREF} aria-label="Call Desk" className="hover:text-[#C59B27] transition-colors">
            <Phone className="h-3.5 w-3.5" />
          </a>
          <a href={`mailto:${CONTACT.email}`} aria-label="Email Us" className="hover:text-[#C59B27] transition-colors">
            <Mail className="h-3.5 w-3.5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#C59B27] transition-colors">
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
            </svg>
          </a>
        </div>
      </aside>

      {/* Hero Copy (Positioned in right area matching mockup) */}
      <div className="absolute inset-x-0 top-[8dvh] md:top-[11dvh] lg:top-[13dvh] z-20 flex justify-end pointer-events-none px-6 md:pr-12 lg:pr-20">
        <div className="w-full md:w-[48%] lg:w-[44%] max-w-xl pointer-events-auto text-left space-y-4">
          {/* Headline */}
          <h1
            className="font-black leading-[0.95] text-[#0A213D]"
            style={{
              fontSize: "clamp(2.6rem, 4.4vw, 4.8rem)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Built for <span className="text-[#C89B3C]">Trust.</span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-3">
            <span className="accent-line w-8 shrink-0 bg-[#0A233F]" />
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.24em] text-[#0D3459]" style={{ fontFamily: "var(--font-body)" }}>
              CLARITY IN STATUTORY FILING
            </p>
          </div>

          {/* Bracket Metadata Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {["(( PSARA CONSULTANCY ))", "(( PAN INDIA ))", "(( 28 STATES & 8 UTs ))", "(( 300+ FILES ))"].map((m) => (
              <span
                key={m}
                className="bg-[#D9E6F2] text-[#0D3459] font-extrabold text-[0.66rem] tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-[#C2D8EC]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Description Card */}
          <div className="max-w-md bg-[#0A233F] text-white p-5 md:p-6 rounded-2xl shadow-2xl border border-[#0A233F]/20">
            <p className="text-xs md:text-sm lg:text-base font-semibold leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Pan-India PSARA licensing, training MOUs, police verification, and multi-state compliance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5E6BA] px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-[#1F1707] shadow-md hover:bg-[#EFE0B0] hover:scale-105 transition-all duration-200 border border-[#E8D49E]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>EXPLORE SERVICES</span>
              <ArrowUpRight className="h-4 w-4 text-[#1F1707] stroke-[3]" />
            </a>
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0A233F] bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-[#0A233F] shadow-md hover:bg-[#0A233F] hover:text-white transition-all duration-200 group"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <MessageSquare className="h-4 w-4 text-[#25D366] group-hover:text-white stroke-[2.5]" />
              <span>WHATSAPP DESK</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Rail Navigation Indicator Dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#0A233F] mb-1">INTRO</span>
        {[true, false, false, false, false, false].map((active, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              active ? "bg-[#0A233F] ring-4 ring-[#0A233F]/20" : "bg-[#0A233F]/30"
            }`}
          />
        ))}
      </div>

      {/* Bottom-Left Info Bar */}
      <div className="absolute bottom-6 left-6 md:left-10 z-30 flex items-center gap-3">
        <Shield className="w-4 h-4 text-[#C89B3C] fill-[#C89B3C]" />
        <div className="flex flex-wrap items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#0A233F]" style={{ fontFamily: "var(--font-body)" }}>
          <span>28 STATES &amp; UTs</span>
          <span>•</span>
          <span>500+ LICENSES CLEARED</span>
          <span>•</span>
          <span>JAIPUR · DELHI · GURUGRAM</span>
        </div>
      </div>

      {/* Bottom-Right Call Desk Button */}
      <div className="absolute bottom-6 right-6 md:right-10 z-30">
        <a
          href={TEL_HREF}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A233F] text-white text-xs font-black uppercase tracking-wider shadow-lg hover:bg-[#0D3459] transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>CALL DESK</span>
        </a>
      </div>
    </section>
  );
}

