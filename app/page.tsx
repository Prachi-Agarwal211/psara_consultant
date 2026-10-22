"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Map, Menu, MessageCircle, Phone, ShieldCheck, Star, X } from "lucide-react";
import JsonLd from "../components/JsonLd";
import { CONTACT, GOOGLE_REVIEWS, SITE } from "../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../lib/whatsapp";
import { HOME_V3 as copy } from "../data/home-v3";
import { SERVICES } from "../data/services";
import { STATES } from "../data/states";
import { CITIES } from "../data/cities";
import { FAQS } from "../data/faq";
import CinematicVideo from "./components/v3/CinematicVideo";
import useV3Motion from "./components/v3/useV3Motion";
import { setSmoothScrollPaused } from "./components/providers/SmoothScroll";

const images = "/assets/images/graded/";
const shield = "/assets/images/props/shield-gold.webp";
const featuredServices = ["psara-license", "company-registration", "training-mou", "police-verification", "labour-compliance"]
  .map((slug) => SERVICES.find((service) => service.slug === slug)).filter((service) => service !== undefined);
const servicePosters = ["hq", "desk", "corridor", "hero", "hq"];
const homeFaqs = [0, 19, 37, 15, 7].map((index) => FAQS[index]);
const featuredCities = ["jaipur", "new-delhi", "gurugram", "noida", "ahmedabad", "lucknow", "bhopal", "mumbai", "bengaluru", "hyderabad", "chennai", "pune"]
  .map((slug) => CITIES.find((city) => city.slug === slug)).filter((city) => city !== undefined);

function Lines({ children }: { children: readonly string[] }) {
  return children.map((line) => <span className="ln" key={line}><span>{line}{" "}</span></span>);
}

function Streaks() {
  return <div aria-hidden="true" className="streaks"><i className="streak" /><i className="streak" /><i className="streak" /></div>;
}

function ContactActions({ cta = false }: { cta?: boolean }) {
  return <div className="acts">
    <a className="btn wa mag" href={DEFAULT_WA} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{copy.labels.whatsapp}</a>
    <a className={`btn ${cta ? "sf" : "gh"} mag`} href={TEL_HREF}><Phone aria-hidden="true" />{cta ? CONTACT.phoneDisplay : copy.labels.call}</a>
    {cta && <a className="mail" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>}
  </div>;
}

function FloatingCard({ children, className, speed }: { children: ReactNode; className: string; speed: number }) {
  return <div className={`fl ${className}`} data-speed={speed}><div className="d">{children}</div></div>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useV3Motion(rootRef);
  useEffect(() => {
    if (!menuOpen) return;
    const root = rootRef.current;
    const overflow = document.body.style.overflow;
    const sections = Array.from(root?.querySelectorAll<HTMLElement>(":scope > section, :scope > .skip-link") ?? []);
    const previous = sections.map((section) => section.inert);
    sections.forEach((section) => { section.inert = true; });
    document.body.style.overflow = "hidden";
    setSmoothScrollPaused(true);
    return () => {
      sections.forEach((section, index) => { section.inert = previous[index]; });
      document.body.style.overflow = overflow;
      setSmoothScrollPaused(false);
      root?.querySelector<HTMLButtonElement>(".hdr button")?.focus();
    };
  }, [menuOpen]);

  return (
    <main ref={rootRef} className="v3-home">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) }} />
      <a className="skip-link" href="#mani">{copy.labels.skip}</a>
      <div id="pre" aria-hidden="true"><div className="in"><Image src={`${images}eagle-mark.webp`} alt="" width={150} height={168} priority /><div className="bar"><i /></div></div><div className="panel"><Image src={`${images}eagle-mark.webp`} alt="" width={120} height={135} /></div></div>

      <section id="hero" data-bg="#081426" className="grain" aria-labelledby="hero-title">
        <Image className="watermark" src={shield} alt="" width={620} height={620} aria-hidden="true" />
        <div className="media"><div className="kb"><CinematicVideo className="img" poster={`${images}hero.webp`} alt={copy.hero.imageAlt} priority /></div><div className="shade" /><span className="tag">{copy.labels.video}</span><Streaks /></div>
        <header className="hdr"><Link href="/" className="brand" aria-label={`${SITE.name} home`}><Image src={`${images}eagle-mark.webp`} alt="" width={40} height={45} priority /><span>{SITE.name}</span></Link><nav aria-label="Primary navigation">{copy.nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><div className="r"><a className="call" href={TEL_HREF}>{CONTACT.phoneDisplay}</a><button type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="v3-menu"><Menu aria-hidden="true" /><span>{copy.labels.menu}</span></button></div></header>
        <div className="copy"><div><h1 className="serif" id="hero-title"><span className="ln"><span>{copy.hero.titleBefore}{" "}</span></span><span className="ln"><span><em>{copy.hero.timeline}</em>{copy.hero.titleAfter}{" "}</span></span><span className="ln"><span>{copy.hero.titleEnd}</span></span></h1><p className="sub hrv">{copy.hero.description}</p><div className="hrv"><ContactActions /></div></div><a className="proof glass hrv" href={GOOGLE_REVIEWS.profileUrl} target="_blank" rel="noopener noreferrer"><b>{GOOGLE_REVIEWS.clientsServed}</b><p>{copy.hero.proof}</p></a></div>
        <div className="cap"><p className="serif">{copy.hero.caption}</p><p>{copy.hero.captionDetail}</p></div>
      </section>

      <section id="mani" data-bg="#FFFDF5" aria-label={copy.labels.manifesto}><div className="bg" /><Image className="eagle" src={shield} alt="" width={300} height={300} aria-hidden="true" /><div className="wrap"><p className="big serif" id="manitext">{copy.manifesto.text.split(" ").map((word, index) => <span key={index}><span className="w">{word}</span>{" "}</span>)}</p><p className="offices rv"><i aria-hidden="true" />{copy.manifesto.offices}</p></div></section>

      <section id="svc" data-bg="#F5F0E3" aria-labelledby="services-title"><div className="bg" /><div className="wrap"><div className="shead"><h2 className="serif" id="services-title"><Lines>{copy.services.lines}</Lines></h2><Link className="ulink" href="/services">{copy.services.allLabel}<ArrowRight aria-hidden="true" /></Link></div><div className="mprev"><CinematicVideo className="im" poster={`${images}hq.webp`} alt={copy.services.imageAlt} /><span className="tag">{copy.labels.preview}</span></div><div className="list" id="list">
        {featuredServices.map((service, index) => <Link className="srow" href={`/services/${service.slug}`} key={service.slug} data-img={`${images}${servicePosters[index]}.webp`}><span className="service-title serif">{copy.services.titles[index]}</span><p className="service-description">{service.short}</p></Link>)}
        <div className="pv" id="pv" aria-hidden="true"><div className="im"><Image src={`${images}hq.webp`} alt="" fill sizes="288px" /><video hidden muted playsInline loop preload="none" poster={`${images}hq.webp`} aria-hidden="true" /></div><span className="tag">{copy.labels.preview}</span></div>
      </div></div></section>

      <section id="cred" data-bg="#0B1E3B" className="grain" aria-labelledby="credentials-title"><div className="bg" /><Streaks /><div className="wrap"><div className="cred-grid"><div><h2 className="serif" id="credentials-title"><Lines>{copy.credentials.lines}</Lines></h2><p className="lead rv">{copy.credentials.lead}</p></div><div className="shot" id="credshot"><CinematicVideo className="im" poster={`${images}desk.webp`} alt={copy.credentials.imageAlt} /><span className="tag">{copy.labels.credentialsVideo}</span></div></div><div className="facts">{copy.credentials.facts.map((fact, index) => { const Icon = [Star, Map, ShieldCheck][index]; return <div className="fact glass rv" key={fact.value}><Icon aria-hidden="true" /><b>{fact.value} <span>{fact.label}</span></b><p>{fact.detail}</p></div>; })}</div></div></section>

      <section id="float" data-bg="#081426" aria-labelledby="floating-title"><div className="bg" /><div className="ring" aria-hidden="true" /><div className="ring r2" aria-hidden="true" /><div className="center"><div><h2 className="serif" id="floating-title"><Lines>{copy.floating.lines}</Lines></h2><p className="rv">{copy.floating.lead}</p></div></div>
        <FloatingCard className="chat-card" speed={-160}><a className="card glass" href={DEFAULT_WA} target="_blank" rel="noopener noreferrer"><p className="ch"><MessageCircle className="success" aria-hidden="true" />{copy.floating.chatTitle}</p><p className="bub incoming">{copy.floating.chatIn}</p><p className="bub outgoing">{copy.floating.chatOut}</p></a></FloatingCard>
        <FloatingCard className="status-card" speed={-60}><div className="card glass"><p className="ch"><ShieldCheck aria-hidden="true" />{copy.floating.statusTitle}</p>{copy.floating.statuses.map((status, index) => <p key={status} className={`st ${index === 2 ? "pending" : ""}`}>{index === 2 ? <Clock3 aria-hidden="true" /> : <Check aria-hidden="true" />}{status}</p>)}<small>{copy.labels.illustration}</small></div></FloatingCard>
        <FloatingCard className="fee-card" speed={-240}><Link className="card glass fee" href="/calculator"><p className="ch">{copy.floating.feeTitle}</p><p>{copy.floating.feeLocation}</p><b>{copy.floating.feeValue}</b><div className="rng" aria-hidden="true"><i /></div><small>{copy.floating.feeNote}</small></Link></FloatingCard>
        <FloatingCard className="deco coin-wrap" speed={-320}><div className="coin" aria-hidden="true"><Image src={`${images}eagle-mark.webp`} alt="" width={80} height={90} /></div></FloatingCard><FloatingCard className="deco dot-a" speed={-100}><div className="dot" aria-hidden="true" /></FloatingCard><FloatingCard className="deco dot-b" speed={-200}><div className="dot small" aria-hidden="true" /></FloatingCard>
      </section>

      <section id="proc" data-bg="#FFFDF5" aria-labelledby="process-title"><div className="bg" /><div className="wrap in"><div><h2 className="serif" id="process-title"><Lines>{copy.process.lines}</Lines></h2><p className="lead rv">{copy.process.lead}</p><p className="pct" id="pct">{copy.process.counter}</p></div><div className="tl"><div className="rail" aria-hidden="true" /><div className="fill" id="fill" aria-hidden="true" /><ol>{copy.process.steps.map((step, index) => <li className="step" key={step.title}><span className="n" aria-hidden="true">{index + 1}</span><p className="step-title serif">{step.title}</p><p>{step.description}</p></li>)}</ol></div></div></section>

      <section id="faq" className="v3-faq" data-bg="#FFFDF5" aria-labelledby="faq-title"><div className="wrap"><div className="shead"><h2 className="serif" id="faq-title"><Lines>{copy.labels.faqLines}</Lines></h2><Link className="ulink" href="/faq">{copy.labels.allFaqs}<ArrowRight aria-hidden="true" /></Link></div><div className="faq-list">{homeFaqs.map((faq) => <details key={faq.q}><summary>{faq.q}<span aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></div></section>
      <section id="locations" data-bg="#F5F0E3" aria-labelledby="locations-title"><div className="wrap"><div className="shead"><h2 className="serif" id="locations-title"><Lines>{copy.labels.locationLines}</Lines></h2><Link className="ulink" href="/states">{copy.labels.allStates}<ArrowRight aria-hidden="true" /></Link></div><div className="location-links">{STATES.map((state) => <Link key={state.slug} href={`/states/${state.slug}`}>{state.name}</Link>)}</div><div className="city-links"><p>{copy.labels.cities}</p><div>{featuredCities.map((city) => <Link href={`/city/${city.slug}`} key={city.slug}>{city.name}</Link>)}<Link className="ulink" href="/cities">{copy.labels.allCities}</Link></div></div></div></section>

      <section id="cta" data-bg="#081426" className="grain" aria-labelledby="cta-title"><div className="bg" /><div className="cta-prop" aria-hidden="true"><Image className="shield" src={shield} alt="" width={300} height={300} /></div><Streaks /><div className="wrap"><h2 className="serif" id="cta-title"><Lines>{copy.cta.lines}</Lines></h2><p className="lead rv">{copy.cta.lead}</p><div className="rv"><ContactActions cta /></div><footer><Link className="brand" href="/"><Image src={`${images}eagle-mark.webp`} alt="" width={40} height={45} />{SITE.name}</Link><nav aria-label="Footer navigation">{copy.footer.links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><p>{copy.footerCopyright}</p><div className="legal"><Link href="/privacy-policy">{copy.labels.privacy}</Link><Link href="/terms">{copy.labels.terms}</Link></div></footer></div></section>

      {menuOpen && <div className="v3-menu" id="v3-menu" role="dialog" aria-modal="true" aria-label={copy.labels.menu} onKeyDown={(event) => { if (event.key === "Escape") { setMenuOpen(false); rootRef.current?.querySelector<HTMLButtonElement>(".hdr button")?.focus(); } if (event.key === "Tab") { const focusable = event.currentTarget.querySelectorAll<HTMLElement>("a,button"); const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }}><button type="button" className="menu-close" autoFocus onClick={() => { setMenuOpen(false); rootRef.current?.querySelector<HTMLButtonElement>(".hdr button")?.focus(); }} aria-label={copy.labels.closeMenu}><X aria-hidden="true" /></button><p className="brand">{SITE.name}</p><nav aria-label="Expanded navigation">{copy.footer.links.map((item) => <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowRight aria-hidden="true" /></Link>)}</nav><ContactActions cta /></div>}
    </main>
  );
}
