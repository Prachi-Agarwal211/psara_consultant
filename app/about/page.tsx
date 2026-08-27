import type { Metadata } from "next";
import { Award, Target, Eye, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import AboutSection from "../components/sections/AboutSection";
import WhatsAppForm from "../../components/WhatsAppForm";
import Leadership from "../components/sections/Leadership";
import { SITE, OFFICES } from "../../lib/config";
import { pageMeta } from "../../lib/metadata";

export const metadata: Metadata = pageMeta(
  "About PSARA Consultant — Leadership, Mission & Statutory Excellence",
  `About ${SITE.name} — PSARA licensing advisory led by Mr. Sonu Singh & Mr. Nakul Singh Jadaun. 500+ PSARA approvals across 36 States & UTs.`,
  "/about",
  ["PSARA consultant about", "security agency licensing experts", "Sonu Singh PSARA", "Nakul Singh Jadaun"]
);

const STATS = [
  { number: "10+", label: "Years Regulatory Practice" },
  { number: "500+", label: "PSARA Licenses Granted" },
  { number: "36", label: "States & UTs Covered" },
  { number: "100%", label: "Controlling Authority Compliance" },
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
      {/* Featured Hero About Section */}
      <AboutSection imageSrc="/about-3d-map.png" showHeaderBar={false} headingLevel="h1" className="pt-28 pb-16 border-b border-white/10" />

      <PageMain className="bg-[#080714] text-white">
        {/* Stats Grid */}
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 border border-[rgba(212,175,55,0.3)] bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 text-center rounded-3xl shadow-2xl">
          {STATS.map((s) => (
            <div key={s.label} className="p-3 relative">
              <span className="block font-bold text-3xl md:text-5xl gold-metallic-text font-mono" style={{ fontFamily: "var(--font-display)" }}>
                {s.number}
              </span>
              <span className="mt-2 block text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">{s.label}</span>
            </div>
          ))}
        </section>

        {/* Story & Background */}
        <section className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="badge-metallic-gold">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" /> Our Practice
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              A Practice Built on <span className="gold-metallic-text">Statutory Discipline</span>
            </h2>
            <p className="text-base text-[#E2E8F0] leading-relaxed font-normal">
              Founded in Jaipur, Rajasthan, PSARA Consultant was built on a singular premise: private security licensing requires legal precision, transparent statutory execution, and zero procedural shortcuts.
            </p>
            <p className="text-base text-[#E2E8F0] leading-relaxed font-normal">
              Over the past decade, we have helped hundreds of security promoters, ex-servicemen, corporate facility managers, and multi-state security providers navigate complex state-specific Controlling Authority requirements, police antecedent checks, and training MOU tie-ups.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFICES.slice(0, 6).map((o) => (
                <div key={o.city} className="flex items-start gap-2.5 border border-white/10 bg-[#0F0C1F] p-3.5 rounded-xl text-xs">
                  <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">{o.city} Desk ({o.badge})</strong>
                    <span className="text-[#94A3B8] font-normal">{o.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[rgba(212,175,55,0.35)] p-6 md:p-8 bg-gradient-to-b from-[#14102A] to-[#060B18] text-white shadow-2xl space-y-4">
              <span className="badge-metallic-gold">
                Immediate Consultation
              </span>
              <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
                Speak with a PSARA Specialist
              </h3>
              <p className="text-xs text-[#E2E8F0] font-normal leading-relaxed">
                Submit your query to receive a customized state regulatory roadmap and statutory fee structure.
              </p>
              <div className="mt-4">
                <WhatsAppForm formType="About Page Advisory" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] block mb-2">Milestones</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            How We Scaled Across India
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 shadow-md transition-all hover:border-[#D4AF37]">
                <span className="text-xs font-mono font-bold uppercase text-[#D4AF37] block">{t.year}</span>
                <h3 className="mt-2 text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{t.title}</h3>
                <p className="mt-2 text-xs text-[#E2E8F0] leading-relaxed font-normal">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-[rgba(212,175,55,0.3)] bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-8 shadow-xl space-y-3">
            <Target className="h-6 w-6 text-[#D4AF37]" />
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Our Mission</h3>
            <p className="text-sm text-[#E2E8F0] leading-relaxed font-normal">
              To provide fast, reliable, statute-aligned PSARA licensing advisory for security agency promoters across India through clause-by-clause documentation, recognized training institute affiliations, and disciplined police clearance liaisoning.
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(212,175,55,0.3)] bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-8 shadow-xl space-y-3">
            <Eye className="h-6 w-6 text-[#D4AF37]" />
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Our Vision</h3>
            <p className="text-sm text-[#E2E8F0] leading-relaxed font-normal">
              To remain India&apos;s most trusted regulatory authority in private security compliance, setting new national benchmarks for speed, accuracy, promoter protection, and post-grant statutory discipline.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D4AF37] block mb-2">Guiding Principles</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            Principles That Drive Every License Filing
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-6 flex items-start gap-4 shadow-md">
                <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                  <p className="mt-1 text-xs text-[#E2E8F0] leading-relaxed font-normal">{v.desc}</p>
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
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Recognized Regulatory Credentials
            </h2>
            <p className="mt-2 text-xs text-[#CBD5E1] font-normal">
              Certified and recognized across statutory and quality management frameworks.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14102A] to-[#0F0C1F] p-4 text-center shadow-md">
                <Award className="h-6 w-6 text-[#D4AF37] mx-auto mb-2" />
                <span className="block text-xs font-bold text-white">{c.name}</span>
                <span className="block text-[10px] text-[#94A3B8] mt-0.5">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
