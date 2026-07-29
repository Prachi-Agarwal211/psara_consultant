"use client";

import { useState, type FormEvent } from "react";
import { openWhatsApp, formatEnquiryWhatsAppMessage } from "../lib/whatsapp";
import { CONTACT } from "../lib/config";

const STATES = [
  "Rajasthan",
  "Delhi",
  "Haryana",
  "Uttar Pradesh",
  "Gujarat",
  "Maharashtra",
  "Karnataka",
  "Madhya Pradesh",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
  "Punjab",
  "Other",
];

const SERVICES = [
  "PSARA License Registration",
  "PSARA Renewal",
  "Company Registration",
  "Training MOU",
  "Police Verification",
  "Multi-State Expansion",
  "Labour Compliance",
  "Other / Not sure",
];

type Props = {
  formType?: string;
  className?: string;
};

export default function ContactForm({
  formType = "Contact Page Enquiry",
  className = "",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [coverage, setCoverage] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const field = "form-field";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const text = formatEnquiryWhatsAppMessage({
      name,
      phone,
      email,
      company,
      state,
      city,
      service,
      message,
      formType,
      extra: {
        Coverage: coverage || undefined,
      },
    });
    openWhatsApp(text);
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${className}`}>
      {/* Decorative label — Voyeur/Jasmine style */}
      <div className="flex items-center gap-2 mb-1">
        <span className="h-px flex-1 bg-[var(--line-gold)]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] shrink-0">
          YOUR DETAILS
        </span>
        <span className="h-px flex-1 bg-[var(--line-gold)]" />
      </div>

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
          placeholder="Phone / WhatsApp *"
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
          placeholder="Company / Firm name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          className={field}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="">State of operation *</option>
          {STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          className={field}
          placeholder="City / district"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          className={field}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Service needed</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className={field}
          value={coverage}
          onChange={(e) => setCoverage(e.target.value)}
        >
          <option value="">Coverage goal</option>
          <option value="One district">One district</option>
          <option value="Multi-district (up to 5)">Multi-district (up to 5)</option>
          <option value="Whole state">Whole state</option>
          <option value="Multi-state plan">Multi-state plan</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <textarea
        className={`${field} min-h-[100px] resize-y`}
        placeholder="Tell us about your entity type, office status, and timeline…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-gold w-full sm:w-auto">
          Send on WhatsApp
        </button>
        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
            "PSARA consultation enquiry"
          )}&body=${encodeURIComponent(
            `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCompany: ${company}\nState: ${state}\nCity: ${city}\nService: ${service}\nCoverage: ${coverage}\n\n${message}`
          )}`}
          className="btn-ghost inline-flex w-full justify-center sm:w-auto"
        >
          Or email instead
        </a>
      </div>
      {sent ? (
        <p className="text-sm font-semibold text-[var(--emerald)]">
          ✓ WhatsApp opened with your details. If it did not open, call{" "}
          {CONTACT.phoneDisplay}.
        </p>
      ) : (
        <p className="text-xs font-medium text-[var(--text-dim)]">
          Submits a pre-filled WhatsApp message to {CONTACT.phoneDisplay}. No
          account required. You can also call {CONTACT.landlineDisplay}.
        </p>
      )}
    </form>
  );
}
