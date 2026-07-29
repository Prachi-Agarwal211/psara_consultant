"use client";

import { useEffect, useState, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../app/lib/gsap";

/**
 * Jasmine Gunarto-inspired 3-digit Percentage Preloader Wheel (0% to 100%)
 * Features: 3-digit digit counter, smooth digit swapping, gold statutory badge,
 * and cinematic GSAP clip-path exit.
 */
export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setComplete(true);
      return;
    }

    const { gsap } = ensureGsap();
    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit clip-path animation
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.85,
            ease: "power4.inOut",
            onComplete: () => {
              setComplete(true);
            },
          });
        } else {
          setComplete(true);
        }
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        setPercent(Math.round(obj.val));
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (complete) return null;

  const d1 = Math.floor(percent / 100);
  const d2 = Math.floor((percent % 100) / 10);
  const d3 = percent % 10;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between p-8 md:p-12 text-[var(--cream)]"
      style={{
        backgroundColor: "var(--espresso, #0f0e0c)",
        willChange: "clip-path",
      }}
    >
      {/* Top Bar: Authority Header */}
      <div className="w-full flex items-center justify-between border-b border-[var(--line-gold)] pb-4 text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
          PSARA Consultant India
        </span>
        <span className="hidden sm:inline-block text-[var(--cream-dim)]">
          Ref: DOSSIER-2026-HQ
        </span>
      </div>

      {/* Center: 3-Digit Percentage Counter Wheel */}
      <div className="flex flex-col items-center my-auto">
        <div className="relative flex items-center gap-1 font-[family-name:var(--font-display)] text-7xl sm:text-9xl font-extrabold tracking-tighter text-[var(--gold)]">
          {/* Digit 1 */}
          <div className="relative h-[1em] w-[0.65em] overflow-hidden text-center">
            <span className="block transition-transform duration-200">
              {d1}
            </span>
          </div>

          {/* Digit 2 */}
          <div className="relative h-[1em] w-[0.65em] overflow-hidden text-center">
            <span className="block transition-transform duration-200">
              {d2}
            </span>
          </div>

          {/* Digit 3 */}
          <div className="relative h-[1em] w-[0.65em] overflow-hidden text-center">
            <span className="block transition-transform duration-200">
              {d3}
            </span>
          </div>

          <span className="text-3xl sm:text-5xl text-[var(--gold-soft)] font-light ml-1">
            %
          </span>
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[var(--cream-dim)]">
          Initializing Statutory Dossier
        </p>
      </div>

      {/* Bottom Bar: Coordinates */}
      <div className="w-full flex items-center justify-between border-t border-[var(--line)] pt-4 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--cream-dim)]">
        <span>JAIPUR HQ · 26.9124° N, 75.7873° E</span>
        <span>Securing Compliance</span>
      </div>
    </div>
  );
}
