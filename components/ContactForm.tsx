"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, MessageSquare, Phone } from "lucide-react";
import { openWhatsApp, formatEnquiryWhatsAppMessage, TEL_HREF } from "../lib/whatsapp";
import { CONTACT, GOOGLE_REVIEWS } from "../lib/config";
import { validateEnquiryFields, type EnquiryErrors } from "../lib/form-validation";

const STATES = [
  "Rajasthan",
  "Delhi NCR",
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
  "Bihar",
  "Odisha",
  "Other State / UT",
];

const DISTRICT_OPTIONS = [
  "1 District (Single-District Setup)",
  "Up to 5 Districts (Regional Coverage)",
  "Entire State (All-State PSARA)",
  "Multi-State Expansion Plan",
  "Not Sure Yet / Need Advice",
];

type Props = {
  formType?: string;
  className?: string;
  variant?: "light" | "dark";
};

export default function ContactForm({
  formType = "Lead Advisory Form",
  className = "",
  variant = "light",
}: Props) {
  const dark = variant === "dark";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState(DISTRICT_OPTIONS[0]!);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [tried, setTried] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputBase = dark
    ? "w-full rounded-xl border border-white/20 bg-[#050714] px-4 py-3.5 text-sm font-medium text-white outline-none placeholder:text-white/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
    : "w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-[#0F172A] outline-none placeholder:text-slate-400 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/25 transition-all shadow-sm";

  const labelCls = dark
    ? "mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#CBD5E1]"
    : "mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[#334155]";

  const errCls = "mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1";

  const openWa = () => {
    const text = formatEnquiryWhatsAppMessage({
      name,
      phone,
      email,
      state,
      city,
      message,
      formType,
      extra: {
        "Number of Districts": districts,
      },
    });
    openWhatsApp(text);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    const next = validateEnquiryFields({ name, phone, email, state });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setIsSubmitting(true);
    openWa();
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  /* ── Success Screen ── */
  if (isSuccess) {
    return (
      <div
        className={`space-y-6 rounded-2xl border p-8 text-center ${
          dark
            ? "border-white/20 bg-[#0A1022] text-white"
            : "border-slate-200 bg-white text-[#0F172A] shadow-xl"
        } ${className}`}
        role="status"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Opening WhatsApp Desk…
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-[#CBD5E1]" : "text-[#475569]"}`}>
            Your PSARA inquiry is pre-filled. Tap <strong>Send</strong> on WhatsApp to connect directly with our statutory advisory team.
          </p>
        </div>

        <div className={`rounded-xl p-4 text-left text-xs ${dark ? "bg-[#050714] text-[#CBD5E1]" : "bg-slate-50 text-[#334155]"}`}>
          <span className="font-bold text-[#D4AF37] uppercase tracking-wider block mb-1.5">What to expect:</span>
          <ul className="list-disc pl-4 space-y-1">
            <li>Instant review of your operating state &amp; district coverage</li>
            <li>State-specific Controlling Authority document checklist</li>
            <li>Direct phone follow-up during regular business hours</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={openWa}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#128C7E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all"
          >
            <MessageSquare className="h-4 w-4 fill-white" />
            Open WhatsApp Again
          </button>
          <a
            href={TEL_HREF}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all ${
              dark ? "border-white/20 text-white hover:bg-white/10" : "border-slate-300 text-[#0F172A] hover:bg-slate-100"
            }`}
          >
            <Phone className="h-4 w-4" />
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  /* ── Lead Form ── */
  return (
    <form onSubmit={onSubmit} noValidate className={`space-y-4 ${className}`}>
      {/* 1. Name & Mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Full Name *
          </label>
          <div className="relative">
            <input
              id="cf-name"
              required
              className={`${inputBase} ${errors.name ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""}`}
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name && e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              autoComplete="name"
            />
          </div>
          {errors.name && (
            <p role="alert" className={errCls}>
              <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Mobile / WhatsApp *
          </label>
          <div className="relative">
            <input
              id="cf-phone"
              required
              className={`${inputBase} ${errors.phone ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""}`}
              placeholder="+91 99831 69555"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone && e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, phone: undefined }));
                }
              }}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          {errors.phone && (
            <p role="alert" className={errCls}>
              <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* 2. Email & City/State */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email Address
          </label>
          <input
            id="cf-email"
            type="email"
            className={`${inputBase} ${errors.email ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""}`}
            placeholder="you@agency.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            autoComplete="email"
          />
          {errors.email && (
            <p role="alert" className={errCls}>
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-state" className={labelCls}>
            State of Operation *
          </label>
          <select
            id="cf-state"
            required
            className={`${inputBase} ${errors.state ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""}`}
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              if (errors.state && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, state: undefined }));
              }
            }}
          >
            <option value="">Select Target State *</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p role="alert" className={errCls}>
              <AlertCircle className="h-3.5 w-3.5" /> {errors.state}
            </p>
          )}
        </div>
      </div>

      {/* 3. City & Number of Districts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-city" className={labelCls}>
            City / Headquarters Location
          </label>
          <input
            id="cf-city"
            className={inputBase}
            placeholder="e.g. Jaipur / Mumbai / Delhi"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cf-districts" className={labelCls}>
            Number of Districts / Scope
          </label>
          <select
            id="cf-districts"
            className={inputBase}
            value={districts}
            onChange={(e) => setDistricts(e.target.value)}
          >
            {DISTRICT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. How can we help? */}
      <div>
        <label htmlFor="cf-message" className={labelCls}>
          How can we help?
        </label>
        <textarea
          id="cf-message"
          rows={3}
          className={`${inputBase} resize-y min-h-[90px]`}
          placeholder="Describe your security agency type, office readiness, training MOU requirements, or expected timeline…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* 5. Submit Button — metallic gold */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[#241703] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
          style={{
            background: "var(--grad-gold-metallic)",
            boxShadow: "inset 0 1px 0 rgba(255,250,230,0.85), inset 0 -1px 0 rgba(88,58,8,0.5), 0 14px 34px -10px rgba(200,155,60,0.55)",
            fontFamily: "var(--font-body)",
          }}
        >
          <MessageSquare className="h-4 w-4 fill-current" />
          <span>{isSubmitting ? "Opening WhatsApp…" : "Get PSARA Statutory Advisory Support"}</span>
        </button>
      </div>

      {/* Privacy & Trust Footnote */}
      <div className={`pt-2 text-center text-xs ${dark ? "text-[#94A3B8]" : "text-slate-500"}`}>
        <span>Opens a structured consultation with our Jaipur HQ &amp; Regional Desks.</span>
        <div className="mt-1 flex items-center justify-center gap-3 font-semibold text-[#D4AF37]">
          <span>★ {GOOGLE_REVIEWS.ratingLabel} Rating</span>
          <span>•</span>
          <span>{GOOGLE_REVIEWS.reviewCount} Reviews</span>
          <span>•</span>
          <span>Mon–Sat 9:30 AM – 6:30 PM</span>
        </div>
      </div>
    </form>
  );
}
