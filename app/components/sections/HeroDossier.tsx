"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRight, MessageSquare } from "lucide-react";
import BrandMark from "../ui/BrandMark";
import MagneticButton from "../ui/MagneticButton";
import CornerOrnament from "../ui/CornerOrnament";
import { SITE } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { ensureGsap, ease, prefersReducedMotion, splitWords, dossierStampReveal } from "../../lib/gsap";

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
      className="chr-hover text-xs font-bold uppercase tracking-widest text-[var(--cream)]/70 hover:text-[var(--gold)]"
      data-cursor={label}
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

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (!reduced && badgeRef.current) {
        dossierStampReveal(badgeRef.current);
      }

      if (!reduced && titleRef.current) {
        const words = splitWords(titleRef.current);
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.07, ease: ease.cinematic, delay: 0.2 }
        );
      }

      if (!reduced) {
        gsap.fromTo(
          ".hero-content > *:not(h1)",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: ease.expo, delay: 0.35 }
        );
        gsap.fromTo(
          ".hero-nav a",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.06, ease: ease.expo, delay: 0.3 }
        );
      }

      if (!reduced && imgWrap.current) {
        gsap.to(imgWrap.current, {
          scale: 1.1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.75,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--obsidian)] text-[var(--cream)]"
    >
      {/* Decorative background ghost text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <div
          className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none whitespace-nowrap tracking-tight"
          style={{
            fontFamily: "var(--font-accent)",
            color: "color-mix(in srgb, var(--gold, #e0b84a) 8%, transparent)",
          }}
        >
          PSARA<br/>CLEARANCE<br/>ACROSS INDIA
        </div>
      </div>

      <div ref={imgWrap} className="absolute inset-0 origin-center will-change-transform pointer-events-none">
        <Image
          src="/assets/images/hero-security-guard.jpg"
          alt="PSARA License Consultant India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%] opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, var(--obsidian) 0%, rgba(10, 22, 40, 0.75) 50%, var(--obsidian) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(224, 184, 74, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--page-max)] flex-col justify-between px-[var(--gutter)] py-8">
        <div className="grid h-full grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left Vertical Dossier Navigation Index — with Jasmine-style corner ornaments */}
          <aside className="hero-nav hidden lg:flex flex-col justify-center border-r border-[var(--line-gold)] pr-8 lg:col-span-3 space-y-5 relative mix-difference">
            {/* Corner ornaments */}
            <CornerOrnament position="tl" size="sm" />
            <CornerOrnament position="bl" size="sm" />

            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] mb-2 flex items-center gap-2">
              <span className="h-px w-4 bg-[var(--gold)]"></span>
              Dossier Cover Index
              <span className="h-px w-4 bg-[var(--gold)]"></span>
            </p>
            {navLinks.map((item, i) => (
              <div key={item.href} className="flex items-center gap-3 group">
                <span className="num-marker num-marker-sm text-[0.6rem] transition-colors group-hover:text-[var(--gold)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ChrHoverNav href={item.href} label={item.label} />
              </div>
            ))}
          </aside>

          {/* Right Dossier Cover Header */}
          <div className="hero-content lg:col-span-9 lg:pl-10 max-w-2xl">
            <div
              ref={badgeRef}
              className="mb-4 inline-flex items-center gap-2 rounded border border-[var(--line-gold)] bg-[var(--obsidian-2)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--gold)]"
            >
              <span>PSARA Act 2005 Statutory Dossier Clearance</span>
            </div>

            <h1 ref={titleRef} className="display-hero text-[var(--cream)] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mix-difference">
              PSARA License <span className="text-[var(--gold)]">Clearance Across India.</span>
            </h1>

            <p className="body-copy mt-4 text-[var(--cream-warm)] text-sm md:text-base leading-relaxed">
              {SITE.name} prepares rejection-free Controlling Authority dossiers — entity objects,
              training institute MOU, police antecedent verification, and inspection readiness across 28 States.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
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
                  className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] hover:underline ml-2"
                  data-cursor="Quiz"
                >
                  60-Sec Readiness Check →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Centered Embossed Brandmark Seal */}
        <div className="flex justify-center pb-4">
          <div className="rounded border border-[var(--line-gold)] bg-[var(--obsidian)]/90 px-6 py-2 shadow-lg">
            <BrandMark />
          </div>
        </div>
      </div>
    </section>
  );
}
