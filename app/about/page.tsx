import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import WhatsAppForm from "../../components/WhatsAppForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, OFFICES, SITE } from "../../lib/config";

import AboutDossierView from "../components/sections/AboutDossierView";

export const metadata: Metadata = pageMeta(
  "About Us",
  `About ${SITE.name} — pan-India PSARA licensing advisory with headquarters in Jaipur and desks across Delhi NCR, Gujarat, Madhya Pradesh, Uttar Pradesh, and more.`,
  "/about",
  ["PSARA consultant", "security agency licence experts", "PSARA Consultant India"]
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        roman="I"
        title="Built for trust in private security licensing"
        lead={`${SITE.name} helps entrepreneurs and companies obtain and maintain PSARA Licences with disciplined documentation, training MOUs, and police verification liaison.`}
        crumbs={[{ label: "About" }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-12">
            <AboutDossierView />
            <CtaBar title="Speak with our team" />
          </div>

          {/* Sidebar form with dossier card styling */}
          <div className="lg:col-span-5">
            <div className="relative border border-[var(--line-gold)] p-6 md:p-8"
              style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
            >
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--gold)] opacity-30" aria-hidden />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--gold)] opacity-30" aria-hidden />

              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--cream)]">
                About enquiry
              </h3>
              <p className="mt-2 text-sm font-medium text-[var(--text-dim)]">
                Send us a structured message — we reply with next steps.
              </p>
              <div className="mt-6">
                <WhatsAppForm formType="About Page Enquiry" />
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
