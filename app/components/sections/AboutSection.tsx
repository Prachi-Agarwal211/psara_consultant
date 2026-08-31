"use client";

import Link from "next/link";
import Image from "next/image";
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
import { MaskReveal } from "../ui/MaskReveal";
import { Parallax } from "../ui/Parallax";

interface AboutSectionProps {
  showHeaderBar?: boolean;
  className?: string;
  headingLevel?: "h1" | "h2";
}

const FEATURES = [
  {
    title: "License Filing",
    desc: "Direct Controlling Authority filing and liaison across 36 States & UTs.",
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
  showHeaderBar = true,
  className = "",
  headingLevel = "h2",
}: AboutSectionProps) {
  const Heading = headingLevel;

  return (
    <section
      id="about"
      className={`on-light relative min-h-[85vh] overflow-hidden py-20 lg:py-28 text-[#0F172A] border-b border-[#E5DDF3] ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 lg:px-8">
        {/* Optional Header Row */}
        {showHeaderBar && (
          <div className="flex flex-col items-center gap-6 border-b border-[#E5DDF3] pb-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <div className="p-2 rounded-xl bg-[#F4F0FA] border border-[#E5DDF3] shadow-sm">
                <BrandMark variant="dark" compact />
              </div>
              <div className="badge-navy">
                <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Pan-India Statutory Advisory</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft,#443A61)]">
                          <CheckCircle2 className="w-4 h-4 text-[#8F681B]" />
                          <span>100% Controlling Authority Compliance</span>
                        </div>
          </div>
        )}

        {/* Main 2-Column About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & 2x2 Feature Grid */}
          <div className="z-10 space-y-6 text-center lg:col-span-6 lg:text-left">
            <MaskReveal direction="left">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-[#8F681B]">
                  About Our Practice
                </span>
                <Heading
                  className="text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-[var(--paper-ink,#151126)]"
                                    style={{ fontFamily: "var(--font-display)" }}
                                  >
                                    One Desk. <br />
                                    <span className="gold-text-gradient">Every State.</span>
                                  </Heading>
                                  <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-[var(--ink-soft,#443A61)]">
                  PSARA Consultant India empowers private security agencies with seamless licensing, recognized training institute MOUs, police verification tracking, and statutory compliance across 36 States &amp; UTs.
                </p>
              </div>
            </MaskReveal>

            {/* 2x2 Feature Cards Grid with Warm Gradient Mixture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {FEATURES.map((feature) => {
                const IconComp = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-5 rounded-2xl border border-[#E5DDF3] bg-[var(--canvas-cream,#F7F3FF)] space-y-2.5 transition-[border-color,box-shadow,transform] duration-200 hover:border-[#C89B3C] hover:shadow-md"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--canvas-void,#080611)] text-[#F5D061] shadow-md ring-1 ring-[#D4AF37]/40 lg:mx-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3
                      className="text-sm font-bold tracking-wider text-[var(--paper-ink,#151126)] uppercase pt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[var(--ink-muted,#766D90)] font-medium">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
              <Link
                href="/about"
                data-cursor="Read practice"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1F1707] shadow-[0_14px_28px_-16px_rgba(133,93,14,0.8)] transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-105"
                style={{ fontFamily: "var(--font-body)", background: "var(--grad-gold-metallic)", backgroundSize: "220% 100%" }}
              >
                <span>Firm Profile</span>
                <ArrowRight className="h-4 w-4 text-[#1F1707]" />
              </Link>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[var(--whatsapp-hover,#128C7E)] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-16px_rgba(18,140,126,0.8)] transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-95"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: one controlled PSARA dossier artifact */}
          <Parallax amount={10} className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative mx-auto aspect-square w-full max-w-[570px]" data-cursor="Pan-India file">
              <div className="pointer-events-none absolute inset-[22%] rounded-full bg-[#D4AF37]/15 blur-[80px]" aria-hidden="true" />
              <Image
                src="/assets/images/generated/psara-dossier-book-cutout.png"
                alt="PSARA Consultant India regulatory dossier book"
                width={1031}
                height={1007}
                sizes="(max-width: 1023px) 78vw, 430px"
                className="absolute left-[8%] top-[8%] z-10 h-auto w-[84%] object-contain drop-shadow-[0_28px_30px_rgba(10,18,38,0.32)] transition-transform duration-500 hover:-translate-y-2"
              />
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
