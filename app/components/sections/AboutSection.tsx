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
  imageSrc?: string;
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
  imageSrc = "/about-3d-map.png",
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
                <Sparkles className="w-3.5 h-3.5 text-[#0A233F]" />
                <span>Pan-India Statutory Advisory</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#334155]">
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
                  className="text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-[#0A213D]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  One Desk. <br />
                  <span className="gold-text-gradient">Every State.</span>
                </Heading>
                <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-[#334155]">
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
                    className="p-5 rounded-2xl border border-[#E5DDF3] bg-gradient-to-br from-[#FDFCFF] to-[#F3EEFB] space-y-2.5 transition-all duration-200 hover:border-[#C89B3C] hover:shadow-md"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A233F] to-[#14102A] text-[#8F681B] shadow-md lg:mx-0">
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
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
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

          {/* Right Column: layered India map + PSARA dossier artifact */}
          <Parallax amount={10} className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative mx-auto aspect-square w-full max-w-[570px]" data-cursor="Pan-India file">
              <div className="pointer-events-none absolute inset-[18%] rounded-full bg-[#D4AF37]/20 blur-[80px]" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt="PSARA India 3D Statutory Map Artwork"
                className="absolute inset-0 h-full w-full object-contain opacity-75 drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
              />
              <Image
                src="/assets/images/generated/psara-dossier-book-cutout.png"
                alt="PSARA Consultant India regulatory dossier book"
                width={1031}
                height={1007}
                sizes="(max-width: 1023px) 78vw, 430px"
                className="absolute left-[3%] top-[2%] z-10 h-auto w-[78%] object-contain drop-shadow-[0_28px_30px_rgba(10,18,38,0.32)] transition-transform duration-500 hover:-translate-y-2"
              />
              <div className="absolute bottom-[7%] right-0 z-20 max-w-[13rem] rounded-2xl border border-[#D4AF37]/45 bg-[#0A213D]/95 px-4 py-3 text-white shadow-xl">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5D061]">Field file · 01</span>
                <span className="mt-1 block text-xs font-medium leading-relaxed text-white/75">Evidence-led filing, opened state by state.</span>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
