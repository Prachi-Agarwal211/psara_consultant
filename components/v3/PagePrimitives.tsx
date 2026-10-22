import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/config";
import { DEFAULT_WA, TEL_HREF } from "@/lib/whatsapp";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <nav className="v3-breadcrumbs" aria-label="Breadcrumb"><ol>
    <li><Link href="/">Home</Link></li>
    {items.map((item, index) => <li key={`${item.label}-${index}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}
  </ol></nav>;
}

export function Section({ children, id, className = "", tone = "navy" }: { children: ReactNode; id?: string; className?: string; tone?: "navy" | "cream" }) {
  return <section id={id} className={`v3-section v3-section--${tone} ${className}`} data-v3-reveal>{children}</section>;
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`v3-glass ${className}`} data-v3-reveal>{children}</div>;
}

export function ContactActions() {
  return <div className="v3-actions">
    <a className="v3-button v3-button--wa" data-v3-magnetic href={DEFAULT_WA} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />Chat on WhatsApp<ArrowRight aria-hidden="true" /></a>
    <a className="v3-button v3-button--ghost" data-v3-magnetic href={TEL_HREF}><Phone aria-hidden="true" />Call an advisor</a>
  </div>;
}

export function CTABand({ title = "Your next chapter starts with the right advice.", lead = "Speak with our PSARA specialists about your application, documentation and state requirements." }: { title?: string; lead?: string }) {
  return <section className="v3-cta-band" aria-label="Speak to a PSARA advisor">
    <Image src="/assets/images/props/shield-gold.webp" className="v3-cta-shield" alt="" width={320} height={320} aria-hidden="true" />
    <div className="v3-cta-inner" data-v3-reveal><h2>{title}</h2><p>{lead}</p><ContactActions /><a className="v3-email" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
  </section>;
}

export function FAQ({ items, title = "Frequently asked questions", className = "" }: { items: readonly { q: string; a: string }[]; title?: string; className?: string }) {
  return <section className={`v3-faq ${className}`} data-v3-reveal><h2>{title}</h2><div>{items.map((item, index) => <details key={`${item.q}-${index}`}><summary><span>{item.q}</span><ChevronDown aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></section>;
}
