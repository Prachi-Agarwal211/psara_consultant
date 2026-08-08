"use client";

/**
 * Stage-aligned page shell for all inner routes.
 * Transparent over AmbientCanvas (via StageShell in layout pages).
 */

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
  meta,
}: {
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
  kicker?: string;
  roman?: string; // ignored — kill 01/roman chrome
  /** Deterministic per-location accent (states/cities) */
  locationSlug?: string;
  /** Full-bleed hero backdrop (generated/thematic) */
  image?: string;
  /** Bracket metadata line — nudot DNA, accent-tinted */
  meta?: string;
}) {
  const hRef = useRef<HTMLHeadingElement | null>(null);
  const accent = locationSlug ? getLocationAccent(locationSlug) : null;
  const accentVars = accent ? accentStyleVars(accent) : {};

  useEffect(() => {
    if (!hRef.current || prefersReducedMotion()) return;
    initWordReveal(hRef.current, "top 90%");
  }, [title]);

  return (
    <header
      className="relative overflow-hidden bg-transparent px-[var(--gutter)] pb-12 pt-28 md:pt-32"
      data-parallax-root
      style={accentVars as CSSProperties}
    >
      {/* Full-bleed hero backdrop (location identity) */}
      {image && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div data-speed="0.14" className="absolute inset-0 h-[130%] -top-[15%]">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-45"
            />
          </div>
          {/* Blend into ambient + accent glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,8,20,0.82) 0%, rgba(2,8,20,0.35) 40%, rgba(2,8,20,0.82) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: accent ? accent.glow : "none" }}
          />
        </div>
      )}

      {/* Accent aura even without an image */}
      {!image && (
        <div
          data-speed="0.15"
          className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full opacity-40"
          style={{
            background: accent
              ? `radial-gradient(circle, ${accent.base}33 0%, transparent 70%)`
              : "radial-gradient(circle, rgba(0,102,255,0.35) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10">
        {crumbs.length > 0 && (
          <nav
            className="mb-6 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.14em]"
            style={{ color: "var(--white-40)", fontFamily: "var(--font-body)" }}
          >
            <Link href="/" className="hover:text-acc-bright">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-acc-bright">
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--acc-deep, var(--gold-dim))" }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {meta && (
          <p
            className="meta-bracket mb-4 inline-block !border-0 !px-0"
            style={{ color: "var(--acc, var(--gold))", fontFamily: "var(--font-body)" }}
          >
            {meta}
          </p>
        )}
        {kicker && (
          <p
            className="mb-4 text-[0.58rem] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--acc-deep, var(--gold-dim))", fontFamily: "var(--font-body)" }}
          >
            {kicker}
          </p>
        )}
        <h1
          ref={hRef}
          className="max-w-4xl font-black leading-[1.05] tracking-tight text-[#0F3C65]"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            data-clip
            className="mt-6 max-w-2xl text-[1.02rem] font-medium leading-relaxed text-[#334E68]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {lead}
          </p>
        )}
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
    const kids = ref.current.querySelectorAll("[data-clip], [data-stagger]");
    gsap.fromTo(
      ref.current.querySelectorAll(":scope > *"),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      }
    );
    void kids;
  }, []);

  return (
    <main
      ref={ref}
      className={`relative bg-[#FFFEF9] text-[#0F3C65] px-[var(--gutter)] pb-24 ${className}`}
    >
      <div className="mx-auto max-w-[var(--page-max)]">{children}</div>
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
      className={`prose-stage max-w-3xl space-y-5 text-[0.98rem] leading-relaxed ${className}`}
      style={{ color: "var(--white-70)", fontFamily: "var(--font-body)" }}
    >
      {children}
    </div>
  );
}
