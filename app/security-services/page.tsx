import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { STATES } from "../../data/states";

export const metadata: Metadata = pageMeta(
  "PSARA Security Services Directory — 36 States & UTs Index",
  "PAN India Security Agency PSARA Licensing Directory covering all 36 States, Union Territories, and 567+ Cities.",
  "/security-services",
  ["security services directory", "psara state directory", "india psara directory"]
);

export default function SecurityServicesDirectoryPage() {
  return (
    <StageShell>
      <PageHero
        title="PAN India PSARA Security Licensing Directory"
        lead="Comprehensive state-by-state statutory directory covering Controlling Authorities, Form-I requirements, fees, and police verification rules for all 36 States and UTs."
        crumbs={[{ label: "Security Services Directory" }]}
      />

      <PageMain>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATES.map((st) => (
            <Link
              key={st.slug}
              href={`/states/${st.slug}`}
              className="group border border-white/10 bg-[var(--void-2)] p-6 transition-colors duration-200 hover:border-[var(--gold)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)] flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> State Desk
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--white-40)] transition-transform group-hover:text-[var(--gold-bright)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white group-hover:text-[var(--gold-bright)] transition-colors">
                  {st.name}
                </h2>

                <p className="mt-2 text-xs text-[var(--white-70)] line-clamp-2">
                  Authority: {st.authority}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-[var(--white-55)]">{st.timeline} timeline</span>
                <span className="font-bold text-[var(--gold-bright)] group-hover:underline">View Rules &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </PageMain>
    </StageShell>
  );
}
