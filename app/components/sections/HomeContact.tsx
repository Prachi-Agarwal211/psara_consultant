"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import ContactForm from "../../../components/ContactForm";
import { CONTACT, OFFICES } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { lineByLineReveal } from "../../lib/gsap";

export default function HomeContact() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  useEffect(() => {
    if (headingRef.current) lineByLineReveal(headingRef.current);
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFEF9] via-[#FBF7F0] to-[#FFFDF5] text-[#0F3C65] py-20 lg:py-28"
    >
      {/* Soft ambient background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FFF2BA] blur-3xl" />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C] block mb-2" style={{ fontFamily: "var(--font-body)" }}>
            ( DIRECT CONSULTATION )
          </span>
          <h2 ref={headingRef} className="text-4xl sm:text-5xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
            Start a File <span className="text-[#C89B3C]">With Us</span>
          </h2>
          <p className="mt-3 text-base text-[#334E68] leading-relaxed font-medium" style={{ fontFamily: "var(--font-body)" }}>
            Structured enquiry opens WhatsApp with your details so our team can reply with a State-specific checklist. Or call during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Helpline & Details */}
          <div className="space-y-6 lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F3C65] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#0A233F] transition-all shadow-md"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Phone className="h-4 w-4 text-[#FFF2BA]" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] bg-[#25D366] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-emerald-600 transition-all shadow-xl"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            {/* Contact detail card */}
            <div className="relative space-y-4 rounded-3xl border-2 border-[#0F3C65]/15 bg-white p-6 text-sm shadow-xl backdrop-blur-md">
              <p className="flex items-center gap-3 text-[#0F3C65] font-medium">
                <Mail className="h-5 w-5 shrink-0 text-[#C89B3C]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#C89B3C] font-black transition-colors">
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-start gap-3 text-[#334E68] font-medium">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C89B3C]" />
                <span>{CONTACT.hours}</span>
              </p>
              <p className="flex items-start gap-3 text-[#334E68] font-medium">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C89B3C]" />
                <span>
                  <strong className="text-[#0F3C65] font-black uppercase tracking-wider block">HQ · {hq.city}</strong>
                  <span className="text-xs text-[#486581] font-medium">{hq.address}, {hq.pin}</span>
                </span>
              </p>
            </div>

            {/* Map Box */}
            <div className="overflow-hidden rounded-2xl border-2 border-[#0F3C65]/15 shadow-md">
              <iframe
                title={`PSARA Consultant India ${hq.city} map`}
                src={hq.mapEmbed}
                className="h-44 w-full border-0 grayscale-[25%] contrast-125 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Other desks */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C89B3C]" style={{ fontFamily: "var(--font-body)" }}>
                Other Desks
              </p>
              <div className="space-y-2">
                {OFFICES.filter((o) => !o.isHQ)
                  .slice(0, 4)
                  .map((o) => (
                    <div key={o.city} className="flex items-center justify-between p-3 rounded-xl border border-[#0F3C65]/15 bg-[#EBF3FA] text-xs">
                      <span className="font-black uppercase tracking-wider text-[#0F3C65]">{o.city}</span>
                      <span className="font-mono text-[10px] font-bold text-[#0F3C65] bg-[#FFF2BA] border border-[#C89B3C]/40 px-2 py-0.5 rounded">{o.badge}</span>
                    </div>
                  ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 pt-2 text-xs font-black uppercase tracking-[0.18em] text-[#0F3C65] hover:text-[#C89B3C] transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>All offices &amp; full contact page</span>
                <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Free Consultation Form Card */}
          <div className="relative lg:col-span-7 rounded-3xl border-2 border-[#C89B3C]/50 bg-white p-7 md:p-10 shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-[#0F3C65]/15 mb-6">
              <div>
                <span className="inline-block rounded-lg border border-[#C89B3C] bg-[#FFF2BA] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#0F3C65] mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  ( FREE CONSULTATION )
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
                  Free PSARA Consultation Form
                </h3>
              </div>
              <span className="hidden md:block font-mono text-xs font-black tracking-widest text-[#C89B3C]" aria-hidden>FORM-01</span>
            </div>
            <p className="mb-6 text-sm font-medium leading-relaxed text-[#334E68]">
              Fill the form — we open WhatsApp with your details so the licensing desk can reply with a
              state checklist. Same pattern as our sister desk ops.
            </p>
            <ContactForm formType="Homepage Consultation" variant="light" />
            <p className="mt-4 text-center text-xs font-bold text-[#486581]">
              WhatsApp to {CONTACT.phoneDisplay} · Landline {CONTACT.landlineDisplay}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
