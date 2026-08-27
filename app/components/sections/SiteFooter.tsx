"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Share2, Globe } from "lucide-react";
import { CONTACT, SITE } from "@/lib/config";
import { TEL_HREF } from "@/lib/whatsapp";
import BrandMark from "../ui/BrandMark";
import StateDirectoryFooter from "./StateDirectoryFooter";

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
  { label: "36 States & UTs", sub: "Controlling Authority Network" },
  { label: "500+ Licenses Cleared", sub: "Pan-India Track Record" },
  { label: "Statutory Advisory", sub: "PSARA Act 2005 Compliant" },
];

export default function SiteFooter() {
  return (
    <footer
      className="psara-site-footer relative z-10 border-t border-white/15 bg-[#050B14] text-white overflow-hidden pb-24 md:pb-12"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Marquee Banner */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-[#D4AF37]/30 py-3.5 bg-[#10243A]">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#F5D061] px-4">
              START YOUR PSARA LICENSE APPLICATION &nbsp;&middot;&nbsp; 36 STATES &amp; UTs COVERAGE &nbsp;&middot;&nbsp; ZERO REJECTION DISCIPLINE &nbsp;&middot;&nbsp;
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#F5D061] px-4">
              START YOUR PSARA LICENSE APPLICATION &nbsp;&middot;&nbsp; 36 STATES &amp; UTs COVERAGE &nbsp;&middot;&nbsp; ZERO REJECTION DISCIPLINE &nbsp;&middot;&nbsp;
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-white/10 pb-8">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#10243A] border border-white/10">
              <ShieldCheck className="h-5 w-5 text-[#F5D061] shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white uppercase">{b.label}</span>
                <span className="block text-[10px] text-[#94A3B8] font-normal">{b.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <BrandMark variant="light" />
            <p className="text-xs font-normal leading-relaxed text-[#CBD5E1]">
              India&apos;s statutory consultancy specialized exclusively in PSARA License registration, Security Agency setup, Police Verification, Director MOUs, and Security Training Institute affiliations across all 36 States &amp; UTs.
            </p>
            <div className="space-y-2 text-xs pt-2">
              <a href={TEL_HREF} className="flex items-center gap-2 text-white hover:text-[#F5D061] transition-colors font-bold">
                <Phone className="h-3.5 w-3.5 text-[#F5D061]" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-[#CBD5E1] hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-[#F5D061]" />
                <span>{CONTACT.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#F5D061] mb-3">
              Explore
            </span>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/states" className="hover:text-white transition-colors">States Directory</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Fee Calculator</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link href="/certification" className="hover:text-white transition-colors">Certifications</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: PSARA Services */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#F5D061] mb-3">
              Core Services
            </span>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li><Link href="/services/psara-license" className="hover:text-white transition-colors">Fresh PSARA License</Link></li>
              <li><Link href="/services/psara-license-renewal" className="hover:text-white transition-colors">PSARA Renewal</Link></li>
              <li><Link href="/services/multi-state-psara-license" className="hover:text-white transition-colors">Multi-State Licensing</Link></li>
              <li><Link href="/services/psara-training-mou" className="hover:text-white transition-colors">Training Institute MOUs</Link></li>
              <li><Link href="/services/police-verification-clearance" className="hover:text-white transition-colors">Police Verification Clearance</Link></li>
              <li><Link href="/services/security-agency-incorporation" className="hover:text-white transition-colors">Agency Incorporation</Link></li>
              <li><Link href="/emergency" className="hover:text-[#F5D061] transition-colors font-bold text-[#6FB0B2]">Emergency Filing Desk</Link></li>
            </ul>
          </div>

          {/* Column 4: Top States Directory */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#F5D061] mb-3">
              State Coverage
            </span>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li><Link href="/states/rajasthan" className="hover:text-white transition-colors">Rajasthan PSARA</Link></li>
              <li><Link href="/states/delhi" className="hover:text-white transition-colors">Delhi NCR PSARA</Link></li>
              <li><Link href="/states/maharashtra" className="hover:text-white transition-colors">Maharashtra PSARA</Link></li>
              <li><Link href="/states/karnataka" className="hover:text-white transition-colors">Karnataka PSARA</Link></li>
              <li><Link href="/states/uttar-pradesh" className="hover:text-white transition-colors">Uttar Pradesh PSARA</Link></li>
              <li><Link href="/states/haryana" className="hover:text-white transition-colors">Haryana PSARA</Link></li>
              <li><Link href="/states" className="hover:text-[#F5D061] font-bold transition-colors">View All 36 States &amp; UTs &rarr;</Link></li>
            </ul>
          </div>

          {/* Column 5: Headquarters */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#F5D061] mb-3">
              Headquarters
            </span>
            <div className="text-xs text-[#CBD5E1] space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur, Rajasthan 302034</span>
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs">
                <span>Jaipur Time:</span>
                <span className="text-[#F5D061] font-mono font-bold"><LiveClock /></span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#F5D061] mb-2">
                Official Handles
              </span>
              <div className="flex items-center gap-2">
                <a href={CONTACT.social.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#D4AF37] hover:text-[#F5D061] transition-colors" aria-label="LinkedIn">
                  <Share2 className="h-4 w-4" />
                </a>
                <a href={CONTACT.social.facebook || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#D4AF37] hover:text-[#F5D061] transition-colors" aria-label="Facebook">
                  <Share2 className="h-4 w-4" />
                </a>
                <a href={CONTACT.social.instagram || "#"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#D4AF37] hover:text-[#F5D061] transition-colors" aria-label="Instagram">
                  <Share2 className="h-4 w-4" />
                </a>
                <Link href="/google" className="p-2 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#D4AF37] hover:text-[#F5D061] transition-colors" aria-label="Google Profile">
                  <Globe className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* State Directory Footer List */}
        <StateDirectoryFooter />

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8] text-center md:text-left">
          <div>
            © {new Date().getFullYear()} {SITE.name}. All Rights Reserved. Statutory PSARA Advisory Network India.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href="https://psara.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D061] transition-colors">MHA PSARA Portal</a>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/franchise" className="hover:text-[#F5D061] transition-colors">Franchise Desk</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
