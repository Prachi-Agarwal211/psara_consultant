"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Globe } from "lucide-react";
import { OFFICES, CONTACT } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { ensureGsap, prefersReducedMotion } from "../../../app/lib/motion";
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

export default function HomeStory() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { ScrollTrigger } = ensureGsap();

    // One refresh after fonts/images settle — replaces scattered hacks.
    // Each section now owns its own ScrollTrigger with correct scrub grammar.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    const onFonts = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts?.ready) document.fonts.ready.then(onFonts);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      // don't kill all triggers — let per-section clean up (pin stability)
    };
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 bg-transparent text-white">
      <ComplianceMarquee />

      {/* ── METRICS — count-up proof ── */}
      <StatsBar />

      {/* ── ABOUT — Single dossier artwork & Pan-India pillars ── */}
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
      <div id="estimator" className="mood-estimator relative bg-[#080611]" data-parallax-root>
        <div className="relative z-10 px-[var(--gutter)]">
          <PsaraEstimator />
        </div>
      </div>

      {/* ── FAQ ── */}
      <HomeFaq />

      {/* ── PRESENCE — recolored to plum authority (was sky) ── */}
      <section id="presence" className="section-atmosphere mood-presence relative min-h-[85dvh] py-20 lg:py-28 bg-[#080611] border-t border-white/10 overflow-hidden" data-parallax-root>
        {/* Ambient glow behind right side map — plum */}
        <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-35" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.48) 0%, rgba(212,175,55,0.10) 42%, transparent 70%)" }} aria-hidden />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Office Grid & Info (6 Cols) */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(196,181,253,0.38)] bg-gradient-to-r from-[#6D28D9]/25 to-[#D4AF37]/10 text-[#F5E6BA] text-xs font-extrabold tracking-widest uppercase mb-4">
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Pan-India Presence</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Offices &amp; Filing Desks <span className="gold-text-gradient">across India</span>
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/82 font-medium leading-relaxed">
                  From our Headquarters in Jaipur to liaison desks in every major metro — local expertise with national reach.
                </p>
              </div>

              {/* City Grid — plum */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {OFFICES.map((o) => (
                  <div
                    key={o.city}
                    className={`p-3.5 rounded-xl border transition-[border-color,box-shadow,transform,filter] duration-200 ${
                      o.isHQ
                        ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 shadow-lg shadow-[var(--gold)]/10"
                        : "border-violet-200/15 bg-gradient-to-br from-[#1A1236] to-[#120C27] hover:border-violet-300/40 hover:from-[#2A1853] hover:to-[#1A1236]"
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] opacity-60" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons — plum */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/states"
                  data-cursor="Explore states"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] text-[#241703] transition-[transform,filter] hover:-translate-y-0.5"
                  style={{
                    background: "var(--grad-gold-metallic)",
                    backgroundSize: "220% 100%",
                    boxShadow: "inset 0 1px 0 rgba(255,250,230,0.85), inset 0 -1px 0 rgba(88,58,8,0.5), 0 12px 30px -10px rgba(200,155,60,0.5)",
                  }}
                >
                  <span>States Directory</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cities"
                  data-cursor="Explore cities"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-violet-200/25 bg-gradient-to-br from-[#2A1853] to-[#120C27] hover:from-[#3B2374] hover:to-[#1A1236] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>All Cities</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#D4AF37]" />
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
                <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[var(--gold)]/50 bg-[#120C27]/95 backdrop-blur-md shadow-xl z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--gold-bright)]">
                    Jaipur Headquarters
                  </span>
                </div>

                {/* Floating Metro Desks Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-violet-200/25 bg-[#120C27]/95 backdrop-blur-md shadow-xl z-10">
                  <Globe className="w-4 h-4 text-[#C89B3C]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white/85">
                    Desks in 36 States & UTs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT — form + offices ── */}
      <HomeContact />

      {/* ── CLOSING CTA — plum gold */}
      <section
        id="start"
        className="section-atmosphere mood-start relative flex min-h-[80dvh] flex-col items-center justify-center border-t border-white/10 bg-[#080611] py-[var(--section-y)] pb-[calc(var(--section-y)+5rem)] md:pb-[var(--section-y)]"
        data-parallax-root
      >
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(109,40,217,0.32) 0%, transparent 70%), radial-gradient(ellipse 40% 32% at 50% 22%, rgba(212,175,55,0.14) 0%, transparent 60%)",
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

          <p className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-white/70 md:text-xl">
            State + entity type on WhatsApp — we reply with next steps within hours.
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <a
              href={DEFAULT_WA}
              data-cursor="Chat desk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/20 transition-[border-color,box-shadow,transform,filter] duration-200 hover:from-emerald-400 hover:to-teal-500"
            >
              <MessageSquare className="h-5 w-5" />
              <span>WhatsApp Now</span>
            </a>
            <Link
              href="/contact"
              data-cursor="Contact desk"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200/25 bg-gradient-to-br from-[#2A1853] to-[#120C27] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white/90 transition-colors hover:border-[#C89B3C] hover:text-[#F5D061]"
            >
              Contact Page <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs tracking-wider text-white/55">
            <a href={`tel:${CONTACT.phoneRaw}`} className="transition-colors hover:text-[#F5D061]">
              {CONTACT.phoneDisplay}
            </a>
            <span className="h-1.5 w-1.5 self-center rounded-full bg-white/20" />
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-[#F5D061]">
              {CONTACT.email}
            </a>
            <span className="h-1.5 w-1.5 self-center rounded-full bg-white/20" />
            <span>{CONTACT.hours}</span>
          </div>
        </div>

        {/* Desktop only — mobile has sticky CTA + FAB zone, so no collision */}
        <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/45 md:flex">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest">Scroll to top</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#C89B3C] hover:text-[#F5D061]"
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
