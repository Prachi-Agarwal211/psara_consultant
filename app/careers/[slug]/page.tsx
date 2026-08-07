import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  MapPin,
  Building2,
  Send,
  Clock,
  IndianRupee,
  ArrowLeft,
  Wifi,
} from "lucide-react";
import { PageHero, PageMain } from "../../../components/PageShell";
import StageShell from "../../components/ui/StageShell";
import JsonLd from "../../../components/JsonLd";
import { pageMeta } from "../../../lib/metadata";
import { CAREERS } from "../../../data/careers";
import { SITE, CONTACT } from "../../../lib/config";

export function generateStaticParams() {
  return CAREERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const career = CAREERS.find((c) => c.slug === slug);
  if (!career) return {};
  return pageMeta(
    `${career.title} — Careers at ${SITE.name}`,
    `${career.description} ${career.type} · ${career.department} · ${career.locations.join(", ")}. Apply now.`,
    `/careers/${career.slug}`,
    [career.title, "psara careers", "security compliance jobs"]
  );
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = CAREERS.find((c) => c.slug === slug);
  if (!career) notFound();

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: career.title,
    description: `${career.description} Responsibilities: ${career.responsibilities.join(" ")} Requirements: ${career.requirements.join(" ")}`,
    datePosted: career.postedAt,
    validThrough: career.validThrough,
    employmentType: career.type === "Contract" ? "CONTRACTOR" : career.type === "Part-Time" ? "PART_TIME" : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.url,
      logo: `${SITE.url}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: career.locations.join(", "),
        addressRegion: career.location,
        addressCountry: "IN",
      },
    },
    ...(career.remoteOk ? { jobLocationType: "TELECOMMUTE" } : {}),
    ...(career.salary ? { salaryDescription: career.salary } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${SITE.url}/careers` },
      { "@type": "ListItem", position: 3, name: career.title, item: `${SITE.url}/careers/${career.slug}` },
    ],
  };

  return (
    <StageShell>
      <JsonLd data={jobPostingSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        title={career.title}
        lead={career.description}
        crumbs={[{ label: "Careers", href: "/careers" }, { label: career.title }]}
        meta={`( ${career.department.toUpperCase()} ) ( ${career.type.toUpperCase()} )`}
      />

      <PageMain>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Meta strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-white/10 bg-white/[0.02] p-4">
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                <Building2 className="h-3.5 w-3.5" /> Department
              </span>
              <span className="mt-1 block text-sm font-bold text-white">{career.department}</span>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-4">
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                <Briefcase className="h-3.5 w-3.5" /> Type
              </span>
              <span className="mt-1 block text-sm font-bold text-white">{career.type}</span>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-4">
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                <MapPin className="h-3.5 w-3.5" /> Location
              </span>
              <span className="mt-1 block text-sm font-bold text-white">{career.locations.join(" · ")}</span>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-4">
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold-bright)]">
                <Clock className="h-3.5 w-3.5" /> Posted
              </span>
              <span className="mt-1 block text-sm font-bold text-white">
                {new Date(career.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
          </div>

          {/* Responsibilities */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-6">
              What You&apos;ll Do
            </h2>
            <div className="space-y-3">
              {career.responsibilities.map((r, idx) => (
                <div key={idx} className="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 text-sm text-[var(--white-85)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-6">
              What We&apos;re Looking For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {career.requirements.map((r, idx) => (
                <div key={idx} className="flex items-start gap-3 border border-white/10 bg-[var(--void-2)] p-4 text-xs text-[var(--white-85)]">
                  <span className="mt-0.5 font-bold text-[var(--gold-bright)]">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits + Salary */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[var(--gold)]/40 bg-[var(--void-2)] p-6 space-y-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                Why You&apos;ll Love Working Here
              </h2>
              <ul className="space-y-3">
                {career.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[var(--white-75)]">
                    <span className="font-bold text-[var(--gold-bright)]">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-white/10 bg-white/[0.02] p-6 space-y-4">
              <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold text-white">
                <IndianRupee className="h-5 w-5 text-[var(--gold-bright)]" /> Compensation
              </h2>
              {career.salary ? (
                <p className="text-sm font-bold text-white">{career.salary}</p>
              ) : (
                <p className="text-sm text-[var(--white-70)]">Competitive, based on experience — discussed on call.</p>
              )}
              {career.remoteOk && (
                <p className="flex items-center gap-2 text-xs text-[var(--white-70)]">
                  <Wifi className="h-4 w-4 text-[var(--gold-bright)]" /> Remote-friendly role
                </p>
              )}
              <p className="text-xs text-[var(--white-55)]">
                Applications open until {new Date(career.validThrough).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
              </p>
            </div>
          </section>

          {/* Apply CTA */}
          <section className="border border-[var(--gold)]/30 bg-[var(--void-2)] p-8 md:p-12 text-center">
            <Send className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              Ready to Apply for {career.title}?
            </h2>
            <p className="mt-2 text-xs text-[var(--white-70)] max-w-xl mx-auto">
              Email your CV and a short note about your relevant experience. Our HR team responds within 3 working days.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${CONTACT.email}?subject=Application for ${encodeURIComponent(career.title)}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider"
                style={{ background: "var(--grad-metal)", color: "var(--void)" }}
              >
                <Send className="h-3.5 w-3.5" /> Apply via Email
              </a>
              <a
                href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(`Hi, I'd like to apply for the ${career.title} position.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-black transition-colors"
              >
                Apply via WhatsApp
              </a>
            </div>
          </section>

          {/* Other roles */}
          <section className="pt-4 border-t border-white/10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-6">
              Other Open Positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREERS.filter((c) => c.slug !== career.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/careers/${c.slug}`}
                  className="group border border-white/10 bg-[var(--void-2)] p-5 transition-colors duration-200 hover:border-[var(--gold)]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold-bright)]">{c.department}</span>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-base font-bold text-white group-hover:text-[var(--gold-bright)] transition-colors">
                    {c.title}
                  </h3>
                  <span className="mt-2 block text-[11px] text-[var(--white-55)]">{c.locations.join(" · ")}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <Link href="/careers" className="inline-flex items-center gap-2 text-xs font-bold text-[var(--white-70)] hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to All Careers
              </Link>
            </div>
          </section>
        </div>
      </PageMain>
    </StageShell>
  );
}
