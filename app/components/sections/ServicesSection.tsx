"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../../../data/services";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import Reveal from "../ui/Reveal";

const ICONS: Record<string, string> = {
  "psara-license": "/assets/icons/psara-license.svg",
  "company-registration": "/assets/icons/company-registration.svg",
  "gst-registration": "/assets/icons/gst-registration.svg",
  "msme-registration": "/assets/icons/msme-registration.svg",
  "training-mou": "/assets/icons/training-mou.svg",
  "police-verification": "/assets/icons/police-verification.svg",
};

function iconFor(slug: string) {
  if (slug.includes("psara-license")) return ICONS["psara-license"];
  if (slug.includes("company")) return ICONS["company-registration"];
  if (slug.includes("gst")) return ICONS["gst-registration"];
  if (slug.includes("msme") || slug.includes("udyam")) return ICONS["msme-registration"];
  if (slug.includes("training") || slug.includes("mou")) return ICONS["training-mou"];
  if (slug.includes("police") || slug.includes("verification")) return ICONS["police-verification"];
  return "/assets/icons/shield-check.svg";
}

export default function ServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? SERVICES.slice(0, 9) : SERVICES.slice(0, 6);

  return (
    <section id="services" className="relative bg-white py-16 text-[#0B1E3B] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-3xl grad-navy text-white">
          <div className="orb orb-saffron right-[-100px] top-[-100px] h-[300px] w-[300px] opacity-60" aria-hidden />
          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            <div className="p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00]">6 Core Routes · 26 Services</p>
              <h2 className="mt-3 font-black leading-[1.02]" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", fontFamily: "var(--font-display)" }}>
                License se lekar <span className="text-[#E76F00]">guard deployment</span> tak.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">Company setup, MOU, verification, filing — sab ek desk par. Card kholo, requirements dekho, WhatsApp par bhejo.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="/calculator" className="btn-shine rounded-full grad-saffron px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#0B1E3B] hover:brightness-105">Fee Calculator</a>
                <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-white hover:bg-white hover:text-[#0B1E3B]">WhatsApp Desk</a>
              </div>
            </div>
            <div className="group relative min-h-56 overflow-hidden lg:min-h-full">
              <Image src="/assets/images/cinematic/services-atmosphere.jpg" alt="PSARA dossier desk" fill className="zoom-slow object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3B] via-[#0B1E3B]/30 to-transparent" />
            </div>
          </div>
        </div>
        </Reveal>

        <Reveal delay={110} variant="scale">
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card-lift card-glow group flex min-h-60 flex-col justify-between rounded-2xl border border-[#E8DFC8] bg-[#FFFDF5] p-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1E3B] p-2.5"><Image src={iconFor(s.slug)} alt={`${s.title} service icon`} width={28} height={28} className="h-7 w-7 brightness-0 invert" /></span>
                  <span className="font-mono text-xs font-black text-[#B35400]">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-black leading-snug">{s.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#33465F]">{s.short}</p>
                {s.bullets?.slice(0, 2).map((b) => (
                  <div key={b} className="mt-2 flex items-start gap-2 text-xs text-[#33465F]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#046A38]" /><span className="line-clamp-1">{b}</span></div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#E8DFC8] pt-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#0B1E3B] group-hover:text-[#B35400]">
                <span>View Requirements</span><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
        </Reveal>

        <div className="mt-6 text-center">
          <button onClick={() => setShowAll((v) => !v)} className="rounded-xl border-2 border-[#0B1E3B] px-7 py-3 text-xs font-black uppercase tracking-[0.12em] hover:bg-[#0B1E3B] hover:text-white">
            {showAll ? "Show Less" : `See More (${SERVICES.length - 6} More)`}
          </button>
        </div>
      </div>
    </section>
  );
}
