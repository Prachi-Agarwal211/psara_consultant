"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";
import { HOME_V3 } from "../../../data/home-v3";

export default function StickyCta() {
  const isHome = usePathname() === "/";
  const action = <a className="v3-whatsapp" href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" aria-label={HOME_V3.labels.whatsapp}><MessageCircle aria-hidden="true" /><span className="sr-only">WhatsApp Desk</span></a>;
  if (isHome) return action;
  return <aside className="v3-contact-dock" aria-label="Statutory Quick Contact Bar">
    {action}
    <div className="v3-contact-dock-info"><p>PSARA Statutory Advisory Desk</p><p>Instant Filing &amp; Regulatory Guidance Across 36 States &amp; UTs</p><a href={TEL_HREF}><Phone aria-hidden="true" />Call Now</a></div>
  </aside>;
}
