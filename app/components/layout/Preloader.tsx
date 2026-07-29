"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  // Three digit refs for per-digit flip animation (hundreds, tens, units)
  const d1Ref = useRef<HTMLSpanElement | null>(null);
  const d2Ref = useRef<HTMLSpanElement | null>(null);
  const d3Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Session check so preloader only runs on first load of session
    if (sessionStorage.getItem("psara_preloader_done")) {
      setComplete(true);
      return;
    }

    if (prefersReducedMotion()) {
      sessionStorage.setItem("psara_preloader_done", "true");
      setComplete(true);
      return;
    }

    // Voyeur-inspired scroll-lock
    const lockStyle = document.createElement("style");
    lockStyle.id = "preloader-scroll-lock";
    lockStyle.textContent =
      "html { overflow: hidden; touch-action: none; contain: paint; }";
    document.head.appendChild(lockStyle);

    const { gsap } = ensureGsap();
    const chars = textRef.current?.querySelectorAll(".loader-char");
    const digitRefs = [d1Ref.current, d2Ref.current, d3Ref.current];

    // Track last digit values for flip detection
    let lastDigits = [0, 0, 0];

    // GSAP-driven counter — 60fps, smooth bezier, no interval
    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => {
        const p = Math.min(Math.round(counterObj.val), 100);
        const digits = String(p).padStart(3, "0").split("").map(Number);

        // Per-digit update with GSAP flip animation (scale pulse + color flash)
        digitRefs.forEach((ref, i) => {
          if (!ref) return;
          const newDigit = digits[i] ?? 0;
          if (newDigit !== lastDigits[i]) {
            ref.textContent = String(newDigit);
            gsap.fromTo(
              ref,
              { scale: 1.15 },
              { scale: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" }
            );
            lastDigits[i] = newDigit;
          }
        });

        // Progress bar — GSAP handles the smoothness
        if (barRef.current) {
          barRef.current.style.width = `${p}%`;
        }
      },
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("psara_preloader_done", "true");
          document.getElementById("preloader-scroll-lock")?.remove();
          setComplete(true);
        },
      });

      if (chars && chars.length > 0) {
        // PSARA character reveal starts when counter is ~20% done (0.36s in)
        tl.fromTo(
          chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.075,
            ease: "power3.out",
          },
          "+=0.35"
        )
          .to(
            ".loader-dot",
            {
              scale: 1.3,
              duration: 0.3,
              repeat: 1,
              yoyo: true,
              ease: "power1.inOut",
            },
            "-=0.15"
          )
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.inOut",
          });
      } else {
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          delay: 0.6,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      // Kill any GSAP tweens on this component
      gsap.killTweensOf(counterObj);
      document.getElementById("preloader-scroll-lock")?.remove();
    };
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--obsidian)] text-[var(--cream)]"
    >
      {/* Percentage counter — digit-by-digit with flip animation */}
      <div className="flex items-baseline gap-1 mb-6">
        <div className="flex gap-0.5 overflow-hidden">
          <span
            ref={d1Ref}
            className="inline-block font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,6rem)] font-bold text-[var(--gold)] leading-none tabular-nums will-change-transform"
          >
            0
          </span>
          <span
            ref={d2Ref}
            className="inline-block font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,6rem)] font-bold text-[var(--gold)] leading-none tabular-nums will-change-transform"
          >
            0
          </span>
          <span
            ref={d3Ref}
            className="inline-block font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,6rem)] font-bold text-[var(--gold)] leading-none tabular-nums will-change-transform"
          >
            0
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]/50">
          %
        </span>
      </div>

      {/* PSARA letter animation */}
      <div
        ref={textRef}
        className="flex items-center gap-1 font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,9rem)] font-bold tracking-widest uppercase select-none"
      >
        <span className="loader-char inline-block">P</span>
        <span className="loader-char inline-block">S</span>
        <span className="loader-char inline-block">A</span>
        <span className="loader-char inline-block">R</span>
        <span className="loader-char inline-block">A</span>
        <span className="loader-dot inline-block text-[var(--gold)] ml-1">.</span>
      </div>

      {/* Tagline */}
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cream)]/30">
        Statute-First · Verification-Ready
      </p>

      {/* Bottom gold progress bar — driven by GSAP, no CSS transition */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--gold)]"
        style={{ width: "0%" }}
      />
    </div>
  );
}
