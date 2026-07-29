"use client";

import { useState, type FormEvent } from "react";
import { openWhatsApp, formatEnquiryWhatsAppMessage } from "../lib/whatsapp";

type Props = {
  formType?: string;
  service?: string;
  state?: string;
  city?: string;
  className?: string;
  light?: boolean;
};

export default function WhatsAppForm({
  formType = "Free Consultation",
  service,
  state,
  city,
  className = "",
  light = false,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const text = formatEnquiryWhatsAppMessage({
      name,
      phone,
      email,
      company,
      message,
      service,
      state,
      city,
      formType,
    });
    openWhatsApp(text);
  };

  const field = light
    ? "w-full rounded-md border border-[var(--ink)]/15 bg-white px-3 py-3 text-sm font-medium text-[var(--ink)] outline-none focus:border-[var(--sapphire)]"
    : "form-field";

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${className}`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          required
          className={field}
          placeholder="Full name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          required
          className={field}
          placeholder="Phone *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          className={field}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className={field}
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <textarea
        className={`${field} min-h-[100px] resize-y`}
        placeholder="Tell us your State, coverage needs…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn-gold w-full sm:w-auto">
        Send on WhatsApp
      </button>
      <p
        className={`text-xs font-medium ${light ? "text-[var(--ink-muted)]" : "text-[var(--text-dim)]"}`}
      >
        Submits a pre-filled WhatsApp message to our team — no password forms.
      </p>
    </form>
  );
}
