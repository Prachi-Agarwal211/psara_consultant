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
        title="Start a file with us"
        lead="Call, WhatsApp, or send a structured enquiry — we reply with next steps for your State, coverage, and document gaps."
        crumbs={[{ label: "Contact" }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Contact Info */}
          <div className="space-y-6 lg:col-span-5">
            {/* CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={TEL_HREF} className="btn-gold inline-flex w-full justify-center gap-2 sm:w-auto">
                <Phone className="h-4 w-4" /> Call {CONTACT.phoneDisplay}
              </a>
              <a href={`tel:${CONTACT.landlineRaw}`} className="btn-emerald inline-flex w-full justify-center gap-2 sm:w-auto">
                <Phone className="h-4 w-4" /> Landline {CONTACT.landlineDisplay}
              </a>
              <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-emerald inline-flex w-full justify-center gap-2 sm:w-auto">
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            {/* Contact details card */}
            <div className="relative border border-[var(--line)] p-5 overflow-hidden">
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
              <div className="space-y-3 text-sm font-medium">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold)] transition-colors">
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
                    <strong className="text-[var(--cream)]">HQ:</strong> {hq.address}, {hq.pin}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4 mt-4 border-t border-[var(--line)]">
                <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-[0.55rem] font-bold uppercase tracking-wider text-[var(--gold)] hover:text-[var(--gold-soft)] transition-colors">
                  Facebook
                </a>
                <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer"
                  className="text-[0.55rem] font-bold uppercase tracking-wider text-[var(--gold)] hover:text-[var(--gold-soft)] transition-colors">
                  YouTube
                </a>
                <a href={CONTACT.social.google} target="_blank" rel="noopener noreferrer"
                  className="text-[0.55rem] font-bold uppercase tracking-wider text-[var(--gold)] hover:text-[var(--gold-soft)] transition-colors">
                  Google Maps
                </a>
              </div>
            </div>

            {/* Office list */}
            <div className="divide-y divide-[var(--line)] border-t border-[var(--line)] pt-4">
              <p className="pb-3 text-[0.55rem] font-bold uppercase tracking-wider text-[var(--gold)]">
                Offices
              </p>
              {OFFICES.map((o) => (
                <div key={o.city} className="py-4 group">
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                    {o.city}
                  </p>
                  <p className="label-meta font-bold text-[var(--emerald)]">{o.badge}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-dim)]">
                    {o.address}, {o.pin}
                  </p>
                  <a href={o.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[0.55rem] font-bold text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Open in Google Maps →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="space-y-6 lg:col-span-7">
            <div className="relative border border-[var(--line-gold)] p-6 md:p-8"
              style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
            >
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[var(--gold)] opacity-30" aria-hidden />

              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
                Contact form
              </h2>
              <p className="mt-2 text-sm font-medium text-[var(--text-dim)]">
                Structured enquiry — opens WhatsApp with your details, or use email as backup.
              </p>
              <div className="mt-6">
                <ContactForm formType="Contact Page Enquiry" />
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
