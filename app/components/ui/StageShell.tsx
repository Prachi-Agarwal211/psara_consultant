"use client";

/**
 * Shared page chrome for ALL routes:
 * continuous AmbientCanvas + transparent content + minimal footer.
 * Motion auto-init for data-* attributes.
 */

import { useEffect, useRef } from "react";
import AmbientCanvas from "./AmbientCanvas";
import SiteFooter from "../sections/SiteFooter";
import {
  initClipReveals,
  initParallaxLayers,
  initStaggerChildren,
  initFloatDrift,
  initVisualScrub,
  prefersReducedMotion,
  ensureGsap,
} from "../../lib/motion";

export default function StageShell({
  children,
  showFooter = true,
  /** When false, only ambient + footer (home owns its own GSAP) */
  autoMotion = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
  autoMotion?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!autoMotion || !rootRef.current || prefersReducedMotion()) return;
    const root = rootRef.current;
    const { ScrollTrigger } = ensureGsap();
    initClipReveals(root);
    initParallaxLayers(root);
    initStaggerChildren(root);
    initFloatDrift(root);
    initVisualScrub(root);

    // Re-measure trigger positions once async layout settles (hero images,
    // Google Business Profile iframes). Stale triggers make section reveals
    // fire at wrong scroll offsets — the cause of sections visibly bleeding
    // into each other while scrolling.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      ScrollTrigger.getAll().forEach((st) => {
        if (root.contains(st.trigger as Node)) st.kill();
      });
    };
  }, [autoMotion]);

  return (
    <div className="relative min-h-screen" style={{ color: "var(--white)", background: "transparent" }}>
      <AmbientCanvas />
      <div ref={rootRef} className="relative z-10">
        {children}
        {showFooter && <SiteFooter />}
      </div>
    </div>
  );
}
