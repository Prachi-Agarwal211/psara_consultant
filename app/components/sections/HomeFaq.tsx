"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

const faqs = [
  { q: "PSARA License kya hai, compulsory kyun hai?", a: "State Controlling Authority se milne wala registration — PSARA Act 2005 ke under. Bina license agency chalana punishable offence hai (fine + jail)." },
  { q: "Training MOU pehle compulsory hai?", a: "Haan. Har state me recognized institute se MOU mandatory hai — unarmed, supervisor aur armed syllabus ke liye." },
  { q: "Total kharcha kitna — govt + consultancy?", a: "Standard whole-state package ₹3,65,000 — consultancy, MOU + training, govt fee, office & rent agreement, documents, police verification aur processing sab isme included. Govt fee state-wise alag hoti hai (jaise Karnataka whole state ₹50,000), exact quote Fee Calculator se confirm karo." },
  { q: "Time kitna lagta hai?", a: "30–45 working days standard — documents, police verification aur inspection par depend karta hai." },
  { q: "Validity aur renewal?", a: "5 years most states. Renewal 45–90 days pehle file karo, warna fresh apply karna padega." },
];

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? faqs : faqs.slice(0, 3);

  return (
    <section id="faq" className="bg-[#FFFDF5] py-16 text-[#0B1E3B] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
        <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-[#B35400]">Seedhe Jawab · No Jargon</p>
        <h2 className="mt-2 text-center font-black" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", fontFamily: "var(--font-display)" }}>Sawaal? <span className="text-grad-saffron">Jawaab ready.</span></h2>
        </Reveal>
        <Reveal delay={110} variant="scale">
        <div className="mt-8 divide-y divide-[#E8DFC8] rounded-2xl border border-[#E8DFC8] bg-white shadow-sm">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="p-5 sm:p-6">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 text-left">
                  <span className="font-black sm:text-lg">{f.q}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition ${isOpen ? "rotate-180 border-[#E76F00] bg-[#E76F00] text-white" : "border-[#0B1E3B] text-[#0B1E3B]"}`}><ChevronDown className="h-4 w-4" /></span>
                </button>
                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div><p className="pr-10 pt-3 text-sm leading-relaxed text-[#33465F] sm:text-base">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => setShowAll((v) => !v)} className="rounded-xl border-2 border-[#0B1E3B] px-6 py-3 text-xs font-black uppercase tracking-[0.12em] hover:bg-[#0B1E3B] hover:text-white">{showAll ? "Show Less" : `+${faqs.length - 3} More`}</button>
          <Link href="/faq" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1E3B] px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-white hover:bg-[#E76F00]">All 100+ FAQs <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
