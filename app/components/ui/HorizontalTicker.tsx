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
    <div className={`relative overflow-hidden bg-[#0A233F] py-4 border-y border-[#C89B3C]/30 ${className}`} aria-hidden>
      <div
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap will-change-transform"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-[clamp(1.2rem,2.5vw,2rem)] font-black uppercase tracking-[0.14em]"
            style={{ color: i % 2 === 0 ? "#FFF2BA" : "#C89B3C" }}
          >
            {item}
            <span className="mx-6 text-[#78A2D2]">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
