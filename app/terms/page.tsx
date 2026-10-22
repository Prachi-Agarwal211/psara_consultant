import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
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
    <StageShell>
      <PageHero
        title="Terms & Conditions"
        lead="Website use and practice governance framework."
        crumbs={[{ label: "Terms" }]}
      />
      <PageMain>
        <Prose className="v3-legal mx-auto">
          <div className="v3-legal-section">
            <h2 className="text-xl font-bold text-[var(--gold)]">General Information Notice</h2>
            <p className="text-sm font-medium leading-relaxed text-[var(--cream)]">
              Content on this website is provided for general guidance on PSARA licensing, training institute MOUs, and police verification hygiene. Engagement terms for advisory services are executed separately via written agreement.
            </p>
          </div>

          <div className="space-y-10">
            <div className="v3-legal-section">
              <h3 className="text-base font-bold text-[var(--cream)]">Controlling Authority Discretion</h3>
              <p className="text-base font-medium leading-relaxed text-[var(--text-dim)]">
                Licence grants, inspection schedules, and final approvals rest solely with the notified Controlling Authority of the respective State. Indicative timelines are based on practice averages.
              </p>
            </div>

            <div className="v3-legal-section">
              <h3 className="text-base font-bold text-[var(--cream)]">Governing Jurisdiction</h3>
              <p className="text-base font-medium leading-relaxed text-[var(--text-dim)]">
                Governed by the laws of India. Any legal proceedings or disputes are subject to competent courts as defined in formal engagement contracts.
              </p>
            </div>
          </div>
        </Prose>
      </PageMain>
    </StageShell>
  );
}
