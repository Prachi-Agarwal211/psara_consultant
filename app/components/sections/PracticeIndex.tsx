"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Building2, FileCheck, Users, RefreshCw } from "lucide-react";
import { SERVICES, Service } from "../../../data/services";

const serviceIcons: Record<string, React.ReactNode> = {
  "psara-license": <ShieldCheck className="w-5 h-5 text-[var(--amber)]" />,
  "company-registration": <Building2 className="w-5 h-5 text-[var(--amber)]" />,
  "gst-registration": <FileCheck className="w-5 h-5 text-[var(--amber)]" />,
  "training-mou": <Users className="w-5 h-5 text-[var(--amber)]" />,
  "license-renewal": <RefreshCw className="w-5 h-5 text-[var(--amber)]" />,
};

/**
 * Jasmine Gunarto-inspired Abstract Practice Index (Featured Services)
 * Features: Minimal borderless cards with data-parallax, hover previews,
 * numbered list markers (01, 02), and tag labels.
 */
export default function PracticeIndex() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-[var(--gutter)] theme-obsidian-dark border-b border-[var(--line-dark)]"
    >
      <div className="max-w-[var(--page-max)] mx-auto">
        {/* Header Marquee Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--amber)] mb-2">
              <span>STATUTORY PRACTICE</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white uppercase">
              FEATURED SERVICES
            </h2>
          </div>

          <div className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
            <span className="px-2.5 py-1 rounded border border-white/20 text-white">
              CONCEPTUAL
            </span>
            <span className="px-2.5 py-1 rounded border border-white/20 text-white">
              STATUTE-FIRST
            </span>
            <span className="px-2.5 py-1 rounded border border-white/20 text-white">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Cards Grid — Jasmine Featured Works Style */}
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((s: Service, idx: number) => {
            const num = (idx + 1).toString().padStart(2, "0");
            const isHovered = hoveredSlug === s.slug;

            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-cursor="View Service"
                onMouseEnter={() => setHoveredSlug(s.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="group relative block p-8 rounded-lg border border-white/10 bg-[var(--obsidian-card)] hover:border-[var(--amber)] transition-all duration-300 overflow-hidden"
              >
                {/* Background Ambient Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[var(--amber)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : ""
                  }`}
                />

                {/* Top Row: Number & Icon */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--amber)]">
                    {num}
                  </span>
                  <div className="p-2.5 rounded bg-white/5 border border-white/10">
                    {serviceIcons[s.slug] || <ShieldCheck className="w-5 h-5 text-[var(--amber)]" />}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="relative z-10 font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white group-hover:text-[var(--amber)] transition-colors mb-3">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-sm font-medium text-white/60 leading-relaxed mb-8 line-clamp-2">
                  {s.short}
                </p>

                {/* Bottom Row: Tags & CTA Arrow */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[0.55rem] font-bold uppercase tracking-wider text-white/40">
                    <span>STATUTORY DOSSIER</span>
                    <span>·</span>
                    <span>PAN-INDIA</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--amber)] group-hover:translate-x-1 transition-transform">
                    Explore
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            data-cursor="All Services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-white text-[var(--obsidian-bg)] font-bold text-xs uppercase tracking-widest hover:bg-[var(--amber)] transition-colors duration-300"
          >
            See All Statutory Practice Areas
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
