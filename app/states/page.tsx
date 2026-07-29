import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "../../data/states";
import { PageHero, PageMain } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "PSARA License by State",
  "State-wise PSARA License guides for all major States & UTs — Controlling Authority, process, training MOU and local cities.",
  "/states"
);

export default function StatesHubPage() {
  return (
    <>
      <PageHero
        roman="III"
        eyebrow="States"
        title="PSARA License across India"
        lead={`${STATES.length} State & UT guides with Controlling Authority context, timelines, and city links.`}
        crumbs={[{ label: "States" }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              className="border border-[var(--line)] p-5 transition-colors hover:border-[var(--gold)]/50"
            >
              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                {s.name}
              </p>
              <p className="mt-1 text-xs font-bold text-[var(--gold)]">{s.capital}</p>
              <p className="mt-2 text-xs font-semibold text-[var(--cream-dim)] line-clamp-2">
                {s.authority}
              </p>
            </Link>
          ))}
        </div>
        <CtaBar title="Need a specific State filing?" />
      </PageMain>
    </>
  );
}
