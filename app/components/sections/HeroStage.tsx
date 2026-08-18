"use client";

import { useEffect, useRef, useState } from "react";
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
  Sparkles,
} from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { CONTACT } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { ensureGsap, prefersReducedMotion, initMouseParallax } from "../../../app/lib/motion";

const NAV = [
  { label: "ABOUT", href: "/about", icon: User },
  { label: "SERVICES", href: "/services", icon: Briefcase },
  { label: "STATES", href: "/states", icon: MapPin },
  { label: "FEE CALCULATOR", href: "/calculator", icon: Calculator },
  { label: "CASE STUDIES", href: "/case-studies", icon: FileText },
  { label: "INDUSTRIES", href: "/industries", icon: Building2 },
  { label: "CERTIFICATIONS", href: "/certification", icon: Award },
  { label: "CONTACT", href: "/contact", icon: PhoneCall },
];

export default function HeroStage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const root = rootRef.current;

    let ctx: gsap.Context | undefined;
    if (visualRef.current) {
      ctx = gsap.context(() => {
        const desktopLayer = root.querySelector<HTMLElement>("[data-hero-desktop-bg]");
        if (desktopLayer) {
          gsap.to(desktopLayer, {
            yPercent: -4,
            scale: 1.01,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "80% top",
              scrub: 1.2,
            },
          });
        }
      }, root);
    }

    let killMouse: (() => void) | undefined;
    if (propsRef.current) {
      killMouse = initMouseParallax(propsRef.current, 10);
    }

    return () => {
      ctx?.revert();
      killMouse?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full overflow-hidden bg-[#FBF7F0] min-h-[100dvh] flex flex-col justify-between"
      data-parallax-root
    >
      {/* ═══════════════ DESKTOP: full-bleed bespoke backdrop ═══════════════ */}
      <div
        ref={visualRef}
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full will-change-transform md:block"
        aria-hidden
      >
        <div
          data-hero-desktop-bg
          data-scrub-visual
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: "url('/assets/images/generated/hero-reference-backdrop.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Desktop left rail editorial navigation */}
      <aside className="absolute left-6 top-[50%] z-30 hidden -translate-y-1/2 flex-col justify-center space-y-3.5 md:left-10 md:flex">
        <nav aria-label="Main Navigation" className="flex flex-col space-y-2.5">
          {NAV.map((item) => {
            const IconComp = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#0A233F] transition-colors duration-200 hover:text-[#C89B3C]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <IconComp className="h-3.5 w-3.5 text-[#0A233F]/70 transition-colors group-hover:text-[#C89B3C]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3.5 border-t border-[#0A233F]/15 pt-3 text-[#0A233F]">
          <a href={TEL_HREF} aria-label="Call Desk" className="transition-colors hover:text-[#C89B3C]">
            <Phone className="h-3.5 w-3.5" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email Us"
            className="transition-colors hover:text-[#C89B3C]"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-[#C89B3C]"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
            </svg>
          </a>
        </div>
      </aside>

      {/* ═══════════════ DESKTOP & MOBILE HERO STAGE ═══════════════ */}
      {/* Mobile Top Bar */}
      <div className="relative z-30 flex items-center justify-between px-5 pt-4 pb-2 md:hidden">
        <Link href="/" className="inline-block">
          <BrandMark compact />
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={TEL_HREF}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#0A233F]/20 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#0A233F] shadow-sm"
          >
            <Phone className="h-3.5 w-3.5 text-[#C89B3C]" />
            <span>Call</span>
          </a>
          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-sm"
          >
            <MessageSquare className="h-3.5 w-3.5 fill-white" />
            <span>WA</span>
          </a>
        </div>
      </div>

      {/* Center Stage Container — Exactly framed inside the Purple Arch on Desktop */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-0 md:absolute md:inset-x-0 md:top-[6dvh] lg:top-[7.5dvh]">
        <div
          ref={propsRef}
          className="w-full max-w-[360px] sm:max-w-[400px] md:max-w-[430px] lg:max-w-[470px] mx-auto text-center flex flex-col items-center space-y-2.5 sm:space-y-3.5"
        >
          {/* Centered Brand Emblem */}
          <div className="hidden md:flex justify-center mb-1">
            <Link href="/" className="inline-block transition-transform duration-200 hover:scale-105">
              <BrandMark compact={false} />
            </Link>
          </div>

          {/* Badges framed cleanly */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/60 bg-[#050714]/60 px-2.5 py-0.5 text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider text-[#F5D061] backdrop-blur-sm shadow-sm">
              <Sparkles className="h-2.5 w-2.5 text-[#D4AF37]" />
              PSARA ACT, 2005
            </span>
            <span className="inline-flex items-center rounded-full border border-[#D4AF37]/60 bg-[#050714]/60 px-2.5 py-0.5 text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider text-[#F5D061] backdrop-blur-sm shadow-sm">
              28 STATES &amp; 8 UTs
            </span>
            <span className="inline-flex items-center rounded-full border border-[#D4AF37]/60 bg-[#050714]/60 px-2.5 py-0.5 text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider text-[#F5D061] backdrop-blur-sm shadow-sm">
              500+ CLEARANCES
            </span>
          </div>

          {/* Main Headline — Proportionally tuned to sit inside the purple arch */}
          <h1
            className="font-bold leading-[1.08] text-[#0A213D] md:text-white drop-shadow-none md:drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            style={{
              fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            PSARA License <br />
            <span className="text-[#C89B3C] md:text-[#F5E6BA] md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Consultant India
            </span>
          </h1>

          {/* Reduced Concise Body Text */}
          <p
            className="text-xs sm:text-xs md:text-sm font-medium text-[#1E293B] md:text-white/95 leading-relaxed max-w-[340px] sm:max-w-[390px] mx-auto md:drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Statutory licensing, recognized training MOUs, police verification tracking, and direct Controlling Authority filing across India.
          </p>

          {/* Tactile CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1.5 w-full sm:w-auto">
            <a
              href="#services"
              className="btn-gold-editorial w-full sm:w-auto shadow-md text-xs py-3 px-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>EXPLORE SERVICES</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] text-[#1F1707]" />
            </a>

            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto shadow-md text-xs py-3 px-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <MessageSquare className="h-3.5 w-3.5 fill-white" />
              <span>WHATSAPP DESK</span>
            </a>
          </div>
        </div>

        {/* Mobile portrait art stage */}
        <div
          className="relative mt-4 w-full h-[min(38dvh,340px)] md:hidden overflow-hidden rounded-2xl shadow-inner"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/images/generated/hero-reference-backdrop.png')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-12"
            style={{
              background:
                "linear-gradient(180deg, #FBF7F0 0%, rgba(251,247,240,0.6) 40%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Desktop bottom trust bar */}
      <div className="relative z-30 pb-4 px-6 md:absolute md:bottom-6 md:left-6 md:px-0 md:pb-0 hidden md:flex items-center gap-3 md:left-10">
        <Shield className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
        <div
          className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0A233F]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span>28 STATES &amp; UTs</span>
          <span>•</span>
          <span>500+ LICENSES CLEARED</span>
          <span>•</span>
          <span>JAIPUR · DELHI · GURUGRAM</span>
        </div>
      </div>
    </section>
  );
}
