"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRight, MessageSquare, ArrowUpRight } from "lucide-react";
import BrandMark from "../ui/BrandMark";
import MagneticButton from "../ui/MagneticButton";
import CornerOrnament from "../ui/CornerOrnament";
import { SITE } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { ensureGsap, ease, prefersReducedMotion } from "../../lib/gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Coverage", href: "#coverage" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

function ChrHoverNav({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="chr-hover text-[0.6rem] font-bold uppercase tracking-widest text-[var(--cream)]/60 hover:text-[var(--gold)] transition-colors"
    >
      <span className="ch-wrapper">
        {label.split("").map((ch, i) => (
          <span key={i} className="ch-top" style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        {label.split("").map((ch, i) => (
          <span key={i} className="ch-bot" style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </a>
  );
}

export default function HeroDossier({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const root = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imgWrap = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const sideTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      /* ── Badge stamp reveal (dossier seal) ── */
      if (!reduced && badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.65, ease: ease.bounce, delay: 0.1 }
        );
      }

      /* ── Hero title word-by-word reveal ── */
      if (!reduced && titleRef.current) {
        const text = titleRef.current.textContent?.trim() ?? "";
        if (text) {
          titleRef.current.setAttribute("aria-label", text);
          const words = text.split(/\s+/);
          const wordSpans: HTMLElement[] = [];

          titleRef.current.textContent = "";
          words.forEach((word, idx) => {
            const wrap = document.createElement("span");
            wrap.className = "inline-block overflow-hidden mr-[0.3em]";

            const inner = document.createElement("span");
            inner.className = "inline-block will-change-transform";
            inner.textContent = word + (idx < words.length - 1 ? "" : "");

            wrap.appendChild(inner);
            titleRef.current!.appendChild(wrap);
            wordSpans.push(inner);
          });

          gsap.fromTo(wordSpans,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.06, ease: ease.cinematic, delay: 0.3 }
          );
        }
      }

      /* ── Fade-up content elements ── */
      if (!reduced) {
        gsap.fromTo(
          ".hero-content > *",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: ease.expo, delay: 0.4 }
        );
        gsap.fromTo(
          ".hero-nav-item",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: ease.expo, delay: 0.35 }
        );
      }

      /* ── Background image parallax ── */
      if (!reduced && imgWrap.current) {
        gsap.to(imgWrap.current, {
          scale: 1.08,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.75,
          },
        });
      }

      /* ── Right-side decorative ghost text (Jasmine's vertical caption) ── */
      if (!reduced && sideTextRef.current) {
        gsap.fromTo(sideTextRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1.0, delay: 0.6, ease: ease.smooth }
        );
      }

      /* ── Scroll indicator ── */
      if (!reduced) {
        gsap.to(".scroll-indicator", {
          y: 6,
          opacity: 0.4,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 1.2,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[100svh] overflow-hidden text-[var(--cream)]"
      style={{ backgroundColor: "var(--espresso)" }}
    >
      {/* ── Background image with warm overlay ── */}
      <div ref={imgWrap} className="absolute inset-0 origin-center will-change-transform pointer-events-none">
        <Image
          src="/hero background.png"
          alt="Security professional in a modern corporate setting — PSARA License clearance hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, var(--espresso) 0%, rgba(15, 14, 12, 0.5) 40%, rgba(15, 14, 12, 0.3) 60%, var(--espresso) 100%)",
          }}
        />

      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--page-max)] flex-col justify-between px-[var(--gutter)] py-8">

        {/* ── Jasmine-style side caption (vertical, right side) ── */}
        <div
          ref={sideTextRef}
          className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2"
          aria-hidden
        >
          <span
            className="block text-[0.5rem] font-bold uppercase tracking-widest opacity-30"
            style={{
              color: "var(--gold)",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              letterSpacing: "0.3em",
            }}
          >
            STATUTE · FIRST · DOSSIER · CLEARANCE · SINCE · 2016
          </span>
        </div>

        {/* ── Main content grid ── */}
        <div className="grid h-full grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16 flex-1">

          {/* Left: Dossier Index Navigation (Jasmine's side navigation) */}
          <aside className="hero-nav hidden lg:flex flex-col justify-center border-r border-[var(--line-gold)] pr-8 lg:col-span-3 space-y-4 relative">
            <CornerOrnament position="tl" size="sm" />
            <CornerOrnament position="bl" size="sm" />

            <span className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-[var(--gold)] mb-4 flex items-center gap-2">
              <span className="h-px w-6 bg-[var(--gold)]" />
              DOSSIER INDEX
            </span>

            {navLinks.map((item, i) => (
              <div key={item.href} className="hero-nav-item flex items-center gap-3 group">
                <span className="text-[0.5rem] font-bold text-[var(--text-faint)] w-5 transition-colors group-hover:text-[var(--gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ChrHoverNav href={item.href} label={item.label} />
              </div>
            ))}
          </aside>

          {/* Right: Hero Content */}
          <div className="hero-content lg:col-span-9 lg:pl-10 max-w-3xl">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="mb-5 inline-flex items-center gap-2 border border-[var(--line-gold)] px-3 py-1.5"
              style={{ backgroundColor: "color-mix(in srgb, var(--obsidian-2) 80%, transparent)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span className="text-[0.5rem] font-bold uppercase tracking-[0.15em] text-[var(--gold)]">
                PSARA Act 2005 · Statutory Dossier Clearance
              </span>
            </div>

            {/* Main heading with word-blur reveal (Luke-inspired) */}
            <h1
              ref={titleRef}
              className="text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-[var(--cream)]"
              style={{ fontFamily: "var(--font-display)", maxWidth: "42rem" }}
            >
              PSARA License Clearance Across India.
            </h1>

            {/* Lead text */}
            <p className="mt-5 max-w-xl text-[0.95rem] font-medium leading-relaxed text-[var(--text-muted)]">
              {SITE.name} prepares rejection-free Controlling Authority dossiers — entity objects,
              training institute MOU, police antecedent verification, and inspection readiness across 28 States.
            </p>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap gap-4 items-center">
              <MagneticButton as="a" href="#contact" className="btn-gold" data-cursor="Start">
                Start Consultation
                <ChevronRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                data-cursor="WhatsApp"
              >
                <MessageSquare className="h-4 w-4 text-[var(--gold)]" />
                WhatsApp Desk
              </MagneticButton>

              {onOpenQuiz && (
                <button
                  type="button"
                  onClick={onOpenQuiz}
                  className="group flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-[var(--gold)] hover:gap-2 transition-all"
                >
                  60-Sec Readiness Check
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom: Brand mark seal + scroll indicator ── */}
        <div className="flex items-center justify-between pb-4 mt-8">
          <div
            className="inline-flex items-center gap-3 border border-[var(--line-gold)] px-5 py-2"
            style={{ backgroundColor: "color-mix(in srgb, var(--espresso) 90%, transparent)" }}
          >
            <BrandMark />
          </div>
          <div className="scroll-indicator flex items-center gap-2 text-[0.5rem] font-bold uppercase tracking-widest text-[var(--text-faint)]">
            <span className="w-6 h-px bg-[var(--text-faint)]" />
            Scroll
          </div>
        </div>
      </div>
    </section>
  );
}
