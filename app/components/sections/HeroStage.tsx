"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { prefersReducedMotion, ensureGsap } from "../../../app/lib/gsap";
import BrandMark from "../ui/BrandMark";

/**
 * HeroStage — Khemji sticky cover + MAAC responsive settle.
 * Media must always fill the sticky viewport (object-cover). Desk/laptop art
 * live INSIDE the sticky stage so scroll does not expose raw layer edges.
 */
export default function HeroStage() {
  const shellRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      setShowVideo(!motionQuery.matches);
      if (motionQuery.matches) setVideoReady(false);
    };
    syncMotionPreference();
    motionQuery.addEventListener?.("change", syncMotionPreference);
    return () => motionQuery.removeEventListener?.("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    let disposed = false;
    const playVideo = () => {
      if (disposed) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video
        .play()
        .then(() => {
          if (!disposed) setVideoReady(true);
        })
        .catch(() => {
          if (!disposed) setVideoReady(false);
        });
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") playVideo();
      else video.pause();
    };
    const handleVideoError = () => {
      if (!disposed) setVideoReady(false);
    };

    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("error", handleVideoError);
    document.addEventListener("visibilitychange", handleVisibility);
    playVideo();

    return () => {
      disposed = true;
      video.pause();
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("error", handleVideoError);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [showVideo]);

  useEffect(() => {
    if (!shellRef.current || !stageRef.current || prefersReducedMotion()) return;
    const shell = shellRef.current;
    const stage = stageRef.current;
    const { gsap } = ensureGsap();

    const ctx = gsap.context(async () => {
      if (typeof document !== "undefined" && (document as Document).fonts) {
        await (document as Document).fonts.ready;
      }
      const mm = gsap.matchMedia();

      // Intro — all viewports
      gsap.fromTo(
        stage.querySelectorAll<HTMLElement>("[data-hero-intro]"),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.12 },
      );
      gsap.fromTo(
        stage.querySelectorAll<HTMLElement>("[data-hero-word]"),
        { opacity: 0, yPercent: 110 },
        { opacity: 1, yPercent: 0, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.22 },
      );
      gsap.fromTo(
        stage.querySelectorAll<HTMLElement>("[data-hero-rail-item]"),
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.65, stagger: 0.07, ease: "power3.out", delay: 0.55 },
      );

      // Desktop/tablet: sticky scrub — content lifts out, media scales, desk stays clipped
      mm.add("(min-width: 768px)", () => {
        const media = stage.querySelector<HTMLElement>("[data-hero-media]");
        const content = stage.querySelector<HTMLElement>("[data-hero-content]");
        const veil = stage.querySelector<HTMLElement>("[data-hero-scroll-veil]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: shell,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        if (content) {
          tl.to(content, { opacity: 0, y: -36, ease: "none" }, 0);
        }
        if (media) {
          tl.to(media, { scale: 1.1, ease: "none" }, 0);
        }
        if (veil) {
          tl.fromTo(veil, { opacity: 0 }, { opacity: 0.72, ease: "none" }, 0.15);
        }
      });

      // Mobile: lighter scrub — no aggressive scale (CPU), just fade content + darken
      mm.add("(max-width: 767px)", () => {
        const content = stage.querySelector<HTMLElement>("[data-hero-content]");
        const veil = stage.querySelector<HTMLElement>("[data-hero-scroll-veil]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: shell,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        if (content) tl.to(content, { opacity: 0, y: -18, ease: "none" }, 0);
        if (veil) tl.fromTo(veil, { opacity: 0 }, { opacity: 0.8, ease: "none" }, 0.1);
      });
    }, shell);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={shellRef}
      id="hero"
      className="relative isolate h-[132svh] bg-[var(--canvas-void,#080611)] text-white sm:h-[140svh] lg:h-[150svh]"
      aria-label="PSARA License Consultant India"
    >
      {/* Sticky viewport = always covered; scroll only reveals HeroActions below */}
      <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* MEDIA — full cover, never letterboxed */}
        <div data-hero-media className="absolute inset-0 z-0 origin-center will-change-transform">
          <Image
            src="/assets/images/generated/hero-poster.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {showVideo && (
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover object-[54%_38%] contrast-[1.08] saturate-[0.95] transition-opacity duration-700 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/images/generated/hero-poster.webp"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden
            >
              <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
              <source src="/assets/videos/hero-loop.webm" type="video/webm" />
            </video>
          )}
        </div>

        {/* Brand veil — void/violet/gold only */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,6,17,0.92) 0%, rgba(16,7,40,0.78) 38%, rgba(36,16,75,0.42) 72%, rgba(8,6,17,0.32) 100%), radial-gradient(ellipse 58% 62% at 58% 40%, rgba(109,40,217,0.26), transparent 70%), radial-gradient(ellipse 34% 40% at 78% 72%, rgba(212,175,55,0.10), transparent 72%), linear-gradient(180deg, rgba(8,6,17,0.35) 0%, rgba(8,6,17,0.08) 42%, rgba(8,6,17,0.88) 100%)",
          }}
        />

        {/* Scroll darken (scrubbed) */}
        <div
          data-hero-scroll-veil
          className="pointer-events-none absolute inset-0 z-[2] bg-[var(--canvas-void,#080611)] opacity-0"
          aria-hidden
        />

        {/* Bottom desk prop — clipped inside sticky stage */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[18%] sm:h-[20%] lg:h-[26%]"
          aria-hidden
        >
          <Image
            src="/assets/images/generated/psara-hero-desk-cutout.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--canvas-void,#080611)] via-[var(--canvas-void,#080611)]/35 to-transparent" />
        </div>

        {/* Laptop side art — desktop only, clipped */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 z-[3] hidden h-[28%] w-[48%] overflow-hidden opacity-80 lg:block"
          aria-hidden
        >
          <Image
            src="/assets/images/generated/landing-hero-violet.png"
            alt=""
            fill
            sizes="48vw"
            className="object-cover object-[78%_72%]"
            style={{ filter: "saturate(0.78) hue-rotate(-18deg) contrast(1.06) brightness(0.86)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--canvas-void,#080611)] via-[var(--canvas-void,#080611)]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--canvas-void,#080611)]/50 via-transparent to-[var(--violet-deep,#100728)]/40" />
        </div>

        {/* Left rail — large screens only */}
        <aside
          className="pointer-events-auto absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:left-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))]"
          aria-label="Hero section index"
        >
          <span data-hero-rail-item className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--gold-bright,#D4AF37)] to-white/20" aria-hidden />
          <span data-hero-rail-item className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-bold uppercase tracking-[0.28em] text-white/60">
            Desk index
          </span>
          <nav className="flex flex-col items-center gap-2.5" aria-label="Homepage sections">
            {[
              { number: "01", label: "Proof", href: "#proof" },
              { number: "02", label: "About", href: "#about" },
              { number: "03", label: "Services", href: "#services" },
              { number: "04", label: "States", href: "#states" },
            ].map((item) => (
              <a
                key={item.href}
                data-hero-rail-item
                href={item.href}
                className="group flex flex-col items-center gap-0.5 px-1 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60 transition-[color,transform] duration-200 hover:-translate-x-0.5 hover:text-[var(--gold-light,#F5E6BA)]"
              >
                <span className="text-[var(--gold-bright,#D4AF37)]">{item.number}</span>
                <span className="hidden text-center xl:inline">{item.label}</span>
                <span className="sr-only">Go to {item.label}</span>
              </a>
            ))}
          </nav>
          <span data-hero-rail-item className="h-12 w-px bg-gradient-to-t from-transparent via-white/25 to-[var(--gold-bright,#D4AF37)]" aria-hidden />
        </aside>

        {/* CENTER content — big logo + H1 (SEO kept on single H1) */}
        <div
          data-hero-content
          className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col items-center justify-center px-[var(--gutter)] pb-[14%] pt-[max(4.5rem,env(safe-area-inset-top))] text-center sm:pb-[12%] lg:pb-[10%]"
        >
          <div data-hero-intro className="mb-5 flex flex-col items-center sm:mb-7">
            <BrandMark variant="light" className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32" />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--gold-light,#F5E6BA)] sm:text-[11px]">
              Statutory desk · Pan-India
            </p>
          </div>

          <h1
            className="w-full max-w-5xl text-[clamp(3.4rem,11vw,10.5rem)] font-medium leading-[0.78] tracking-[-0.06em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-word className="inline-block">
                PSARA
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                data-hero-word
                className="metal-text inline-block font-[family-name:var(--font-body)] text-[clamp(1.55rem,4.6vw,4.4rem)] font-semibold not-italic uppercase tracking-[0.02em]"
              >
                CONSULTANT INDIA
              </span>
            </span>
          </h1>

          <p
            data-hero-intro
            className="mt-5 flex max-w-xl items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--gold-light,#F5E6BA)] sm:mt-7 sm:text-[11px]"
          >
            <span className="hidden h-px w-10 bg-[var(--gold-bright,#D4AF37)] sm:inline-block sm:w-14" aria-hidden />
            Regulatory clarity before submission
            <span className="hidden h-px w-10 bg-[var(--gold-bright,#D4AF37)] sm:inline-block sm:w-14" aria-hidden />
          </p>

          <p
            data-hero-intro
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base md:max-w-2xl md:text-lg"
          >
            State-specific filing strategy, training MOU coordination, police verification, and post-grant compliance for security agencies across India.
          </p>
        </div>
      </div>
    </section>
  );
}
