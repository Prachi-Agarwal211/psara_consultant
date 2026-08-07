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
      className="relative min-h-[85dvh] flex flex-col items-center justify-center section-night overflow-hidden py-[var(--section-y)]"
      data-parallax-root
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,184,114,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Statement text */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-14 text-center">
        <div data-statement-line className="overflow-hidden mb-2">
          <p
            className="text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[var(--gold)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Compliance Gap
          </p>
        </div>

        <h2
          className="display-mega text-white leading-[0.95] font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span data-statement-line className="overflow-hidden inline-block">
            <span data-statement-word className="inline-block">
              Every day
            </span>
          </span>
          <br />
          <span data-statement-line className="overflow-hidden inline-block">
            <span className="text-metal inline-block" data-statement-word>
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
          <span className="accent-line-gold w-16" />
          <p
            className="text-sm md:text-base text-white/50 max-w-md leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Operating without PSARA compliance isn&apos;t just risky — it&apos;s a criminal offense under the Private Security Agencies Act, 2005.
          </p>
          <span className="accent-line-gold w-16" />
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "var(--font-body)" }}>
          <span>300+</span>
          <span className="w-1 h-1 rounded-full bg-[var(--gold)]/40" />
          <span>28 States</span>
          <span className="w-1 h-1 rounded-full bg-[var(--gold)]/40" />
          <span>10+ Years</span>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[0.5rem] uppercase tracking-[0.3em]">Continue</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
