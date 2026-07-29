"use client";

import { ShieldCheck, Building, MapPin, Phone, Mail, Clock, Award, CheckCircle2 } from "lucide-react";
import { CONTACT, OFFICES, SITE } from "../../../lib/config";

export default function AboutDossierView() {
  const hq = OFFICES.find((o) => o.isHQ) || OFFICES[0]!;

  return (
    <div className="space-y-16 py-6" itemScope itemType="https://schema.org/AboutPage">
      {/* 1. EXECUTIVE DOSSIER HERO SUMMARY */}
      <div className="relative border border-[var(--line-light)] bg-white p-6 md:p-10 rounded-lg shadow-sm overflow-hidden text-[var(--text-dark)]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line-light)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--obsidian-bg)] text-white text-xs font-bold uppercase tracking-wider rounded">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--amber)]" />
            Pan-India PSARA Advisory
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-dark-muted)]">
            Est. 2014 • Jaipur HQ
          </span>
        </div>

        <div className="mt-6 space-y-4" data-ai-answer="about-summary">
          <p className="text-base md:text-xl leading-relaxed text-[var(--text-dark)] font-bold">
            {SITE.name} is a specialized consultancy focused exclusively on PSARA License registration and security-agency compliance across India.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-[var(--text-dark-muted)] font-medium">
            Our work is dossier-first: every file is meticulously prepared for the Controlling Authority, avoiding generic checklists or avoidable delays.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--line-light)]">
          <div className="p-4 border border-[var(--line-light)] bg-[var(--cream-bg)] rounded text-center">
            <span className="block text-2xl font-extrabold text-[var(--amber)]">10+</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-dark-muted)]">Years Practice</span>
          </div>
          <div className="p-4 border border-[var(--line-light)] bg-[var(--cream-bg)] rounded text-center">
            <span className="block text-2xl font-extrabold text-[var(--amber)]">28</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-dark-muted)]">States Covered</span>
          </div>
          <div className="p-4 border border-[var(--line-light)] bg-[var(--cream-bg)] rounded text-center">
            <span className="block text-2xl font-extrabold text-[var(--amber)]">300+</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-dark-muted)]">Agencies Cleared</span>
          </div>
          <div className="p-4 border border-[var(--line-light)] bg-[var(--cream-bg)] rounded text-center">
            <span className="block text-2xl font-extrabold text-[var(--amber)]">100%</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--text-dark-muted)]">Verification Rate</span>
          </div>
        </div>
      </div>

      {/* 2. OUR CORE BELIEFS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--amber)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text-dark)] uppercase">
            Our Core Beliefs & Practice Ethics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[var(--line-light)] bg-white rounded shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--amber)]">
              <CheckCircle2 className="h-4 w-4" />
              Statute-First Preparation
            </div>
            <p className="text-xs font-medium text-[var(--text-dark-muted)] leading-relaxed">
              We never submit raw or incomplete documents. Every dossier is pre-verified against state rules before portal upload.
            </p>
          </div>

          <div className="p-6 border border-[var(--line-light)] bg-white rounded shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--amber)]">
              <Award className="h-4 w-4" />
              Training Discipline
            </div>
            <p className="text-xs font-medium text-[var(--text-dark-muted)] leading-relaxed">
              We coordinate only with State-recognised security institutes for training MOUs that stand up to inspection.
            </p>
          </div>

          <div className="p-6 border border-[var(--line-light)] bg-white rounded shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--amber)]">
              <Building className="h-4 w-4" />
              Physical Office Network
            </div>
            <p className="text-xs font-medium text-[var(--text-dark-muted)] leading-relaxed">
              Headquartered in Jaipur with key presence in Gurugram, Delhi, Noida, and Lucknow for direct liaison.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
