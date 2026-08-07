import type { Metadata } from "next";
import { CITIES } from "../../data/cities";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "PSARA License by City",
  `City-wise PSARA consultants and license guidance across ${CITIES.length}+ Indian cities.`,
  "/cities"
);

import CityExplorerView from "../components/sections/CityExplorerView";

export default function CitiesHubPage() {
  return (
    <StageShell>
      <PageHero
        title="PSARA help near your market"
        lead={`${CITIES.length} city pages for local search — each linked to its State guide.`}
        crumbs={[{ label: "Cities" }]}
      />
      <PageMain>
        <CityExplorerView />
      </PageMain>
    </StageShell>
  );
}
