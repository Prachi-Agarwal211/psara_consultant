import type { Metadata } from "next";
import { Award, Target, Eye, CheckCircle2, MapPin } from "lucide-react";
import { PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import AboutSection from "../components/sections/AboutSection";
import WhatsAppForm from "../../components/WhatsAppForm";
import Leadership from "../components/sections/Leadership";
import { SITE, OFFICES } from "../../lib/config";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "About PSARA Consultant — Leadership, Mission & Statutory Excellence",
  `About ${SITE.name} — PSARA licensing advisory led by Mr. Sonu Singh & Mr. Nakul Singh Jadaun. 500+ PSARA approvals across 28 states & 8 UTs.`,
  "/about",
  ["PSARA consultant about", "security agency licensing experts", "Sonu Singh PSARA", "Nakul Singh Jadaun"]
);

const STATS = [
  { number: "10+", label: "Years Regulatory Experience" },
  { number: "500+", label: "PSARA Licenses Issued" },
  { number: "36", label: "States & UTs Combined" },
  { number: "100%", label: "Statute-Mandated Filing Discipline" },
];

const VALUES = [
  { title: "Statute-First Precision", desc: "Every application dossier is crafted strictly in accordance with State PSARA Rules & Controlling Authority guidelines." },
  { title: "Verification-Ready Dossiers", desc: "Complete police antecedent checks, director MOUs, and training institute affiliations pre-aligned before submission." },
  { title: "Multi-State Scaling", desc: "Single-window clearance framework for security agencies expanding from 1 state to national operations." },
  { title: "Post-Grant Discipline", desc: "Ongoing compliance tracking for renewal timelines, officer appointments, and uniform code filings." },
];

const TIMELINE = [
  {
    year: "2016",
    title: "Regulatory Practice Founding",
    desc: "Established in Jaipur, Rajasthan by Mr. Sonu Singh to bridge statutory compliance gaps for private security promoters.",
  },
  {
    year: "2020",
    title: "PAN India Advisory Network",
    desc: "Expanded direct liaisoning desks across Delhi NCR, Haryana, Uttar Pradesh, Gujarat, Maharashtra, and Karnataka.",
  },
  {
    year: "2025",
    title: "Corporate Expansion & Board Elevation",
    desc: "Mr. Nakul Singh Jadaun joined as Director to scale operational technology, training MOUs, and multi-state compliance systems.",
  },
  {
    year: "Today",
    title: "National Statutory Authority",
    desc: "Over 500+ successful PSARA license grants, with filings audited against each State's published Controlling Authority rules across all 36 Indian States and UTs.",
  },
];

const CERTIFICATIONS = [
  { name: "PSARA Statutory Advisory", desc: "Registered under PSARA Act, 2005" },
  { name: "ISO 9001:2015", desc: "Quality Management Systems" },
  { name: "MSME Registered", desc: "Government Recognized Enterprise" },
  { name: "Startup India Recognized", desc: "DPIIT Regulatory Tech Innovator" },
];

export default function AboutPage() {
  return (
    <StageShell>
      {/* Featured Hero About Section matching design mockup */}
      <AboutSection imageSrc="/about-map-artwork.png" showHeaderBar={false} className="pt-28 pb-16 border-b border-white/10" />

      <PageMain>
        {/* Stats Grid */}
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 border border-white/10 bg-[var(--void-2)] p-6 text-center" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Vertical accent line */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--gold)]/40 to-transparent" aria-hidden />
          {STATS.map((s) => (
            <div key={s.label} className="p-3 relative pl-4">
              <span className="block font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-metal">
                {s.number}
              </span>
              <span className="mt-1 block text-xs font-semibold text-[var(--white-70)]">{s.label}</span>
            </div>
          ))}
        </section>

        {/* Story & Background */}
        <section className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Our Journey</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
              A Practice Built on State-by-State Statutory Work
            </h2>
            <p className="text-sm font-normal leading-relaxed text-[var(--white-70)]">
              Founded in Jaipur, Rajasthan, PSARA Consultant was built on a singular premise: private security licensing requires legal precision, transparent statutory execution, and zero procedural shortcuts.
            </p>
            <p className="text-sm font-normal leading-relaxed text-[var(--white-70)]">
              Over the past decade, we have helped hundreds of security promoters, ex-servicemen, corporate facility managers, and multi-state security providers navigate complex state-specific Controlling Authority requirements, police antecedent checks, and training MOU tie-ups.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFICES.map((o) => (
                <div key={o.city} className="flex items-start gap-2.5 border border-white/10 bg-white/[0.02] p-3 text-xs">
                  <MapPin className="h-4 w-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">{o.city} Desk ({o.badge})</strong>
                    <span className="text-[var(--white-55)]">{o.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-[var(--gold)]/30 p-6 md:p-8 bg-[var(--void-2)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)]">Immediate Consultation</span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                Speak with a PSARA Specialist
              </h3>
              <p className="mt-2 text-xs text-[var(--white-70)]">
                Submit your query to receive a customized state regulatory roadmap and statutory fee structure.
              </p>
              <div className="mt-6">
                <WhatsAppForm formType="About Page Advisory" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Milestones</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
            How We Scaled Across India
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="relative border border-white/10 bg-white/[0.02] p-6 group hover:border-[var(--gold)]/40 transition-[color,border-color,background-color] duration-300">
                {/* Vertical accent */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--gold)]/20 group-hover:bg-[var(--gold)]/60 transition-colors duration-300" />
                <span className="text-xs font-mono font-bold uppercase text-[var(--gold-bright)] ml-3 block">{t.year}</span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-bold text-white ml-3">{t.title}</h3>
                <p className="mt-2 text-xs text-[var(--white-70)] leading-relaxed ml-3">{t.desc}</p>
                {/* Connector line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute right-0 top-1/2 w-4 h-px bg-white/10 hidden md:block" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision — nudot editorial split */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-l-2 border-[var(--gold)]/40 bg-white/[0.02] p-8 relative">
            <span className="absolute -top-3 left-0 text-[0.5rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)]" style={{ fontFamily: "var(--font-body)" }}>
              ( 01 )
            </span>
            <Target className="h-6 w-6 text-[var(--gold-bright)] mt-3 mb-4" />
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Our Mission</h3>
            <p className="mt-3 text-sm text-[var(--white-70)] leading-relaxed">
              To provide fast, reliable, statute-aligned PSARA licensing advisory for security agency promoters across India through clause-by-clause documentation, recognized training institute affiliations, and disciplined police clearance liaisoning.
            </p>
          </div>

          <div className="border-l-2 border-[var(--gold)]/40 bg-white/[0.02] p-8 relative">
            <span className="absolute -top-3 left-0 text-[0.5rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)]" style={{ fontFamily: "var(--font-body)" }}>
              ( 02 )
            </span>
            <Eye className="h-6 w-6 text-[var(--gold-bright)] mt-3 mb-4" />
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Our Vision</h3>
            <p className="mt-3 text-sm text-[var(--white-70)] leading-relaxed">
              To remain India&apos;s most trusted regulatory authority in private security compliance, setting new national benchmarks for speed, accuracy, promoter protection, and post-grant statutory discipline.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Guiding Principles</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white">
            Principles That Drive Every License Filing
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-white/10 bg-white/[0.02] p-6 flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-[var(--gold-bright)] shrink-0 mt-1" />
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">{v.title}</h3>
                  <p className="mt-1 text-xs text-[var(--white-70)] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Board of Leadership Component */}
        <Leadership />

        {/* Certifications Showcase */}
        <section className="mt-20 border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              Recognized Regulatory Credentials
            </h2>
            <p className="mt-2 text-xs text-[var(--white-70)]">
              Certified and recognized across statutory and quality management frameworks.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="border border-white/10 bg-white/[0.02] p-4 text-center">
                <Award className="h-6 w-6 text-[var(--gold-bright)] mx-auto mb-2" />
                <span className="block text-xs font-bold text-white">{c.name}</span>
                <span className="block text-[10px] text-[var(--white-55)] mt-0.5">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
