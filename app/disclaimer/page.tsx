import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { SITE } from "../../lib/config";

export const metadata: Metadata = {
  ...pageMeta(
    "Disclaimer",
    `Disclaimer for ${SITE.name} informational content and State fee references.`,
    "/disclaimer"
  ),
  robots: { index: false, follow: true },
};

export default function DisclaimerPage() {
  return (
    <StageShell>
      <PageHero
        title="Disclaimer"
        lead="Informational content & statutory advisory notice."
        crumbs={[{ label: "Disclaimer" }]}
      />
      <PageMain>
        <Prose className="v3-legal mx-auto">
          <div className="v3-legal-section">
            <h2 className="text-xl font-bold text-[var(--gold)]">Independent Advisory Practice</h2>
            <p className="text-sm font-medium leading-relaxed text-[var(--cream)]">
              {SITE.name} is a private consultancy practice specializing in PSARA documentation, MOU facilitation, and compliance liaison. We are not a government department and do not issue official licenses directly.
            </p>
          </div>

          <div className="v3-legal-section">
            <h3 className="text-base font-bold text-[var(--cream)]">Statutory Notifications & Fee Updates</h3>
            <p className="text-base font-medium leading-relaxed text-[var(--text-dim)]">
              State fees, procedural guidelines, portal links, and timelines cited across this platform are indicative and subject to periodic government notifications. Applicants should confirm current state rules with the Controlling Authority prior to formal dossier submission.
            </p>
          </div>
        </Prose>
      </PageMain>
    </StageShell>
  );
}
