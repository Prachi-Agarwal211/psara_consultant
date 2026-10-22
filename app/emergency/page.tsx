import type { Metadata } from "next";
import { GlassCard } from "../../components/v3/PagePrimitives";
import { Phone, AlertTriangle, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { CONTACT } from "../../lib/config";
import { buildWhatsAppUrl, TEL_HREF } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "24/7 Urgent PSARA Renewal & Inspection Emergency Desk",
  "Urgent PSARA License assistance: Expiry threats, Controlling Authority show-cause notices, police inspection queries, and tender disqualification rescue.",
  "/emergency",
  ["urgent psara renewal", "psara license emergency", "psara notice response"]
);

export default function EmergencyPage() {
  return (
    <StageShell showCta={false}>
      <PageHero
        title="24/7 Urgent PSARA Inspection & Notice Desk"
        lead="Facing sudden Controlling Authority inspection queries, license expiry threats, or tender disqualification? Direct emergency hotline for security agency promoters."
        crumbs={[{ label: "Emergency Desk" }]}
      />

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Emergency Alert Box */}
          <GlassCard className="p-6 md:p-8 flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Facing Notice or Impending License Expiry?
              </h2>
              <p className="text-base md:text-sm text-red-200 leading-relaxed font-normal">
                Operating past PSARA expiration or failing to reply to a Controlling Authority show-cause notice within statutory timelines puts your agency at risk of immediate blacklisting and criminal prosecution under Section 20 of the PSARA Act.
              </p>
            </div>
          </GlassCard>

          {/* Rapid Interventions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 space-y-2">
              <Clock className="h-6 w-6 text-[#FF7A00] mb-2" />
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Same-Day Renewal Refiling</h3>
              <p className="text-base text-[#CBD5E1] leading-relaxed font-normal">Fast-track re-submission of Form-I renewal applications with temporary acknowledgement receipt generation.</p>
            </GlassCard>

            <GlassCard className="p-6 space-y-2">
              <ShieldCheck className="h-6 w-6 text-[#FF7A00] mb-2" />
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Police Inspection Audit Prep</h3>
              <p className="text-base text-[#CBD5E1] leading-relaxed font-normal">Immediate pre-audit of register entries, guard antecedent logs, and office proofs before physical SP/CP visits.</p>
            </GlassCard>
          </div>

          {/* Call & WhatsApp CTAs Card */}
          <GlassCard className="space-y-4 p-8 text-center">
            <span className="badge-metallic-gold mb-1">
              Immediate Statutory Intervention
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Call the Emergency Advisory Hotline
            </h2>
            <p className="text-base sm:text-sm text-[#E2E8F0] font-normal max-w-lg mx-auto">
              Available for immediate compliance rescue, notice responses, and expedited police clearances.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 pt-2">
              <a
                href={TEL_HREF}
                className="btn-gold-editorial"
              >
                <Phone className="h-4 w-4" />
                <span>Call {CONTACT.phoneDisplay} Now</span>
              </a>
              <a
                href={buildWhatsAppUrl("URGENT: Need emergency PSARA help")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Urgent Desk</span>
              </a>
            </div>
          </GlassCard>
        </div>
      </PageMain>
    </StageShell>
  );
}
