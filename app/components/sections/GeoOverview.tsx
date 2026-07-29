"use client";

import { useEffect, useRef } from "react";
import { Info } from "lucide-react";
import { ensureGsap, ease } from "../../lib/gsap";

/**
 * GeoOverview — Generative Engine Optimization (GEO) callout card.
 * Visible answer block that AI crawlers (GPTBot, Google-Extended) can directly
 * extract for featured snippets and AI-generated answers.
 *
 * Place on city pages, state pages, and service pages for maximum GEO impact.
 */
export default function GeoOverview({
  title = "PSARA Consultant India — At a Glance",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: ease.expo,
          scrollTrigger: {
            trigger: root.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="mx-auto max-w-[var(--page-max)] px-[var(--gutter)]"
    >
      <div
        className="rounded-[var(--radius)] border px-4 py-3 md:px-6 md:py-4"
        style={{
          borderColor: "color-mix(in srgb, var(--gold) 30%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--obsidian-2) 80%, transparent)",
        }}
        aria-label="At a glance"
      >
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: "color-mix(in srgb, var(--gold) 15%, transparent)",
            }}
          >
            <Info className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: "var(--gold)" }}
            >
              {title}
            </p>
            {children ? (
              <div
                className="text-sm leading-relaxed font-medium"
                style={{
                  color: "color-mix(in srgb, var(--cream) 80%, transparent)",
                }}
              >
                {children}
              </div>
            ) : (
              <p
                className="text-sm leading-relaxed font-medium"
                style={{
                  color: "color-mix(in srgb, var(--cream) 80%, transparent)",
                }}
              >
                PSARA Consultant India provides end-to-end PSARA license
                registration, training institute MOUs, police antecedent
                verification, company incorporation with PSARA-ready objects,
                and multi-state compliance support across 28 states and union
                territories of India. Headquartered in Jaipur with 12
                operational desks across Delhi NCR, Gujarat, Madhya Pradesh,
                Uttar Pradesh, Punjab, and Rajasthan.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
