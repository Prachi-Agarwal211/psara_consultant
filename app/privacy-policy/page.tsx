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
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How we collect and use information when you contact us."
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <PageMain>
        <Prose>
          <p>
            {SITE.name} (&quot;we&quot;) respects your privacy. Enquiries submitted through forms are
            used to respond via WhatsApp, phone, or email regarding PSARA and related services.
          </p>
          <h2>Data we collect</h2>
          <p>Name, phone, email, company, location, and message content you voluntarily provide.</p>
          <h2>How we use it</h2>
          <p>To respond to consultations, prepare proposals, and improve our services. We do not sell personal data.</p>
          <h2>Contact</h2>
          <p>
            Questions: <strong>{CONTACT.email}</strong> · {CONTACT.phoneDisplay}
          </p>
        </Prose>
      </PageMain>
    </>
  );
}
