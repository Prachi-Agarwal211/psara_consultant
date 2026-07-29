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
        eyebrow="Legal"
        title="Disclaimer"
        lead="Informational content only — verify with official sources."
        crumbs={[{ label: "Disclaimer" }]}
      />
      <PageMain>
        <Prose>
          <p>
            State fees, timelines, and procedural notes on this site are indicative and may change
            without notice. Always confirm with the relevant Controlling Authority and official
            notifications before acting.
          </p>
          <p>
            {SITE.name} is a consultancy practice; we are not a government department and do not
            issue licences ourselves.
          </p>
        </Prose>
      </PageMain>
    </>
  );
}
