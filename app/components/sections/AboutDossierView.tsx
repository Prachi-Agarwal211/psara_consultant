"use client";

import {
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  CheckCircle2,
  FileCheck,
  Compass,
  ArrowRight
} from "lucide-react";
import { CONTACT, OFFICES, SITE } from "../../../lib/config";

export default function AboutDossierView() {
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  return (
    <div className="space-y-16 py-6" itemScope itemType="https://schema.org/AboutPage">
      {/* ════════════════════════════════════════════
          1. ABOUT DOSSIER HERO SUMMARY
          ════════════════════════════════════════════ */}
      <div className="relative border border-[var(--line-gold)] p-6 md:p-10 overflow-hidden"
        style={{
          backgroundColor: "color-mix(in srgb, var(--warm-dark-2) 70%, transparent)",
        }}>
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--gold)] opacity-50" aria-hidden />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--gold)] opacity-50" aria-hidden />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[var(--gold)] text-[var(--gold)] text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)" }}>
            <ShieldCheck className="h-3.5 w-3.5" />
            Pan-India PSARA Advisory
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--cream-dim)]">
            Est. 2014 • Jaipur HQ
          </span>
        </div>

        <div className="mt-6 space-y-4" data-ai-answer="about-summary">
          <p className="text-base md:text-xl leading-relaxed text-[var(--cream)] font-semibold">
            {SITE.name} is a specialized consultancy focused exclusively on PSARA License registration and security-agency compliance across India.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-[var(--text-muted)] font-medium">
            Our work is dossier-first: every file is meticulously prepared for the Controlling Authority, avoiding generic checklists or avoidable delays.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--line)]">
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] text-center">
            <span className="block text-2xl font-extrabold text-[var(--gold)]">10+</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--cream-dim)]">Years Practice</span>
          </div>
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] text-center">
            <span className="block text-2xl font-extrabold text-[var(--gold)]">300+</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--cream-dim)]">Agencies Served</span>
          </div>
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] text-center">
            <span className="block text-2xl font-extrabold text-[var(--gold)]">100%</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--cream-dim)]">Dossier Rigor</span>
          </div>
          <div className="p-4 border border-[var(--line)] bg-[var(--obsidian-soft)] text-center">
            <span className="block text-2xl font-extrabold text-[var(--gold)]">Pan-India</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--cream-dim)]">Field Network</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. WHAT WE BELIEVE & OPERATING PILLARS
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            Our Core Beliefs & Ethics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
            <Award className="h-6 w-6 text-[var(--gold)]" />
            <h3 className="text-lg font-bold text-[var(--cream)]">Licensing is Order</h3>
            <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">
              Incomplete objects, weak office proof, or skipped training MOUs create avoidable rejections. We close gaps before submission.
            </p>
          </div>

          <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
            <FileCheck className="h-6 w-6 text-[var(--gold)]" />
            <h3 className="text-lg font-bold text-[var(--cream)]">Verification Hygiene</h3>
            <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">
              We do not coach concealment on police verification, and we do not sell virtual offices that fail physical inspection.
            </p>
          </div>

          <div className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
            <Compass className="h-6 w-6 text-[var(--gold)]" />
            <h3 className="text-lg font-bold text-[var(--cream)]">Multi-State Planning</h3>
            <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">
              Multi-state expansion is planned with HQ coordination across regional desks so growth remains compliant at every step.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. WHAT WE DO & 6-STEP ENGAGEMENT WORKFLOW
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            How Engagement Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Discovery Call", desc: "State, entity type, and operational coverage assessment via WhatsApp or Call." },
            { step: "02", title: "Gap Audit", desc: "Thorough review of director credentials, office proof, and company objects." },
            { step: "03", title: "MOU & Verification", desc: "Facilitating training institute MOUs and police clearance tracking." },
            { step: "04", title: "Controlling Authority Filing", desc: "Precise portal dossier submission and Form I documentation." },
            { step: "05", title: "Inspection & Grant", desc: "Guiding premises inspection readiness through to license grant." },
            { step: "06", title: "Post-Licence Hygiene", desc: "GST, PF/ESIC, register maintenance, and renewal scheduling." },
          ].map((item) => (
            <div key={item.step} className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3 hover:border-[var(--gold)] transition-colors">
              <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--gold)]">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-[var(--cream)]">{item.title}</h3>
              <p className="text-xs font-medium leading-relaxed text-[var(--text-dim)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. NATIONAL OFFICE NETWORK
          ════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--gold)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--cream)]">
            National Field Network & Desks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFICES.map((off) => (
            <div key={off.city} className="border border-[var(--line)] bg-[var(--obsidian-soft)] p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--cream)]">
                  {off.city}
                </span>
                <span className="px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider border border-[var(--line-gold)] text-[var(--gold)]">
                  {off.badge}
                </span>
              </div>
              <p className="text-xs font-medium text-[var(--text-dim)] leading-relaxed">
                <strong className="text-[var(--cream)]">Address:</strong> {off.address}, {off.pin}
              </p>
              <p className="text-xs font-medium text-[var(--text-dim)]">
                <strong className="text-[var(--cream)]">Region:</strong> {off.region}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
