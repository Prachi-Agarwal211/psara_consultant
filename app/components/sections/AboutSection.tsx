"use client";

import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  BadgeCheck,
  Building2,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import FloatProps, { PROPS } from "../ui/FloatProps";

interface AboutSectionProps {
  imageSrc?: string;
  showHeaderBar?: boolean;
  className?: string;
}

const FEATURES = [
  {
    title: "LICENSE FILING",
    desc: "Pan-India filing with authority liaison.",
    icon: FileText,
  },
  {
    title: "TRAINING MOUs",
    desc: "Government-recognized training partnerships across India.",
    icon: ShieldCheck,
  },
  {
    title: "POLICE VERIFICATION",
    desc: "Antecedent verification & background clearance support.",
    icon: BadgeCheck,
  },
  {
    title: "MULTI-STATE SUPPORT",
    desc: "Scalable architecture for agencies operating across states.",
    icon: Building2,
  },
];

export default function AboutSection({
  imageSrc = "/about-3d-map.png",
  showHeaderBar = true,
  className = "",
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-[#FFFEF9] via-[#FBF7F0] to-[#FFFEF9] py-16 text-[#0F3C65] lg:py-24 ${className}`}
    >
      <FloatProps slots={PROPS.about} />
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-6 lg:space-y-14 lg:px-8">
        {/* Optional Header Row */}
        {showHeaderBar && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#0F3C65]/15">
            <div className="flex flex-wrap items-center gap-4">
              <div className="p-1.5 rounded-xl bg-white border border-[#0F3C65]/15 shadow-md">
                <BrandMark variant="dark" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C89B3C] bg-[#FFF2BA] text-[#0A233F] text-[11px] font-black tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Pan-India Statutory Advisory</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-[#0A233F]">
              <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
              <span>100% Controlling Authority Compliance</span>
            </div>
          </div>
        )}

        {/* Main 2-Column Hero / About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & 2x2 Feature Grid */}
          <div className="lg:col-span-6 space-y-7 z-10">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C] block mb-3">
                ABOUT US
              </span>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F3C65] leading-[1.06]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                One Desk. <br />
                <span className="text-[#C89B3C]">
                  Every State.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#334E68] max-w-xl font-medium">
                PSARA Consultant India empowers security agencies with seamless licensing, training, verification &amp; compliance support across 28 States &amp; 8 UTs.
              </p>
            </div>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {FEATURES.map((feature, idx) => {
                const IconComp = feature.icon;
                const isVista = idx % 2 === 0;
                return (
                  <div
                    key={feature.title}
                    className={`p-5 rounded-2xl border space-y-2 group transition-all shadow-md ${
                      isVista
                        ? "bg-gradient-to-br from-[#EBF3FA] to-[#D9E6F2] border-[#78A2D2]/40 hover:border-[#0F3C65]"
                        : "bg-gradient-to-br from-[#FFFDF5] to-[#FFF2BA]/60 border-[#C89B3C]/40 hover:border-[#C89B3C]"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0F3C65] text-[#FFF2BA] flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      <IconComp className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h3
                      className="text-xs sm:text-sm font-black tracking-wider text-[#0F3C65] uppercase pt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#334E68] font-bold">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F3C65] to-[#0A233F] px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>Firm Profile</span>
                <ArrowUpRight className="h-4 w-4 text-[#FFF2BA] stroke-[2.5]" />
              </Link>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F3C65] bg-white px-7 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F3C65] hover:bg-[#0F3C65] hover:text-white transition-all duration-200 shadow-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 text-[#25D366] stroke-[2.5]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean 3D India Map Artwork */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-[480px] h-[480px] rounded-full border border-[#C89B3C]/30 animate-spin-slow" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-[#78A2D2]/30" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="PSARA India 3D Statutory Map Artwork"
              className="relative z-10 w-full max-w-[580px] h-auto transition-transform duration-500 ease-out hover:scale-[1.02] drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


