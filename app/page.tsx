"use client";

import { useEffect, useRef, useState } from "react";
import { initAllSectionTransitions, ensureGsap, initFluidLine } from "./lib/gsap";
import HeroDossier from "./components/sections/HeroDossier";
import StatsBar from "./components/sections/StatsBar";
import StateBriefs from "./components/sections/StateBriefs";
import TickerMarquee from "./components/ui/TickerMarquee";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Philosophy from "./components/sections/Philosophy";
import StateGridHome from "./components/sections/StateGridHome";
import Presence from "./components/sections/Presence";
import ApprovalRoadmap from "./components/sections/ApprovalRoadmap";
import PracticeIndex from "./components/sections/PracticeIndex";
import GoogleReviews from "./components/sections/GoogleReviews";
import TrustProof from "./components/sections/TrustProof";
import HomeFaq from "./components/sections/HomeFaq";
import HomeContact from "./components/sections/HomeContact";
import SiteFooter from "./components/sections/SiteFooter";
import EligibilityQuiz from "./components/sections/EligibilityQuiz";
import FluidGoldLine from "./components/ui/FluidGoldLine";

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const fluidLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      initAllSectionTransitions(mainRef.current!, "[data-section-transition]");

      // Sticky narrative: pin the sticky wrapper across multiple scenes
      if (stickyRef.current) {
        const scenes = stickyRef.current.querySelectorAll<HTMLElement>(".sticky-scene");
        if (scenes.length) {
          // Fade through scenes as user scrolls
          scenes.forEach((scene, i) => {
            gsap.fromTo(
              scene,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: stickyRef.current,
                  start: `top ${30 + i * 25}%`,
                  end: `top ${5 + i * 25}%`,
                  toggleActions: "play reverse play reverse",
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }
      }

      // Fluid gold line in hero backdrop
      if (fluidLineRef.current) {
        const svg = fluidLineRef.current.querySelector("svg");
        if (svg) {
          initFluidLine(svg as unknown as HTMLElement, {
            pathSelector: ".hero-fluid-path",
            trigger: (document.querySelector("[data-section-transition]") as HTMLElement | null) || mainRef.current,
            start: "top bottom",
            end: "bottom top",
          });
        }
      }
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen overflow-x-hidden bg-[var(--obsidian)]"
    >
      {/* Atmosphere noise grain */}
      <div className="noise-overlay" aria-hidden />

      {/* 1. Hero Dossier — clip-left reveal for cinematic entry */}
      <div data-section-transition data-transition="clip-left">
        <HeroDossier onOpenQuiz={() => setQuizOpen(true)} />
      </div>

      {/* Fluid gold line — scroll-revealed decorative narrative thread */}
      <div ref={fluidLineRef} aria-hidden="true">
        <FluidGoldLine variant="wave" className="py-8 md:py-12" opacity={0.25} />
      </div>

      {/* 2. Stats Bar — clip-up reveal */}
      <div data-section-transition data-transition="clip-up">
        <StatsBar />
      </div>

      {/* 3. Why Choose Us — blur reveal for soft light section */}
      <div data-section-transition data-transition="blur">
        <WhyChooseUs />
      </div>

      {/* 4. Philosophy — clip-left reveal for parallax section */}
      <div data-section-transition data-transition="clip-left">
        <Philosophy />
      </div>

      {/* 5. Ticker Marquee — fade (quick, no drama) */}
      <div data-section-transition data-transition="fade">
        <TickerMarquee />
      </div>

      {/* Sticky Narrative: Trust Journey — 3 scenes pinned while scrolling */}
      <div
        ref={stickyRef}
        className="relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[var(--obsidian)] pointer-events-none">
          <div className="sticky-scene absolute inset-0 flex items-center justify-center p-8 pointer-events-auto" data-story>
            <div className="max-w-2xl text-center">
              <span className="text-gold text-sm tracking-[0.2em] uppercase">01 — Trust</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
                Built on <span className="text-gold">Decades</span> of Compliance Expertise
              </h2>
              <p className="text-lg mt-6 text-white/60 max-w-lg mx-auto">
                128+ Google reviews • 5.0 rating • Trusted across 28 states
              </p>
            </div>
          </div>
          <div className="sticky-scene absolute inset-0 flex items-center justify-center p-8 pointer-events-auto" data-story>
            <div className="max-w-2xl text-center">
              <span className="text-gold text-sm tracking-[0.2em] uppercase">02 — Reach</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
                <span className="text-gold">Pan-India</span> Coverage with Local Expertise
              </h2>
              <p className="text-lg mt-6 text-white/60 max-w-lg mx-auto">
                12 offices • 300+ pages of state-specific insights • Real-time updates
              </p>
            </div>
          </div>
          <div className="sticky-scene absolute inset-0 flex items-center justify-center p-8 pointer-events-auto" data-story>
            <div className="max-w-2xl text-center">
              <span className="text-gold text-sm tracking-[0.2em] uppercase">03 — Commitment</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
                Statute-First · Verification-Ready · <span className="text-gold">Post-Grant</span>
              </h2>
              <p className="text-lg mt-6 text-white/60 max-w-lg mx-auto">
                End-to-end compliance from application to renewal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. State Briefs — clip-right for directional variety */}
      <div data-section-transition data-transition="clip-right">
        <StateBriefs />
      </div>

      {/* 7. State Grid Home — clip-up reveal */}
      <div data-section-transition data-transition="clip-up">
        <StateGridHome />
      </div>

      {/* 8. Pan-India Presence — blur reveal for map */}
      <div data-section-transition data-transition="blur">
        <Presence />
      </div>

      {/* 9. Trust & Proof — clip-left for CTA prominence */}
      <div data-section-transition data-transition="clip-left">
        <TrustProof onOpenQuiz={() => setQuizOpen(true)} />
      </div>

      {/* 10. Approval Roadmap — clip-right reveal */}
      <div data-section-transition data-transition="clip-right">
        <ApprovalRoadmap />
      </div>

      {/* 11. Practice Index — fade (content section, clean reveal) */}
      <div data-section-transition data-transition="fade">
        <PracticeIndex />
      </div>

      {/* 12. Google Reviews — blur reveal for testimonial warmth */}
      <div data-section-transition data-transition="blur">
        <GoogleReviews />
      </div>

      {/* 13. Home FAQ — clip-up reveal */}
      <div data-section-transition data-transition="clip-up">
        <HomeFaq />
      </div>

      {/* 14. Home Contact — blur reveal for contact form */}
      <div data-section-transition data-transition="blur">
        <HomeContact />
      </div>

      {/* Closing fluid gold line */}
      <div aria-hidden="true">
        <FluidGoldLine variant="double" className="py-6" opacity={0.15} />
      </div>

      {/* 15. Site Footer — clip-left reveal */}
      <div data-section-transition data-transition="clip-left">
        <SiteFooter />
      </div>

      <EligibilityQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </main>
  );
}
