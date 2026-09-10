"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { initWordReveal, prefersReducedMotion } from "../app/lib/motion";
import { getLocationAccent, accentStyleVars } from "../app/lib/location-accent";

export function PageHero({
  title,
  lead,
  crumbs = [],
  kicker,
  locationSlug,
  image,
  mobileImage,
  meta,
}: {
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
  kicker?: string;
  locationSlug?: string;
  image?: string;
  mobileImage?: string;
  meta?: string;
}) {
  const hRef = useRef<HTMLHeadingElement | null>(null);
  const accent = locationSlug ? getLocationAccent(locationSlug) : null;
  const accentVars = accent ? accentStyleVars(accent) : {};
  const heroImage = image ?? "/assets/images/generated/inner-hero-dossier.jpg";

  useEffect(() => {
    if (!hRef.current || prefersReducedMotion()) return;
    initWordReveal(hRef.current, "top 90%");
  }, [title]);

  return (
    <header
      className="psara-page-hero relative overflow-hidden px-[var(--gutter)] pb-14 pt-28 md:min-h-[26rem] md:pb-20 md:pt-36 bg-[#0B1E3B] text-white border-b border-white/10"
      data-parallax-root
      style={accentVars as CSSProperties}
    >
      {/* Background visual asset — low opacity, no blend overload */}
      {heroImage && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]" aria-hidden>
          <picture className="absolute inset-0 block">
            {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
            <Image
              src={heroImage}
              alt=""
              fill
              priority={false}
              sizes="100vw"
              className="object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-[var(--canvas-void)]/80" />
        </div>
      )}

      {/* Saffron orb + hairline — depth without gradient overload */}
      <div className="orb orb-saffron hero-enter" style={{ width: 420, height: 420, right: "-8%", top: "-20%", opacity: 0.5, "--enter-delay": "200ms" } as CSSProperties} aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="hero-enter mb-6 flex flex-wrap gap-x-2 gap-y-1 text-xs uppercase tracking-[0.1em] text-white/60 font-bold"
            style={{ fontFamily: "var(--font-body)", "--enter-delay": "40ms" } as CSSProperties}
          >
            <Link href="/" className="hover:text-[#FFB25E] transition-colors">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#FFB25E] transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[#FFB25E]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {meta && (
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#FF7A00]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {meta}
          </p>
        )}

        {kicker && (
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FFB25E]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {kicker}
          </p>
        )}

        <div className="hero-enter max-w-4xl border-l-2 border-[#FF7A00] pl-5 md:pl-6 space-y-4" style={{ "--enter-delay": "120ms" } as CSSProperties}>
          <h1
            ref={hRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="text-base sm:text-lg text-[#E2E8F0] font-normal leading-relaxed max-w-3xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {lead}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

export function PageMain({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // ponytail: CSS IO reveal, no GSAP — StageShell owns ScrollTrigger, PageMain owns below-hero sections
    if (!ref.current || prefersReducedMotion()) return;
    const kids = Array.from(
      ref.current.querySelectorAll(":scope > div > section, :scope > div > div")
    ) as HTMLElement[];
    if (!kids.length) return;
    kids.forEach((k, i) => {
      k.classList.add("reveal");
      (k as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 6) * 60}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    kids.forEach((k) => io.observe(k));
    return () => io.disconnect();
  }, []);

  return (
    <main
      ref={ref}
      className={`psara-page-main relative px-[var(--gutter)] py-16 bg-[var(--canvas-void)] text-white min-h-[50vh] ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`prose-stage max-w-3xl space-y-5 text-base leading-relaxed text-[#E2E8F0] ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </div>
  );
}
