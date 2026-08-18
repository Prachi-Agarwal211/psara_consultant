"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, Globe } from "lucide-react";
import HorizontalTicker from "../../../app/components/ui/HorizontalTicker";
import { OFFICES, CONTACT } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import {
  ensureGsap,
  prefersReducedMotion,
  initClipReveals,
  initParallaxLayers,
  initFloatDrift,
  initStaggerChildren,
  initVisualScrub,
  initWordReveal,
} from "../../../app/lib/motion";
import ComplianceMarquee from "./ComplianceMarquee";
import StatsBar from "./StatsBar";
import AboutSection from "./AboutSection";
import WhyChooseUs from "./WhyChooseUs";
import GoogleReviews from "./GoogleReviews";
import StateGridHome from "./StateGridHome";
import PsaraEstimator from "./PsaraEstimator";
import HomeFaq from "./HomeFaq";
import HomeContact from "./HomeContact";
import StatementInterstitial from "./StatementInterstitial";
import ServicesSection from "./ServicesSection";
import ApprovalRoadmap from "./ApprovalRoadmap";
import FloatProps, { PROPS } from "../ui/FloatProps";

const TICKER = [
  "PSARA LICENSE",
  "TRAINING MOU",
  "POLICE VERIFICATION",
  "MULTI-STATE",
  "COMPANY SETUP",
  "GST · MSME",
  "ROC COMPLIANCE",
  "28 STATES",
];

export default function HomeStory() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const root = rootRef.current;
    const { ScrollTrigger, gsap } = ensureGsap();

    initClipReveals(root);
    initParallaxLayers(root);
    initFloatDrift(root);
    initStaggerChildren(root);
    initVisualScrub(root);

    // Harden triggers after async layout settles
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // ── Hero background parallax on scroll ──
    const heroBg = root.querySelector("[data-hero-bg]");
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // ── Parallax numbers ──
    root.querySelectorAll(".parallax-num").forEach((el) => {
      gsap.to(el, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((st) => {
        if (root.contains(st.trigger as Node)) st.kill();
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 bg-transparent text-white">
      {/* Ticker band */}
      <HorizontalTicker items={TICKER} className="border-y border-white/10" />
      <ComplianceMarquee />

      {/* ── METRICS — count-up proof ── */}
      <StatsBar />

      {/* ── ABOUT — Redesigned with 3D India Map Graphic & Pan-India Pillars ── */}
      <AboutSection />

      {/* ── SERVICES ── */}
      <ServicesSection />

      {/* ── WHY US — asymmetric dossier grid ── */}
      <WhyChooseUs />

      {/* ── CINEMATIC STATEMENT ── */}
      <StatementInterstitial />

      {/* ── PROCESS — 5-phase compliance roadmap ── */}
      <ApprovalRoadmap />

      {/* ── REVIEWS ── */}
      <GoogleReviews />

      {/* ── STATES ── */}
      <StateGridHome />

      {/* ── ESTIMATOR ── */}
      <div id="estimator" className="relative bg-[#060A12]" data-parallax-root>
        <div className="relative z-10 px-[var(--gutter)]">
          <PsaraEstimator />
        </div>
      </div>

      {/* ── FAQ ── */}
      <HomeFaq />

      {/* ── PRESENCE ── */}
      <section id="presence" className="relative min-h-[85dvh] py-20 lg:py-28 bg-[#040917] border-t border-sky-500/20 overflow-hidden" data-parallax-root>
        {/* Ambient glow behind right side map */}
        <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25" style={{ background: "radial-gradient(circle, rgba(0,163,255,0.4) 0%, transparent 70%)" }} aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Office Grid & Info (6 Cols) */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-400/40 bg-sky-950/70 text-sky-300 text-xs font-extrabold tracking-widest uppercase mb-4">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Pan-India Presence</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Offices &amp; Filing Desks <span className="text-[var(--gold-bright)]">across India</span>
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/85 font-medium leading-relaxed">
                  From our Headquarters in Jaipur to liaison desks in every major metro — local expertise with national reach.
                </p>
              </div>

              {/* City Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OFFICES.map((o) => (
                  <div
                    key={o.city}
                    className={`p-3.5 rounded-xl border transition-all duration-200 ${
                      o.isHQ
                        ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 shadow-lg shadow-[var(--gold)]/10"
                        : "border-white/15 bg-[#07132b] hover:border-sky-400/50"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{o.city}</span>
                      {o.isHQ ? (
                        <span className="text-[0.62rem] uppercase tracking-wider font-extrabold text-[var(--gold-bright)] bg-[var(--gold)]/20 px-2 py-0.5 rounded">
                          HQ
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 opacity-60" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/states"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition-all"
                >
                  <span>States Directory</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cities"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-[#07132b] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>All Cities</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
                </Link>
              </div>
            </div>

            {/* Right Column: 3D India Map Visual Asset Showcase (6 Cols) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-3d-map.png"
                  alt="PSARA Offices across India Map"
                  className="w-full max-w-[560px] h-auto hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                />

                {/* Floating Office HQ Pin Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[var(--gold)]/50 bg-[#040D21]/95 backdrop-blur-md shadow-xl z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--gold-bright)]">
                    Jaipur Headquarters
                  </span>
                </div>

                {/* Floating Metro Desks Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-sky-400/50 bg-[#040D21]/95 backdrop-blur-md shadow-xl z-10">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-200">
                    Desks in 28 States
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT — form + offices ── */}
      <HomeContact />

      {/* ── CLOSING CTA ── */}
      <section
        id="start"
        className="relative flex min-h-[80dvh] flex-col items-center justify-center border-t border-sky-500/20 bg-[#040812] py-[var(--section-y)] pb-[calc(var(--section-y)+5rem)] md:pb-[var(--section-y)]"
        data-parallax-root
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,163,255,0.18) 0%, transparent 70%)",
            }}
          />
        </div>
        <FloatProps slots={PROPS.closing} />

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h2
            className="mb-8 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s move{" "}
            <span className="bg-gradient-to-r from-[#FFF2BA] via-[#C89B3C] to-[#FFF2BA] bg-clip-text text-transparent">
              your PSARA file
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-slate-300 md:text-xl">
            State + entity type on WhatsApp — we reply with next steps within hours.
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/20 transition-all duration-200 hover:from-emerald-400 hover:to-teal-500"
            >
              <MessageSquare className="h-5 w-5" />
              <span>WhatsApp Now</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-4 text-xs font-bold uppercase tracking-wider text-slate-200 transition-colors hover:border-sky-400 hover:text-sky-300"
            >
              Contact Page <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs tracking-wider text-slate-400">
            <a href={`tel:${CONTACT.phoneRaw}`} className="transition-colors hover:text-sky-400">
              {CONTACT.phoneDisplay}
            </a>
            <span className="h-1.5 w-1.5 self-center rounded-full bg-slate-700" />
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-sky-400">
              {CONTACT.email}
            </a>
            <span className="h-1.5 w-1.5 self-center rounded-full bg-slate-700" />
            <span>{CONTACT.hours}</span>
          </div>
        </div>

        {/* Desktop only — mobile has sticky CTA + FAB zone, so no collision */}
        <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 md:flex">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest">Scroll to top</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 transition-colors hover:border-sky-400 hover:text-sky-400"
            aria-label="Scroll to top"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 5L5 1L9 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
