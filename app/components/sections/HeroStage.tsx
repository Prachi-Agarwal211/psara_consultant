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

const META_BADGES = [
  "(( PSARA CONSULTANCY ))",
  "(( PAN INDIA ))",
  "(( 28 STATES & 8 UTs ))",
  "(( 300+ FILES ))",
];

/**
 * Hero stage
 *
 * Desktop (md+): full-bleed landscape art + right-column copy (unchanged intent).
 * Mobile: split stage — cream copy zone on top, portrait art (Aug 10) in a
 * dedicated lower stage so certificate props never sit under text.
 */
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
        // Parallax only the desktop full-bleed layer
        const desktopLayer = root.querySelector<HTMLElement>("[data-hero-desktop-bg]");
        if (desktopLayer) {
          gsap.to(desktopLayer, {
            yPercent: -8,
            scale: 1.02,
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
      killMouse = initMouseParallax(propsRef.current, 15);
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
      className="relative w-full overflow-hidden bg-[#FBF7F0] md:min-h-[100dvh]"
      data-parallax-root
    >
      {/* ═══════════════ DESKTOP: full-bleed landscape ═══════════════ */}
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
            backgroundImage: "url('/hero-background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(180deg, rgba(251,247,240,0.4) 0%, transparent 20%, transparent 80%, rgba(251,247,240,0.55) 100%)",
          }}
        />
      </div>

      {/* Brand mark — desktop overlay; mobile sits in copy column */}
      <div className="absolute left-6 top-6 z-40 hidden md:left-10 md:block">
        <Link href="/" className="inline-block">
          <BrandMark variant="dark" />
        </Link>
      </div>

      {/* Desktop left rail */}
      <aside className="absolute left-6 top-[52%] z-30 hidden -translate-y-1/2 flex-col justify-center space-y-3.5 md:left-10 md:flex">
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
                <IconComp className="h-3.5 w-3.5 text-[#0A233F]/70 transition-colors group-hover:text-[#C59B27]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3.5 border-t border-[#0A233F]/15 pt-3 text-[#0A233F]">
          <a href={TEL_HREF} aria-label="Call Desk" className="transition-colors hover:text-[#C59B27]">
            <Phone className="h-3.5 w-3.5" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email Us"
            className="transition-colors hover:text-[#C59B27]"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-[#C59B27]"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
            </svg>
          </a>
        </div>
      </aside>

      {/* ═══════════════ MOBILE: split copy + art ═══════════════ */}
      <div className="relative z-20 flex min-h-[100dvh] flex-col md:min-h-0 md:block">
        {/* Copy zone (mobile top / desktop absolute right) */}
        <div
          className={[
            "w-full px-5",
            "pt-[max(1.1rem,env(safe-area-inset-top))] pb-4",
            "md:absolute md:inset-x-0 md:top-[11dvh] md:px-0 md:py-0 md:pr-12 lg:top-[13dvh] lg:pr-20",
            "md:flex md:justify-end md:pointer-events-none",
          ].join(" ")}
        >
          {/* Mobile brand in flow */}
          <div className="mb-4 md:hidden">
            <Link href="/" className="inline-block">
              <BrandMark variant="dark" />
            </Link>
          </div>

          <div
            ref={propsRef}
            className="w-full max-w-xl space-y-2.5 text-left sm:space-y-3.5 md:pointer-events-auto md:w-[50%] md:space-y-4 lg:w-[44%]"
          >
            <h1
              className="font-black leading-[0.94] text-[#0A213D]"
              style={{
                fontSize: "clamp(2.05rem, 7vw, 4.8rem)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              Built for <span className="text-[#C89B3C]">Trust.</span>
            </h1>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="accent-line w-7 shrink-0 bg-[#0A233F] sm:w-8" />
              <p
                className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#0D3459] sm:text-xs md:text-sm md:tracking-[0.24em]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                CLARITY IN STATUTORY FILING
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
              {META_BADGES.map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-[#C2D8EC] bg-[#D9E6F2] px-2 py-1 text-center text-[0.56rem] font-extrabold tracking-wide text-[#0D3459] shadow-sm sm:px-2.5 sm:text-left sm:text-[0.66rem] sm:tracking-wider"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="max-w-md rounded-2xl border border-[#0A233F]/20 bg-[#0A233F] p-3.5 text-white shadow-2xl sm:p-5 md:p-6">
              <p
                className="text-[0.78rem] font-semibold leading-snug sm:text-xs sm:leading-relaxed md:text-sm lg:text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Pan-India PSARA licensing, training MOUs, police verification, and multi-state
                compliance.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:pt-1">
              <a
                href="#services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E8D49E] bg-[#F5E6BA] px-5 py-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#1F1707] shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-[#EFE0B0] sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>EXPLORE SERVICES</span>
                <ArrowUpRight className="h-4 w-4 stroke-[3] text-[#1F1707]" />
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0A233F] bg-white px-5 py-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#0A233F] shadow-md transition-all duration-200 hover:bg-[#0A233F] hover:text-white sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.18em]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 stroke-[2.5] text-[#25D366] group-hover:text-white" />
                <span>WHATSAPP DESK</span>
              </a>
            </div>

            {/* Compact trust line under CTAs — mobile only, no overlay on art */}
            <div className="flex items-center gap-2 pt-0.5 md:hidden">
              <Shield className="h-3.5 w-3.5 shrink-0 fill-[#C89B3C] text-[#C89B3C]" />
              <p
                className="text-[0.56rem] font-black uppercase tracking-[0.12em] text-[#0A233F]/85"
                style={{ fontFamily: "var(--font-body)" }}
              >
                28 STATES · 500+ LICENSES · JAIPUR · DELHI · GURUGRAM
              </p>
            </div>
          </div>
        </div>

        {/* Mobile portrait art stage — dedicated lower half */}
        <div
          className="relative mt-1 min-h-[min(48dvh,460px)] flex-1 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/hero-background-mobile.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Soft blend from cream copy zone into art */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-14"
            style={{
              background:
                "linear-gradient(180deg, #FBF7F0 0%, rgba(251,247,240,0.55) 40%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Desktop bottom trust bar */}
      <div className="absolute bottom-6 left-6 z-30 hidden items-center gap-3 md:left-10 md:flex">
        <Shield className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
        <div
          className="flex flex-wrap items-center gap-2 text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#0A233F]"
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
