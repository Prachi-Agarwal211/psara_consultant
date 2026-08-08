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
} from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { DEFAULT_WA } from "../../../lib/whatsapp";

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
      className={`relative min-h-[85vh] py-16 lg:py-24 overflow-hidden bg-[#030814] text-white ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 space-y-10 lg:space-y-14">
        {/* Optional Header Row */}
        {showHeaderBar && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-4">
              <div className="p-1.5 rounded-lg bg-[#040D21] border border-white/20 shadow-xl">
                <BrandMark />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-sky-950/70 text-sky-200 text-[11px] font-extrabold tracking-widest uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Pan-India Statutory Advisory</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Award className="w-4 h-4 text-[var(--gold-bright)]" />
              <span>100% Controlling Authority Compliance</span>
            </div>
          </div>
        )}

        {/* Main 2-Column Hero / About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & 2x2 Feature Grid (6 Cols) */}
          <div className="lg:col-span-6 space-y-7 z-10">
            {/* Eyebrow & Main Title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--gold-bright)] block mb-3">
                ABOUT US
              </span>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                One Desk. <br />
                <span className="bg-gradient-to-r from-[#F5E6BA] via-[var(--gold-bright)] to-[#AA7C11] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,184,114,0.35)]">
                  Every State.
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl font-normal opacity-90">
                PSARA Consultant India empowers security agencies with seamless licensing, training, verification &amp; compliance support across 28 States &amp; 8 UTs.
              </p>
            </div>

            {/* 2x2 Feature Cards Grid matching design mockup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-1">
              {FEATURES.map((feature) => {
                const IconComp = feature.icon;
                return (
                  <div key={feature.title} className="space-y-1.5 group">
                    <div className="w-9 h-9 rounded-lg border border-[var(--gold)]/40 bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold-bright)] group-hover:bg-[var(--gold)] group-hover:text-black transition-colors duration-200 shadow-md">
                      <IconComp className="w-4 h-4 stroke-[1.75]" />
                    </div>
                    <h3
                      className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase pt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-400 font-normal">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-bright)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-[var(--gold)]/20 hover:scale-105 transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>Firm Profile</span>
                <ArrowUpRight className="h-4 w-4 text-black stroke-[2.5]" />
              </Link>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/60 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 text-emerald-400 stroke-[2]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean 3D India Map Artwork (6 Cols) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="PSARA India 3D Statutory Map Artwork"
              className="w-full max-w-[580px] h-auto transition-transform duration-500 ease-out hover:scale-[1.02] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

