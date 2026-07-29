import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
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
    <>
      <PageHero
        title="Privacy Policy"
        lead="How we collect and protect information when you consult with us."
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <PageMain>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border border-[var(--line-gold)] bg-[var(--obsidian-soft)] p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[var(--gold)]">Information Commitment</h2>
            <p className="text-sm font-medium leading-relaxed text-[var(--cream)]">
              {SITE.name} (&quot;we&quot;) respects your privacy. Enquiries submitted through our website forms or WhatsApp triggers are strictly used to respond to your specific PSARA licensing, MOU, or compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
              <h3 className="text-base font-bold text-[var(--cream)]">Data We Collect</h3>
              <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">
                Name, phone number, email address, company name, target operating state/city, and inquiry details voluntarily provided.
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
              <h3 className="text-base font-bold text-[var(--cream)]">How We Use Data</h3>
              <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">
                To conduct document audits, sequence Controlling Authority filings, and send direct consultation replies. We never sell or transfer user data to third parties.
              </p>
            </div>
          </div>

          <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-2">
            <h3 className="text-base font-bold text-[var(--cream)]">Direct Inquiries & Rights</h3>
            <p className="text-xs font-medium text-[var(--text-dim)]">
              For data access or deletion requests, contact our team directly: <strong className="text-[var(--gold)]">{CONTACT.email}</strong> or call <strong>{CONTACT.phoneDisplay}</strong>.
            </p>
          </div>
        </div>
      </PageMain>
    </>
  );
}
