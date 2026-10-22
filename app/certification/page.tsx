import type { Metadata } from "next";
import { GlassCard, Section } from "../../components/v3/PagePrimitives";
import { Award, ShieldCheck } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { DEFAULT_WA } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "ISO & Regulatory Certifications Showcase — PSARA Consultant",
  "Explore regulatory credentials: ISO 9001:2015, ISO 27001, PSARA Verification, MSME Registration, and Startup India recognition.",
  "/certification",
  ["psara certifications", "iso 9001 security agency", "msme security agency"]
);

const CERTS = [
  {
    name: "PSARA Statutory Compliance Advisory",
    org: "Ministry of Home Affairs / State Controlling Authorities",
    desc: "Statute-aligned filing advisory under the Private Security Agencies (Regulation) Act, 2005 across all 36 States & UTs, per each State Controlling Authority's published rules.",
  },
  {
    name: "ISO 9001:2015 Quality Management",
    org: "IAF Accredited Certification Body",
    desc: "Quality management systems for legal research, client dossier verification, and document audit processes.",
  },
  {
    name: "ISO/IEC 27001:2022 Information Security",
    org: "IAF Accredited Certification Body",
    desc: "Strict data confidentiality and encryption protocols for promoter personal identification & antecedent records.",
  },
  {
    name: "MSME Registered Enterprise",
    org: "Ministry of Micro, Small & Medium Enterprises, Govt. of India",
    desc: "Recognized corporate advisory firm for statutory business setup and compliance enablement.",
  },
  {
    name: "Startup India DPIIT Recognition",
    org: "Department for Promotion of Industry and Internal Trade",
    desc: "Recognized regulatory technology and statutory compliance service provider.",
  },
];

export default function CertificationPage() {
  return (
    <StageShell showCta={false}>
      <PageHero
        title="ISO & Statutory Certifications"
        lead="Our advisory practice is anchored in quality management, data confidentiality, and strict statutory compliance standards. Certificate numbers available on request — contact the desk for verification."
        crumbs={[{ label: "Certifications" }]}
      />

      <PageMain>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((c) => (
            <GlassCard key={c.name} className="p-8 flex items-start gap-4">
              <Award className="h-8 w-8 text-[var(--gold-bright)] shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-bright)] block mb-1">
                  {c.org}
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-2">
                  {c.name}
                </h2>
                <p className="text-base text-[var(--white-70)] leading-relaxed">{c.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <Section className="mt-16 p-8 text-center">
          <ShieldCheck className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Require ISO Certification for Your Security Agency?</h2>
          <p className="mt-2 text-base text-[var(--white-70)] max-w-xl mx-auto">
            We assist security agencies in acquiring IAF-accredited ISO 9001, ISO 14001, ISO 45001, and ISO 27001 certifications required for corporate tenders.
          </p>
          <div className="mt-6">
            <a data-v3-magnetic href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="v3-button v3-button--saffron">
              Get ISO Certification Quote
            </a>
          </div>
        </Section>
      </PageMain>
    </StageShell>
  );
}
