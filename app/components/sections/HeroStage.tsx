"use client";

import Image from "next/image";
import { useState } from "react";
import { Phone, MessageSquare, ShieldCheck, MapPin, ArrowRight, BadgeCheck } from "lucide-react";
import CaseyMenu from "./CaseyMenu";
import VideoTile from "../ui/VideoTile";
import { CONTACT } from "../../../lib/config";

/**
 * HeroStage v2 — Tricolor Authority + 2026 bento.
 * No video. Paper left + navy image bento right. Real photos only.
 */
export default function HeroStage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wa = `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent("Hello PSARA Consultant India — I need PSARA License help.")}`;

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#FFFDF5] text-[#0B1E3B]">
      {/* ambient gradient wash + orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFE8D1]/60 via-transparent to-transparent" />
        <div className="orb orb-saffron left-[-120px] top-[-120px] h-[380px] w-[380px] opacity-70" />
        <div className="orb orb-navy right-[-140px] top-[30%] h-[420px] w-[420px] opacity-40" />
      </div>
      {/* top hairline tricolor */}
      <div className="flex h-1.5 w-full" aria-hidden>
        <div className="flex-1 bg-[#E76F00]" />
        <div className="flex-1 bg-[#0B1E3B]" />
        <div className="flex-1 bg-[#046A38]" />
      </div>

      {/* mini header — logo left, menu right */}
      <header className="relative z-10 border-b border-[#0B1E3B]/10 bg-[#FFFDF5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 lg:px-8">
        {/* LEFT — logo + company name */}
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="PSARA Consultant India home">
          {/* ponytail: navy disc restores the logo's dark base — gold mark washes out on bare cream */}
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#0B1E3B] p-1 shadow-md">
            <Image src="/assets/images/brand/psara-consultant-india-mark-transparent.png" alt="PSARA Consultant India logo" width={48} height={48} className="h-full w-full object-contain" />
          </span>
          <span className="flex flex-col justify-center leading-none">
            <span className="text-[0.95rem] font-black uppercase tracking-[0.16em] text-[#0B1E3B]">PSARA</span>
            <span className="mt-1 hidden text-[0.52rem] font-black uppercase tracking-[0.2em] text-[#B35400] sm:block">Consultant India</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-[13px] font-black uppercase tracking-[0.14em] text-[#0B1E3B] lg:flex">
          <a href="/" className="text-[#B35400]">Home</a>
          <a href="/about" className="hover:text-[#B35400]">About</a>
          <a href="/services" className="hover:text-[#B35400]">Services</a>
          <a href="/states" className="hover:text-[#B35400]">States</a>
          <a href="/calculator" className="rounded-full bg-[#0B1E3B] px-5 py-2.5 text-[12px] text-white shadow-md hover:bg-[#B35400]">Fee Calculator</a>
        </nav>
        {/* RIGHT — CTA + menu */}
        <div className="flex shrink-0 items-center gap-3">
          <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#E76F00] px-6 py-3 text-[12px] font-black uppercase tracking-[0.14em] text-[#0B1E3B] shadow-lg shadow-orange-600/30 hover:bg-[#B35400] hover:text-white">
            Get License <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </a>
          <button aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((v) => !v)} className="group flex items-center gap-3">
            <span className="hidden text-[12px] font-black uppercase tracking-[0.2em] text-[#0B1E3B] sm:block">{menuOpen ? "Close" : "Menu"}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B1E3B] text-white shadow-md">
              <span className="flex flex-col gap-1.5">
                <span className="h-[2.5px] w-5 bg-white" />
                <span className="h-[2.5px] w-5 bg-white" />
                <span className="h-[2.5px] w-3 bg-[#FF7A00]" />
              </span>
            </span>
          </button>
        </div>
        </div>
      </header>
      <CaseyMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 pb-10 pt-4 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-8">
        {/* LEFT — bold type */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="hero-enter flex flex-wrap items-center gap-2" style={{ ["--enter-delay" as string]: "0ms" }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1E3B] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FF7A00]" /> PSARA Act 2005 Specialist
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#046A38]/30 bg-green-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#046A38]">
              <BadgeCheck className="h-3.5 w-3.5" /> 300+ Licenses Cleared
            </span>
          </div>

          <h1 className="hero-enter mt-5 text-balance font-black leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.6rem,6vw,5rem)", fontFamily: "var(--font-display)", ["--enter-delay" as string]: "90ms" }}>
            PSARA License in <span className="text-[#B35400]">30–45 Days.</span>
            <br />Across India.
          </h1>
          <p className="hero-enter mt-4 max-w-xl text-base leading-relaxed text-[#33465F] sm:text-lg" style={{ ["--enter-delay" as string]: "180ms" }}>
            Training MOU, police verification aur Controlling Authority filing — Jaipur HQ se 36 States & UTs tak. Fees seedha, kaam pakka.
          </p>

          <div className="hero-enter mt-6 flex flex-col gap-3 sm:flex-row" style={{ ["--enter-delay" as string]: "260ms" }}>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl grad-saffron px-7 py-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0B1E3B] shadow-xl shadow-orange-500/25 hover:brightness-105">
              <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#046A38] bg-white px-7 py-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#046A38] hover:bg-[#046A38] hover:text-white">
              <MessageSquare className="h-4 w-4" /> WhatsApp Desk
            </a>
          </div>

          {/* fee bento strip */}
          <div className="hero-enter mt-6 grid grid-cols-3 gap-2 sm:gap-3" style={{ ["--enter-delay" as string]: "340ms" }}>
            {[
              { fee: "₹5,000", scope: "1 District" },
              { fee: "₹10,000", scope: "2–5 Districts" },
              { fee: "₹25,000", scope: "Entire State" },
            ].map((f) => (
              <a key={f.scope} href="/calculator" className="card-lift group rounded-xl border border-[#E8DFC8] bg-white p-3 text-center shadow-sm hover:border-[#E76F00] sm:p-4">
                <div className="font-black text-[#0B1E3B] group-hover:text-[#E76F00]" style={{ fontSize: "clamp(1rem,2.4vw,1.4rem)" }}>{f.fee}</div>
                <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#475569]">{f.scope}</div>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — image bento */}
        <div className="hero-enter lg:col-span-5" style={{ ["--enter-delay" as string]: "200ms" }}>
          <div className="grid grid-cols-2 gap-3">
            <div className="group relative col-span-2 h-56 overflow-hidden rounded-2xl sm:h-64">
              {/* ponytail: lobby loop as live bg — poster paints first, no LCP hole */}
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/assets/images/hero-filing-desk.jpg" aria-hidden="true">
                <source src="/assets/videos/hero-loop.webm" type="video/webm" />
                <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B]/55 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-[#0B1E3B]/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">Controlling Authority Filing</span>
              {/* proper eagle mark — ponytail: navy disc, transparent gold needs its dark base */}
              <span className="absolute right-3 top-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#0B1E3B]/95 p-1.5 shadow-lg sm:h-24 sm:w-24">
                <Image src="/assets/images/brand/psara-consultant-india-mark-transparent.png" alt="PSARA Consultant India" width={112} height={112} className="h-full w-full object-contain" />
              </span>
              <span className="animate-drift absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full grad-saffron px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0B1E3B]"><MapPin className="h-3 w-3" /> 36 States</span>
            </div>
            <VideoTile className="h-40 rounded-2xl sm:h-44" label="Live · Field Desk" poster="/assets/images/field-desk-guard.jpg" />
            <div className="group relative h-40 overflow-hidden rounded-2xl sm:h-44">
              <Image src="/assets/images/hq-desk-reception.jpg" alt="Jaipur HQ reception desk" fill className="zoom-slow object-cover" sizes="20vw" />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0B1E3B]">Jaipur HQ Desk</span>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <div className="card-glow relative flex items-center gap-3 overflow-hidden rounded-2xl grad-navy p-4 text-white">
                <div className="orb orb-saffron right-[-40px] top-[-40px] h-[120px] w-[120px] opacity-60" aria-hidden />
                <Image src="/assets/images/float/shield-gold.svg" alt="Security shield icon" width={36} height={36} className="animate-drift-soft h-9 w-9 shrink-0" />
                <div><div className="text-xl font-black leading-none">300+</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">Licenses Granted</div></div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#E8DFC8] bg-white p-4">
                {/* ponytail: navy tile — transparent gold washes out on bare white */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0B1E3B] p-1">
                  <Image src="/assets/images/brand/psara-consultant-india-mark-transparent.png" alt="PSARA Consultant India logo" width={36} height={36} className="h-full w-full object-contain" />
                </span>
                <div><div className="text-xl font-black leading-none text-[#0B1E3B]">30–45</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#475569]">Days Fast-Track</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
