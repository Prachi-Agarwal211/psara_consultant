import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "../../data/guides";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import WhatsAppForm from "../../components/WhatsAppForm";
import { pageMeta } from "../../lib/metadata";

/** Reserved top-level routes that must not be captured as guides */
const RESERVED = new Set([
  "about",
  "contact",
  "services",
  "faq",
  "states",
  "cities",
  "city",
  "google",
  "privacy-policy",
  "terms",
  "disclaimer",
  "api",
  "_next",
]);

export function generateStaticParams() {
  return GUIDES.map((g) => ({ guide: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ guide: string }>;
}): Promise<Metadata> {
  const { guide } = await params;
  if (RESERVED.has(guide)) return {};
  const g = getGuide(guide);
  if (!g) return {};
  return pageMeta(g.title, g.description, `/${guide}`);
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ guide: string }>;
}) {
  const { guide } = await params;
  if (RESERVED.has(guide)) notFound();
  const g = getGuide(guide);
  if (!g) notFound();

  return (
    <>
      <PageHero
        eyebrow="Guide"
        title={g.title}
        lead={g.description}
        crumbs={[{ label: "Guides", href: "/psara-license" }, { label: g.title }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Prose>
              {g.sections.map((sec) => (
                <div key={sec.h}>
                  <h2>{sec.h}</h2>
                  <p>{sec.p}</p>
                </div>
              ))}
            </Prose>
            <div className="mt-10">
              <p className="label-meta mb-3 font-bold text-[var(--gold)]">More guides</p>
              <ul className="space-y-2 text-sm font-bold text-[var(--cream-dim)]">
                {GUIDES.filter((x) => x.slug !== g.slug)
                  .slice(0, 8)
                  .map((x) => (
                    <li key={x.slug}>
                      <a href={`/${x.slug}`} className="hover:text-[var(--gold-soft)]">
                        {x.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <CtaBar />
          </div>
          <div className="folio p-6 lg:col-span-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
              Ask about this topic
            </h3>
            <div className="mt-4">
              <WhatsAppForm formType="Guide Enquiry" service={g.title} />
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
