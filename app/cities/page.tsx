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
        title="PSARA help near your market"
        lead={`${CITIES.length} city pages for local search intent — each linked to its State guide.`}
        crumbs={[{ label: "Cities" }]}
      />
      <PageMain>
        {/* City list with multi-column layout */}
        <div className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {sorted.map((c) => (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              className="group mb-2 block break-inside-avoid border-b border-[var(--line)] py-2.5 text-sm font-bold text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors"
            >
              <span className="group-hover:translate-x-1 inline-block transition-transform">
                {c.name}
              </span>
              <span className="ml-2 text-[0.55rem] font-semibold text-[var(--gold)] opacity-60">
                {c.stateName}
              </span>
            </Link>
          ))}
        </div>

        <CtaBar title="Need help in your city?" subtitle="Call or WhatsApp — we have field desks across major Indian cities." />
      </PageMain>
    </>
  );
}
