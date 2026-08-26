import type { Metadata } from "next";
import { Phone, AlertTriangle, ShieldCheck, Clock, MessageSquare, Sparkles } from "lucide-react";
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

      <PageMain className="bg-[#080714] text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Emergency Alert Box */}
          <div className="rounded-3xl border border-red-500/40 bg-red-950/30 p-6 md:p-8 flex items-start gap-4 shadow-xl">
            <AlertTriangle className="h-8 w-8 text-red-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Facing Notice or Impending License Expiry?
              </h2>
              <p className="text-xs md:text-sm text-red-200 leading-relaxed font-normal">
                Operating past PSARA expiration or failing to reply to a Controlling Authority show-cause notice within statutory timelines puts your agency at risk of immediate blacklisting and criminal prosecution under Section 20 of the PSARA Act.
              </p>
            </div>
          </div>

          {/* Rapid Interventions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 shadow-md space-y-2">
              <Clock className="h-6 w-6 text-[#D4AF37] mb-2" />
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Same-Day Renewal Refiling</h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed font-normal">Fast-track re-submission of Form-I renewal applications with temporary acknowledgement receipt generation.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 shadow-md space-y-2">
              <ShieldCheck className="h-6 w-6 text-[#D4AF37] mb-2" />
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Police Inspection Audit Prep</h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed font-normal">Immediate pre-audit of register entries, guard antecedent logs, and office proofs before physical SP/CP visits.</p>
            </div>
          </div>

          {/* Call & WhatsApp CTAs Card */}
          <div className="rounded-3xl border border-[rgba(212,175,55,0.35)] bg-gradient-to-r from-[#14102A] via-[#0A1428] to-[#0E1B33] p-8 text-center shadow-2xl space-y-4">
            <span className="badge-metallic-gold mb-1">
              Immediate Statutory Intervention
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Call the Emergency Advisory Hotline
            </h2>
            <p className="text-xs sm:text-sm text-[#E2E8F0] font-normal max-w-lg mx-auto">
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
                href={`${DEFAULT_WA}&text=URGENT:%20Need%20emergency%20PSARA%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp Urgent Desk</span>
              </a>
            </div>
          </div>
        </div>
      </PageMain>
    </StageShell>
  );
}
