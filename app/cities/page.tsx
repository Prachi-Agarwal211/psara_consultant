import type { Metadata } from "next";
import Link from "next/link";
import { CITIES } from "../../data/cities";
import { PageHero, PageMain } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "PSARA License by City",
  `City-wise PSARA consultants and license guidance across ${CITIES.length}+ Indian cities.`,
  "/cities"
);

export default function CitiesHubPage() {
  const sorted = [...CITIES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <PageHero
        eyebrow="Cities"
        title="PSARA help near your market"
        lead={`${CITIES.length} city pages for local search intent — each linked to its State guide.`}
        crumbs={[{ label: "Cities" }]}
      />
      <PageMain>
        <div className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {sorted.map((c) => (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              className="mb-2 block break-inside-avoid border-b border-[var(--line)] py-2 text-sm font-bold text-[var(--cream-dim)] hover:text-[var(--gold-soft)]"
            >
              {c.name}
              <span className="ml-2 text-xs font-semibold text-[var(--gold)]/70">{c.stateName}</span>
            </Link>
          ))}
        </div>
        <CtaBar />
      </PageMain>
    </>
  );
}
