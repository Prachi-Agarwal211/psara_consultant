"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Building, Shield, FileCheck, ChevronDown, ArrowRight, Scale } from "lucide-react";
import FormattedText from "../../../components/FormattedText";
import type { CityInfo } from "../../../data/cities";
import type { StateInfo } from "../../../data/states";
import type { generateCityContent } from "../../../lib/seo-content";

type CityContent = ReturnType<typeof generateCityContent>;

interface CityDossierViewProps {
  city: CityInfo;
  state?: StateInfo;
  content: CityContent;
  siblings: CityInfo[];
}

export default function CityDossierView({
  city,
  state,
  content,
  siblings,
}: CityDossierViewProps) {
  return (
    <div className="space-y-16 py-6" itemScope itemType="https://schema.org/HowTo">
      <meta itemProp="name" content={`PSARA License in ${city.name}`} />
      <meta itemProp="description" content={content.metaDescription} />

      {/* 1. CITY DOSSIER HERO SUMMARY */}
      <div className="relative border border-[var(--line-light)] bg-white p-6 md:p-10 rounded-lg shadow-sm overflow-hidden text-[var(--text-dark)]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--line-light)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--obsidian-bg)] text-white text-xs font-bold uppercase tracking-wider rounded">
              <MapPin className="h-3.5 w-3.5 text-[var(--amber)]" />
              City Security Desk
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-dark-muted)]">
              Ref: CITY-{city.slug.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[var(--text-dark-muted)]">
            <span>Tier-{city.tier} Jurisdiction</span>
            {state && (
              <>
                <span>•</span>
                <Link href={`/states/${state.slug}`} className="text-[var(--amber)] hover:underline">
                  {state.name} State Framework
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Intro Paragraphs */}
        <div className="mt-6 space-y-4">
          {content.intro.map((p, idx) => (
            <FormattedText
              key={idx}
              text={p}
              as="p"
              className="text-base md:text-lg leading-relaxed text-[var(--text-dark-muted)] font-medium block"
            />
          ))}
        </div>

        {/* Economy Tags */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--line-light)]">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--amber)] mr-2">Local Demand Drivers:</span>
          {city.economyTags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded bg-[var(--cream-bg)] border border-[var(--line-light)] text-xs font-bold text-[var(--text-dark)] uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. STATE JURISDICTION & AUTHORITY FRAMEWORK */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[var(--amber)]" aria-hidden />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--text-dark)] uppercase">
            State Licensing Framework for {city.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-6 md:p-8 border border-[var(--line-light)] bg-white rounded shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--amber)]">
              <Scale className="h-4 w-4" />
              Controlling Authority Pathway
            </div>
            {content.authorityBlock.map((p, idx) => (
              <FormattedText
                key={idx}
                text={p}
                as="p"
                className="text-sm font-medium leading-relaxed text-[var(--text-dark-muted)] block"
              />
            ))}
          </div>

          <div className="md:col-span-4 p-6 border border-[var(--line-light)] bg-[var(--obsidian-bg)] text-white rounded flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--amber)]">City Operations Desk</span>
              <h3 className="mt-2 text-lg font-bold text-white uppercase">Headquartered Office Filing</h3>
              <p className="mt-2 text-xs text-white/60 leading-relaxed font-medium">
                Ensure commercial premises proof and promoter police antecedent records align with local {city.name} inspection culture.
              </p>
            </div>
            <a href="#city-contact" className="px-4 py-3 rounded bg-[var(--amber)] text-black text-center text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">
              Contact {city.name} Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
