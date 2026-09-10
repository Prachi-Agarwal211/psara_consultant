"use client";

/**
 * VideoTile — video used the tasteful way.
 * Small rounded tile (never fullscreen bg): poster first, muted autoplay
 * only while visible, pause offscreen, play/mute controls, poster-only
 * for reduced-motion. No layout shift, no sound ambush.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type Props = {
  className?: string;
  label?: string;
  overlay?: ReactNode;
  mp4?: string;
  webm?: string;
  poster?: string;
};

export default function VideoTile({
  className = "",
  label,
  overlay,
  mp4 = "/assets/videos/hero-loop.mp4",
  webm = "/assets/videos/hero-loop.webm",
  poster = "/assets/images/generated/hero-poster.webp",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Pause when offscreen, resume when visible (unless user paused)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const video = videoRef.current;
          if (!video) return;
          const userPaused = (video as HTMLVideoElement & { __userPaused?: boolean }).__userPaused;
          if (e.isIntersecting) {
            if (!userPaused) video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
          } else if (!video.paused) {
            video.pause();
            setPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      (v as HTMLVideoElement & { __userPaused?: boolean }).__userPaused = false;
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      (v as HTMLVideoElement & { __userPaused?: boolean }).__userPaused = true;
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div ref={wrapRef} className={`group/vt relative overflow-hidden bg-[#0B1E3B] ${className}`}>
      {/* poster first — no black flash */}
      <Image
        src={poster}
        alt=""
        aria-hidden
        fill
        sizes="(max-width:1024px) 100vw, 40vw"
        className={`object-cover transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {!reduced && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          muted={muted}
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={poster}
          onCanPlay={() => setReady(true)}
        >
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
      {/* readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3B]/60 via-transparent to-[#0B1E3B]/20" />

      {label && (
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#0B1E3B]/85 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF7A00] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF7A00]" />
          </span>
          {label}
        </span>
      )}

      {overlay && <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">{overlay}</div>}

      {/* controls */}
      {!reduced && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-[#E76F00]"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-[#E76F00]"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
