"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import Reveal from "../ui/Reveal";

const ITEMS = [
  { title: "Direct Authority Filing", desc: "Jaipur HQ se 36 states me physical filing + officer tracking. No brokers.", img: "/assets/images/cinematic/hero-stage.jpg" },
  { title: "Training MOU Pakka", desc: "State-recognized institute se MOU + syllabus compliance.", img: "/assets/images/generated/certificate-mockup.jpg" },
  { title: "Rejection-Proof Audit", desc: "MOA, KYC, office proof — submit se pehle full audit.", img: "/assets/images/cinematic/services-atmosphere.jpg" },
  { title: "5-Year Cover", desc: "Renewal alerts + multi-state expansion + registers.", img: "/assets/images/generated/theme-industrial-night.jpg" },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="grad-navy relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <div className="orb orb-saffron left-[-100px] bottom-[-120px] h-[320px] w-[320px] opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00]">Why 500+ Agencies Chose Us</p>
            <h2 className="mt-2 font-black leading-[1.02]" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", fontFamily: "var(--font-display)" }}>Dalal nahi, <span className="text-[#FF7A00]">direct desk.</span></h2>
          </div>
          <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex w-fit items-center gap-2 rounded-xl grad-saffron px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0B1E3B] hover:brightness-105">Chat Desk <ArrowRight className="h-4 w-4" /></a>
        </div>
        </Reveal>
        <Reveal delay={110} variant="scale">
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((c, i) => (
            <div key={c.title} className="card-lift group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl">
              <Image src={c.img} alt={c.title} fill className="zoom-slow object-cover" sizes="(max-width:1024px) 100vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B] via-[#0B1E3B]/45 to-transparent" />
              <div className="relative p-5">
                <span className="font-mono text-xs font-black text-[#FF7A00]">0{i + 1}</span>
                <h3 className="mt-1 font-black leading-snug">{c.title}</h3>
                <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-white/80"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4ADE80]" />{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
