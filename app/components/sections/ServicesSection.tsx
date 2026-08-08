"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
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
import { SERVICES, type Service } from "../../../data/services";
import { DEFAULT_WA } from "../../../lib/whatsapp";

// Category definitions to map services dynamically
const CATEGORIES = [
  { id: "all", label: "All Services" },
  { id: "licensing", label: "Licensing & Grants" },
  { id: "training", label: "Training & Verification" },
  { id: "compliance", label: "Compliance & Audits" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

// Icon mapping per service slug
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

// Category classification helper
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

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === "all") return true;
    return getCategory(s.slug) === activeCategory;
  });

  return (
    <section id="services" className="relative py-24 bg-[#0A233F] text-white overflow-hidden" data-parallax-root>
      {/* Background glow accents */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] opacity-20"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,155,60,0.2) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C]" style={{ fontFamily: "var(--font-body)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[#C89B3C]" />
              Statutory Advisory &amp; Licensing Services
            </div>
            <h2 className="mt-3 font-black text-white leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-display)" }}>
              Services that secure your <span className="text-[#C89B3C]">security agency</span>
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-slate-300 leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
            From first incorporation to Controlling Authority filing, recognized training MOUs, police verification, and multi-state compliance.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border border-white/15 bg-white/5 p-1.5 rounded-2xl backdrop-blur-md">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] rounded-xl transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#FFF2BA] text-[#0F3C65] shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {cat.label}
              {cat.id === "all" ? ` (${SERVICES.length})` : ""}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const IconComponent = getServiceIcon(service.slug);
            const num = String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#07192C]/90 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#C89B3C] hover:bg-[#0E2F52] shadow-xl"
              >
                {/* Top gradient border reveal */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C89B3C] via-[#78A2D2] to-[#FFF2BA] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  {/* Top Row: Icon + Number Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center justify-center h-11 w-11 rounded-xl border border-[#C89B3C]/40 bg-[#FFF2BA]/15 text-[#C89B3C] transition-colors duration-300 group-hover:bg-[#C89B3C] group-hover:text-[#0F3C65]">
                      <IconComponent className="h-5 w-5 stroke-[2]" />
                    </div>
                    <span className="font-mono text-xs font-black text-[#C89B3C]/70 group-hover:text-[#FFF2BA]">
                      SRV-{num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-white transition-colors duration-300 group-hover:text-[#FFF2BA] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-300 mb-6 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                    {service.short}
                  </p>

                  {/* Deliverables / Bullets */}
                  {service.bullets && service.bullets.length > 0 && (
                    <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                      {service.bullets.slice(0, 2).map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#C89B3C] mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-300 transition-colors duration-300 group-hover:text-[#FFF2BA]" style={{ fontFamily: "var(--font-body)" }}>
                  <span>View Requirements</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Advisory Callout Box */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#C89B3C]/40 bg-gradient-to-r from-[#0D3459] via-[#0A233F] to-[#0D3459] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[0.68rem] font-black uppercase tracking-[0.25em] text-[#C89B3C]" style={{ fontFamily: "var(--font-body)" }}>
              Multi-State &amp; Custom Bundles
            </span>
            <h3 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
              Need multi-district licensing or training MOU support in a specific State?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
              Our regulatory desk provides instant clarity on State fee slabs, Controlling Authority checklists, and police clearance timelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#FFF2BA] hover:text-[#0F3C65]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Calculator className="h-4 w-4" />
              <span>Fee Calculator</span>
            </Link>

            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#C89B3C] bg-[#C89B3C] px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.16em] text-[#0F3C65] transition-all duration-300 hover:bg-[#FFF2BA]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
