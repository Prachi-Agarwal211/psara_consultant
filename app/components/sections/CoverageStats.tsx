"use client";

import { useEffect, useRef } from "react";
import { Shield, MapPin, Building2, Award, Users, Globe } from "lucide-react";
import CornerOrnament from "../ui/CornerOrnament";
import { counterStampAnimation, ensureGsap, ease } from "../../lib/gsap";
import { SITE } from "../../../lib/config";

type StatItem = {
  icon: typeof Shield;
  target: number;
  suffix: string;
  label: string;
  sub: string;
};

const defaultStats: StatItem[] = [
  {
    icon: Shield,
    target: 10,
    suffix: "+ Years",
    label: "PSARA Expertise",
    sub: "Statutory filing experience",
  },
  {
    icon: Award,
    target: 500,
    suffix: "+",
    label: "Licenses Issued",
    sub: "100% grant success rate",
  },
  {
    icon: MapPin,
    target: 28,
    suffix: " States",
    label: "Pan-India Coverage",
    sub: "All states & union territories",
  },
  {
    icon: Building2,
    target: 12,
    suffix: " Offices",
    label: "Physical Presence",
    sub: "Real desks across India",
  },
  {
    icon: Users,
    target: 300,
    suffix: "+",
    label: "Agencies Supported",
    sub: "From startups to enterprises",
  },
  {
    icon: Globe,
    target: 200,
    suffix: "+",
    label: "City Pages",
    sub: "State-wise guidance",
  },
];

type Props = {
  stats?: StatItem[];
  columns?: 3 | 4 | 6;
  variant?: "dark" | "light" | "gold";
  className?: string;
};

export default function CoverageStats({
  stats = defaultStats,
  columns = 6,
  variant = "dark",
  className = "",
}: Props) {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    counterStampAnimation(root.current, "[data-count]");

    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const items = root.current!.querySelectorAll("[data-stat-card]");
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: ease.expo,
            scrollTrigger: {
              trigger: root.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  const gridCols = {
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const bgClass =
    variant === "light"
      ? "bg-[var(--paper)]"
      : variant === "gold"
      ? "bg-[var(--gold)]"
      : "bg-[var(--obsidian-2)]";

  const textClass =
    variant === "light"
      ? "text-[var(--ink)]"
      : variant === "gold"
      ? "text-[var(--obsidian)]"
      : "text-[var(--cream)]";

  const labelClass =
    variant === "light"
      ? "text-[var(--ink-muted)]"
      : variant === "gold"
      ? "text-[var(--obsidian)]"
      : "text-[var(--cream-dim)]";

  return (
    <section
      ref={root}
      className={`relative border-y border-[var(--line-gold)] py-8 md:py-10 ${bgClass} ${className}`}
      aria-label="Coverage statistics"
    >
      <div className="mx-auto max-w-[var(--page-max)] px-[var(--gutter)]">
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                data-stat-card
                className="relative flex flex-col items-center text-center p-3"
              >
                <CornerOrnament position="tr" size="sm" opacity={0.25} />

                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--gold) 15%, transparent)`,
                  }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: "var(--gold)" }}
                    aria-hidden="true"
                  />
                </div>

                <span
                  data-count={stat.target}
                  data-suffix={stat.suffix}
                  className={`text-2xl md:text-3xl font-bold tracking-tight will-change-transform ${textClass}`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.target}
                  {stat.suffix}
                </span>

                <p className={`mt-1.5 text-xs font-bold uppercase tracking-wider ${textClass}`}>
                  {stat.label}
                </p>
                <p className={`mt-0.5 text-[10px] font-medium ${labelClass}`}>
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
