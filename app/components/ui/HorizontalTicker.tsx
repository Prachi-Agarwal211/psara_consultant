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
    <div className={`relative overflow-hidden bg-[#0F0C1F] py-4 border-y border-[rgba(212,175,55,0.22)] ${className}`} aria-hidden>
      <div
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap will-change-transform"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[clamp(1.2rem,2.5vw,2rem)] font-black uppercase tracking-[0.14em]"
            style={{ color: i % 2 === 0 ? "#FFF6D9" : "#D4AF37" }}
          >
            {item}
            <span className="mx-6 text-[#C89B3C]">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
