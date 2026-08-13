"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Share2, Globe, Sparkles } from "lucide-react";
import { CONTACT, SITE } from "@/lib/config";
import { TEL_HREF } from "@/lib/whatsapp";
import BrandMark from "../ui/BrandMark";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function pad(n: number) { return n.toString().padStart(2, "0"); }
    function update() {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(`${pad(ist.getHours())}:${pad(ist.getMinutes())}:${pad(ist.getSeconds())} IST`);
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

const TRUST_BADGES = [
  { label: "PSARA Specialist Practice", sub: "Dedicated Regulatory Filing" },
  { label: "28 States & 8 UTs", sub: "Controlling Authority Network" },
  { label: "Licensed Agency Track Record", sub: "Pan-India Dossier Clearance" },
  { label: "Statutory Advisory", sub: "PSARA Act 2005 Compliant" },
];

import StateDirectoryFooter from "./StateDirectoryFooter";

export default function SiteFooter() {
  return (
    <footer
      className="relative z-10 border-t-2 border-[#C89B3C]/30 bg-[#07192C] text-white overflow-hidden"
    >
      {/* Full-bleed ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px]" style={{ background: "radial-gradient(ellipse 50% 80% at 50% 0%, rgba(200,155,60,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="relative mx-auto max-w-[var(--page-max)] px-6 lg:px-8 py-12">
        {/* Marquee CTA Banner */}
        <div className="mb-14 overflow-hidden rounded-2xl border border-[#C89B3C]/30 py-4 bg-[#0A233F]">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-lg md:text-xl font-black uppercase tracking-[0.3em] text-[#FFF2BA] px-6">
              START YOUR PSARA LICENSE APPLICATION &nbsp;&middot;&nbsp; 28 STATES &amp; 8 UTs COVERAGE &nbsp;&middot;&nbsp; REGULATORY COMPLIANCE &nbsp;&middot;&nbsp;
            </span>
            <span className="text-lg md:text-xl font-black uppercase tracking-[0.3em] text-[#FFF2BA] px-6">
              START YOUR PSARA LICENSE APPLICATION &nbsp;&middot;&nbsp; 28 STATES &amp; 8 UTs COVERAGE &nbsp;&middot;&nbsp; REGULATORY COMPLIANCE &nbsp;&middot;&nbsp;
            </span>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-b border-white/10 pb-10">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C89B3C] shrink-0" />
              <div>
                <span className="block text-xs font-black text-white uppercase">{b.label}</span>
                <span className="block text-xs text-slate-300 font-medium">{b.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-1">
            <BrandMark />
            <p className="mt-4 text-xs font-medium leading-relaxed text-slate-300">
              India&apos;s leading legal consultancy specialized exclusively in PSARA License registration, Security Agency setup, Police Verification, Director MOUs, and Security Training Institute affiliations across all 36 States &amp; UTs.
            </p>
            <div className="mt-6 space-y-2 text-xs">
              <a href={TEL_HREF} className="flex items-center gap-2 text-white hover:text-[#FFF2BA] transition-colors font-bold">
                <Phone className="h-3.5 w-3.5 text-[#C89B3C]" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-[#C89B3C]" />
                <span>{CONTACT.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div>
            <span className="block text-xs font-black uppercase tracking-widest text-[#C89B3C] mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Leadership</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/certification" className="hover:text-white transition-colors">ISO &amp; Certifications</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Fee Calculator</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link href="/csr" className="hover:text-white transition-colors">Welfare &amp; CSR</Link></li>
            </ul>
          </div>

          {/* Column 3: PSARA Services */}
          <div>
            <span className="block text-xs font-black uppercase tracking-widest text-[#C89B3C] mb-4">
              Services
            </span>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><Link href="/services/psara-license" className="hover:text-white transition-colors">Fresh PSARA License</Link></li>
              <li><Link href="/services/psara-license-renewal" className="hover:text-white transition-colors">PSARA License Renewal</Link></li>
              <li><Link href="/services/multi-state-psara" className="hover:text-white transition-colors">Multi-State Licensing</Link></li>
              <li><Link href="/services/training-mou" className="hover:text-white transition-colors">Training Institute MOUs</Link></li>
              <li><Link href="/services/police-verification" className="hover:text-white transition-colors">Police Verification &amp; NOC</Link></li>
              <li><Link href="/services/company-registration" className="hover:text-white transition-colors">Security Agency Setup</Link></li>
              <li><Link href="/emergency" className="hover:text-[#FFF2BA] transition-colors font-bold text-[#C89B3C]">24/7 Urgent Desk</Link></li>
            </ul>
          </div>

          {/* Column 4: Top States Directory */}
          <div>
            <span className="block text-xs font-black uppercase tracking-widest text-[#C89B3C] mb-4">
              State Coverage
            </span>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><Link href="/states/rajasthan" className="hover:text-white transition-colors">Rajasthan PSARA</Link></li>
              <li><Link href="/states/delhi" className="hover:text-white transition-colors">Delhi NCR PSARA</Link></li>
              <li><Link href="/states/maharashtra" className="hover:text-white transition-colors">Maharashtra PSARA</Link></li>
              <li><Link href="/states/karnataka" className="hover:text-white transition-colors">Karnataka PSARA</Link></li>
              <li><Link href="/states/uttar-pradesh" className="hover:text-white transition-colors">Uttar Pradesh PSARA</Link></li>
              <li><Link href="/states/haryana" className="hover:text-white transition-colors">Haryana PSARA</Link></li>
              <li><Link href="/states" className="hover:text-[#FFF2BA] font-bold transition-colors">View All 36 States &rarr;</Link></li>
            </ul>
          </div>

          {/* Column 5: Headquarters & Socials */}
          <div>
            <span className="block text-xs font-black uppercase tracking-widest text-[#C89B3C] mb-4">
              Headquarters
            </span>
            <div className="text-xs text-slate-300 font-medium space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#C89B3C] shrink-0 mt-0.5" />
                <span>C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur, Rajasthan 302034</span>
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center gap-3 text-xs text-slate-300">
                <span>Jaipur Time:</span>
                <span className="text-[#FFF2BA] font-mono font-bold"><LiveClock /></span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                GPS: 26.9124° N, 75.7873° E
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="block text-xs font-black uppercase tracking-widest text-[#C89B3C] mb-3">
                Follow Official Handles
              </span>
              <div className="flex items-center gap-3">
                <a href={CONTACT.social.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#C89B3C] hover:text-[#FFF2BA] transition-colors" aria-label="LinkedIn">
                  <Share2 className="h-4 w-4" />
                </a>
                <a href={CONTACT.social.facebook || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#C89B3C] hover:text-[#FFF2BA] transition-colors" aria-label="Facebook">
                  <Share2 className="h-4 w-4" />
                </a>
                <a href={CONTACT.social.instagram || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#C89B3C] hover:text-[#FFF2BA] transition-colors" aria-label="Instagram">
                  <Share2 className="h-4 w-4" />
                </a>
                <Link href="/google" className="p-2.5 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#C89B3C] hover:text-[#FFF2BA] transition-colors" aria-label="Google Business Profile">
                  <Globe className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statewise 36 States & UTs Directory Grid */}
        <StateDirectoryFooter />

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="space-y-1">
            <div>
              © {new Date().getFullYear()} {SITE.name}. All Rights Reserved. Statutory PSARA Advisory Network India.
            </div>
            <div className="flex items-center gap-2 pt-1 text-slate-300">
              <span className="text-slate-400 font-medium">Designed &amp; Engineered by</span>
              <a
                href="https://reverbex.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F3C65] border border-[#78A2D2]/40 text-[#FFF2BA] font-black uppercase tracking-wider hover:bg-[#C89B3C] hover:text-[#0F3C65] transition-all duration-200 shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/reverbex-logo.png" alt="Reverbex Technology" className="w-4 h-4 rounded object-contain" />
                <span>Reverbex Technology</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="https://psara.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFF2BA] transition-colors">MHA PSARA portal</a>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/franchise" className="hover:text-[#FFF2BA] transition-colors">Franchise Desk</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
