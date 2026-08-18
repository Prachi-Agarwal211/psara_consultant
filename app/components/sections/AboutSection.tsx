"use client";

import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  BadgeCheck,
  Building2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { DEFAULT_WA } from "../../../lib/whatsapp";

interface AboutSectionProps {
  imageSrc?: string;
  showHeaderBar?: boolean;
  className?: string;
  headingLevel?: "h1" | "h2";
}

const FEATURES = [
  {
    title: "License Filing",
    desc: "Direct Controlling Authority filing and liaison across 28 States & 8 UTs.",
    icon: FileText,
  },
  {
    title: "Training MOUs",
    desc: "Government-recognized security guard training partnerships nationwide.",
    icon: ShieldCheck,
  },
  {
    title: "Police Verification",
    desc: "Director antecedent verification & SP Commissionerate track support.",
    icon: BadgeCheck,
  },
  {
    title: "Multi-State Support",
    desc: "Scalable compliance architecture for multi-district and pan-India agencies.",
    icon: Building2,
  },
];

export default function AboutSection({
  imageSrc = "/about-3d-map.png",
  showHeaderBar = true,
  className = "",
  headingLevel = "h2",
}: AboutSectionProps) {
  const Heading = headingLevel;

  return (
    <section
      id="about"
      className={`relative min-h-[85vh] overflow-hidden bg-[#FFFFFF] py-20 lg:py-28 text-[#0F172A] border-b border-slate-200 ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 lg:px-8">
        {/* Optional Header Row */}
        {showHeaderBar && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="p-2 rounded-xl bg-[#F8F9FD] border border-slate-200 shadow-sm">
                <BrandMark variant="dark" compact />
              </div>
              <div className="badge-navy">
                <Sparkles className="w-3.5 h-3.5 text-[#0A233F]" />
                <span>Pan-India Statutory Advisory</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#334155]">
              <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
              <span>100% Controlling Authority Compliance</span>
            </div>
          </div>
        )}

        {/* Main 2-Column About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & 2x2 Feature Grid */}
          <div className="lg:col-span-6 space-y-6 z-10">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#C89B3C]">
                About Our Practice
              </span>
              <Heading
                className="text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-[#0A213D]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                One Desk. <br />
                <span className="text-[#C89B3C]">Every State.</span>
              </Heading>
              <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-[#334155]">
                PSARA Consultant India empowers private security agencies with seamless licensing, recognized training institute MOUs, police verification tracking, and statutory compliance across 28 States &amp; 8 UTs.
              </p>
            </div>

            {/* 2x2 Feature Cards Grid with Warm Gradient Mixture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {FEATURES.map((feature) => {
                const IconComp = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#FFFFFF] to-[#F8F9FD] space-y-2.5 transition-all duration-200 hover:border-[#C89B3C] hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A233F] to-[#0E1B33] text-[#D4AF37] flex items-center justify-center shadow-md">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3
                      className="text-sm font-bold tracking-wider text-[#0A213D] uppercase pt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#475569] font-medium">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="btn-gold-editorial"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>Firm Profile</span>
                <ArrowRight className="h-4 w-4 text-[#1F1707]" />
              </Link>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean 3D India Map Artwork */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="PSARA India 3D Statutory Map Artwork"
              className="relative z-10 w-full max-w-[560px] h-auto transition-transform duration-300 hover:scale-[1.02] drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
