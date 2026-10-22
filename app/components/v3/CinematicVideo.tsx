"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/app/lib/motion";

export type CinematicVideoProps = {
  poster: string;
  alt: string;
  name?: string;
  className?: string;
  priority?: boolean;
  sources?: { webm: string; mp4: string };
};

/** Poster-first media. Omit sources until both production clips are supplied. */
export default function CinematicVideo({
  poster,
  alt,
  name,
  className = "",
  priority = false,
  sources,
}: CinematicVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video || !sources) return;

    let visible = false;
    let disposed = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const synchronize = () => {
      if (disposed) return;
      if (visible && !document.hidden && !prefersReducedMotion()) {
        void video.play().catch(() => {
          // Autoplay restrictions or unavailable media retain the full poster.
        });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      synchronize();
    }, { threshold: 0.12 });
    observer.observe(wrapper);
    preference.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);

    return () => {
      disposed = true;
      observer.disconnect();
      preference.removeEventListener("change", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
      video.pause();
    };
  }, [sources]);

  return (
    <div
      ref={wrapperRef}
      className={`v3-cinematic-video ${className}`}
      data-media-name={name}
      style={{ position: "relative", display: "block", overflow: "hidden" }}
    >
      <Image
        className="v3-cinematic-poster"
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, 100vw"
        style={{ objectFit: "cover" }}
      />
      {sources && (
        <video
          ref={videoRef}
          className="v3-cinematic-motion motion-reduce:hidden"
          muted
          playsInline
          loop
          preload="none"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: playing ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
        >
          <source src={sources.webm} type="video/webm" />
          <source src={sources.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
