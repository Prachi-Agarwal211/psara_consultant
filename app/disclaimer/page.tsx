import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
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
    <>
      <PageHero
        title="Disclaimer"
        lead="Informational content & statutory advisory notice."
        crumbs={[{ label: "Disclaimer" }]}
      />
      <PageMain>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="border border-[var(--line-gold)] bg-[var(--obsidian-soft)] p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[var(--gold)]">Independent Advisory Practice</h2>
            <p className="text-sm font-medium leading-relaxed text-[var(--cream)]">
              {SITE.name} is a private consultancy practice specializing in PSARA documentation, MOU facilitation, and compliance liaison. We are not a government department and do not issue official licenses directly.
            </p>
          </div>

          <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
            <h3 className="text-base font-bold text-[var(--cream)]">Statutory Notifications & Fee Updates</h3>
            <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">
              State fees, procedural guidelines, portal links, and timelines cited across this platform are indicative and subject to periodic government notifications. Applicants should confirm current state rules with the Controlling Authority prior to formal dossier submission.
            </p>
          </div>
        </div>
      </PageMain>
    </>
  );
}
