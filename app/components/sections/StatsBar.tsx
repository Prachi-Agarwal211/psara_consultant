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
    <section ref={rootRef} className="relative overflow-hidden bg-[#FFFEF9] py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
        {/* Service Category Pills Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => {
            const IconComp = c.icon;
            return (
              <div
                key={c.label}
                className="flex items-center gap-3.5 p-3 md:p-4 rounded-2xl bg-[#FBF7F0] border border-[#0F3C65]/10 shadow-sm hover:border-[#C89B3C] transition-colors group"
              >
                <div className={`w-11 h-11 rounded-full ${c.bg} flex items-center justify-center ${c.text} shrink-0 group-hover:scale-105 transition-transform`}>
                  <IconComp className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-xs md:text-sm font-black tracking-wider text-[#0F3C65] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                  {c.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Executive Midnight Blue Feature Ribbon */}
        <div className="rounded-2xl bg-[#0A233F] text-white p-4 md:p-5 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border border-[#0A233F]">
          {RIBBON_ITEMS.map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 px-2">
                <IconComp className="w-5 h-5 text-[#C89B3C] shrink-0" />
                <span className="text-[0.68rem] md:text-xs font-black uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 4-Column Stat Cards Grid (Matching Mockup 1) */}
        <div className="rounded-3xl bg-[#FFFDF5] border-2 border-[#EAD28D]/50 p-6 md:p-10 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#0F3C65]/15">
            {STATS.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div key={s.title} className={`space-y-4 text-center px-4 ${idx !== 0 ? "pt-6 sm:pt-0" : ""}`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF2BA] border border-[#C89B3C]/40 text-[#0F3C65] shadow-md">
                    <IconComp className="w-7 h-7 stroke-[2]" />
                  </div>
                  <div className="counter-num text-4xl sm:text-5xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
                    <span data-count={s.num} data-suffix={s.suffix}>
                      {s.num}{s.suffix}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#486581] font-medium leading-relaxed max-w-xs mx-auto">
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

