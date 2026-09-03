"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  { n: "01", label: "Home", href: "/" },
  { n: "02", label: "About Us", href: "/about" },
  { n: "03", label: "Services", href: "/services" },
  { n: "04", label: "Industries", href: "/industries" },
  { n: "05", label: "States", href: "/states" },
  { n: "06", label: "Contact", href: "/contact" },
];

export default function CaseyMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!rootRef.current || !bgRef.current) return;
    const root = rootRef.current;
    const bg = bgRef.current;
    const menuItems = root.querySelectorAll<HTMLElement>(".casey-item");

    const build = () => {
      const prepared: {
        indexEl: HTMLElement | null;
        firstWrap: HTMLElement | null;
        trailingBox: HTMLElement | null;
        trailingChars: HTMLElement[];
        divider: HTMLElement | null;
      }[] = [];

      menuItems.forEach((item, idx) => {
        const index = item.querySelector<HTMLElement>(".casey-index");
        const label = item.querySelector<HTMLElement>(".casey-label");
        const divider = item.querySelector<HTMLElement>(".casey-divider");
        if (!label) return;
        const text = ITEMS[idx]?.label || label.textContent || "";
        label.textContent = "";

        const first = document.createElement("span");
        first.className = "casey-char inline-block";
        first.textContent = text[0] || "";
        const firstWrap = document.createElement("span");
        firstWrap.className = "inline-block overflow-hidden";
        firstWrap.appendChild(first);
        label.appendChild(firstWrap);

        const box = document.createElement("span");
        box.className = "casey-body inline-block whitespace-nowrap overflow-hidden";
        (box as HTMLElement).style.width = "0px";
        box.style.display = "inline-block";
        for (let i = 1; i < text.length; i++) {
          const c = document.createElement("span");
          c.className = "casey-char inline-block";
          c.textContent = text[i];
          const w = document.createElement("span");
          w.className = "inline-block overflow-hidden";
          w.appendChild(c);
          box.appendChild(w);
        }
        label.appendChild(box);

        let idxWrap: HTMLElement | null = null;
        if (index) {
          const idxText = index.textContent || "";
          index.textContent = "";
          idxWrap = document.createElement("span");
          idxWrap.className = "inline-block overflow-hidden";
          const inner = document.createElement("span");
          inner.className = "inline-block";
          inner.textContent = idxText;
          idxWrap.appendChild(inner);
          index.appendChild(idxWrap);
        }

        const trailingChars = Array.from(box.querySelectorAll<HTMLElement>(".casey-char"));
        const firstChar = first;

        if (idxWrap?.firstElementChild) gsap.set(idxWrap.firstElementChild, { yPercent: 100 });
        gsap.set(firstChar, { yPercent: 100 });
        if (trailingChars.length) gsap.set(trailingChars, { xPercent: 120 });
        if (divider) gsap.set(divider, { scaleY: 0 });

        prepared.push({
          indexEl: idxWrap?.firstElementChild as HTMLElement | null,
          firstWrap: firstChar,
          trailingBox: box,
          trailingChars,
          divider,
        });
      });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      gsap.set(bg, { opacity: 0 });
      prepared.forEach((p) => {
        if (p.trailingBox) gsap.set(p.trailingBox, { width: 0 });
      });
      tl.to(bg, { opacity: 1, duration: 0.6 }, 0);
      prepared.forEach((p, i) => {
        const s = 0.35 + i * 0.09;
        if (p.indexEl) tl.to(p.indexEl, { yPercent: 0, duration: 0.6 }, s);
        tl.to(p.firstWrap!, { yPercent: 0, duration: 0.6 }, s);
        if (p.divider) tl.to(p.divider, { scaleY: 1, duration: 0.9, ease: "power3.out" }, s + 0.06);
        tl.to(p.trailingBox!, { width: () => (p.trailingBox as HTMLElement).scrollWidth, duration: 0.9, ease: "power3.inOut" }, s + 0.18);
        if (p.trailingChars.length) tl.to(p.trailingChars, { xPercent: 0, duration: 0.55, stagger: 0.03 }, s + 0.32);
      });

      tlRef.current = tl;
    };

    if (typeof document !== "undefined" && (document as any).fonts?.ready) {
      (document as any).fonts.ready.then(build).catch(build);
    } else {
      build();
    }
    return () => { tlRef.current?.kill(); };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (open) {
      tlRef.current.play();
      document.documentElement.style.overflow = "hidden";
    } else {
      tlRef.current.reverse();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[60] flex flex-col items-start justify-center gap-1 px-6 py-16 lg:px-10 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div ref={bgRef} className="absolute inset-0 bg-black/20 backdrop-blur-[30px] -z-10" />
      <button aria-label="Close menu" onClick={onClose} className={`absolute inset-0 -z-10 ${open ? "pointer-events-auto" : "pointer-events-none"}`} />
      <nav className="flex w-full max-w-6xl flex-col items-start gap-1">
        {ITEMS.map((it, idx) => (
          <a
            key={it.n}
            href={it.href}
            onClick={onClose}
            className={`casey-item group inline-flex items-center whitespace-nowrap text-[#eed0ca] no-underline ${idx % 2 === 0 ? "font-serif" : "font-sans font-semibold"} text-[11vw] leading-none tracking-tight lg:text-[5.2vw]`}
            style={{ fontFamily: idx % 2 === 0 ? `"DM Serif Display", ui-serif` : `"DM Sans", ui-sans-serif` }}
          >
            <span className="casey-index mr-2 self-start mt-2 font-mono text-[11px] font-medium tracking-wide">{it.n}</span>
            <span className="casey-label inline-flex items-center" />
            <span className="casey-divider ml-3 inline-block h-[0.9em] w-[2px] bg-[#eed0ca] origin-center rotate-[20deg] will-change-transform" />
          </a>
        ))}
      </nav>
      <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex justify-between text-[10px] uppercase tracking-widest text-[#eed0ca]/70">
        <span>PSARA Consultant India</span>
        <span>Strategy • Growth • Impact</span>
      </div>
    </div>
  );
}
