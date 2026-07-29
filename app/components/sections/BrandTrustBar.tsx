"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Award, FileCheck, Building2, Star, BadgeCheck } from "lucide-react";
import { ensureGsap, ease } from "../../lib/gsap";
import { GOOGLE_REVIEWS } from "../../../lib/config";

const badges = [
  {
    icon: ShieldCheck,
    label: "PSARA Licensed",
    sub: "Controlling Authority Compliant",
    color: "var(--gold)",
  },
  {
    icon: Award,
    label: "10+ Years",
    sub: "PSARA Statutory Expertise",
    color: "var(--sky)",
  },
  {
    icon: FileCheck,
    label: "500+ Licenses",
    sub: "100% Grant Success Rate",
    color: "var(--emerald)",
  },
  {
    icon: Building2,
    label: "12 Offices",
    sub: "Pan-India Desk Network",
    color: "var(--sapphire)",
  },
  {
    icon: BadgeCheck,
    label: "28 States & UTs",
    sub: "Multi-State Filing Capability",
    color: "var(--teal)",
  },
  {
    icon: Star,
    label: `${GOOGLE_REVIEWS.ratingLabel}`,
    sub: `${GOOGLE_REVIEWS.reviewCount} Google Reviews`,
    color: "var(--gold)",
  },
];

export default function BrandTrustBar() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const items = root.current!.querySelectorAll("[data-trust-item]");
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: ease.expo,
            scrollTrigger: {
              trigger: root.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative border-y border-[var(--line-gold)] py-4 md:py-5"
      style={{
        backgroundColor: "color-mix(in srgb, var(--obsidian) 98%, var(--gold))",
      }}
      aria-label="Trust badges and certifications"
    >
      <div className="mx-auto max-w-[var(--page-max)] px-[var(--gutter)]">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                data-trust-item
                className="flex items-center gap-2.5"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${badge.color} 15%, transparent)`,
                  }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: badge.color }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-bold leading-tight"
                    style={{ color: "var(--cream)" }}
                  >
                    {badge.label}
                  </p>
                  <p
                    className="text-[10px] font-medium leading-tight"
                    style={{
                      color: "color-mix(in srgb, var(--cream) 55%, transparent)",
                    }}
                  >
                    {badge.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
