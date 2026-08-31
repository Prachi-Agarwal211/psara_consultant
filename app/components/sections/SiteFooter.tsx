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
      className="psara-site-footer footer-mosaic relative z-10 border-t border-white/15 bg-gradient-to-br from-[#080611] via-[#15151A] to-[#21172F] text-white overflow-hidden pb-24 md:pb-12"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Marquee Banner */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-[#D4AF37]/30 py-3.5 bg-gradient-to-r from-[#2A1853] via-[#180D36] to-[#2A1853]">
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
        <div className="footer-trust-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-white/10 pb-8">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="footer-trust-card flex items-center gap-3 p-3 rounded-xl border border-white/10">
              <ShieldCheck className="h-5 w-5 text-[#F5D061] shrink-0" />
              <div>
                <span className="block text-xs font-bold text-white uppercase">{b.label}</span>
                <span className="block text-[10px] text-[#94A3B8] font-normal">{b.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column footer: brand/contact stays aligned left while all navigation stays in one responsive rail. */}
        <div className="mb-12 grid grid-cols-1 gap-10 border-b border-white/10 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] lg:gap-16">
          <div className="min-w-0 space-y-6">
            <BrandMark variant="light" />
            <p className="max-w-md text-sm font-normal leading-relaxed text-[#CBD5E1]">
              India&apos;s statutory consultancy specialized exclusively in PSARA License registration, Security Agency setup, Police Verification, Director MOUs, and Security Training Institute affiliations across all 36 States &amp; UTs.
            </p>
            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a href={TEL_HREF} className="flex min-w-0 items-center gap-2 text-white transition-colors hover:text-[#F5D061]">
                <Phone className="h-4 w-4 shrink-0 text-[#F5D061]" />
                <span className="break-words font-bold">{CONTACT.phoneDisplay}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex min-w-0 items-center gap-2 text-[#CBD5E1] transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-[#F5D061]" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
            </div>

            <div className="max-w-md border-t border-white/10 pt-5">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#F5D061]">Headquarters</span>
              <p className="flex items-start gap-2 text-sm leading-relaxed text-[#CBD5E1]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>C-36, Capital Galleria, Sirsi Road, Kanakpura, Jaipur, Rajasthan 302034</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-xs text-[#CBD5E1]">
                <span>Jaipur Time:</span>
                <span className="font-mono font-bold text-[#F5D061]"><LiveClock /></span>
              </div>

              <div className="mt-4">
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#F5D061]">Official Handles</span>
                <div className="flex items-center gap-2">
                  <a href={CONTACT.social.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="footer-social footer-social-linkedin rounded-xl border border-white/15 bg-white/5 p-2 text-white transition-colors hover:border-[#D4AF37] hover:text-[#F5D061]" aria-label="LinkedIn"><Share2 className="h-4 w-4" /></a>
                  <a href={CONTACT.social.facebook || "#"} target="_blank" rel="noopener noreferrer" className="footer-social footer-social-facebook rounded-xl border border-white/15 bg-white/5 p-2 text-white transition-colors hover:border-[#D4AF37] hover:text-[#F5D061]" aria-label="Facebook"><Share2 className="h-4 w-4" /></a>
                  <a href={CONTACT.social.instagram || "#"} target="_blank" rel="noopener noreferrer" className="footer-social footer-social-instagram rounded-xl border border-white/15 bg-white/5 p-2 text-white transition-colors hover:border-[#D4AF37] hover:text-[#F5D061]" aria-label="Instagram"><Share2 className="h-4 w-4" /></a>
                  <Link href="/google" className="rounded-xl border border-white/15 bg-white/5 p-2 text-white transition-colors hover:border-[#D4AF37] hover:text-[#F5D061]" aria-label="Google Profile"><Globe className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-nav-rail grid min-w-0 grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            <div className="footer-nav-column footer-nav-column--explore min-w-0">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#F5D061]">Explore</span>
              <ul className="space-y-2 text-sm text-[#DCE4E4]">
                <li><Link href="/" className="footer-link transition-colors hover:text-white">Home</Link></li>
                <li><Link href="/about" className="footer-link transition-colors hover:text-white">About Us</Link></li>
                <li><Link href="/services" className="footer-link transition-colors hover:text-white">Services</Link></li>
                <li><Link href="/states" className="footer-link transition-colors hover:text-white">States Directory</Link></li>
                <li><Link href="/calculator" className="footer-link transition-colors hover:text-white">Fee Calculator</Link></li>
                <li><Link href="/case-studies" className="footer-link transition-colors hover:text-white">Case Studies</Link></li>
                <li><Link href="/industries" className="footer-link transition-colors hover:text-white">Industries</Link></li>
                <li><Link href="/certification" className="footer-link transition-colors hover:text-white">Certifications</Link></li>
                <li><Link href="/contact" className="footer-link transition-colors hover:text-white">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-nav-column footer-nav-column--services min-w-0">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#F5D061]">Core Services</span>
              <ul className="space-y-2 text-sm text-[#DCE4E4]">
                <li><Link href="/services/psara-license" className="footer-link transition-colors hover:text-white">Fresh PSARA License</Link></li>
                <li><Link href="/services/psara-license-renewal" className="footer-link transition-colors hover:text-white">PSARA Renewal</Link></li>
                <li><Link href="/services/multi-state-psara-license" className="footer-link transition-colors hover:text-white">Multi-State Licensing</Link></li>
                <li><Link href="/services/psara-training-mou" className="footer-link transition-colors hover:text-white">Training Institute MOUs</Link></li>
                <li><Link href="/services/police-verification-clearance" className="footer-link transition-colors hover:text-white">Police Verification Clearance</Link></li>
                <li><Link href="/services/security-agency-incorporation" className="footer-link transition-colors hover:text-white">Agency Incorporation</Link></li>
                <li><Link href="/emergency" className="font-bold text-[#C4B5FD] transition-colors hover:text-[#F5D061]">Emergency Filing Desk</Link></li>
              </ul>
            </div>

            <div className="footer-nav-column footer-nav-column--states col-span-2 min-w-0 xl:col-span-1">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#F5D061]">State Coverage</span>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-[#DCE4E4] xl:grid-cols-1">
                <li><Link href="/states/rajasthan" className="footer-link transition-colors hover:text-white">Rajasthan PSARA</Link></li>
                <li><Link href="/states/delhi" className="footer-link transition-colors hover:text-white">Delhi NCR PSARA</Link></li>
                <li><Link href="/states/maharashtra" className="footer-link transition-colors hover:text-white">Maharashtra PSARA</Link></li>
                <li><Link href="/states/karnataka" className="footer-link transition-colors hover:text-white">Karnataka PSARA</Link></li>
                <li><Link href="/states/uttar-pradesh" className="footer-link transition-colors hover:text-white">Uttar Pradesh PSARA</Link></li>
                <li><Link href="/states/haryana" className="footer-link transition-colors hover:text-white">Haryana PSARA</Link></li>
                <li className="col-span-2 xl:col-span-1"><Link href="/states" className="font-bold text-[#F5D061] transition-colors hover:text-white">View All 36 States &amp; UTs &rarr;</Link></li>
              </ul>
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
