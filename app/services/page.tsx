import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageMain } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import { pageMeta } from "../../lib/metadata";
import { SERVICES } from "../../data/services";

export const metadata: Metadata = pageMeta(
  "Services",
  "PSARA License, company registration, training MOU, police verification, GST, MSME, labour compliance and more.",
  "/services"
);

export default function ServicesHubPage() {
  return (
    <>
      <PageHero
        roman="V"
        eyebrow="Services"
        title="What we hold for security agencies"
        lead="From first PSARA filing to multi-state expansion — dossier craft, not commodity checklists."
        crumbs={[{ label: "Services" }]}
      />
      <PageMain>
        <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid grid-cols-1 gap-2 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:items-baseline md:gap-6 md:px-2"
            >
              <span className="roman text-base font-bold md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] group-hover:text-[var(--gold-soft)] md:col-span-4">
                {s.title}
              </span>
              <span className="text-sm font-semibold text-[var(--cream-dim)] md:col-span-7">
                {s.short}
              </span>
            </Link>
          ))}
        </div>
        <CtaBar />
      </PageMain>
    </>
  );
}
