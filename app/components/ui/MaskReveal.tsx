"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "../../lib/gsap";

type Direction = "up" | "down" | "left" | "right" | "center";

const INSETS: Record<Direction, { from: string; to: string }> = {
  left: { from: "inset(0% 100% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  right: { from: "inset(0% 0% 0% 100%)", to: "inset(0% 0% 0% 0%)" },
  up: { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  down: { from: "inset(0% 0% 100% 0%)", to: "inset(0% 0% 0% 0%)" },
  center: { from: "inset(50% 50% 50% 50%)", to: "inset(0% 0% 0% 0%)" },
};

export function MaskReveal({
  children,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const el = ref.current;
    const insets = INSETS[direction];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: insets.from, opacity: 0.98 },
        {
          clipPath: insets.to,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true, toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={ref} className={className} style={{ willChange: "clip-path, opacity" }}>
      {children}
    </div>
  );
}
