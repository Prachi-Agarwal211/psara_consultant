"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "../../lib/gsap";

const states = [
  "Rajasthan",
  "Delhi",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Gujarat",
  "Maharashtra",
  "Haryana",
  "Punjab",
  "Uttarakhand",
  "Bihar",
  "West Bengal",
  "Odisha",
  "Chhattisgarh",
  "Andhra Pradesh",
  "Telangana",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Jharkhand",
  "Assam",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Chandigarh",
  "Goa",
  "Puducherry",
  "Ladakh",
  "Sikkim",
  "Manipur",
];

export default function TickerMarquee() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current!.querySelector(".ticker-track"),
        { xPercent: 0 },
        { xPercent: -50, ease: "none", duration: 35, repeat: -1 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="ticker-band relative overflow-hidden py-3"
    >
      {/* Gold vertical gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(201, 148, 91, 0.06) 30%, rgba(201, 148, 91, 0.04) 60%, transparent 100%)",
        }}
      />

      <div
        className="ticker-track"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 2%, black 8%, black 92%, transparent 98%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 2%, black 8%, black 92%, transparent 98%)",
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...Array(2)].map((_, loop) => (
          <div key={loop} className="flex items-center" style={{ gap: "2rem" }}>
            <span className="ticker-item ticker-item--gold">
              PSARA License Clearance
            </span>
            <span className="ticker-separator" />
            {states.map((state, i) => (
              <span key={state + i} className="flex items-center" style={{ gap: "2rem" }}>
                <span className={`ticker-item ${i % 3 === 0 ? "ticker-item--gold" : ""}`}>
                  {state}
                </span>
                <span className="ticker-separator" />
              </span>
            ))}
            <span className="ticker-item ticker-item--gold">
              Apply Now
            </span>
            <span className="ticker-separator" />
          </div>
        ))}
      </div>
    </section>
  );
}
