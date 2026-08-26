"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../../../app/lib/motion";
import FloatProps, { PROPS } from "../ui/FloatProps";

export default function StatementInterstitial() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const root = rootRef.current;

    const ctx = gsap.context(() => {
      const words = root.querySelectorAll<HTMLElement>("[data-statement-word]");
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      const lines = root.querySelectorAll("[data-statement-line]");
      gsap.fromTo(
        lines,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
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
      className="relative min-h-[75dvh] flex flex-col items-center justify-center bg-[#080714] text-white overflow-hidden py-24 border-y border-white/10"
      data-parallax-root
    >
      {/* Ambient background glow — plum authority */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 48% at 50% 42%, rgba(88,33,199,0.28) 0%, rgba(212,175,55,0.10) 45%, transparent 72%)",
          }}
        />
      </div>

      <FloatProps slots={PROPS.statement} />

      {/* Statement text */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-14 text-center">
        <div data-statement-line className="overflow-hidden mb-3">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5D061]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Statutory Reality
          </p>
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span data-statement-line className="overflow-hidden inline-block">
            <span data-statement-word className="inline-block">
              Every day
            </span>
          </span>
          <br />
          <span data-statement-line className="overflow-hidden inline-block">
            <span className="gold-text-gradient inline-block" data-statement-word>
              without a licence
            </span>
          </span>
          <br />
          <span data-statement-line className="overflow-hidden inline-block">
            <span data-statement-word className="inline-block">
              is a risk.
            </span>
          </span>
        </h2>

        <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
          <span className="hidden h-0.5 w-16 shrink-0 bg-[#D4AF37]" />
          <p
            className="max-w-md text-sm font-normal leading-relaxed text-[#E2E8F0] md:text-base"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Operating a security agency without PSARA registration is a cognizable statutory offence under the Private Security Agencies (Regulation) Act, 2005.
          </p>
          <span className="hidden h-0.5 w-16 shrink-0 bg-[#D4AF37]" />
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F5D061]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span>500+ LICENSES GRANTED</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />
          <span>28 STATES COVERED</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]" />
          <span>10+ YEARS DISCIPLINE</span>
        </div>
      </div>
    </section>
  );
}
