import type { Metadata } from "next";
import { STATES } from "../../data/states";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "PSARA License by State",
  "State-wise PSARA License guides for all major States & UTs — Controlling Authority, process, training MOU and local cities.",
  "/states"
);

import StatePortalView from "../components/sections/StatePortalView";

export default function StatesHubPage() {
  return (
    <StageShell>
      <PageHero
        title="PSARA License across India"
        lead={`${STATES.length} State & UT guides with Controlling Authority context, timelines, and city links.`}
        crumbs={[{ label: "States" }]}
        kicker="The India jurisdiction index"
        meta="28 STATES · 8 UNION TERRITORIES · ONE COMPLIANCE DESK"
      />
      <PageMain>
        <StatePortalView />
      </PageMain>
    </StageShell>
  );
}
