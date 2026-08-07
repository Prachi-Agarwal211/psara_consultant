"use client";

import { useEffect, useRef } from "react";
import { initMarquee, prefersReducedMotion } from "../../lib/motion";

export default function HorizontalTicker({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion()) return;
    initMarquee(trackRef.current, 48);
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden py-6 ${className}`} aria-hidden>
      <div
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap will-change-transform"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[clamp(1.4rem,3vw,2.4rem)] font-semibold uppercase tracking-[0.08em]"
            style={{ color: i % 2 === 0 ? "var(--white-25)" : "var(--gold-dim)" }}
          >
            {item}
            <span className="mx-6" style={{ color: "var(--electric)" }}>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
