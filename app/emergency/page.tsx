import type { Metadata } from "next";
import { Phone, AlertTriangle, ShieldCheck, Clock } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { CONTACT } from "../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "24/7 Urgent PSARA Renewal & Inspection Emergency Desk",
  "Urgent PSARA License assistance: Expiry threats, Controlling Authority show-cause notices, police inspection queries, and tender disqualification rescue.",
  "/emergency",
  ["urgent psara renewal", "psara license emergency", "psara notice response"]
);

export default function EmergencyPage() {
  return (
    <StageShell>
      <PageHero
        title="24/7 Urgent PSARA Inspection &amp; Notice Desk"
        lead="Facing sudden Controlling Authority inspection queries, license expiry threats, or tender disqualification? Direct emergency hotline for security agency promoters."
        crumbs={[{ label: "Emergency Desk" }]}
      />

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Emergency Alert Box */}
          <div className="border border-[var(--signal-red)]/40 bg-[var(--signal-red)]/[0.06] p-6 md:p-8 flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-[var(--signal-red)] shrink-0 mt-1" />
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-2">
                Facing Notice or Impending License Expiry?
              </h2>
              <p className="text-xs md:text-sm text-[var(--signal-red)]/80 leading-relaxed">
                Operating past PSARA expiration or failing to reply to a Controlling Authority show-cause notice within statutory timelines puts your agency at risk of immediate blacklisting and criminal prosecution under Section 20 of the PSARA Act.
              </p>
            </div>
          </div>

          {/* Rapid Interventions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 bg-[var(--void-2)] p-6">
              <Clock className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white mb-2">Same-Day Renewal Refiling</h3>
              <p className="text-xs text-[var(--white-70)] leading-relaxed">Fast-track re-submission of Form-I renewal applications with temporary acknowledgement receipt generation.</p>
            </div>

            <div className="border border-white/10 bg-[var(--void-2)] p-6">
              <ShieldCheck className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white mb-2">Police Inspection Audit Prep</h3>
              <p className="text-xs text-[var(--white-70)] leading-relaxed">Immediate pre-audit of register entries, guard antecedent logs, and office proofs before physical SP/CP visits.</p>
            </div>
          </div>

          {/* Call & WhatsApp CTAs */}
          <div className="border border-[var(--gold)] p-8 text-center bg-[var(--gold-bg)] text-black">
            <span className="text-xs font-bold uppercase tracking-widest text-black/80">Immediate Action Required</span>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-black">
              Call the Emergency Advisory Hotline
            </h2>
            <p className="mt-2 text-xs text-black/80 font-semibold">
              Available 24 hours for urgent compliance interventions.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href={TEL_HREF} className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white">
                <Phone className="h-4 w-4" /> Call {CONTACT.phoneDisplay} Now
              </a>
              <a href={`${DEFAULT_WA}&text=URGENT:%20Need%20emergency%20PSARA%20help`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-black/10">
                WhatsApp Urgent Desk
              </a>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
