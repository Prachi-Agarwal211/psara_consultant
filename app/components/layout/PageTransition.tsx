"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ensureGsap, prefersReducedMotion } from "../../lib/motion";

/**
 * GSAP route entrance layered beneath the native View Transition wrapper.
 * Native transitions provide cross-route continuity; this timeline gives
 * every route family the same clipped, editorial landing motion.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { autoAlpha: 0.75, y: 34, clipPath: "inset(9% 0 0 0 round 1.5rem 1.5rem 0 0)" },
        { autoAlpha: 1, y: 0, clipPath: "inset(0% 0 0 0 round 0rem)", duration: 0.85, ease: "power3.out", clearProps: "clipPath,transform,opacity,visibility" },
      );
    }, root);
    return () => ctx.revert();
  }, [pathname]);

  return <div ref={rootRef} data-route-stage className="min-h-full w-full">{children}</div>;
}
