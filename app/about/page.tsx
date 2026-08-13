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
      <AboutSection imageSrc="/about-map-artwork.png" showHeaderBar={false} headingLevel="h1" className="pt-28 pb-16 border-b border-[#0F3C65]/15" />

      <PageMain className="bg-[#FFFEF9] text-[#0F3C65]">
        {/* Stats Grid */}
        <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4 border border-[#0F3C65]/15 bg-[#FBF7F0] p-6 text-center rounded-2xl shadow-sm">
          {STATS.map((s) => (
            <div key={s.label} className="p-3 relative">
              <span className="block font-black text-3xl md:text-4xl text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
                {s.number}
              </span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#334E68]">{s.label}</span>
            </div>
          ))}
        </section>

        {/* Story & Background */}
        <section className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
              A Practice Built on State-by-State Statutory Work
            </h2>
            <p className="text-sm font-medium leading-relaxed text-[#334E68]">
              Founded in Jaipur, Rajasthan, PSARA Consultant was built on a singular premise: private security licensing requires legal precision, transparent statutory execution, and zero procedural shortcuts.
            </p>
            <p className="text-sm font-medium leading-relaxed text-[#334E68]">
              Over the past decade, we have helped hundreds of security promoters, ex-servicemen, corporate facility managers, and multi-state security providers navigate complex state-specific Controlling Authority requirements, police antecedent checks, and training MOU tie-ups.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFICES.map((o) => (
                <div key={o.city} className="flex items-start gap-2.5 border border-[#0F3C65]/15 bg-[#FBF7F0] p-3.5 rounded-xl text-xs">
                  <MapPin className="h-4 w-4 text-[#C89B3C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#0F3C65] font-black">{o.city} Desk ({o.badge})</strong>
                    <span className="text-[#486581] font-medium">{o.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border-2 border-[#C89B3C]/40 p-6 md:p-8 bg-[#0A233F] text-white rounded-3xl shadow-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#C89B3C]">Immediate Consultation</span>
              <h3 className="mt-2 text-xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                Speak with a PSARA Specialist
              </h3>
              <p className="mt-2 text-xs text-slate-300 font-medium">
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
          <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Milestones</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
            How We Scaled Across India
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-6 shadow-sm group hover:border-[#C89B3C] transition-all">
                <span className="text-xs font-mono font-black uppercase text-[#C89B3C] block">{t.year}</span>
                <h3 className="mt-2 text-base font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>{t.title}</h3>
                <p className="mt-2 text-xs text-[#334E68] leading-relaxed font-medium">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border-2 border-[#C89B3C]/40 bg-[#FFFDF5] p-8 shadow-md">
            <Target className="h-6 w-6 text-[#C89B3C] mb-4" />
            <h3 className="text-2xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>Our Mission</h3>
            <p className="mt-3 text-sm text-[#334E68] leading-relaxed font-medium">
              To provide fast, reliable, statute-aligned PSARA licensing advisory for security agency promoters across India through clause-by-clause documentation, recognized training institute affiliations, and disciplined police clearance liaisoning.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#78A2D2]/40 bg-[#EBF3FA] p-8 shadow-md">
            <Eye className="h-6 w-6 text-[#0F3C65] mb-4" />
            <h3 className="text-2xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>Our Vision</h3>
            <p className="mt-3 text-sm text-[#334E68] leading-relaxed font-medium">
              To remain India&apos;s most trusted regulatory authority in private security compliance, setting new national benchmarks for speed, accuracy, promoter protection, and post-grant statutory discipline.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <span className="text-xs font-black uppercase tracking-wider text-[#C89B3C]">Guiding Principles</span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
            Principles That Drive Every License Filing
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-[#0F3C65]/15 bg-white p-6 flex items-start gap-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-[#C89B3C] shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                  <p className="mt-1 text-xs text-[#486581] leading-relaxed font-medium">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Board of Leadership Component */}
        <Leadership />

        {/* Certifications Showcase */}
        <section className="mt-20 border-t border-[#0F3C65]/15 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-[#0F3C65]" style={{ fontFamily: "var(--font-display)" }}>
              Recognized Regulatory Credentials
            </h2>
            <p className="mt-2 text-xs text-[#334E68] font-medium">
              Certified and recognized across statutory and quality management frameworks.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="rounded-2xl border border-[#0F3C65]/15 bg-[#FBF7F0] p-4 text-center shadow-sm">
                <Award className="h-6 w-6 text-[#C89B3C] mx-auto mb-2" />
                <span className="block text-xs font-black text-[#0F3C65]">{c.name}</span>
                <span className="block text-[10px] text-[#486581] mt-0.5 font-medium">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}

