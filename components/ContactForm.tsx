"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, MessageSquare, Phone } from "lucide-react";
import { openWhatsApp, formatEnquiryWhatsAppMessage, TEL_HREF } from "../lib/whatsapp";
import { CONTACT, GOOGLE_REVIEWS } from "../lib/config";
import { validateEnquiryFields, type EnquiryErrors } from "../lib/form-validation";

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
  "Chhattisgarh",
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
  /** light = cream card (homepage). dark = navy card (/contact). */
  variant?: "light" | "dark";
};

/**
 * Silbar-style enquiry form: validates fields, then opens WhatsApp
 * with a pre-filled structured message. No backend / no password.
 */
export default function ContactForm({
  formType = "Contact Page Enquiry",
  className = "",
  variant = "light",
}: Props) {
  const dark = variant === "dark";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [coverage, setCoverage] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [tried, setTried] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputBase = dark
    ? "w-full rounded-xl border border-white/20 bg-[#07192C] px-4 py-3 text-sm font-medium text-white outline-none placeholder:text-white/50 focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/30"
    : "w-full rounded-xl border border-[#0F3C65]/20 bg-white px-4 py-3 text-sm font-medium text-[#0F3C65] outline-none placeholder:text-[#627D98] focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/25";

  const labelCls = dark
    ? "mb-1.5 block text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#FFF2BA]"
    : "mb-1.5 block text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#0F3C65]";

  const errCls = "mt-1 text-xs font-semibold text-red-500";

  const openWa = () => {
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

  /* ── Success (Silbar pattern) ── */
  if (isSuccess) {
    return (
      <div
        className={`space-y-5 rounded-2xl border-2 p-6 text-center ${
          dark
            ? "border-[#C89B3C]/40 bg-[#07192C] text-white"
            : "border-[#C89B3C]/50 bg-[#FFFDF5] text-[#0F3C65]"
        } ${className}`}
        role="status"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3
          className="text-xl font-black"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Opening WhatsApp…
        </h3>
        <p className={`text-sm leading-relaxed ${dark ? "text-slate-300" : "text-[#334E68]"}`}>
          Your enquiry is pre-filled. Tap <strong>Send</strong> in WhatsApp to deliver it to
          PSARA Consultant India.
        </p>

        <div
          className={`rounded-xl border p-4 text-left text-sm ${
            dark ? "border-white/10 bg-white/5 text-slate-200" : "border-[#0F3C65]/10 bg-white text-[#334E68]"
          }`}
        >
          <p className="mb-2 text-[0.65rem] font-black uppercase tracking-wider text-[#C89B3C]">
            What happens next
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>WhatsApp opens with your full enquiry text</li>
            <li>Press Send to message our licensing desk</li>
            <li>We typically reply within a few business hours with a state checklist</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={openWa}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-emerald-600"
          >
            <MessageSquare className="h-4 w-4 fill-white" />
            Open WhatsApp Again
          </button>
          <a
            href={TEL_HREF}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider transition ${
              dark
                ? "border-white/25 text-white hover:border-[#C89B3C]"
                : "border-[#0F3C65]/25 text-[#0F3C65] hover:border-[#C89B3C]"
            }`}
          >
            <Phone className="h-4 w-4" />
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={onSubmit} noValidate className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <span className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-[#0F3C65]/15"}`} />
        <span className="shrink-0 text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#C89B3C]">
          Your details → WhatsApp desk
        </span>
        <span className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-[#0F3C65]/15"}`} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Full name *
          </label>
          <div className="relative">
            <input
              id="cf-name"
              required
              className={`${inputBase} ${errors.name ? "border-red-500" : ""} pr-10`}
              placeholder="e.g. Rahul Sharma"
              aria-invalid={errors.name ? true : undefined}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name && e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              autoComplete="name"
            />
            {tried && name.trim() && !errors.name && (
              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
            )}
            {errors.name && (
              <AlertCircle className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
            )}
          </div>
          {errors.name && (
            <p role="alert" className={errCls}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelCls}>
            Phone / WhatsApp *
          </label>
          <div className="relative">
            <input
              id="cf-phone"
              required
              className={`${inputBase} ${errors.phone ? "border-red-500" : ""} pr-10`}
              placeholder="+91 99831 69555"
              aria-invalid={errors.phone ? true : undefined}
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
            {tried && phone.trim() && !errors.phone && (
              <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
            )}
            {errors.phone && (
              <AlertCircle className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
            )}
          </div>
          {errors.phone && (
            <p role="alert" className={errCls}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <input
            id="cf-email"
            className={`${inputBase} ${errors.email ? "border-red-500" : ""}`}
            placeholder="you@company.com"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            autoComplete="email"
          />
          {errors.email && (
            <p role="alert" className={errCls}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-company" className={labelCls}>
            Company / firm
          </label>
          <input
            id="cf-company"
            className={inputBase}
            placeholder="Security agency name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-state" className={labelCls}>
            State of operation *
          </label>
          <select
            id="cf-state"
            required
            className={`${inputBase} ${errors.state ? "border-red-500" : ""}`}
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              if (errors.state && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, state: undefined }));
              }
            }}
            aria-invalid={errors.state ? true : undefined}
          >
            <option value="">Select state *</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p role="alert" className={errCls}>
              {errors.state}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-city" className={labelCls}>
            City / district
          </label>
          <input
            id="cf-city"
            className={inputBase}
            placeholder="e.g. Jaipur"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className={labelCls}>
            Service needed
          </label>
          <select
            id="cf-service"
            className={inputBase}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Select service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-coverage" className={labelCls}>
            Coverage goal
          </label>
          <select
            id="cf-coverage"
            className={inputBase}
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
          >
            <option value="">Select coverage</option>
            <option value="One district">One district</option>
            <option value="Multi-district (up to 5)">Multi-district (up to 5)</option>
            <option value="Whole state">Whole state</option>
            <option value="Multi-state plan">Multi-state plan</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="cf-message"
          className={`${inputBase} min-h-[110px] resize-y`}
          placeholder="Entity type, office status, timeline…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:opacity-70 sm:w-auto"
        >
          <MessageSquare className="h-4 w-4 fill-white" />
          {isSubmitting ? "Opening WhatsApp…" : "Submit on WhatsApp"}
        </button>
        <a
          href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
            "PSARA consultation enquiry"
          )}&body=${encodeURIComponent(
            `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCompany: ${company}\nState: ${state}\nCity: ${city}\nService: ${service}\nCoverage: ${coverage}\n\n${message}`
          )}`}
          className={`inline-flex w-full items-center justify-center rounded-xl border-2 px-5 py-3.5 text-xs font-black uppercase tracking-wider transition sm:w-auto ${
            dark
              ? "border-white/20 text-white hover:border-[#C89B3C]"
              : "border-[#0F3C65]/20 text-[#0F3C65] hover:border-[#C89B3C]"
          }`}
        >
          Or email instead
        </a>
      </div>

      {tried && Object.keys(errors).length > 0 ? (
        <p role="alert" className="text-sm font-semibold text-red-500">
          Please fix the highlighted fields above and try again.
        </p>
      ) : (
        <p className={`text-xs font-medium leading-relaxed ${dark ? "text-slate-400" : "text-[#486581]"}`}>
          Submits a pre-filled WhatsApp message to{" "}
          <strong className={dark ? "text-white" : "text-[#0F3C65]"}>{CONTACT.phoneDisplay}</strong>
          . No account required.
          <br />
          <span className="text-[#C89B3C]">
            ★ {GOOGLE_REVIEWS.ratingLabel} · {GOOGLE_REVIEWS.reviewCount} Google reviews ·{" "}
            {CONTACT.hours}
          </span>
        </p>
      )}
    </form>
  );
}
