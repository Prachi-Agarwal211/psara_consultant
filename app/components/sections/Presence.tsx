"use client";

import Link from "next/link";
import { MapPin, Phone, MessageSquare } from "lucide-react";
import { OFFICES, CONTACT } from "../../../lib/config";
import { DEFAULT_WA, TEL_HREF } from "../../../lib/whatsapp";

export default function Presence() {
  return (
    <section
      id="presence"
      className="py-24 md:py-36 px-[var(--gutter)]"
      style={{
        backgroundColor: "var(--obsidian)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-[var(--page-max)] mx-auto">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between pb-10 mb-14 gap-6"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-px" style={{ backgroundColor: "var(--blue)" }} />
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--blue-bright)" }}>
                PHYSICAL PRESENCE
              </span>
            </div>
            <h2
              className="font-extrabold tracking-tighter uppercase leading-[0.90]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", fontFamily: "var(--font-display)", color: "var(--white)" }}
            >
              OFFICE NETWORK
            </h2>
          </div>
          <div className="flex gap-4 text-[0.58rem] font-bold uppercase tracking-widest" style={{ color: "var(--white-30)" }}>
            <span>JAIPUR HQ</span><span>·</span><span>GURUGRAM</span><span>·</span><span>NEW DELHI</span>
          </div>
        </div>

        {/* Office Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {OFFICES.slice(0, 6).map((off, i) => (
            <div
              key={off.city}
              className="group p-7 rounded-2xl flex flex-col justify-between transition-all duration-400"
              style={{
                backgroundColor: "var(--obsidian-card)",
                border: "1px solid var(--line)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--blue-border)";
                el.style.boxShadow = "0 0 28px var(--blue-glow-soft)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--line)";
                el.style.boxShadow = "none";
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[0.52rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border"
                    style={{
                      color: i === 0 ? "var(--gold)" : "var(--blue-bright)",
                      borderColor: i === 0 ? "var(--gold-glow)" : "var(--blue-border)",
                      backgroundColor: i === 0 ? "rgba(212,175,55,0.08)" : "var(--blue-surface)",
                    }}
                  >
                    {off.badge}
                  </span>
                  <MapPin className="w-4 h-4" style={{ color: "var(--white-20)" }} />
                </div>

                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: "1.35rem", fontFamily: "var(--font-display)", color: "var(--white)" }}
                >
                  {off.city}
                </h3>
                <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--white-50)" }}>
                  {off.address}
                </p>
              </div>

              <div
                className="flex items-center justify-between pt-5 mt-5 text-[0.55rem] font-bold uppercase tracking-widest"
                style={{ borderTop: "1px solid var(--line)", color: "var(--white-25)" }}
              >
                <span>PIN: {off.pin}</span>
                <span>{off.lat}°N {off.lng}°E</span>
              </div>
            </div>
          ))}
        </div>

        {/* Central helpdesk bar */}
        <div
          className="mt-6 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: "var(--obsidian-lift)",
            border: "1px solid var(--blue-border)",
            boxShadow: "0 0 40px var(--blue-glow-soft)",
          }}
        >
          <div>
            <span className="text-[0.58rem] font-bold uppercase tracking-widest block mb-2" style={{ color: "var(--blue-bright)" }}>
              CENTRAL HELPDESK
            </span>
            <p className="font-bold text-lg" style={{ color: "var(--white)", fontFamily: "var(--font-display)" }}>
              Need on-ground support in any State or City?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={TEL_HREF}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300"
              style={{ backgroundColor: "var(--blue)", color: "var(--white)", boxShadow: "0 0 20px var(--blue-glow)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px var(--blue-glow)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px var(--blue-glow)"; }}
            >
              <Phone className="w-3.5 h-3.5" />
              Call {CONTACT.phoneDisplay}
            </a>
            <a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300"
              style={{ backgroundColor: "rgba(212,175,55,0.10)", color: "var(--gold)", border: "1px solid var(--gold-glow)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,175,55,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,175,55,0.10)"; }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
