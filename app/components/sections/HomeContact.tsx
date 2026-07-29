"use client";

import { useEffect, useRef } from "react";
import { Phone, MessageSquare, Mail, MapPin, Clock } from "lucide-react";
import Chapter from "../layout/Chapter";
import ContactForm from "../../../components/ContactForm";
import { CONTACT, OFFICES } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { lineByLineReveal, ensureGsap, storyEnter } from "../../lib/gsap";
import CornerOrnament from "../ui/CornerOrnament";

export default function HomeContact() {
  const root = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  useEffect(() => {
    if (!root.current) return;
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      storyEnter(root.current!);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Chapter id="contact" tone="warm-dark">
      <div ref={root} className="binding-rail pl-0 md:pl-6">
        <div className="mb-10 max-w-2xl" data-story>
          <h2 ref={headingRef} className="display-xl text-[var(--cream)]">
            Start a File <span className="text-[var(--gold)]">With Us</span>
          </h2>
          <p className="body-copy mt-3 text-[var(--cream-warm)]">
            Structured enquiry opens WhatsApp with your details so our team can reply with a
            State-specific checklist. Or call and landline during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12" data-story>
          <div className="space-y-5 lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={TEL_HREF}
                className="btn-ghost inline-flex w-full justify-center gap-2 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex w-full justify-center gap-2 sm:w-auto"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <div className="relative space-y-3 border border-[var(--line-gold)] p-5 text-sm font-medium text-[var(--cream-warm)] rounded-[var(--radius)]"
                 style={{ backgroundColor: "var(--warm-dark-2, #241e16)" }}>
              {/* Corner ornament */}
              <CornerOrnament position="tr" opacity={0.5} />
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold)]">
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                {CONTACT.hours}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                <span>
                  <strong className="text-[var(--cream)]">HQ · Jaipur</strong>
                  <br />
                  {hq.address}, {hq.pin}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-bold uppercase tracking-wider">
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] underline"
                >
                  Facebook
                </a>
                <a
                  href={CONTACT.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] underline"
                >
                  YouTube
                </a>
                <a
                  href={hq.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] underline"
                >
                  Google Maps
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--line-gold)]">
              <iframe
                title="PSARA Consultant India Jaipur HQ map"
                src={hq.mapEmbed}
                className="h-48 w-full border-0 grayscale-[30%] contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)] pt-2">
              <p className="py-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                Other desks
              </p>
              {OFFICES.filter((o) => !o.isHQ)
                .slice(0, 5)
                .map((o) => (
                  <div key={o.city} className="py-3">
                    <p className="font-bold text-[var(--cream)]">
                      {o.city}{" "}
                      <span className="text-xs font-bold text-[var(--gold)]">{o.badge}</span>
                    </p>
                    <p className="text-xs font-medium text-[var(--text-dim)]">
                      {o.address}, {o.pin}
                    </p>
                  </div>
                ))}
              <a
                href="/contact"
                className="block py-3 text-xs font-bold text-[var(--gold)] underline"
              >
                All offices & full contact page →
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius)] border border-[var(--line-gold)] p-6 md:p-8 lg:col-span-7"
               style={{ backgroundColor: "var(--warm-dark-2, #241e16)" }}>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
              Free PSARA Consultation Form
            </h3>
            <p className="mt-2 text-sm font-medium text-[var(--cream-warm)]">
              Submit opens WhatsApp with a clean brief for our consultants. Email backup available on the same form.
            </p>
            <div className="mt-6">
              <ContactForm formType="Homepage Consultation" />
            </div>
            <p className="mt-4 text-center text-xs font-medium text-[var(--text-dim)]">
              WhatsApp to {CONTACT.phoneDisplay} · Landline {CONTACT.landlineDisplay}
            </p>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
