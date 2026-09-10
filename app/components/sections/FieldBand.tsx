"use client";

/**
 * FieldBand — slim cinematic strip (NOT fullscreen bg).
 * Contained rounded band: field footage + navy gradient + headline + CTA.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VideoTile from "../ui/VideoTile";
import Reveal from "../ui/Reveal";

export default function FieldBand() {
  return (
    <section aria-label="Field footage" className="bg-white py-4 text-white sm:py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal variant="scale">
          <VideoTile
            className="h-[340px] rounded-3xl sm:h-[380px]"
            label="Field footage · Jaipur training ground"
            overlay={
              <div className="flex flex-col gap-3 pr-20 sm:flex-row sm:items-end sm:justify-between sm:pr-24">
                <div>
                  <h2
                    className="max-w-xl font-black leading-[1.02]"
                    style={{ fontSize: "clamp(1.6rem,3.6vw,2.6rem)", fontFamily: "var(--font-display)" }}
                  >
                    Asli field. Asli guards. <span className="text-grad-saffron">Asli license.</span>
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
                    Training MOU se lekar deployment tak — hum sirf file nahi, poori agency khadi karte hain.
                  </p>
                </div>
                <Link
                  href="/case-studies"
                  className="btn-shine inline-flex w-fit shrink-0 items-center gap-2 rounded-xl grad-saffron px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#0B1E3B] hover:brightness-105"
                >
                  See Results <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
