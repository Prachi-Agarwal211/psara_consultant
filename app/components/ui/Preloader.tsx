"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ensureGsap } from "../../lib/gsap";

const noopSubscribe = () => () => {};

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  // SSR-safe skip check: seen before, or reduced motion → never mount the counter.
  const skip = useSyncExternalStore(
    noopSubscribe,
    () =>
      Boolean(sessionStorage.getItem("pl-seen")) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (skip) {
      document.dispatchEvent(new CustomEvent("preloader:done"));
      return;
    }
    sessionStorage.setItem("pl-seen", "1");
    document.body.style.overflow = "hidden";

    const { gsap } = ensureGsap();
    const obj = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
        document.dispatchEvent(new CustomEvent("preloader:done"));
      },
    });
    tl.to(obj, {
      n: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.n)).padStart(3, "0");
      },
    })
      .to(".pre-inner", { yPercent: -40, opacity: 0, duration: 0.45, ease: "power3.in" }, "+=0.25")
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<0.15");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [skip]);

  if (skip || done) return null;
  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex items-end p-[clamp(1.4rem,5vw,4rem)] bg-[#0a0614]"
      aria-hidden
      style={{ willChange: "transform" }}
    >
      <div className="pre-inner grid gap-1">
        <span ref={numRef} className="font-bold text-[clamp(4rem,12vw,9rem)] leading-none text-[#D4AF37] tabular-nums" style={{ fontFamily: "var(--font-display)" }}>
          000
        </span>
        <span className="text-xs tracking-[0.28em] uppercase text-white/60">PSARA Consultant India</span>
      </div>
    </div>
  );
}
