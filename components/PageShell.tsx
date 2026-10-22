import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, ContactActions, type Crumb } from "./v3/PagePrimitives";

export function PageHero({ title, lead, crumbs = [], kicker, locationSlug, image, mobileImage, meta }: {
  title: string; lead?: string; crumbs?: Crumb[]; kicker?: string; locationSlug?: string; image?: string; mobileImage?: string; meta?: string;
}) {
  return <header className="psara-page-hero v3-page-hero" data-location={locationSlug}>
    <div className="v3-hero-media" aria-hidden="true"><picture>
      {mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
      <Image src={image ?? "/assets/images/graded/hq.webp"} alt="" fill sizes="100vw" priority className="v3-hero-image" />
    </picture></div>
    <Image className="v3-hero-shield" src="/assets/images/props/shield-gold.webp" width={400} height={400} alt="" aria-hidden="true" />
    <div className="v3-hero-inner">
      {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
      <h1 data-v3-title>{title}</h1>
      {lead && <p className="v3-hero-lead" data-v3-hero-reveal>{lead}</p>}
      {(meta || kicker) && <div className="v3-hero-meta" data-v3-hero-reveal>{meta && <p>{meta}</p>}{kicker && <p>{kicker}</p>}</div>}
      <div data-v3-hero-reveal><ContactActions /></div>
    </div>
    <div className="v3-hero-rule" aria-hidden="true" />
  </header>;
}

export function PageMain({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main id="page-content" tabIndex={-1} className={`psara-page-main v3-page-main ${className}`}><div className="v3-content-wrap">{children}</div></main>;
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose-stage v3-prose ${className}`}>{children}</div>;
}
