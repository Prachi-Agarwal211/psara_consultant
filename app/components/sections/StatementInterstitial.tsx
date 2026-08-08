"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../../../app/lib/motion";

/**
 * Interstitial typographic statement — full-screen dramatic text reveal
 * Inspired by: meech213, horeca-social "LET'S GO VIRAL" energy
 */
export default function StatementInterstitial() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const root = rootRef.current;

    const ctx = gsap.context(() => {
      // Each word/line gets a clip reveal + blur entrance
      const words = root.querySelectorAll<HTMLElement>("[data-statement-word]");
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 60,
          filter: "blur(12px)",
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Line-by-line reveal
      const lines = root.querySelectorAll("[data-statement-line]");
      gsap.fromTo(
        lines,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[85dvh] flex flex-col items-center justify-center bg-gradient-to-b from-[#0A233F] via-[#0F3C65] to-[#07192C] text-white overflow-hidden py-24"
      data-parallax-root
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
        <div className="absolute inset-0 bg-[#C89B3C] blur-3xl" />
      </div>

      {/* Statement text */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-14 text-center">
        <div data-statement-line className="overflow-hidden mb-2">
          <p
            className="text-xs font-black uppercase tracking-[0.35em] text-[#FFF2BA]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Compliance Risk
          </p>
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span data-statement-line className="overflow-hidden inline-block">
            <span data-statement-word className="inline-block">
              Every day
            </span>
          </span>
          <br />
          <span data-statement-line className="overflow-hidden inline-block">
            <span className="text-[#FFF2BA] inline-block" data-statement-word>
              without
            </span>
          </span>
          <br />
          <span data-statement-line className="overflow-hidden inline-block">
            <span data-statement-word className="inline-block">
              a licence
            </span>
          </span>
        </h2>

        <div className="mt-8 flex items-center justify-center gap-6">
          <span className="h-0.5 w-16 bg-[#C89B3C]" />
          <p
            className="text-sm md:text-base text-slate-200 max-w-md leading-relaxed font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Operating without PSARA compliance isn&apos;t just risky — it&apos;s a criminal offense under the Private Security Agencies Act, 2005.
          </p>
          <span className="h-0.5 w-16 bg-[#C89B3C]" />
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-[#FFF2BA]" style={{ fontFamily: "var(--font-body)" }}>
          <span>500+ LICENSES</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
          <span>28 STATES</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
          <span>10+ YEARS</span>
        </div>
      </div>
    </section>
  );
}
