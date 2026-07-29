"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Chapter from "../layout/Chapter";
import MagneticButton from "../ui/MagneticButton";
import { CONTACT } from "../../../lib/config";
import { DEFAULT_WA } from "../../../lib/whatsapp";
import { lineByLineReveal } from "../../lib/gsap";

const stages = [
  {
    title: "Entity, Objects & Office Proof",
    days: "Days 1 – 7",
    image: "/assets/images/legal-documents.jpg",
    points: [
      "Pvt Ltd / LLP / firm structure with PSARA-ready main objects",
      "Registered office pack: rent/lease, utility bill, landlord NOC, photographs",
      "Promoter KYC aligned character-for-character across PAN & Aadhaar",
      "Coverage choice: one district · multi-district · whole State",
    ],
  },
  {
    title: "Training MOU & Affidavits",
    days: "Days 5 – 15",
    image: "/assets/images/office-team-working.jpg",
    points: [
      "MOU with a State-recognised security training institute",
      "Hour pathways for entry-level guards and ex-servicemen where Rules allow",
      "Eligibility / non-conviction affidavits in State-prescribed formats",
      "Proposed uniform designs that do not resemble police or military",
    ],
  },
  {
    title: "Police Antecedent Verification",
    days: "Days 8 – 35+",
    image: "/assets/images/consultation-meeting.jpg",
    points: [
      "Form tracks for each proprietor, partner, or director",
      "District SP / Special Branch / commissionerate pathways by State",
      "Address hygiene so field visits do not restart the clock",
      "Often the longest gate — honest disclosure beats delayed surprises",
    ],
  },
  {
    title: "Authority Filing, Inspection & Grant",
    days: "Days 20 – 60+",
    image: "/assets/images/handshake-deal.jpg",
    points: [
      "Complete dossier to Controlling Authority with correct fee slab",
      "Premises inspection readiness where the State inspects offices",
      "Grant letter / licence hand-off on satisfaction of Authority",
      "Post-grant: registers, labour thresholds, renewal calendar (5-year or 1-year States)",
    ],
  },
];

export default function ApprovalRoadmap() {
  const [active, setActive] = useState(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const s = stages[active]!;

  useEffect(() => {
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
  }, []);

  return (
    <Chapter id="process" tone="ink">
      <div className="binding-rail pl-0 md:pl-6">
        <div className="mb-10 max-w-2xl" data-story>
          <h2 ref={headingRef} className="display-xl text-[var(--cream)]">
            4-Stage PSARA <span className="text-[var(--gold)]">Licensing Process</span>
          </h2>
          <p className="body-copy mt-3 text-[var(--cream-warm)]">
            Indicative 30–70+ day journey depending on State, police queues, and file completeness.
            Select a stage. Timelines are not marketing promises — verification dominates the calendar.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4" data-story>
          {stages.map((st, i) => {
            const isActive = active === i;
            return (
              <button
                key={st.title}
                type="button"
                onClick={() => setActive(i)}
                className={`relative flex flex-col items-start rounded-[var(--radius)] border p-4 text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-[var(--gold)] bg-[var(--obsidian-2)]"
                    : "border-[var(--line-gold)] bg-[var(--obsidian)] hover:border-[var(--gold)]"
                }`}
              >
                {/* Stage number badge — Jasmine/Luke style */}
                <span className="num-marker num-marker-sm absolute top-2 right-2 text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? "text-[var(--gold)]" : "text-[var(--text-dim)]"
                  }`}
                >
                  {st.days}
                </span>
                <p
                  className={`mt-2 w-full text-sm font-bold leading-tight ${
                    isActive ? "text-[var(--gold)]" : "text-[var(--cream)]"
                  }`}
                >
                  {st.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Decorative gold progress rule */}
        <div className="gold-rule gold-rule-left mb-6" data-story></div>

        <div
          data-story
          className="overflow-hidden rounded-[var(--radius)] border border-[var(--line-gold)] bg-[var(--obsidian-2)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative min-h-[260px] lg:col-span-6 lg:min-h-[400px]">
              <Image
                key={s.image}
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-2)] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--obsidian-2)]" />
            </div>

            <div className="flex flex-col justify-between p-6 md:p-10 lg:col-span-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] border border-[var(--line-gold)] px-2 py-0.5 rounded bg-[var(--obsidian)]">
                    Stage {active + 1} of 4
                  </span>
                  <span className="text-xs font-bold text-[var(--cream-warm)]">· {s.days}</span>
                </div>

                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
                  {s.title}
                </h3>

                <ul className="mt-6 space-y-3.5">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-sm font-medium text-[var(--cream-warm)]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton
                  as="a"
                  href={DEFAULT_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Discuss this stage
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                {active < stages.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActive((prev) => prev + 1)}
                    className="btn-ghost cursor-pointer"
                  >
                    Next stage →
                  </button>
                ) : (
                  <Link href="/psara-process" className="btn-ghost">
                    Full process guide
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="h-1 w-full bg-[var(--obsidian)]">
            <div
              className="h-full bg-[var(--gold)] transition-all duration-300"
              style={{ width: `${((active + 1) / stages.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs font-medium text-[var(--text-dim)]" data-story>
          Disclaimer: Day bands are indicative. Madhya Pradesh, Uttarakhand, and Chhattisgarh are
          widely noted for one-year validity — plan renewals, do not assume a universal five-year
          seal. Call {CONTACT.phoneDisplay} for a State-specific roadmap.
        </p>
      </div>
    </Chapter>
  );
}
