"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Globe,
  Building2,
  Scale,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  MessageSquare,
} from "lucide-react";
import { SERVICES } from "../../../data/services";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { MaskReveal } from "../ui/MaskReveal";
import { TiltCard } from "../ui/TiltCard";
import { ServicesPinnedHorizontal } from "./ServicesSection.pinned";

const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "licensing", label: "Licensing & Grants" },
  { id: "training", label: "Training & Verification" },
  { id: "compliance", label: "Compliance & Audits" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

function getServiceIcon(slug: string) {
  switch (slug) {
    case "psara-license":
      return ShieldCheck;
    case "psara-training-mou":
      return BookOpen;
    case "police-verification-clearance":
      return BadgeCheck;
    case "multi-state-psara-license":
      return Globe;
    case "psara-license-renewal":
      return Scale;
    case "security-agency-incorporation":
      return Building2;
    default:
      return Award;
  }
}

function getCategory(slug: string): CategoryId {
  if (slug.includes("training") || slug.includes("verification") || slug.includes("police")) {
    return "training";
  }
  if (slug.includes("incorporation") || slug.includes("renewal") || slug.includes("multi-state") || slug.includes("license")) {
    return "licensing";
  }
  return "compliance";
}

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === "all") return true;
    return getCategory(s.slug) === activeCategory;
  });

  const visibleServices = showAll ? filteredServices : filteredServices.slice(0, 6);
  const hasMore = filteredServices.length > 6;

  const handleCategoryChange = (catId: CategoryId) => {
    setActiveCategory(catId);
    setShowAll(false);
  };

  return (
    <section id="services" className="section-atmosphere relative bg-[#050B14] text-white border-b border-white/10">
      {/* Pinned horizontal showcase — statutory core, scroll to explore (lg only) */}
      <ServicesPinnedHorizontal />

      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12 py-20 lg:py-28">
        {/* Section Header — MaskReveal */}
        <MaskReveal direction="left">
          <div className="flex flex-col items-center gap-6 border-b border-white/15 pb-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] md:justify-start" style={{ fontFamily: "var(--font-body)" }}>
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                Statutory Advisory &amp; Licensing Services
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                Services that secure your <span className="gold-text-gradient">security agency</span>
              </h2>
            </div>

            <p className="mx-auto max-w-md text-sm font-normal leading-relaxed text-[#E2E8F0] md:mx-0 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              From company incorporation to Controlling Authority filing, recognized training MOUs, police verification, and multi-state compliance.
            </p>
          </div>
        </MaskReveal>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0B1728] p-1.5 shadow-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] rounded-xl transition-all duration-200 ${
                activeCategory === cat.id
                  ? "text-[#241703] shadow-lg shadow-black/40 bg-[#C89B3C]"
                  : "text-[#CBD5E1] hover:text-white hover:bg-white/5"
              }`}
              style={{ fontFamily: "var(--font-body)", ...(activeCategory === cat.id ? { boxShadow: "inset 0 1px 0 rgba(255,250,230,0.8)" } : {}) }}
            >
              {cat.label}
              {cat.id === "all" ? ` (${SERVICES.length})` : ""}
            </button>
          ))}
        </div>

        {/* Services Grid — TiltCard + staggered MaskReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleServices.map((service, idx) => {
            const IconComponent = getServiceIcon(service.slug);
            const num = String(idx + 1).padStart(2, "0");

            return (
              <MaskReveal key={service.slug} direction={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right"}>
                <TiltCard>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-gradient-to-b from-[#10243A] to-[#0B1728] p-6 sm:p-8 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:from-[#163A54] hover:to-[#10243A]"
                    data-cursor="View"
                  >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl border border-[#D4AF37]/40 bg-[#0B1728] text-[#D4AF37] transition-all duration-200 group-hover:bg-[#C89B3C] group-hover:text-[#241703] group-hover:border-[#C89B3C] shadow-md">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#D4AF37]">
                      SRV-{num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#F5D061] mb-3 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#E2E8F0] mb-6 font-normal" style={{ fontFamily: "var(--font-body)" }}>
                    {service.short}
                  </p>

                  {/* Bullets */}
                  {service.bullets && service.bullets.length > 0 && (
                    <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                      {service.bullets.slice(0, 2).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/80 transition-colors duration-200 group-hover:text-[#F5D061]" style={{ fontFamily: "var(--font-body)" }}>
                  <span>View Requirements</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 text-[#D4AF37]" />
                </div>
                  </Link>
                </TiltCard>
              </MaskReveal>
            );
          })}
        </div>

        {/* See More Toggle */}
        {hasMore && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-[#FFF6D9]/15 to-[#D4AF37]/20 hover:from-[#D4AF37] hover:to-[#C89B3C] hover:text-[#050B14] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F5D061] transition-all duration-200 shadow-md"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>{showAll ? "Show Fewer Services" : `See More Services (${filteredServices.length - 6} More)`}</span>
              <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${showAll ? "-rotate-90" : "rotate-90"}`} />
            </button>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#0B1728] hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>All 26 Services Index</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Bottom Callout Box with Multi-Depth Shading */}
        <div className="rounded-3xl border border-[rgba(212,175,55,0.28)] bg-gradient-to-r from-[#10243A] via-[#0B1728] to-[#10243A] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37]" style={{ fontFamily: "var(--font-body)" }}>
              Multi-District &amp; State Bundles
            </span>
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Need multi-district licensing or training MOU support in a specific State?
            </h3>
            <p className="text-sm text-[#E2E8F0] leading-relaxed font-normal" style={{ fontFamily: "var(--font-body)" }}>
              Our regulatory desk provides instant clarity on State fee slabs, Controlling Authority checklists, and police clearance timelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Calculator className="h-4 w-4 text-[#D4AF37]" />
              <span>Fee Calculator</span>
            </Link>

            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageSquare className="h-4 w-4 fill-white" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
