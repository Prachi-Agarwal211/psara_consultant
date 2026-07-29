import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        title="PSARA License across India"
        lead={`${STATES.length} State & UT guides with Controlling Authority context, timelines, and city links.`}
        crumbs={[{ label: "States" }]}
      />
      <PageMain>
        {/* State cards in a clean grid with dossier styling */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              className="group relative border border-[var(--line)] p-5 transition-all duration-300 hover:border-[var(--line-gold)] hover:translate-y-[-2px]"
              style={{ backgroundColor: "color-mix(in srgb, var(--obsidian-2) 50%, transparent)" }}
            >
              {/* Number badge */}
              <span className="num-marker num-marker-sm absolute top-3 right-3 opacity-15 group-hover:opacity-30 transition-opacity">
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                {s.name}
              </p>
              <p className="mt-1 text-[0.55rem] font-bold uppercase tracking-wider text-[var(--gold)]">
                {s.capital}
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--text-dim)] line-clamp-2">
                {s.authority}
              </p>

              {/* Hover indicator */}
              <span className="mt-3 inline-flex items-center gap-1 text-[0.5rem] font-bold uppercase tracking-wider text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                View Guide <ArrowUpRight className="h-3 w-3" />
              </span>

              {/* Corner ornament on hover */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-transparent group-hover:border-[var(--gold)] transition-colors duration-500" aria-hidden />
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-transparent group-hover:border-[var(--gold)] transition-colors duration-500" aria-hidden />
            </Link>
          ))}
        </div>

        <CtaBar title="Need a specific State filing?" subtitle="We cover all 28 States and 8 UTs — call or WhatsApp for your jurisdiction." />
      </PageMain>
    </>
  );
}
