import type { Metadata } from "next";
import { STATES } from "../../data/states";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import StatePortalView from "../components/sections/StatePortalView";

export const metadata: Metadata = pageMeta(
  "PSARA License by State",
  "State-wise PSARA License guides for all major States & UTs — Controlling Authority, process, training MOU and local cities.",
  "/states"
);

export default function StatesHubPage() {
  return (
    <StageShell>
      <PageHero
        title="PSARA License across India"
        lead={`${STATES.length} State & UT guides with Controlling Authority context, timelines, and city links.`}
        crumbs={[{ label: "States" }]}
        kicker="The India jurisdiction index"
        meta="36 STATES & UTs · ONE COMPLIANCE DESK"
      />
      <PageMain>
        <StatePortalView />
      </PageMain>
    </StageShell>
  );
}
