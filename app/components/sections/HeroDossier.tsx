"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDownRight, MessageSquare, Phone } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import BrandMark from "../ui/BrandMark";
import { CONTACT } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "States", href: "/states" },
  { label: "Contact", href: "/contact" },
];

/**
 * Abstract Futuristic Hero
 * Layout:
 *   LEFT  → vertical nav + statutory metadata
 *   CENTER → full-bleed showcase image with kinetic overlays
 *   BOTTOM → floating bar with CTA (center) + logo (right)
 */
export default function HeroDossier({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const rootRef   = useRef<HTMLElement | null>(null);
  const headRef   = useRef<HTMLHeadingElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const leftRef   = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      /* ── Left panel slide-in ── */
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll(".hero-nav-item"),
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.09, ease: "power3.out", delay: 0.6 }
        );
      }

      /* ── Headline word blur ── */
      if (headRef.current) {
        const text = headRef.current.textContent?.trim() ?? "";
        if (text) {
          headRef.current.setAttribute("aria-label", text);
          headRef.current.textContent = "";
          const words = text.split(/\s+/);
          const spans: HTMLElement[] = [];
          words.forEach((w) => {
            const wrap = document.createElement("span");
            wrap.className = "inline-block overflow-hidden mr-[0.2em]";
            const inner = document.createElement("span");
            inner.className = "inline-block will-change-transform";
            inner.textContent = w;
            wrap.appendChild(inner);
            headRef.current?.appendChild(wrap);
            spans.push(inner);
          });
          gsap.fromTo(
            spans,
            { opacity: 0, filter: "blur(14px)", y: 32 },
            { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.0, stagger: 0.06, ease: "power3.out", delay: 0.3 }
          );
        }
      }

      /* ── Showcase image parallax on scroll ── */
      if (imgWrapRef.current) {
        gsap.fromTo(
          imgWrapRef.current,
          { scale: 1.04, opacity: 0.7 },
          {
            scale: 1, opacity: 1, ease: "power2.out", duration: 1.2,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "var(--grad-hero)",
      }}
    >
      {/* ── Background mesh / glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "var(--grad-mesh)", opacity: 0.6 }}
      />
      {/* Blue top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[60vw] h-[40vh]"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,71,255,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ════════════════════════════════════════════
          LEFT: Vertical Nav + Metadata
          ════════════════════════════════════════════ */}
      <div
        ref={leftRef}
        className="absolute left-0 top-0 bottom-0 z-20 flex flex-col justify-between py-8 px-5 hidden md:flex"
        style={{ width: "clamp(5rem, 9vw, 8rem)" }}
      >
        {/* Top: status dot + label */}
        <div className="flex flex-col items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--blue)", boxShadow: "0 0 8px var(--blue-glow)" }}
          />
          <span
            className="text-[0.50rem] font-bold uppercase tracking-[0.22em]"
            style={{
              writingMode: "vertical-rl",
              color: "var(--white-50)",
              letterSpacing: "0.22em",
            }}
          >
            PSARA ACT 2005
          </span>
        </div>

        {/* Center: vertical nav links */}
        <nav className="flex flex-col items-center gap-6">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hero-nav-item group"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              <span
                className="text-[0.55rem] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: "var(--white-40)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white-40)")}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom: coordinate */}
        <span
          className="text-[0.45rem] font-bold uppercase tracking-[0.15em]"
          style={{ writingMode: "vertical-rl", color: "var(--white-30)" }}
        >
          26.91°N 75.79°E
        </span>
      </div>

      {/* ════════════════════════════════════════════
          MAIN CONTENT: Title + Showcase
          ════════════════════════════════════════════ */}
      <div
        className="relative z-10 flex flex-col"
        style={{
          minHeight: "100dvh",
          paddingTop: "var(--header-h)",
          paddingLeft: "clamp(1.2rem, 4vw, 3.5rem)",
          paddingRight: "clamp(1.2rem, 4vw, 3.5rem)",
          marginLeft: "clamp(0rem, 9vw, 8rem)",
        }}
      >
        {/* ── Top micro-bar ── */}
        <div
          className="flex items-center justify-between py-5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--blue)" }}
            />
            <span className="text-[0.60rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--white-50)" }}>
              STATUTORY CONSULTANCY
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-[0.60rem] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--white-30)" }}>
              PAN-INDIA · 28 STATES
            </span>
            <span
              className="px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-widest rounded border"
              style={{ color: "var(--gold)", borderColor: "var(--gold-glow)", backgroundColor: "rgba(212,175,55,0.06)" }}
            >
              2026 EDITION
            </span>
          </div>
        </div>

        {/* ── Giant Headline ── */}
        <div className="pt-10 pb-6">
          <div
            className="flex items-center gap-4 mb-4"
            style={{ color: "var(--blue-bright)" }}
          >
            <span
              className="px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-widest rounded"
              style={{
                color: "var(--blue-bright)",
                backgroundColor: "var(--blue-surface)",
                border: "1px solid var(--blue-border)",
              }}
            >
              PSARA LICENSE SPECIALIST
            </span>
            <span className="h-px flex-1 hidden sm:block" style={{ backgroundColor: "var(--line-strong)" }} />
          </div>

          <h1
            ref={headRef}
            className="font-extrabold uppercase leading-[0.90] tracking-tighter"
            style={{
              fontSize: "var(--text-hero)",
              color: "var(--white)",
              fontFamily: "var(--font-display)",
              maxWidth: "56rem",
            }}
          >
            PSARA LICENCE CONSULTANT
          </h1>
        </div>

        {/* ── Showcase Image Container ── */}
        <div
          ref={imgWrapRef}
          className="relative flex-1 w-full rounded-2xl overflow-hidden"
          style={{
            minHeight: "clamp(240px, 38vh, 460px)",
            border: "1px solid var(--line-strong)",
            backgroundColor: "var(--obsidian-card)",
          }}
        >
          {/* Corner captions */}
          <div
            className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded text-[0.52rem] font-bold uppercase tracking-widest backdrop-blur-sm"
            style={{
              color: "var(--gold)",
              backgroundColor: "rgba(0,0,0,0.55)",
              border: "1px solid var(--gold-glow)",
            }}
          >
            MOTION SHOWCASE · REEL 2026
          </div>
          <div
            className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded text-[0.52rem] font-bold uppercase tracking-widest backdrop-blur-sm"
            style={{ color: "var(--white-60)", backgroundColor: "rgba(0,0,0,0.55)", border: "1px solid var(--line)" }}
          >
            CONTROLLING AUTHORITY FILING
          </div>

          {/* Abstract futuristic background */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `
                radial-gradient(ellipse at 30% 50%, rgba(0,71,255,0.15) 0%, transparent 55%),
                radial-gradient(ellipse at 75% 40%, rgba(212,175,55,0.08) 0%, transparent 50%),
                linear-gradient(180deg, var(--obsidian-card) 0%, var(--black) 100%)
              `,
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--white-50) 1px, transparent 1px), linear-gradient(90deg, var(--white-50) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Center abstract kinetic text */}
            <div className="relative z-10 text-center px-8">
              <span
                className="block text-[0.60rem] font-bold uppercase tracking-[0.30em] mb-4"
                style={{ color: "var(--blue-bright)" }}
              >
                VERIFICATION-READY DOSSIERS
              </span>
              <p
                className="font-extrabold uppercase leading-none tracking-tighter"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                  color: "var(--white)",
                  fontFamily: "var(--font-display)",
                }}
              >
                STATUTE-FIRST
                <span style={{ color: "var(--gold)", display: "block" }}>POST-GRANT DISCIPLINE</span>
              </p>
            </div>

            {/* Floating blue orb left */}
            <div
              className="absolute left-16 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,71,255,0.25) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            {/* Floating gold orb right */}
            <div
              className="absolute right-20 bottom-12 w-24 h-24 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.20) 0%, transparent 70%)",
                filter: "blur(16px)",
              }}
            />
          </div>

          {/* Bottom step bar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 backdrop-blur-md"
            style={{ borderTop: "1px solid var(--line)", backgroundColor: "rgba(8,11,18,0.70)" }}
          >
            {["01 / PREPARE", "02 / FILE", "03 / VERIFY", "04 / GRANT"].map((step) => (
              <span
                key={step}
                className="text-[0.52rem] font-bold uppercase tracking-widest"
                style={{ color: "var(--white-40)" }}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            BOTTOM BAR: Description + CTAs + Logo
            ════════════════════════════════════════════ */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-6 border-t mt-4"
          style={{ borderColor: "var(--line)" }}
        >
          {/* Description */}
          <p
            className="text-sm font-medium leading-relaxed max-w-sm"
            style={{ color: "var(--white-60)" }}
          >
            Pan-India statutory licensing advisory. Entity hygiene, training MOUs, Controlling Authority dossiers.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenQuiz && (
              <MagneticButton>
                <button
                  type="button"
                  onClick={onOpenQuiz}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: "var(--blue)",
                    color: "var(--white)",
                    boxShadow: "0 0 20px var(--blue-glow)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px var(--blue-glow)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--blue-bright)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--blue-glow)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--blue)";
                  }}
                >
                  Eligibility Audit
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </button>
              </MagneticButton>
            )}
            <MagneticButton>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-lg transition-all duration-300"
                style={{
                  color: "var(--gold)",
                  backgroundColor: "rgba(212,175,55,0.08)",
                  border: "1px solid var(--gold-glow)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,175,55,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,175,55,0.08)";
                }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </MagneticButton>
            <a
              href={TEL_HREF}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-lg transition-all duration-300"
              style={{
                color: "var(--white-70)",
                border: "1px solid var(--line-strong)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--white)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--white-70)";
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              {CONTACT.phoneDisplay}
            </a>
          </div>

          {/* Logo — bottom right */}
          <div className="hidden lg:block flex-shrink-0">
            <BrandMark />
          </div>
        </div>
      </div>
    </section>
  );
}
