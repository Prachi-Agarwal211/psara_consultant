import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        title="What we hold for security agencies"
        lead="From first PSARA filing to multi-state expansion — dossier craft, not commodity checklists."
        crumbs={[{ label: "Services" }]}
      />
      <PageMain>
        {/* Services list with dossier card styling */}
        <div className="divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative grid grid-cols-1 gap-2 py-7 transition-all hover:pl-4 md:grid-cols-12 md:items-baseline md:gap-6 md:px-3"
            >
              {/* Numbered marker (Jasmine-style) */}
              <span className="num-marker num-marker-sm text-[var(--text-faint)] group-hover:text-[var(--gold)] transition-colors md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors md:col-span-4">
                {s.title}
              </span>

              {/* Description */}
              <span className="text-sm font-medium text-[var(--text-dim)] md:col-span-6">
                {s.short}
              </span>

              {/* Arrow icon */}
              <span className="hidden md:flex md:col-span-1 justify-end">
                <ArrowUpRight className="h-4 w-4 text-[var(--text-faint)] group-hover:text-[var(--gold)] transition-colors" />
              </span>

              {/* Bottom gold line on hover */}
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        <CtaBar title="Need a specific service?" subtitle="We handle every aspect of PSARA compliance — from documents to multi-state expansion." />
      </PageMain>
    </>
  );
}
