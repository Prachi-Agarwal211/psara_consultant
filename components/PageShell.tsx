"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { initWordReveal, prefersReducedMotion, ensureGsap } from "../app/lib/motion";
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
  const heroImage = image ?? "/assets/images/generated/inner-hero-dossier.png";

  useEffect(() => {
    if (!hRef.current || prefersReducedMotion()) return;
    initWordReveal(hRef.current, "top 90%");
  }, [title]);

  return (
    <header
      className="psara-page-hero relative overflow-hidden px-[var(--gutter)] pb-14 pt-28 md:min-h-[26rem] md:pb-20 md:pt-36 bg-[#080611] text-white border-b border-white/10"
      data-parallax-root
      style={accentVars as CSSProperties}
    >
      {/* Background visual asset */}
      {heroImage && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
          <picture className="absolute inset-0 block">
            {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center mix-blend-screen"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#080611]/70 via-[#100728]/92 to-[#080611]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap gap-x-2 gap-y-1 text-xs uppercase tracking-[0.1em] text-white/60 font-bold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Link href="/" className="hover:text-[#F5D061] transition-colors">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-[#F5D061] transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-[#F5D061]">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {meta && (
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {meta}
          </p>
        )}

        {kicker && (
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#F5D061]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {kicker}
          </p>
        )}

        <div className="max-w-4xl border-l-2 border-[#D4AF37] pl-5 md:pl-6 space-y-4">
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
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(
      ref.current.querySelectorAll(":scope > *"),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.05,
      }
    );
  }, []);

  return (
    <main
      ref={ref}
      className={`psara-page-main relative px-[var(--gutter)] py-16 bg-gradient-to-br from-[#080611] via-[#120C27] to-[#24104B] text-white min-h-[50vh] ${className}`}
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
