import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import ContactForm from "../../components/ContactForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, OFFICES, SITE } from "../../lib/config";
import { TEL_HREF, DEFAULT_WA } from "../../lib/whatsapp";
import { Phone, MessageSquare, Mail, MapPin, Clock } from "lucide-react";
import JsonLd from "../../components/JsonLd";
import { localBusinessJsonLd } from "../../lib/seo-content";

export const metadata: Metadata = pageMeta(
  "Contact",
  `Contact ${SITE.name} for PSARA License help. Call ${CONTACT.phoneDisplay} or WhatsApp. HQ Jaipur Capital Galleria · Delhi · Gurugram · Noida · Ahmedabad and more.`,
  "/contact"
);

export default function ContactPage() {
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  return (
    <>
      <JsonLd
        data={localBusinessJsonLd({
          name: SITE.name,
          description: SITE.description,
          url: `${SITE.url}/contact`,
          city: "Jaipur",
          state: "Rajasthan",
          lat: hq.lat,
          lng: hq.lng,
          address: hq.address,
          pin: hq.pin,
        })}
      />
      <PageHero
        roman="VII"
        eyebrow="Contact"
        title="Start a file with us"
        lead="Call, WhatsApp, or send a structured enquiry — we reply with next steps for your State, coverage, and document gaps."
        crumbs={[{ label: "Contact" }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={TEL_HREF}
                className="btn-gold inline-flex w-full justify-center gap-2 sm:w-auto"
              >
                <Phone className="h-4 w-4" /> Call {CONTACT.phoneDisplay}
              </a>
              <a
                href={`tel:${CONTACT.landlineRaw}`}
                className="btn-emerald inline-flex w-full justify-center gap-2 sm:w-auto"
              >
                <Phone className="h-4 w-4" /> Landline {CONTACT.landlineDisplay}
              </a>
              <a
                href={DEFAULT_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emerald inline-flex w-full justify-center gap-2 sm:w-auto"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            <div className="space-y-3 border border-[var(--line)] p-5 text-sm font-semibold text-[var(--cream-dim)]">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold-soft)]">
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
                  <strong className="text-[var(--cream)]">HQ:</strong> {hq.address},{" "}
                  {hq.pin}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-bold uppercase tracking-wider">
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold-soft)] underline"
                >
                  Facebook
                </a>
                <a
                  href={CONTACT.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold-soft)] underline"
                >
                  YouTube
                </a>
                <a
                  href={CONTACT.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold-soft)] underline"
                >
                  Google Maps
                </a>
              </div>
            </div>

            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)] pt-4">
              <p className="pb-3 text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                Offices
              </p>
              {OFFICES.map((o) => (
                <div key={o.city} className="py-4">
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                    {o.city}
                  </p>
                  <p className="label-meta font-bold text-[var(--emerald)]">{o.badge}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--cream-dim)]">
                    {o.address}, {o.pin}
                  </p>
                  <a
                    href={o.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-bold text-[var(--gold-soft)] underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div className="folio p-6 md:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
                Contact form
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--cream-dim)]">
                Structured enquiry — opens WhatsApp with your details, or use email as
                backup. Required fields marked *.
              </p>
              <div className="mt-6">
                <ContactForm formType="Contact Page Enquiry" />
              </div>
            </div>

            <div className="folio overflow-hidden rounded-xl border border-[var(--line-gold)]/40 p-1 bg-[var(--obsidian-card)]">
              <div className="p-4 border-b border-[var(--line)] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[var(--cream)] flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--gold-soft)]" /> Headquarters & Regional Desks
                  </h3>
                  <p className="text-xs text-[var(--cream)]/50">Capital Galleria, Sirsi Road, Kanakpura, Jaipur</p>
                </div>
                <a
                  href={CONTACT.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[var(--gold-soft)] underline"
                >
                  Full Map
                </a>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <iframe
                  title="PSARA Consultant Jaipur HQ Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.485123456789!2d75.7321!3d26.9345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU2JzA0LjIiTiA3NcKwNDMnNTUuNiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="h-full w-full border-0 filter brightness-90 contrast-110"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
