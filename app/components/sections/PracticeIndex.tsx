"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Chapter from "../layout/Chapter";
import { lineByLineReveal, ensureGsap, ease, storyEnter } from "../../lib/gsap";

const practices = [
  {
    id: "p1",
    title: "PSARA License Registration",
    meta: "Core Service",
    href: "/services/psara-license",
    desc: "End-to-end Controlling Authority filing — objects, office proof, training MOU, police antecedent, inspection readiness, and grant support across States.",
    image: "/assets/images/security-guard-building.jpg",
  },
  {
    id: "p2",
    title: "Renewal & Multi-State Expansion",
    meta: "Growth",
    href: "/psara-renewal",
    desc: "Renew before expiry, expand districts lawfully, and sequence additional State licences after home-State compliance is stable.",
    image: "/assets/images/modern-office-building.jpg",
  },
  {
    id: "p3",
    title: "Training Institute MOU",
    meta: "Mandatory Clearance",
    href: "/services/training-mou",
    desc: "State-recognised institute shortlisting, MOU execution, and hour compliance so training does not become the silent defect that kills the file.",
    image: "/assets/images/office-team-working.jpg",
  },
  {
    id: "p4",
    title: "Police Verification Support",
    meta: "Antecedent Gate",
    href: "/services/police-verification",
    desc: "Director character packs, SP / Special Branch liaison, and address hygiene so field verification does not restart the calendar.",
    image: "/assets/images/consultation-meeting.jpg",
  },
  {
    id: "p5",
    title: "Company Registration for PSARA",
    meta: "Legal Setup",
    href: "/services/company-registration",
    desc: "Pvt Ltd / LLP incorporation with object clauses that expressly permit private security agency activity — fixed before fee payment.",
    image: "/assets/images/business-meeting.jpg",
  },
  {
    id: "p6",
    title: "Labour & ROC Compliance",
    meta: "Ongoing Support",
    href: "/services/labour-compliance",
    desc: "EPF, ESIC, minimum-wage hygiene, and ROC annual filings so principal employers and renewals do not find a hollow licence.",
    image: "/assets/images/legal-documents.jpg",
  },
];

export default function PracticeIndex() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!root.current) return;
    if (headingRef.current) {
      lineByLineReveal(headingRef.current);
    }
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      storyEnter(root.current!);
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(
      imgRef.current,
      { opacity: 0.5, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.5, ease: ease.expo }
    );
  }, [active]);

  const p = practices[active]!;

  return (
    <Chapter id="services" tone="warm-dark">
      <div ref={root} className="binding-rail pl-0 md:pl-6">
        <div className="mb-10 max-w-xl" data-story>
          <h2 ref={headingRef} className="display-xl text-[var(--cream)]">
            Our Licensing <span className="text-[var(--gold)]">Services</span>
          </h2>
          <p className="body-copy mt-3 text-[var(--cream-warm)]">
            Select a line. Depth sits in the service pages — this index is the map of how we take
            agencies from idea to licensed, renewable operation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12" data-story>
          <div className="lg:col-span-6">
            <div className="border-t border-[var(--line-gold)]" />
            {practices.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`practice-row w-full text-left cursor-pointer ${active === i ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="flex items-center gap-3">
                  <span className="num-marker num-marker-sm text-xs">{String(i + 1).padStart(2, '0')}</span>
                  <span className="title text-base md:text-lg">{item.title}</span>
                </span>
                <span className="meta text-xs text-[var(--gold)]">{item.meta}</span>
              </button>
            ))}
            <Link
              href="/services"
              className="mt-6 inline-block text-sm font-bold text-[var(--gold)] underline"
            >
              View all services →
            </Link>
          </div>

          <div className="lg:col-span-6">
            <div className="relative sticky top-24 aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-[var(--line-gold)] md:aspect-[5/6]"
                 style={{ backgroundColor: "var(--warm-dark-2, #241e16)" }}>
              <div ref={imgRef} className="absolute inset-0">
                <Image
                  key={p.image}
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0"
                     style={{
                       background: "linear-gradient(to top, var(--warm-dark-2, #241e16) 0%, color-mix(in srgb, var(--warm-dark-2, #241e16) 60%, transparent) 100%)",
                     }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">{p.meta}</span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--cream)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--cream-warm)]">
                  {p.desc}
                </p>
                <Link
                  href={p.href}
                  className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[var(--gold)] underline"
                >
                  Open service detail →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
