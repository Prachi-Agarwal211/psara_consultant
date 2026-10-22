import type { Metadata } from "next";
import { GlassCard, Section } from "../../components/v3/PagePrimitives";
import Image from "next/image";
import { Camera } from "lucide-react";
import { PageHero, PageMain } from "../../components/PageShell";
import StageShell from "../components/ui/StageShell";
import { pageMeta } from "../../lib/metadata";
import { DEFAULT_WA } from "../../lib/whatsapp";

export const metadata: Metadata = pageMeta(
  "PSARA License Photo Gallery & Approval Handovers",
  "Photo showcase of PSARA license grants, training institute tie-ups, leadership board meetings, and client handover events.",
  "/gallery",
  ["psara gallery", "security license handovers", "psara photos"]
);

const IMAGES = [
  { src: "/assets/images/cinematic/services-atmosphere.jpg", title: "PSARA Board Review & Strategy Desk", caption: "Senior leadership reviewing state Form-I dossiers" },
  { src: "/assets/images/cinematic/hero-stage.jpg", title: "Controlling Authority Coordination", caption: "Liaison with State Controlling Authority offices across India" },
  { src: "/assets/images/cinematic/process-path.jpg", title: "Client Advisory Session", caption: "Promoter consultation on PSARA filing strategy and compliance" },
];

export default function GalleryPage() {
  return (
    <StageShell showCta={false}>
      <PageHero
        title="PSARA Operations & Handovers Photo Gallery"
        lead="Visual glimpse into our statutory filings, training institute verifications, promoter advisory sessions, and license handovers."
        crumbs={[{ label: "Gallery" }]}
      />

      <PageMain className="v3-gallery">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {IMAGES.map((img) => (
            <GlassCard key={img.title} className="overflow-hidden group">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white">{img.title}</h2>
                <p className="mt-1 text-base text-[var(--white-70)]">{img.caption}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <Section className="bg-[var(--void-2)] p-8 text-center">
          <Camera className="h-8 w-8 text-[var(--gold-bright)] mx-auto mb-3" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Start Your PSARA Licensing Journey</h2>
          <p className="mt-2 text-base text-[var(--white-70)] max-w-xl mx-auto">
            Get your state application filed with zero document defects. Speak to our team.
          </p>
          <div className="mt-6">
            <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider" style={{ background: "var(--grad-metal)", color: "var(--void)" }}>
              WhatsApp Advisory Desk
            </a>
          </div>
        </Section>
      </PageMain>
    </StageShell>
  );
}
