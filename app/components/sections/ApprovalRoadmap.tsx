"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, FileCheck, ShieldCheck, Scale, Award, Clock, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import Reveal from "../ui/Reveal";

const PHASES = [
  { num: "01", title: "Company Setup & Scope", window: "Days 1–3", icon: Building2, desc: "MOA me security object, office proof aur district scope lock — 1 district, 5 districts ya entire state.", points: ["MOA Object Audit", "Office Proof Check", "Fee Slab Mapping"], img: "/assets/images/cinematic/process-path.jpg" },
  { num: "02", title: "Training MOU + File Ready", window: "Days 4–10", icon: FileCheck, desc: "State-recognized institute se MOU, affidavits aur Form-I dossier ready.", points: ["Training MOU", "Affidavits", "Dossier Assembly"], img: "/assets/images/generated/certificate-mockup.jpg" },
  { num: "03", title: "Police Verification", window: "Days 11–30", icon: ShieldCheck, desc: "Director antecedent + CCTNS check — SP office tracking daily.", points: ["SP Office Track", "CCTNS Check", "Station Report"], img: "/assets/images/generated/theme-guard-patrol.jpg" },
  { num: "04", title: "Authority Filing", window: "Days 31–55", icon: Scale, desc: "Controlling Authority filing + fee challan + inspection prep.", points: ["Official Filing", "Fee Receipt", "Inspection Prep"], img: "/assets/images/generated/theme-govt-corridor.jpg" },
  { num: "05", title: "License + 5-Yr Cover", window: "Grant Ke Baad", icon: Award, desc: "Grant letter delivery + registers + renewal calendar.", points: ["Grant Letter", "Registers Brief", "Renewal Alerts"], img: "/assets/images/cinematic/hero-stage.jpg" },
];

export default function ApprovalRoadmap() {
  const [active, setActive] = useState(0);
  const p = PHASES[active]!;
  const Icon = p.icon;

  return (
    <section id="process" className="grad-navy relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <div className="orb orb-saffron right-[8%] top-[-120px] h-[320px] w-[320px] opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
        <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF7A00]">5-Step Roadmap · No Pin, No Jhatka</p>
            <h2 className="mt-2 font-black leading-[1.02]" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", fontFamily: "var(--font-display)" }}>First call se <span className="text-[#FF7A00]">license</span> tak.</h2>
          </div>
          <p className="max-w-sm text-sm text-white/70">Tap karo phase, photo + kaam dekho. Mobile par bhi smooth.</p>
        </div>
        </Reveal>

        <Reveal delay={100}>
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {PHASES.map((s, i) => (
            <button key={s.num} onClick={() => setActive(i)} className={`card-lift rounded-xl border p-4 text-left ${active === i ? "border-[#FF7A00] bg-white text-[#0B1E3B] shadow-lg shadow-orange-500/20" : "border-white/15 bg-white/5 text-white hover:border-white/40"}`}>
              <div className="flex items-center justify-between"><span className={`font-mono text-xs font-black ${active === i ? "text-[#B35400]" : "text-[#FF7A00]"}`}>{s.num}</span><span className="flex items-center gap-1 text-[10px] font-bold uppercase text-current opacity-70"><Clock className="h-3 w-3" />{s.window}</span></div>
              <div className="mt-3 text-sm font-black leading-snug">{s.title}</div>
            </button>
          ))}
        </div>
        {/* progress dots */}
        <div className="mt-4 flex items-center justify-center gap-2" aria-hidden>
          {PHASES.map((s, i) => (
            <span key={s.num} className={`road-dot h-2 rounded-full ${i === active ? "active w-8 grad-saffron" : i < active ? "w-2 bg-[#046A38]" : "w-2 bg-white/25"}`} />
          ))}
        </div>
        </Reveal>

        <Reveal delay={140} variant="scale">
        <div className="mt-4 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-white text-[#0B1E3B] lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E76F00] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#0B1E3B]"><Icon className="h-3.5 w-3.5" /> Phase {p.num} · {p.window}</span>
            <h3 className="mt-3 text-2xl font-black">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#33465F]">{p.desc}</p>
            <div className="mt-4 space-y-2">
              {p.points.map((d) => (<div key={d} className="flex items-center gap-2 rounded-lg border border-[#E8DFC8] bg-[#FFFDF5] px-3 py-2.5 text-xs font-bold"><CheckCircle2 className="h-4 w-4 text-[#046A38]" />{d}</div>))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center gap-2 rounded-xl bg-[#046A38] px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-white hover:bg-[#03522B]"><MessageSquare className="h-4 w-4" /> Discuss Phase {p.num}</a>
              <div className="flex items-center gap-2 text-xs font-black text-[#33465F]"><button disabled={active === 0} onClick={() => setActive((v) => Math.max(0, v - 1))} className="underline disabled:opacity-30">← Prev</button><span>{active + 1}/5</span><button disabled={active === 4} onClick={() => setActive((v) => Math.min(4, v + 1))} className="flex items-center gap-1 underline disabled:opacity-30">Next <ChevronRight className="h-3 w-3" /></button></div>
            </div>
          </div>
          <div className="group relative min-h-64 overflow-hidden lg:min-h-full"><Image src={p.img} alt={p.title} fill className="zoom-slow object-cover" sizes="(max-width:1024px) 100vw, 40vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B]/45 via-transparent to-transparent" /></div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
