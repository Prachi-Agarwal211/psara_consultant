"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";

export default function Philosophy() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      const lines = rootRef.current?.querySelectorAll(".t-line-inner");
      if (lines?.length) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.10,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
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
      id="philosophy"
      className="py-24 md:py-36 px-[var(--gutter)]"
      style={{
        backgroundColor: "var(--obsidian)",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(0,71,255,0.05) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="max-w-[var(--page-max)] mx-auto relative">
        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className="w-5 h-px"
            style={{ backgroundColor: "var(--blue)" }}
          />
          <span
            className="text-[0.58rem] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--blue-bright)" }}
          >
            STATUTORY PHILOSOPHY
          </span>
        </div>

        {/* Kinetic 3-line heading */}
        <div className="flex flex-col gap-1.5">
          {/* Line 1 */}
          <div className="overflow-hidden flex items-baseline gap-5 flex-wrap">
            <div className="overflow-hidden">
              <h2
                className="t-line-inner font-extrabold tracking-tighter uppercase leading-[0.88]"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 7rem)",
                  fontFamily: "var(--font-display)",
                  color: "var(--white)",
                }}
              >
                PROCURING
              </h2>
            </div>
            <span
              className="text-[0.52rem] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border shrink-0 self-center"
              style={{
                color: "var(--white-50)",
                borderColor: "var(--line-strong)",
                backgroundColor: "var(--obsidian-lift)",
              }}
            >
              01 PURPOSEFUL COMPLIANCE
            </span>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden flex items-baseline gap-5 flex-wrap">
            <div className="overflow-hidden">
              <h2
                className="t-line-inner font-extrabold tracking-tighter uppercase leading-[0.88]"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 7rem)",
                  fontFamily: "var(--font-display)",
                  color: "var(--white)",
                }}
              >
                STATUTORY
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="t-line-inner font-extrabold tracking-tighter uppercase leading-[0.88]"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 7rem)",
                  fontFamily: "var(--font-display)",
                  color: "var(--blue)",
                  textShadow: "0 0 40px var(--blue-glow)",
                }}
              >
                LICENCES
              </h2>
            </div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden flex items-baseline gap-5 flex-wrap">
            <span
              className="text-[0.52rem] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border shrink-0 self-center"
              style={{
                color: "var(--gold)",
                borderColor: "var(--gold-glow)",
                backgroundColor: "rgba(212,175,55,0.06)",
              }}
            >
              PAN-INDIA · 28 STATES
            </span>
            <div className="overflow-hidden">
              <h2
                className="t-line-inner font-extrabold tracking-tighter uppercase leading-[0.88]"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 7rem)",
                  fontFamily: "var(--font-display)",
                  color: "var(--white)",
                }}
              >
                ACROSS INDIA
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom narrative */}
        <div
          className="mt-14 pt-8 grid md:grid-cols-12 gap-6 items-center"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p
            className="md:col-span-8 text-base font-medium leading-relaxed"
            style={{ color: "var(--white-60)" }}
          >
            Every Controlling Authority filing is engineered against official State Rules, mandatory training MOUs,
            and promoter antecedents — eliminating rejection risk and post-grant non-compliance.
          </p>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <span
              className="text-[0.62rem] font-bold uppercase tracking-widest"
              style={{ color: "var(--white-30)" }}
            >
              REGISTRATION · RENEWAL · ADVISORY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
