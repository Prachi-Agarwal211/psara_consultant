"use client";

import { useEffect, useRef } from "react";
import {
  FileText,
  ShieldCheck,
  Building2,
  Users,
  Calendar,
  Building,
  Award,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { counterStampAnimation } from "../../lib/gsap";

const CATEGORIES = [
  { label: "TRAINING MOU", icon: FileText, bg: "bg-[#FFF2BA]", text: "text-[#0F3C65]" },
  { label: "POLICE VERIFICATION", icon: ShieldCheck, bg: "bg-[#D9E6F2]", text: "text-[#0F3C65]" },
  { label: "MULTI-STATE", icon: Building2, bg: "bg-[#FFF2BA]", text: "text-[#0F3C65]" },
  { label: "COMPANY SUPPORT", icon: Users, bg: "bg-[#D9E6F2]", text: "text-[#0F3C65]" },
];

const RIBBON_ITEMS = [
  { label: "QUICK 30-45 DAY PROCESSING", icon: Calendar },
  { label: "JAIPUR HQ • DELHI • GURUGRAM • NOIDA DESKS", icon: Building },
  { label: "500+ PSARA LICENSES GRANTED", icon: Award },
  { label: "28 STATES & UTs COVERED", icon: MapPin },
];

const STATS = [
  {
    num: "28",
    suffix: "",
    title: "STATES & UTs COVERED",
    desc: "Controlling Authority filing desks across India.",
    icon: MapPin,
    badgeBg: "bg-[#FFF2BA]",
  },
  {
    num: "570",
    suffix: "+",
    title: "CITY DESKS",
    desc: "One desk per district HQ for seamless coordination.",
    icon: Building2,
    badgeBg: "bg-[#D9E6F2]",
  },
  {
    num: "500",
    suffix: "+",
    title: "LICENSES CLEARED",
    desc: "Agencies served with end-to-end support.",
    icon: ShieldCheck,
    badgeBg: "bg-[#FFF2BA]",
  },
  {
    num: "10",
    suffix: " Yrs",
    title: "STATUTORY PRACTICE",
    desc: "PSARA Act, 2005 specialists with a decade of expertise.",
    icon: FileText,
    badgeBg: "bg-[#D9E6F2]",
  },
];

export default function StatsBar() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (rootRef.current) counterStampAnimation(rootRef.current);
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-gradient-to-b from-[#0A233F] via-[#0F3C65] to-[#07192C] text-white py-12 lg:py-16">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C89B3C] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#78A2D2] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        {/* Service Category Pills Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => {
            const IconComp = c.icon;
            return (
              <div
                key={c.label}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 border border-white/15 shadow-lg backdrop-blur-md hover:border-[#C89B3C] hover:bg-white/15 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFF2BA] flex items-center justify-center text-[#0F3C65] shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <IconComp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-xs md:text-sm font-black tracking-wider text-white uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  {c.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Executive Gold Accent Ribbon */}
        <div className="rounded-2xl bg-gradient-to-r from-[#FFF2BA] via-[#F5E6BA] to-[#FFF2BA] text-[#0F3C65] p-4 md:p-5 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-2 border-[#C89B3C]">
          {RIBBON_ITEMS.map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F3C65] text-[#FFF2BA] flex items-center justify-center shrink-0 shadow-sm">
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-[0.68rem] md:text-xs font-black uppercase tracking-wider text-[#0F3C65]" style={{ fontFamily: "var(--font-body)" }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 4-Column Stat Cards Grid */}
        <div className="rounded-3xl bg-[#07192C]/90 border border-white/20 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/15">
            {STATS.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={s.title} className={`space-y-4 text-center px-4 ${idx !== 0 ? "pt-6 sm:pt-0" : ""}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#78A2D2] to-[#0F3C65] border border-white/20 text-white shadow-lg">
                    <IconComp className="w-7 h-7 stroke-[2]" />
                  </div>
                  <div className="counter-num text-4xl sm:text-5xl font-black text-[#FFF2BA]" style={{ fontFamily: "var(--font-display)" }}>
                    <span data-count={s.num} data-suffix={s.suffix}>
                      {s.num}{s.suffix}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xs mx-auto">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

