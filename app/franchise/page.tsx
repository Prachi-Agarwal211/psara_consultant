import type { Metadata } from "next";
import { PageHero, PageMain } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import WhatsAppForm from "../../components/WhatsAppForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, SITE } from "../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../lib/whatsapp";
import { ChevronRight, Shield, TrendingUp, Building2, Gem, Target, Award, CheckCircle, Phone, Mail, Globe } from "lucide-react";

export const metadata: Metadata = pageMeta(
  "Franchise Opportunity — Silbar Security Services",
  `State Master Franchise opportunity with Silbar Security Services Pvt Ltd. Build a premium security business in your state with a trusted brand. Contact ${SITE.name}.`,
  "/franchise",
  ["franchise", "security franchise India", "Silbar Security franchise", "security agency partnership", "state master franchise"]
);

const BENEFITS = [
  { icon: Shield, title: "Strong Brand Vision", desc: "Building a premium, process-driven, nationally recognized security brand — quality over quantity." },
  { icon: TrendingUp, title: "High-Growth Industry", desc: "Security services sector booming from corporate, residential, logistics, and manufacturing demand." },
  { icon: Building2, title: "Structured Business Model", desc: "Clear operational processes, defined roles, centralized support, and scalable revenue model." },
  { icon: Gem, title: "Limited Territory – High Opportunity", desc: "Exclusive state-level opportunities with minimal internal competition." },
];

const WHAT_YOU_GET = [
  "Exclusive rights to operate in your assigned state",
  "Complete business setup guidance",
  "Branding and marketing support",
  "Operational SOPs (Standard Operating Procedures)",
  "Recruitment and training framework",
  "Business development strategies",
  "Ongoing management support",
];

const SUPPORT_TYPES = [
  {
    title: "Operational Support",
    items: ["Guard recruitment guidelines", "Training modules and processes", "Uniform standards and deployment systems", "Client onboarding process"],
  },
  {
    title: "Business Development Support",
    items: ["Corporate pitch templates", "Proposal formats", "Pricing strategies", "Lead handling guidance"],
  },
  {
    title: "Branding & Marketing",
    items: ["Professional brochures", "Digital marketing creatives", "Website presence", "Central brand positioning"],
  },
  {
    title: "Compliance Guidance",
    items: ["PSARA-related guidance", "Documentation and process support", "Industry compliance awareness"],
  },
];

const SELECTION_STEPS = [
  { step: "01", title: "Application Submission", desc: "Fill out the franchise enquiry form with complete details." },
  { step: "02", title: "Initial Screening", desc: "Our team will review your profile, investment capability, and background." },
  { step: "03", title: "Business Discussion", desc: "A detailed discussion to understand your vision, experience, and market understanding." },
  { step: "04", title: "Final Evaluation", desc: "Assessment based on financial strength, commitment, and operational capability." },
  { step: "05", title: "Offer & Agreement", desc: "Selected candidates receive the official offer and franchise agreement." },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        title="Franchise Opportunity"
        lead="Silbar Security Services Pvt Ltd — Build a Strong Business with a Trusted Security Brand"
        crumbs={[{ label: "Franchise" }]}
      />

      <PageMain>
        {/* Hero Section */}
        <section className="relative border border-[var(--line-gold)] p-8 md:p-12 mb-16 overflow-hidden"
          style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
        >
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[var(--gold)] opacity-30" aria-hidden />

          <div className="max-w-4xl">
            <span className="label-meta font-bold text-[var(--gold)]">Franchise Opportunity</span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight text-[var(--cream)]">
              Build a Strong Business with a Trusted Security Brand
            </h2>
            <p className="mt-4 text-sm md:text-base font-medium leading-relaxed text-[var(--text-dim)] max-w-3xl">
              Silbar Security Services Pvt Ltd invites ambitious entrepreneurs, business owners, and professionals to become part of a rapidly growing and professionally managed security services brand in India. With a vision to establish a strong, reliable, and premium security network across the country, we are now expanding through a carefully selected <strong className="text-[var(--cream)]">State Master Franchise Model</strong>.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--text-dim)] max-w-3xl">
              If you are looking to build a long-term, scalable, and respected business in the security industry, this is your opportunity to partner with a brand that is committed to excellence, discipline, and growth.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider">
                Apply for Franchise <ChevronRight className="h-3.5 w-3.5" />
              </a>
              <a href={TEL_HREF} className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider">
                <Phone className="h-3.5 w-3.5" /> Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* About Silbar */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
          <div className="lg:col-span-7">
            <span className="label-meta font-bold text-[var(--gold)]">About Silbar Security</span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
              Silbar Security Services Pvt Ltd
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--text-dim)]">
              Silbar Security Services Pvt Ltd is a professionally driven organization focused on delivering high-quality security solutions to corporate, industrial, residential, and commercial clients. Our approach is based on structured systems, trained manpower, and strict compliance with industry standards.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--text-dim)]">
              We are not just another security agency. <strong className="text-[var(--cream)]">Our goal is to build a premium, process-driven, and nationally recognized brand</strong> that sets new benchmarks in the Indian security services industry.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-[var(--line)] p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-[var(--gold)] shrink-0" />
                <span className="text-sm font-bold text-[var(--cream)]">Professionally driven organization</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-[var(--gold)] shrink-0" />
                <span className="text-sm font-bold text-[var(--cream)]">High-quality security solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-[var(--gold)] shrink-0" />
                <span className="text-sm font-bold text-[var(--cream)]">Premium brand positioning</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[var(--gold)] shrink-0" />
                <span className="text-sm font-bold text-[var(--cream)]">Strict compliance standards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Partner */}
        <section className="mb-16">
          <span className="label-meta font-bold text-[var(--gold)]">Why Partner</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Why Partner with Silbar Security?
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border border-[var(--line)] p-6 transition-all duration-300 hover:border-[var(--line-gold)] hover:translate-y-[-2px]"
                style={{ backgroundColor: "color-mix(in srgb, var(--obsidian-2) 50%, transparent)" }}
              >
                <b.icon className="h-6 w-6 text-[var(--gold)]" />
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-bold text-[var(--cream)]">{b.title}</h3>
                <p className="mt-2 text-sm font-medium text-[var(--text-dim)]">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Franchise Model */}
        <section className="mb-16">
          <span className="label-meta font-bold text-[var(--gold)]">Franchise Model</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Our Franchise Model — State Master Franchise
          </h2>
          <p className="mt-3 text-sm font-medium text-[var(--text-dim)] max-w-3xl">
            We operate on a State Master Franchise Model, where one strong partner is selected for each state.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What You Get */}
            <div className="border border-[var(--line)] p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--gold)]">What You Get</h3>
              <ul className="mt-4 space-y-3">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-[var(--text-dim)]">
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-[var(--gold)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Investment & Requirements */}
            <div className="border border-[var(--line)] p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--gold)]">Investment & Requirements</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--gold)] mb-2">Basic Requirements</p>
                  <ul className="space-y-2">
                    {["Strong financial capability", "Office setup in a prime location", "Ability to hire and manage a team", "Willingness to work actively in the business", "Long-term vision and commitment"].map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm font-medium text-[var(--text-dim)]">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-[var(--emerald)]" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--gold)] mb-2">Preferred Background</p>
                  <ul className="space-y-2">
                    {["Business owners", "Facility management professionals", "Ex-defense or security professionals", "Entrepreneurs with local market knowledge"].map((bg) => (
                      <li key={bg} className="flex items-start gap-2 text-sm font-medium text-[var(--text-dim)]">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-[var(--emerald)]" />
                        {bg}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support from Head Office */}
        <section className="mb-16">
          <span className="label-meta font-bold text-[var(--gold)]">Support</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Support from Head Office
          </h2>
          <p className="mt-3 text-sm font-medium text-[var(--text-dim)] max-w-3xl">
            Silbar Security Services Pvt Ltd provides continuous support to ensure your success:
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUPPORT_TYPES.map((s) => (
              <div key={s.title} className="border border-[var(--line)] p-6">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--cream)]">{s.title}</h3>
                <ul className="mt-3 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-[var(--text-dim)]">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Selection Process */}
        <section className="mb-16">
          <span className="label-meta font-bold text-[var(--gold)]">Selection Process</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Our Selection Process
          </h2>
          <p className="mt-3 text-sm font-medium text-[var(--text-dim)] max-w-3xl">
            We follow a strict selection process to ensure that only the right partners join our network.
          </p>
          <div className="mt-8 space-y-0">
            {SELECTION_STEPS.map((step, i) => (
              <div key={step.step} className="relative flex gap-6 pb-8 last:pb-0">
                {/* Timeline connector */}
                {i < SELECTION_STEPS.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-[var(--line)]" aria-hidden />
                )}
                {/* Step number */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--obsidian)]">
                  <span className="text-xs font-bold text-[var(--gold)]">{step.step}</span>
                </div>
                {/* Content */}
                <div className="pt-1.5">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--cream)]">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--text-dim)]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Makes This Unique */}
        <section className="relative border border-[var(--line-gold)] p-8 md:p-10 mb-16"
          style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[var(--gold)] opacity-30" aria-hidden />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[var(--gold)] opacity-30" aria-hidden />

          <span className="label-meta font-bold text-[var(--gold)]">Uniqueness</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            What Makes This Opportunity Unique?
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Exclusive state-level rights",
              "Premium brand positioning",
              "Structured and system-driven operations",
              "Long-term scalable business model",
              "Limited partner selection (not mass franchise)",
              "Strong partnerships, not just selling franchises",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-[var(--cream-dim)]">
                <CheckCircle className="h-4 w-4 shrink-0 text-[var(--emerald)]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Commitment */}
        <section className="mb-16">
          <span className="label-meta font-bold text-[var(--gold)]">Our Commitment</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Our Commitment
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Maintaining high service standards",
              "Building a trusted and respected brand",
              "Supporting our partners at every stage",
              "Creating long-term business success",
            ].map((item) => (
              <div key={item} className="border border-[var(--line)] p-5 flex items-center gap-3">
                <Award className="h-5 w-5 text-[var(--gold)] shrink-0" />
                <span className="text-sm font-bold text-[var(--cream)]">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-[var(--text-dim)]">
            We do not believe in rapid, uncontrolled expansion. Instead, we focus on quality partnerships that help us build a powerful national presence.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <span className="label-meta font-bold text-[var(--gold)]">Apply Now</span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
                Apply for Franchise
              </h2>
              <p className="mt-3 text-sm font-medium text-[var(--text-dim)] max-w-2xl">
                If you are ready to take the next step and become part of a growing security services brand, we invite you to apply today. Let&apos;s build a strong, reliable, and respected security network across India together.
              </p>
              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-2 text-sm font-medium text-[var(--cream-dim)]">
                  <Mail className="h-4 w-4 text-[var(--gold)]" />
                  <a href={`mailto:info@silbarsecurity.in`} className="hover:text-[var(--gold)] transition-colors">info@silbarsecurity.in</a>
                </p>
                <p className="flex items-center gap-2 text-sm font-medium text-[var(--cream-dim)]">
                  <Phone className="h-4 w-4 text-[var(--gold)]" />
                  <a href={TEL_HREF} className="hover:text-[var(--gold)] transition-colors">{CONTACT.phoneDisplay}</a>
                  <span className="text-[var(--text-faint)]">/</span>
                  <a href={`tel:${CONTACT.landlineRaw}`} className="hover:text-[var(--gold)] transition-colors">{CONTACT.landlineDisplay}</a>
                </p>
                <p className="flex items-center gap-2 text-sm font-medium text-[var(--cream-dim)]">
                  <Globe className="h-4 w-4 text-[var(--gold)]" />
                  <a href="https://www.silbarsecurity.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">www.silbarsecurity.in</a>
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider">
                  Apply for Franchise <ChevronRight className="h-3.5 w-3.5" />
                </a>
                <a href={TEL_HREF} className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider">
                  <Phone className="h-3.5 w-3.5" /> Call Now
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative border border-[var(--line-gold)] p-6 md:p-8"
                style={{ backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 60%, transparent)" }}
              >
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--gold)] opacity-30" aria-hidden />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--gold)] opacity-30" aria-hidden />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--gold)] opacity-30" aria-hidden />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--gold)] opacity-30" aria-hidden />

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--cream)]">
                  Franchise Enquiry
                </h3>
                <p className="mt-2 text-sm font-medium text-[var(--text-dim)]">
                  Fill out the form below to start your franchise journey with Silbar Security Services.
                </p>
                <div className="mt-6">
                  <WhatsAppForm formType="Franchise Enquiry" service="Silbar Security Franchise" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBar title="Ready to build a security business?" subtitle="Apply for the State Master Franchise today — let's talk." />
      </PageMain>
    </>
  );
}
