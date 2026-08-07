import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import ContactForm from "../../components/ContactForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, OFFICES, SITE } from "../../lib/config";
import { TEL_HREF, DEFAULT_WA } from "../../lib/whatsapp";
import { Phone, MessageSquare, Mail, MapPin } from "lucide-react";
import JsonLd from "../../components/JsonLd";
import { localBusinessJsonLd } from "../../lib/seo-content";

export const metadata: Metadata = pageMeta(
  "Contact PSARA Consultant — Regional Offices & Advisory Desk",
  `Contact ${SITE.name} for PSARA licensing, training MOUs, and police verification. Call ${CONTACT.phoneDisplay} or visit our Jaipur, Delhi NCR, and Mumbai offices.`,
  "/contact"
);

export default function ContactPage() {
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  return (
    <StageShell>
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
        title="Start Your PSARA Application Dossier"
        lead="Direct access to senior statutory licensing advisors across Jaipur HQ, Delhi NCR, and Mumbai desks. Structured consultation with next-step document roadmaps."
        crumbs={[{ label: "Contact Us" }]}
      />

      <PageMain>
        {/* Contact Info Header Grid */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={TEL_HREF}
            className="flex items-center gap-4 border border-white/10 bg-[var(--void-2)] p-6 transition-colors duration-200 hover:border-[var(--gold)]"
          >
            <div className="p-3 rounded bg-[var(--gold)]/10 text-[var(--gold-bright)]">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                Direct Helpline
              </span>
              <span className="text-base font-bold text-white">{CONTACT.phoneDisplay}</span>
              <span className="block text-[10px] text-[var(--white-55)]">Mon–Sat: 9:30 AM – 6:30 PM</span>
            </div>
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-white/10 bg-[var(--void-2)] p-6 transition-colors duration-200 hover:border-[var(--gold)]"
          >
            <div className="p-3 rounded bg-[var(--gold)]/10 text-[var(--gold-bright)]">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                WhatsApp Desk
              </span>
              <span className="text-base font-bold text-white">Instant Consultation</span>
              <span className="block text-[10px] text-[var(--white-55)]">Average response: &lt; 15 mins</span>
            </div>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-4 border border-white/10 bg-[var(--void-2)] p-6 transition-colors duration-200 hover:border-[var(--gold)]"
          >
            <div className="p-3 rounded bg-[var(--gold)]/10 text-[var(--gold-bright)]">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                Official Email
              </span>
              <span className="text-sm font-bold text-white">{CONTACT.email}</span>
              <span className="block text-[10px] text-[var(--white-55)]">Statutory document reviews</span>
            </div>
          </a>
        </div>

        {/* Main Form & Office Cards Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20">
          <div className="lg:col-span-7">
            <div className="border border-[var(--gold)]/30 bg-[var(--void-2)] p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                Filing Request
              </span>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Submit Your State Licensing Inquiry
              </h2>
              <p className="mt-2 text-xs text-[var(--white-70)] mb-6">
                Fill in your company details to receive a state statutory fee quote, MOU format, and checklist.
              </p>
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)] block">
              Physical Office Network
            </span>

            {OFFICES.map((o) => (
              <div key={o.city} className="border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--gold-bright)]" />
                    {o.city} {o.badge}
                  </h3>
                  {o.isHQ && (
                    <span className="rounded bg-[var(--gold)]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--gold-bright)]">
                      Headquarters
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-[var(--white-70)] leading-relaxed">{o.address}</p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[var(--white-55)]">
                  <span>Phone: {o.phone}</span>
                  <a href={TEL_HREF} className="text-[var(--gold-bright)] font-bold hover:underline">Call Desk &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Business Profile & Map Section */}
        <section className="border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Google Business Profile</span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              Visit Jaipur Headquarters &amp; Regional Locations
            </h2>
            <p className="mt-2 text-xs text-[var(--white-70)]">
              Verified business profile across Google Maps with real client ratings and location directions.
            </p>
          </div>

          <div className="relative overflow-hidden border border-white/10 rounded h-96">
            <iframe
              title="PSARA Consultant Jaipur Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.067469273516!2d75.7275813!3d26.9330279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db34571cb6013%3A0x86bbdbb5d5cf2027!2sCapital%20Galleria%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "brightness(0.9) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
