import type { Metadata } from "next";
import { GlassCard } from "../../components/v3/PagePrimitives";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import ContactForm from "../../components/ContactForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, OFFICES, SITE } from "../../lib/config";
import { TEL_HREF, DEFAULT_WA } from "../../lib/whatsapp";
import { Phone, MessageSquare, Mail, MapPin, ShieldCheck } from "lucide-react";
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

      <PageMain className="v3-contact">
        {/* Contact Info Header Grid */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={TEL_HREF}
            className="v3-glass v3-contact-card flex items-center gap-4 p-6 hover:border-[#FF7A00]"
          >
            <div className="shrink-0 p-3.5 rounded-xl text-[#FFFFFF]" style={{ background: "var(--grad-gold-metallic)", boxShadow: "inset 0 1px 0 rgba(255,250,230,0.8)" }}>
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FFB25E]">
                Direct Helpline
              </span>
              <span className="text-base font-bold text-white">{CONTACT.phoneDisplay}</span>
              <span className="block text-[10px] text-[#94A3B8] font-medium">Mon–Sat: 9:30 AM – 6:30 PM</span>
            </div>
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="v3-glass v3-contact-card flex items-center gap-4 p-6 hover:border-[#046A38]"
          >
            <div className="shrink-0 p-3.5 rounded-xl bg-[#046A38] text-white">
              <MessageSquare className="h-6 w-6 fill-white" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FFB547]">
                WhatsApp Desk
              </span>
              <span className="text-base font-bold text-white">Instant Consultation</span>
              <span className="block text-[10px] text-[#94A3B8] font-medium">Average response: &lt; 15 mins</span>
            </div>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="v3-glass v3-contact-card flex items-center gap-4 p-6 hover:border-[#FF7A00]"
          >
            <div className="shrink-0 p-3.5 rounded-xl text-[#FFFFFF]" style={{ background: "var(--grad-gold-metallic)", boxShadow: "inset 0 1px 0 rgba(255,250,230,0.8)" }}>
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FFB25E]">
                Official Email
              </span>
              <span className="break-all text-sm font-bold text-white">{CONTACT.email}</span>
              <span className="block text-[10px] text-[#94A3B8] font-medium">Statutory document reviews</span>
            </div>
          </a>
        </div>

        {/* Main Form & Office Cards Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-20 items-start">
          {/* Highlighted Light Card Form */}
          <div
            className="v3-contact-form rounded-2xl lg:col-span-7 p-7 md:p-10 text-[#0F172A]"
            style={{ background: "linear-gradient(145deg, #FFFDF5 0%, #F5F0E3 100%)" }}
          >
            <div className="flex items-center justify-between pb-5 border-b border-slate-200 mb-6">
              <div>
                <span className="inline-block rounded-lg border border-[#E76F00]/35 bg-[#E76F00]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B35400] mb-2">
                  Direct Advisory Support
                </span>
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#0F172A]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Get PSARA Statutory Advisory Support
                </h2>
              </div>
              <span className="hidden md:block font-mono text-xs font-bold tracking-widest text-slate-400">
                FORM-01
              </span>
            </div>

            <p className="mb-6 text-sm text-[#334155] leading-relaxed">
              Submit your company details for immediate state checklist generation, training MOU format review, and transparent statutory fee calculations.
            </p>

            <ContactForm formType="Contact Page Lead" variant="light" />
          </div>

          {/* Right Column: Physical Offices */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFB25E] mb-2">
              <ShieldCheck className="h-4 w-4 text-[#FF7A00]" /> Physical Office Network
            </div>

            {OFFICES.map((o) => (
              <GlassCard key={o.city} className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                    <MapPin className="h-4 w-4 text-[#FF7A00]" />
                    {o.city} {o.badge}
                  </h3>
                  {o.isHQ && (
                    <span className="rounded-lg bg-[#FF7A00]/20 border border-[#FF7A00]/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FFB25E]">
                      Headquarters
                    </span>
                  )}
                </div>
                <p className="mt-2 text-base text-[#E2E8F0] font-normal leading-relaxed">{o.address}</p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8] font-bold">
                  <span>Phone: {o.phone}</span>
                  <a href={TEL_HREF} className="text-[#FFB25E] font-bold hover:underline">Call Desk &rarr;</a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Location Map Section */}
        <section className="border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFB25E]">Google Business Profile</span>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Visit Jaipur Headquarters &amp; Regional Locations
            </h2>
            <p className="text-base text-[#CBD5E1]">
              Verified business profile across Google Maps with real client ratings and directions.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-xl h-96">
            <iframe
              title="PSARA Consultant Jaipur Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.067469273516!2d75.7275813!3d26.9330279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db34571cb6013%3A0x86bbdbb5d5cf2027!2sCapital%20Galleria%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
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
