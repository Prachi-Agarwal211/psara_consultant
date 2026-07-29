import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import { pageMeta } from "../../lib/metadata";
import { SITE } from "../../lib/config";

export const metadata: Metadata = {
  ...pageMeta(
    "Terms & Conditions",
    `Terms of use for ${SITE.name} website and consultancy information.`,
    "/terms"
  ),
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lead="Website use and information disclaimer."
        crumbs={[{ label: "Terms" }]}
      />
      <PageMain>
        <Prose>
          <p>
            Content on this website is for general information on PSARA licensing and related
            services. It is not a substitute for formal legal advice. Engagement terms for paid
            consultancy are agreed separately in writing.
          </p>
          <h2>No guarantee of grant</h2>
          <p>
            Licence outcomes depend on Authority discretion, police verification, and applicant
            facts. Timelines are indicative.
          </p>
          <h2>Governing law</h2>
          <p>Laws of India. Disputes subject to competent courts as agreed in engagement letters.</p>
        </Prose>
      </PageMain>
    </>
  );
}
