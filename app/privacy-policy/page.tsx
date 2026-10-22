import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { SITE, CONTACT } from "../../lib/config";

export const metadata: Metadata = {
  ...pageMeta(
    "Privacy Policy",
    `Privacy Policy for ${SITE.name}. How we handle enquiry data and WhatsApp communications.`,
    "/privacy-policy"
  ),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <StageShell>
      <PageHero
        title="Privacy Policy"
        lead="How we collect and protect information when you consult with us."
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <PageMain>
        <Prose className="v3-legal mx-auto">
          <div className="v3-legal-section">
            <h2 className="text-xl font-bold text-[var(--gold)]">Information Commitment</h2>
            <p className="text-sm font-medium leading-relaxed text-[var(--cream)]">
              {SITE.name} (&quot;we&quot;) respects your privacy. Enquiries submitted through our website forms or WhatsApp triggers are strictly used to respond to your specific PSARA licensing, MOU, or compliance requirements.
            </p>
          </div>

          <div className="space-y-10">
            <div className="v3-legal-section">
              <h3 className="text-base font-bold text-[var(--cream)]">Data We Collect</h3>
              <p className="text-base font-medium leading-relaxed text-[var(--text-dim)]">
                Name, phone number, email address, company name, target operating state/city, and inquiry details voluntarily provided.
              </p>
            </div>

            <div className="v3-legal-section">
              <h3 className="text-base font-bold text-[var(--cream)]">How We Use Data</h3>
              <p className="text-base font-medium leading-relaxed text-[var(--text-dim)]">
                To conduct document audits, sequence Controlling Authority filings, and send direct consultation replies. We never sell or transfer user data to third parties.
              </p>
            </div>
          </div>

          <div className="v3-legal-section">
            <h3 className="text-base font-bold text-[var(--cream)]">Direct Inquiries & Rights</h3>
            <p className="text-base font-medium text-[var(--text-dim)]">
              For data access or deletion requests, contact our team directly: <strong className="text-[var(--gold)]">{CONTACT.email}</strong> or call <strong>{CONTACT.phoneDisplay}</strong>.
            </p>
          </div>
        </Prose>
      </PageMain>
    </StageShell>
  );
}
