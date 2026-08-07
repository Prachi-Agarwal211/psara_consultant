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
      data-section-transition
      data-transition="fade"
      className="relative overflow-hidden section-void py-[var(--section-y)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,102,255,0.12) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 px-[var(--gutter)] max-w-[var(--page-max)] mx-auto">
        <div className="mb-10 max-w-2xl">
          <span className="meta-bracket mb-4 text-xs! text-[var(--gold)]! border-[var(--gold)]/30! inline-block" style={{ fontFamily: "var(--font-body)" }}>
            ( CONSULTATION )
          </span>
          <h2 ref={headingRef} className="display-mega text-white font-bold mt-4" style={{ fontFamily: "var(--font-display)" }}>
            Start a File <span className="text-metal">With Us</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--white-70)] leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-body)" }}>
            Structured enquiry opens WhatsApp with your details so our team can reply with a State-specific checklist. Or call during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          <div className="space-y-5 lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={TEL_HREF}
                className="btn-ghost inline-flex w-full justify-center gap-2 sm:w-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Phone className="h-4 w-4" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex w-full justify-center gap-2 sm:w-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Desk
              </a>
            </div>

            {/* Contact detail card */}
            <div className="relative space-y-3 border border-white/10 bg-white/[0.02] p-5 text-sm">
              <p className="flex items-center gap-2.5 text-[var(--white-70)]">
                <Mail className="h-4 w-4 shrink-0 text-[var(--gold-bright)]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold-bright)] transition-colors">
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-start gap-2.5 text-[var(--white-70)]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-bright)]" />
                {CONTACT.hours}
              </p>
              <p className="flex items-start gap-2.5 text-[var(--white-70)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-bright)]" />
                <span>
                  <strong className="text-white">HQ · {hq.city}</strong>
                  <br />
                  <span className="text-xs">{hq.address}, {hq.pin}</span>
                </span>
              </p>
            </div>

            {/* Map */}
            <div className="overflow-hidden border border-white/10">
              <iframe
                title={`PSARA Consultant India ${hq.city} map`}
                src={hq.mapEmbed}
                className="h-44 w-full border-0 grayscale-[35%] contrast-125 opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Other desks — office-line pattern */}
            <div className="pt-2">
              <p className="pb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]" style={{ fontFamily: "var(--font-body)" }}>
                Other Desks
              </p>
              {OFFICES.filter((o) => !o.isHQ)
                .slice(0, 4)
                .map((o) => (
                  <div key={o.city} className="office-line">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">{o.city}</span>
                    <span className="text-xs text-[var(--gold-bright)]">{o.badge}</span>
                    <span className="text-xs text-white/45">{o.address}, {o.pin}</span>
                  </div>
                ))}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold-bright)] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                All offices & full contact page <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Form card */}
          <div className="relative lg:col-span-7 border border-[var(--gold)]/30 bg-white/[0.02] p-6 md:p-9">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <span className="meta-bracket text-xs!" style={{ fontFamily: "var(--font-body)" }}>
                  ( FREE CONSULTATION )
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  Free PSARA Consultation Form
                </h3>
              </div>
              <span className="hidden md:block font-mono text-[0.55rem] tracking-[0.2em] text-white/25" aria-hidden>FORM-01</span>
            </div>
            <p className="mb-6 text-sm text-[var(--white-70)]">
              Submit opens WhatsApp with a clean brief for our consultants. Email backup available on the same form.
            </p>
            <ContactForm formType="Homepage Consultation" />
            <p className="mt-4 text-center text-xs text-[var(--white-40)]">
              WhatsApp to {CONTACT.phoneDisplay} · Landline {CONTACT.landlineDisplay}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
