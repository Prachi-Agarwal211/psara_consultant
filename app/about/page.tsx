import type { Metadata } from "next";
import { PageHero, PageMain, Prose } from "../../components/PageShell";
import CtaBar from "../../components/CtaBar";
import WhatsAppForm from "../../components/WhatsAppForm";
import { pageMeta } from "../../lib/metadata";
import { CONTACT, OFFICES, SITE } from "../../lib/config";

export const metadata: Metadata = pageMeta(
  "About Us",
  `About ${SITE.name} — pan-India PSARA licensing advisory with headquarters in Jaipur and desks across Delhi NCR, Gujarat, Madhya Pradesh, Uttar Pradesh, and more.`,
  "/about",
  ["PSARA consultant", "security agency licence experts", "PSARA Consultant India"]
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        roman="I"
        eyebrow="About"
        title="Built for trust in private security licensing"
        lead={`${SITE.name} helps entrepreneurs and companies obtain and maintain PSARA Licences with disciplined documentation, training MOUs, and police verification liaison.`}
        crumbs={[{ label: "About" }]}
      />
      <PageMain>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Prose>
              <h2>Who we are</h2>
              <p>
                We are a specialised consultancy focused on{" "}
                <strong>PSARA License registration</strong> and security-agency
                compliance across India. Our work is dossier-first: every file is
                prepared for the Controlling Authority, not for a generic internet
                checklist.
              </p>
              <p>
                Headquartered at{" "}
                <strong>
                  C-36, Third Floor, Capital Galleria, Sirsi Road, Kanakpura,
                  Jaipur 302034
                </strong>
                , we combine Rajasthan depth with desks across Delhi NCR, Gujarat,
                Madhya Pradesh, Uttar Pradesh, Punjab, and other corridors so
                multi-state growth is planned — not improvised.
              </p>

              <h2>What we believe</h2>
              <p>
                Licensing is an art of order. Incomplete objects, weak office proof,
                or skipped training MOUs create avoidable delays. We close those gaps
                before your application lands on a desk. We do not coach concealment
                on police verification, and we do not sell virtual offices that fail
                inspection.
              </p>

              <h2>What we do</h2>
              <ul>
                <li>PSARA Licence registration and renewal support</li>
                <li>Company / LLP incorporation with PSARA-ready objects</li>
                <li>Training institute MOU facilitation</li>
                <li>Police verification liaison for promoters</li>
                <li>GST, MSME, labour (PF/ESIC), and ROC hygiene</li>
                <li>Multi-state sequencing for expanding agencies</li>
              </ul>

              <h2>Experience</h2>
              <p>
                With <strong>10+ years</strong> of practice focus and{" "}
                <strong>500+ agencies</strong> supported, we combine Jaipur HQ depth
                with field desks so documentation, verification, and inspection
                readiness stay coordinated.
              </p>

              <h2>How engagement works</h2>
              <p>
                1) WhatsApp or call discovery — State, entity type, coverage. 2) Gap
                audit of documents. 3) MOU and verification tracks. 4) Controlling
                Authority filing. 5) Inspection readiness and grant support. 6)
                Post-licence compliance briefing.
              </p>

              <h2>Contact</h2>
              <p>
                Call <strong>{CONTACT.phoneDisplay}</strong> · Landline{" "}
                <strong>{CONTACT.landlineDisplay}</strong> · Email{" "}
                <strong>{CONTACT.email}</strong>
              </p>
              <p>{CONTACT.hours}</p>

              <h2>Where we work</h2>
              <ul>
                {OFFICES.map((o) => (
                  <li key={o.city}>
                    <strong>
                      {o.city}
                    </strong>{" "}
                    — {o.badge} ({o.region}): {o.address}, {o.pin}
                  </li>
                ))}
              </ul>
            </Prose>
            <CtaBar title="Speak with our team" />
          </div>
          <div className="folio p-6 lg:col-span-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--cream)]">
              About enquiry
            </h3>
            <div className="mt-4">
              <WhatsAppForm formType="About Page Enquiry" />
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
