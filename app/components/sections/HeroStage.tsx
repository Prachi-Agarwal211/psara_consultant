"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { prefersReducedMotion, ensureGsap } from "../../../app/lib/gsap";
import BrandMark from "../ui/BrandMark";

export default function HeroStage() {
  const rootRef = useRef<HTMLElement | null>(null);
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
      void video.play()
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
    if (!rootRef.current || prefersReducedMotion()) return;
    const root = rootRef.current;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(root.querySelectorAll<HTMLElement>("[data-hero-word]"),
        { opacity: 0, yPercent: 105 },
        { opacity: 1, yPercent: 0, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.15 });
      gsap.fromTo(root.querySelectorAll<HTMLElement>("[data-hero-fade]"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.35 });
      gsap.fromTo(root.querySelector<HTMLElement>("[data-hero-prop]"),
        { opacity: 0, y: 28 },
        { opacity: 0.94, y: 0, duration: 1.2, ease: "power3.out", delay: 0.35 });
      gsap.fromTo(root.querySelector<HTMLElement>("[data-hero-laptop]"),
        { opacity: 0, y: 24 },
        { opacity: 0.82, y: 0, duration: 1.1, ease: "power3.out", delay: 0.5 });
      gsap.fromTo(root.querySelectorAll<HTMLElement>("[data-hero-rail-item]"),
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.6 });
      gsap.to(root.querySelector<HTMLElement>("[data-hero-media]"), {
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-[#050B14] text-white" aria-label="PSARA License Consultant India">
      <div data-hero-media className="absolute inset-0 -z-20 origin-center">
        <Image src="/assets/images/generated/hero-poster.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        {showVideo && (
          <video ref={videoRef} className={`absolute inset-0 h-full w-full object-cover object-[54%_38%] contrast-[1.08] saturate-[0.92] transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`} autoPlay muted loop playsInline preload="auto" poster="/assets/images/generated/hero-poster.webp" disablePictureInPicture disableRemotePlayback aria-hidden>
            <source src="/assets/videos/hero-loop.mp4" type="video/mp4" />
            <source src="/assets/videos/hero-loop.webm" type="video/webm" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(5,11,20,0.92) 0%, rgba(5,11,20,0.76) 38%, rgba(5,11,20,0.38) 72%, rgba(5,11,20,0.28) 100%), linear-gradient(180deg, rgba(5,11,20,0.24) 0%, rgba(5,11,20,0.02) 48%, rgba(5,11,20,0.72) 100%)" }} />

      <div className="pointer-events-none absolute left-[var(--gutter)] top-5 z-20 flex items-center gap-2.5 sm:top-7" aria-label="PSARA Consultant India">
        <BrandMark variant="light" compact />
        <span className="flex flex-col text-left leading-none text-white">
          <span className="text-[0.78rem] font-bold uppercase tracking-[0.16em] sm:text-[0.95rem]">PSARA</span>
          <span className="mt-1 text-[0.46rem] font-bold uppercase tracking-[0.2em] text-[#E8D5A3] sm:text-[0.52rem]">Consultant India</span>
        </span>
      </div>

      <aside
        data-hero-rail
        className="pointer-events-auto absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:left-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))]"
        aria-label="Hero section index"
      >
        <span data-hero-rail-item className="h-12 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-white/20" aria-hidden="true" />
        <span data-hero-rail-item className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-bold uppercase tracking-[0.28em] text-white/60">Desk index</span>
        <nav className="flex flex-col items-center gap-2.5" aria-label="Homepage sections">
          {[{ number: "01", label: "Proof", href: "#proof" }, { number: "02", label: "About", href: "#about" }, { number: "03", label: "Services", href: "#services" }, { number: "04", label: "States", href: "#states" }].map((item) => (
            <a
              key={item.href}
              data-hero-rail-item
              href={item.href}
              className="group flex flex-col items-center gap-0.5 px-1 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60 transition-[color,transform] duration-200 hover:-translate-x-0.5 hover:text-[#E8D5A3]"
            >
              <span className="text-[#D4AF37]">{item.number}</span>
              <span className="hidden text-center xl:inline">{item.label}</span>
              <span className="sr-only">Go to {item.label}</span>
            </a>
          ))}
        </nav>
        <span data-hero-rail-item className="h-12 w-px bg-gradient-to-t from-transparent via-white/25 to-[#D4AF37]" aria-hidden="true" />
      </aside>

      <div data-hero-laptop className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[24%] w-[54%] overflow-hidden opacity-0 lg:block" aria-hidden="true">
        <Image
          src="/assets/images/generated/landing-hero-violet.png"
          alt=""
          fill
          sizes="54vw"
          className="object-cover object-[78%_72%]"
          style={{ filter: "saturate(0.68) hue-rotate(-52deg) contrast(1.08) brightness(0.82)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/35 via-transparent to-[#050B14]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col items-center px-[var(--gutter)] pb-8 pt-28 text-center sm:pb-10 sm:pt-32 lg:pb-12">
        <div className="mt-auto flex w-full max-w-5xl flex-col items-center pb-24 pt-16 sm:pb-24 lg:pb-[11rem]" data-hero-fade>
          <h1 className="w-full text-[clamp(4.7rem,12vw,11rem)] font-medium leading-[0.76] tracking-[-0.065em] text-white" style={{ fontFamily: "var(--font-display)" }}>
            <span className="block overflow-hidden pb-[0.08em]"><span data-hero-word className="inline-block">PSARA</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span data-hero-word className="metal-text inline-block font-[family-name:var(--font-body)] text-[clamp(2.6rem,6.5vw,5.8rem)] font-semibold not-italic uppercase tracking-[0.01em]">CONSULTANT INDIA</span></span>
          </h1>
          <p className="mt-6 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#E8D5A3] sm:mt-8 sm:text-xs"><span className="h-px w-10 bg-[#D4AF37] sm:w-16" /> Regulatory clarity before submission <span className="h-px w-10 bg-[#D4AF37] sm:w-16" /></p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/82 sm:mt-7 sm:text-lg" data-hero-fade>State-specific filing strategy, training MOU coordination, police verification, and post-grant compliance for security agencies across India.</p>
        </div>

      </div>
      <div data-hero-prop className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[13%] opacity-0 lg:h-[24%] lg:w-full" aria-hidden="true">
        <Image src="/assets/images/generated/psara-hero-desk-cutout.png" alt="" width={1672} height={940} priority sizes="(max-width: 1023px) 100vw, 58vw" className="h-full w-full object-cover object-bottom" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/80 via-[#050B14]/10 to-transparent" />
      </div>
    </section>
  );
}
