"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import BrandMark from "../ui/BrandMark";
import {
  ArrowUpRight,
  Mail,
  MessageSquare,
  Phone,
  PhoneCall,
  User,
  Briefcase,
  MapPin,
  Calculator,
  FileText,
  Building2,
  Award,
} from "lucide-react";
import { isMobile, prefersReducedMotion } from "../../../app/lib/gsap";
import { ensureGsap } from "../../../app/lib/motion";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

const NAV = [
  { label: "ABOUT", href: "/about", icon: User },
  { label: "SERVICES", href: "/services", icon: Briefcase },
  { label: "STATES", href: "/states", icon: MapPin },
  { label: "FEE CALCULATOR", href: "/calculator", icon: Calculator },
  { label: "CASE STUDIES", href: "/case-studies", icon: FileText },
  { label: "INDUSTRIES", href: "/industries", icon: Building2 },
  { label: "CERTIFICATIONS", href: "/certification", icon: Award },
  { label: "CONTACT", href: "/contact", icon: PhoneCall },
];

export default function HeroStage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const noopSubscribe = () => () => {};
  const showVideo = useSyncExternalStore(
    noopSubscribe,
    () => !isMobile() && !prefersReducedMotion(),
    () => false
  );

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const root = rootRef.current;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(() => {
      // Subtle parallax: background elements move slower than foreground
      const parallax = (el: HTMLElement, amount: number) => {
        gsap.to(el, {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      };

      // Hero text fades in after preloader (or instantly if already seen)
      const hl = root.querySelector<HTMLElement>("[data-hero-hl]");
      if (hl) {
        gsap.set(hl.querySelectorAll<HTMLElement>("[data-hero-word]"), {
          opacity: 0,
          y: 24,
        });
        gsap.to(hl.querySelectorAll<HTMLElement>("[data-hero-word]"), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        });
      }

      // Sticky CTA stays visible during scroll (fixed scrim, not parallax)
      const scrim = root.querySelector<HTMLElement>(
        "div[style*='linear-gradient(180deg, rgba(8,7,20,0.62)']"
      );
      if (scrim) {
        gsap.set(scrim, { opacity: 0.9 });
      }
    }, root);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-end overflow-hidden bg-[#080714]"
      data-parallax-root
      aria-label="PSARA License Consultant India — Hero"
    >
      {/* ── Layer: Video + Scrim ── */}
      <div className="absolute inset-0 w-full">
        {/*.img
          src="/assets/images/generated/hero-poster.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        }-->
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/images/generated/hero-poster.webp"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/assets/videos/hero-loop.webm" type="video/webm" />
          </video>
        )}
        {/* Legibility scrim — keeps text readable over video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,7,20,0.52) 0%, rgba(8,7,20,0.22) 40%, rgba(8,7,20,0.75) 100%)",
          }}
        />
      </div>

      {/* ── Center Brand & Content ── */}
      <div className="relative z-20 w-full max-w-[520px] mx-auto px-4 py-12 md:py-20 text-center">
        {/* Logo — enlarged, always visible */}
        <div className="mx-auto mb-8">
          <Link href="/" className="block transition-transform duration-200 hover:scale-[1.03]" aria-label="PSARA Consultant India">
            <BrandMark compact={false} />
          </Link>
        </div>

        {/* Headline — EB Garamond serif, prominent */}
        <h1
          data-hero-hl
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-white tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <span data-hero-word className="inline-block will-change-transform text-white">
              PSARA License
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.05em]">
            <span data-hero-word className="text-[#8F681B] italic">
              Consultant India
            </span>
          </span>
        </h1>

        {/* Sub copy — legible, not cramped */}
        <p
          className="mt-3 text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-relaxed text-white/80 max-w-[480px] mx-auto"
          style={{ fontFamily: "var(--font-body)", textWrap: "balance" }}
        >
          Statutory licensing, recognized training MOUs, police verification tracking, and direct Controlling Authority filing across India.
        </p>

        {/* CTAs — prominent, always visible from next section */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            data-cursor="Explore →"
            className="btn-gold rounded-xl px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#241703] transition-all hover:translate-y-[-2px] active:translate-y-0 shadow-xl shadow-[#C89B3C]/30"
          >
            <span>Explore Services</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WhatsApp"
            className="btn-ghost-gold rounded-xl px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="h-4 w-4 fill-white" />
            <span>WhatsApp Desk</span>
          </a>
        </div>

        {/* Micro proof — subtle, not distracting */}
        <p
          className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-white/55"
        >
          Statute-first • Verification-ready
        </p>
      </div>
    </section>
  );
}