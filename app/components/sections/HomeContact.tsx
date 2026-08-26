"use client";

import Link from "next/link";
import { Phone, MessageSquare, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import ContactForm from "../../../components/ContactForm";
import { CONTACT, OFFICES } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

export default function HomeContact() {
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080714] text-white py-20 lg:py-28 border-b border-white/10"
    >
      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37]" style={{ fontFamily: "var(--font-body)" }}>
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            Direct Statutory Advisory
          </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Start a File <span className="gold-text-gradient">With Us</span>
          </h2>
          <p className="text-base text-[#E2E8F0] leading-relaxed font-normal" style={{ fontFamily: "var(--font-body)" }}>
            Connect directly with our senior statutory advisors. Submit your agency parameters below to receive a customized state regulatory roadmap, training MOU checklist, and fee structure.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Helpline & Desks */}
          <div className="space-y-6 lg:col-span-5">
            {/* Quick Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-br from-[#14102A] to-[#0F0C1F] hover:border-[#D4AF37] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
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

            {/* HQ Information Card — plum */}
            <div className="space-y-4 rounded-2xl border border-[rgba(212,175,55,0.25)] bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 text-sm shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] pb-2 border-b border-white/10">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                <span>Headquarters Contact</span>
              </div>
              <p className="flex items-center gap-3 text-white font-medium">
                <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#F5D061] font-bold transition-colors">
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-start gap-3 text-[#CBD5E1] font-normal">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>{CONTACT.hours}</span>
              </p>
              <p className="flex items-start gap-3 text-[#CBD5E1] font-normal">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>
                  <strong className="text-white font-bold block">Jaipur Headquarters</strong>
                  <span className="text-xs text-[#94A3B8]">{hq.address}, {hq.pin}</span>
                </span>
              </p>
            </div>

            {/* Map Preview Box */}
              <div className="overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] shadow-md">
              <iframe
                title={`PSARA Consultant India ${hq.city} Location`}
                src={hq.mapEmbed}
                className="h-44 w-full border-0 grayscale-[20%] contrast-125 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Other Regional Desks */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] block" style={{ fontFamily: "var(--font-body)" }}>
                Key Regional Desks
              </span>
              <div className="grid grid-cols-2 gap-2">
                {OFFICES.filter((o) => !o.isHQ)
                  .slice(0, 4)
                  .map((o) => (
                    <div key={o.city} className="p-3 rounded-xl border border-white/10 bg-[#14102A] text-xs">
                      <strong className="font-bold text-white block">{o.city}</strong>
                      <span className="text-[10px] text-[#94A3B8]">{o.badge}</span>
                    </div>
                  ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#D4AF37] hover:underline"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>View All 8+ Physical Desks</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Highlighted Light Form Card */}
          <div className="lg:col-span-7 rounded-3xl border border-[#E5DDF3] bg-gradient-to-b from-[#FDFCFF] to-[#F3EEFB] p-7 md:p-10 shadow-2xl text-[#0F172A]">
            <div className="flex items-center justify-between pb-5 border-b border-[#E5DDF3] mb-6">
              <div>
                <span className="badge-navy mb-2">
                  Direct Statutory Advisory Support
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0A213D]" style={{ fontFamily: "var(--font-display)" }}>
                  Get PSARA Statutory Advisory Support
                </h3>
              </div>
              <span className="hidden md:block font-mono text-xs font-bold tracking-widest text-slate-400" aria-hidden>
                FORM-01
              </span>
            </div>

            <p className="mb-6 text-sm font-normal leading-relaxed text-[#334155]">
              Submit your company details for immediate state checklist generation, training MOU format review, and transparent statutory fee calculations.
            </p>

            {/* Standardized Short Lead Form on Light Surface */}
            <ContactForm formType="Homepage Advisory Lead" variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
