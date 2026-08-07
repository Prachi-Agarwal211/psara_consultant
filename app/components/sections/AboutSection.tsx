"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  ArrowUpRight,
  Globe,
  BadgeCheck,
  Check,
  Sparkles,
  MessageSquare,
  Award,
} from "lucide-react";
import BrandMark from "../ui/BrandMark";
import { DEFAULT_WA } from "../../../lib/whatsapp";

const PILLARS = [
  {
    num: "01",
    title: "Pan-India License Filings",
    desc: "Direct desk filings across 28 States & 8 UTs with Controlling Authority liaison.",
    icon: ShieldCheck,
    tag: "28 States & 8 UTs",
  },
  {
    num: "02",
    title: "Recognized Training MOUs",
    desc: "MOU execution with government-recognized security guard training institutes.",
    icon: FileText,
    tag: "Government MOU",
  },
  {
    num: "03",
    title: "Police Antecedent Clearance",
    desc: "Background verification & character certification for directors & key personnel.",
    icon: BadgeCheck,
    tag: "CCTNS Verification",
  },
  {
    num: "04",
    title: "Multi-State Expansion",
    desc: "Scalable licensing architecture tailored for expanding security operations nationwide.",
    icon: Globe,
    tag: "National Reach",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-[90vh] pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#020814] text-white border-y border-white/10"
    >
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-40 left-1/3 h-[700px] w-[700px] rounded-full blur-[180px] opacity-30"
          style={{ background: "radial-gradient(circle, rgba(0, 163, 255, 0.45) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 right-1/4 h-[600px] w-[600px] rounded-full blur-[160px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(212, 184, 114, 0.4) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <div className="p-1.5 rounded-lg bg-[#040D21] border border-white/20 shadow-xl">
              <BrandMark />
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-400/50 bg-sky-950/80 text-sky-200 text-xs font-extrabold tracking-widest uppercase shadow-md">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Pan-India Statutory Authority</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-slate-300">
            <Award className="w-4 h-4 text-[var(--gold-bright)]" />
            <span>100% Controlling Authority Compliance</span>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Capability Pillars (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Main Headline */}
            <div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                One desk for every State&apos;s{" "}
                <span className="text-[var(--gold-bright)] drop-shadow-[0_0_30px_rgba(245,230,186,0.5)]">
                  PSARA file.
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-white/95 font-medium">
                PSARA Consultant India is a statutory advisory firm for private security agencies —
                executing end-to-end license filings, company registration, training MOUs, police antecedent verification, and compliance across 28 States &amp; 8 UTs.
              </p>
            </div>

            {/* 4 Capability Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {PILLARS.map((pillar) => {
                const IconComp = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="group rounded-2xl border border-white/20 bg-[#061433] p-5 hover:border-sky-400/70 hover:bg-[#0A1E4A] transition-all duration-300 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-sky-500/25 border border-sky-400/50 flex items-center justify-center text-sky-300 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-extrabold text-[var(--gold-bright)]">
                        {pillar.num}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/85 font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[var(--gold-bright)] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-black shadow-xl shadow-[var(--gold)]/30 hover:scale-105 transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>Explore Firm Profile</span>
                <ArrowUpRight className="h-4 w-4 text-black stroke-[3]" />
              </Link>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-400 bg-emerald-950/90 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-emerald-300 shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 text-emerald-400 stroke-[2.5]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Impact 3D India Map Artwork Showcase (`/about section.png`) (6 Cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Ambient Radial Backlight Glow behind Map */}
            <div
              className="absolute inset-0 rounded-full blur-[100px] opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, rgba(0, 163, 255, 0.5) 0%, rgba(212, 184, 114, 0.2) 60%, transparent 80%)" }}
            />

            <div className="relative w-full aspect-[4/3] max-w-[680px] lg:max-w-[740px]">
              <Image
                src="/about section.png"
                alt="PSARA India 3D Statutory Map Artwork"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,163,255,0.45)] hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Floating Stat Badge — Top Right */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-sky-400/50 bg-[#040D21]/95 backdrop-blur-md shadow-2xl">
                <Globe className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-black uppercase tracking-wider text-sky-200">
                  28 States &amp; 8 UTs Covered
                </span>
              </div>

              {/* Floating Stat Badge — Bottom Left */}
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--gold)]/50 bg-[#040D21]/95 backdrop-blur-md shadow-2xl">
                <Check className="w-4 h-4 text-[var(--gold)]" />
                <span className="text-xs font-black uppercase tracking-wider text-[var(--gold-bright)]">
                  500+ Licenses Cleared
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
