"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CaseyMenu from "./CaseyMenu";
import { CONTACT } from "../../../lib/config";

/**
 * HeroStage — Standard flat theme.
 * Single scrim, solid gold accent, no teal, no double header.
 * H1 with keyword in first paint, 2 CTAs, minimal layers.
 */
export default function HeroStage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play()
        .then(() => setVideoReady(true))
        .catch(() => setVideoReady(false));
    };
    const onCanPlay = () => tryPlay();

    // MAAC strategy: poster is LCP, video is a progressive enhancement.
    // Don't preload metadata at mount — wait for idle so hero text + poster render first.
    v.preload = "none";
    const start = () => {
      v.preload = "auto";
      v.load();
      v.addEventListener("canplay", onCanPlay);
      v.addEventListener("loadeddata", onCanPlay);
      v.muted = true;
    };
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout?: number }) => number)
      | undefined;
    let idleId = 0;
    if (ric) idleId = ric(start, { timeout: 1500 });
    else start();

    return () => {
      if (idleId && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(idleId);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadeddata", onCanPlay);
    };
  }, []);

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden bg-[var(--canvas-void)] isolate">
      {/* Media: poster + video with single flat scrim */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/generated/hero-poster.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/assets/images/generated/hero-poster.webp"
        >
          <source src="/assets/videos/hero-loop.webm" type="video/webm" />
          <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        {/* Single flat scrim — no teal, matches violet/gold theme */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,17,0.72)_0%,rgba(8,6,17,0.45)_38%,rgba(8,6,17,0.18)_58%,rgba(8,6,17,0.88)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[var(--canvas-void)] to-transparent" />
      </div>

      {/* Header — single source of truth (SiteHeader handles scrolled state, this is hero header) */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 lg:px-8">
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="group flex items-center gap-3 text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center">
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-6 bg-white transition-all group-hover:w-7" />
              <span className="h-px w-6 bg-white" />
              <span className="h-px w-4 bg-white transition-all group-hover:w-6" />
            </span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <nav className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[0.14em] text-white/75 lg:flex">
          <a href="/" className="relative pb-1 text-white">
            Home
            <span className="absolute inset-x-0 -bottom-1 h-px bg-[var(--gold)]" />
          </a>
          <a href="/about" className="transition-colors hover:text-white">About Us</a>
          <a href="/services" className="transition-colors hover:text-white">Services</a>
          <a href="/states" className="transition-colors hover:text-white">States</a>
          <a href="/contact" className="transition-colors hover:text-white">Contact</a>
        </nav>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--canvas-void)]/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--canvas-void)]"
        >
          Get in Touch
          <span className="text-sm leading-none">→</span>
        </a>
      </header>
      <CaseyMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Center: brand + H1 + CTAs */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 pb-16 pt-20 text-center">
        <Image
          src="/logo.png"
          alt="PSARA Consultant India"
          width={320}
          height={320}
          priority
          unoptimized
          className="h-[220px] w-auto object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.62)] sm:h-[260px] lg:h-[300px]"
        />

        <h1 className="mt-8 max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          PSARA License <span className="text-[var(--gold)]">clearance across India.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
          Statutory filing across 36 States &amp; UTs — training MOU, police verification, and Controlling Authority liaison from Jaipur HQ.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--canvas-void)] shadow-[0_8px_28px_rgba(200,155,60,0.35)] transition-[transform,filter] hover:brightness-110">
            Start a Statutory File
            <span>→</span>
          </a>
          <a href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent("Hello PSARA Consultant India — I need help with PSARA License registration.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/15">
            WhatsApp Desk
          </a>
        </div>

        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">500+ Licenses · 36 States · 10 Years</p>
      </div>

      {/* Bottom bar — minimal, gold accents only */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 px-4 pb-5 lg:px-6">
        <a href={`tel:+${CONTACT.phoneRaw}`} className="hidden items-center gap-3 rounded-full border border-white/10 bg-[var(--canvas-void)]/65 px-4 py-2.5 backdrop-blur-md sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--canvas-void)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01l-2.21 2.22z" />
            </svg>
          </span>
          <span className="pr-1 text-left leading-none">
            <span className="block text-[9px] uppercase tracking-[0.14em] text-white/58">Call Us</span>
            <span className="block text-xs font-bold tracking-wide text-white">{CONTACT.phoneDisplay}</span>
          </span>
        </a>
        <div className="flex-1" aria-hidden />
        <a href={CONTACT.whatsapp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--canvas-void)]/65 px-4 py-2.5 text-xs font-bold tracking-wide text-white backdrop-blur-md transition-colors hover:border-[var(--gold)] sm:px-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--gold)]">
            <path d="M19.05 4.91A9.9 9.9 0 0 0 12.04 2C6.58 2 2.14 6.42 2.14 10.86c0 1.56.41 3.08 1.19 4.42L2 22l6.87-1.8a9.87 9.87 0 0 0 4.68 1.19h.01c5.46 0 9.9-4.42 9.9-9.86 0-2.64-1.03-5.11-2.91-6.97l.4.35zm-7.01 15.24h-.01a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-4.08 1.07 1.09-3.97-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.71-8.23 8.28-8.23 2.21 0 4.29.86 5.85 2.42A8.19 8.19 0 0 1 19.4 11.53c0 4.54-3.71 8.23-8.27 8.23l.91.39zm6.91-11.5a6.56 6.56 0 0 0-4.68-1.94c-3.64 0-6.6 2.95-6.6 6.58 0 1.15.3 2.28.87 3.27l.12.21-.73 2.65 2.73-.71.2.12a6.6 6.6 0 0 0 3.16.8h.01c3.64 0 6.6-2.95 6.6-6.58a6.54 6.54 0 0 0-1.96-4.67l.28.27z" />
          </svg>
          <span className="hidden sm:inline uppercase text-[11px] tracking-wide">Whatsapp Us</span>
          <span className="sm:hidden text-[11px]">WA</span>
        </a>
      </div>
    </section>
  );
}
