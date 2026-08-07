import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import WhatsAppForm from "../../components/WhatsAppForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, SITE } from "../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../lib/whatsapp";
import { ChevronRight, Shield, TrendingUp, Building2, Gem, Target, Award, CheckCircle, Phone, Mail, Globe } from "lucide-react";

export const metadata: Metadata = pageMeta(
  "PSARA Consulting Partnership & Master Franchise Desk",
  `Become a State Master Consulting Partner with PSARA Consultant India. Lead private security licensing and compliance setup in your state with expert regulatory guidance. Contact ${SITE.name}.`,
  "/franchise",
  ["psara franchise", "security consultancy partnership", "psara consulting desk", "state licensing partnership"]
);

const BENEFITS = [
  { icon: Shield, title: "High-Demand Compliance Sector", desc: "Every private security agency in India is statutorily required to hold a valid PSARA License before deployment." },
  { icon: TrendingUp, title: "High-Ticket Advisory Model", desc: "Consultancy fees for state PSARA applications, MOUs, and renewals range from ₹75,000 to ₹3,500,000+ per agency." },
  { icon: StructuredModelIcon, title: "Turnkey Advisory Playbook", desc: "Receive proven filing templates, MOU formats, Controlling Authority checklists, and police liaison protocols." },
  { icon: Gem, title: "Exclusive State Territory", desc: "Operate as the exclusive PSARA Licensing Desk for your assigned state with zero internal competition." },
];

function StructuredModelIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Building2 {...props} />;
}

const SUPPORT_TYPES = [
  {
    title: "Legal & Regulatory Support",
    items: ["State PSARA Rules interpretation", "Controlling Authority query resolution", "Training MOU drafting", "Director police clearance guidance"],
  },
  {
    title: "Client Acquisition Support",
    items: ["Verified corporate security lead routing", "Consultancy proposal templates", "State statutory fee calculators", "Client pitch decks"],
  },
  {
    title: "Branding & Authority",
    items: ["Official PSARA Consultant state desk branding", "Digital presence & state page listing", "Central trust badges & credentials", "National media authority"],
  },
  {
    title: "Operational Framework",
    items: ["Step-by-step state portal filing guides", "Antecedent verification checklists", "Uniform & badge design guidelines", "Armoury & weapon license compliance"],
  },
];


export default function FranchisePage() {
  return (
    <StageShell>
      <PageHero
        title="PSARA Partner Desk & Franchise"
        lead="Become a State Master Consulting Partner — Build a High-Growth Regulatory Advisory Business"
        crumbs={[{ label: "Franchise Desk" }]}
      />

      <PageMain>
        {/* Hero Banner Section */}
        <section className="relative border border-[var(--gold)]/30 p-8 md:p-12 mb-16 overflow-hidden bg-[var(--void-2)]">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Partner Network</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight text-white">
              Lead PSARA Compliance &amp; Security Licensing in Your State
            </h2>
            <p className="mt-4 text-sm md:text-base font-normal leading-relaxed text-[var(--white-70)] max-w-3xl">
              PSARA Consultant invites legal professionals, ex-defense personnel, security agency owners, and corporate advisors to partner with a statutory security licensing firm under our <strong className="text-white">State Master Partner Model</strong>.
            </p>
            <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--white-70)] max-w-3xl">
              With thousands of security agencies seeking mandatory PSARA Licenses, renewals, and multi-state expansion, your local desk will provide complete end-to-end advisory backed by our central legal infrastructure.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
                Apply for State Desk <ChevronRight className="h-3.5 w-3.5" />
              </a>
              <a href={TEL_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[var(--gold)]">
                <Phone className="h-3.5 w-3.5" /> Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* About PSARA Advisory */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">About PSARA Consultant</span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
              Statute-First Security Compliance Infrastructure
            </h2>
            <p className="mt-4 text-sm font-normal leading-relaxed text-[var(--white-70)]">
              PSARA Consultant is India&apos;s leading legal consultancy focused exclusively on the Private Security Agencies (Regulation) Act, 2005. We have facilitated over 500+ PSARA licenses, training institute MOUs, and police clearances across 28 States &amp; 8 UTs.
            </p>
            <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--white-70)]">
              As a State Master Partner, you use our national brand authority, back-office legal research team, and proven documentation frameworks to deliver end-to-end licensing to clients in your state.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-white/10 p-6 space-y-3 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-[var(--gold-bright)] shrink-0" />
                <span className="text-sm font-bold text-white">Exclusive State Territory Rights</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-[var(--gold-bright)] shrink-0" />
                <span className="text-sm font-bold text-white">High-Ticket Consultancy Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-[var(--gold-bright)] shrink-0" />
                <span className="text-sm font-bold text-white">Full Legal &amp; Draft Support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[var(--gold-bright)] shrink-0" />
                <span className="text-sm font-bold text-white">Centralized Client Lead Routing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <section className="mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Why Partner</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
            Why Become a PSARA Master Consulting Partner?
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border border-white/10 bg-white/[0.02] p-6 transition-[color,border-color,background-color] duration-300 hover:border-[var(--gold)]/40">
                <b.icon className="h-6 w-6 text-[var(--gold-bright)]" />
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-sm font-normal text-[var(--white-70)]">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Support Breakdown */}
        <section className="mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Support</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
            Comprehensive Back-Office &amp; Legal Support
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUPPORT_TYPES.map((s) => (
              <div key={s.title} className="border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">{s.title}</h3>
                <ul className="mt-3 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-normal text-[var(--white-70)]">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[var(--gold-bright)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold-bright)]">Apply Now</span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
                Start Your PSARA Partner Desk
              </h2>
              <p className="mt-3 text-sm font-normal text-[var(--white-70)] max-w-2xl">
                Ready to establish the leading PSARA advisory desk in your state? Submit your partnership request below to schedule a direct discussion with our board.
              </p>
              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-2 text-sm font-normal text-[var(--white-70)]">
                  <Mail className="h-4 w-4 text-[var(--gold-bright)]" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--gold-bright)] transition-colors">{CONTACT.email}</a>
                </p>
                <p className="flex items-center gap-2 text-sm font-normal text-[var(--white-70)]">
                  <Phone className="h-4 w-4 text-[var(--gold-bright)]" />
                  <a href={TEL_HREF} className="hover:text-[var(--gold-bright)] transition-colors">{CONTACT.phoneDisplay}</a>
                </p>
                <p className="flex items-center gap-2 text-sm font-normal text-[var(--white-70)]">
                  <Globe className="h-4 w-4 text-[var(--gold-bright)]" />
                  <a href={SITE.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold-bright)] transition-colors">{SITE.url}</a>
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative border border-[var(--gold)]/30 p-6 md:p-8 bg-[var(--void-2)]">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white">
                  Partner Desk Enquiry
                </h3>
                <p className="mt-2 text-sm font-normal text-[var(--white-70)]">
                  Fill out the details to request your state territory allocation.
                </p>
                <div className="mt-6">
                  <WhatsAppForm formType="Franchise Enquiry" service="PSARA Master Partner Desk" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageMain>
    </StageShell>
  );
}
