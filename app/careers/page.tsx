import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import JsonLd from "../../components/JsonLd";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, SITE } from "../../lib/config";
import { CAREERS } from "../../data/careers";
import { Briefcase, CheckCircle2, Send, MapPin, Building2, ChevronRight } from "lucide-react";

export const metadata: Metadata = pageMeta(
  "Careers & Open Positions — Join PSARA Regulatory Team",
  "Careers at PSARA Consultant India. Explore job openings for PSARA Legal Researchers, State Licensing Liaisons, and Regulatory Auditing Specialists.",
  "/careers",
  ["psara careers", "security legal jobs", "compliance officer hiring", "regulatory consultant jobs"]
);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Open Positions at PSARA Consultant India",
  numberOfItems: CAREERS.length,
  itemListElement: CAREERS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: `${SITE.url}/careers/${c.slug}`,
  })),
};

export default function CareersPage() {
  return (
    <StageShell>
      <JsonLd data={itemListSchema} />
      <PageHero
        title="Join India's Leading PSARA Regulatory Practice"
        lead="We are building a statutory compliance team for private security agencies. Explore career opportunities in regulatory law, police liaisoning, and compliance technology."
        crumbs={[{ label: "Careers" }]}
      />

      <PageMain>
        {/* Culture & Benefits */}
        <section className="mb-16 border-b border-white/10 pb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Work Culture</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-white">
            Why Build Your Career at PSARA Consultant?
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <Building2 className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">Deep State-Specific Domain Knowledge</h3>
              <p className="mt-2 text-xs text-[var(--white-70)] leading-relaxed">Work directly with senior industry veterans across 36 States &amp; UTs on high-impact statutory projects.</p>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <Briefcase className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">High-Growth Regulatory Tech</h3>
              <p className="mt-2 text-xs text-[var(--white-70)] leading-relaxed">Pioneer modern digital filing frameworks, automated verification systems, and state tracking portals.</p>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-6">
              <CheckCircle2 className="h-6 w-6 text-[var(--gold-bright)] mb-3" />
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">Competitive Performance Compensation</h3>
              <p className="mt-2 text-xs text-[var(--white-70)] leading-relaxed">Industry-leading salaries, project milestones bonuses, and professional development support.</p>
            </div>
          </div>
        </section>

        {/* Current Job Openings */}
        <section className="mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Open Positions</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-8">
            Explore Current Opportunities
          </h2>

          <div className="space-y-4">
            {CAREERS.map((j) => (
              <div key={j.slug} className="border border-white/10 bg-[var(--void-2)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200 hover:border-[var(--gold)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded bg-[var(--gold)]/20 px-2.5 py-0.5 text-[10px] font-bold text-[var(--gold-bright)] uppercase">{j.department}</span>
                    <span className="text-[11px] text-[var(--white-55)] flex items-center gap-1"><MapPin className="h-3 w-3 text-[var(--gold-bright)]" /> {j.locations.join(" · ")}</span>
                    <span className="text-[11px] text-[var(--white-55)]">· {j.type}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">{j.title}</h3>
                  <p className="mt-2 text-xs text-[var(--white-70)] max-w-3xl leading-relaxed">{j.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/careers/${j.slug}`}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                    style={{ background: "var(--grad-metal)", color: "var(--void)" }}
                  >
                    View Role <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Application for ${j.title}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-black transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General Application */}
        <section className="border border-[var(--gold)]/30 bg-[var(--void-2)] p-8 md:p-12 text-center">
          <Send className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Don&apos;t See a Matching Role?</h2>
          <p className="mt-2 text-xs text-[var(--white-70)] max-w-xl mx-auto">
            We are always looking for exceptional talent in security law, regulatory research, and government liaisoning. Send your CV directly to our HR team.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a href={`mailto:${CONTACT.email}?subject=Spontaneous Career Application`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              Email Resume to {CONTACT.email}
            </a>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
