"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";

export function Parallax({
  children,
  amount = 8,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return; // ponytail: no parallax on mobile viewport
    const { gsap } = ensureGsap();
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("[data-parallax-root]") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
