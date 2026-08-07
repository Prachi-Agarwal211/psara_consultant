"use client";

import { useState, type FormEvent } from "react";
import { openWhatsApp, formatEnquiryWhatsAppMessage } from "../lib/whatsapp";
import {
  validatePhone,
  validateEmail,
  validateEnquiryFields,
  type EnquiryErrors,
} from "../lib/form-validation";

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
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [tried, setTried] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    const next = validateEnquiryFields({ name, phone, email });
    setErrors(next);
    if (Object.keys(next).length > 0) return;

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

  const errorText = (key: keyof EnquiryErrors) =>
    errors[key] ? `text-[var(--signal-red)] text-xs font-semibold mt-1` : "hidden";

  return (
    <form onSubmit={onSubmit} noValidate className={`space-y-3 ${className}`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <input
            required
            className={`${field} ${errors.name ? "border-[var(--signal-red)]" : ""}`}
            placeholder="Full name *"
            aria-label="Full name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "wa-name-error" : undefined}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name && e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            autoComplete="name"
          />
          <p id="wa-name-error" role="alert" className={errorText("name")}>
            {errors.name}
          </p>
        </div>
        <div>
          <input
            required
            className={`${field} ${errors.phone ? "border-[var(--signal-red)]" : ""}`}
            placeholder="Phone *"
            aria-label="Phone"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "wa-phone-error" : undefined}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone && validatePhone(e.target.value)) {
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            autoComplete="tel"
            inputMode="tel"
          />
          <p id="wa-phone-error" role="alert" className={errorText("phone")}>
            {errors.phone}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <input
            className={`${field} ${errors.email ? "border-[var(--signal-red)]" : ""}`}
            placeholder="Email"
            type="email"
            aria-label="Email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "wa-email-error" : undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email && validateEmail(e.target.value)) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            autoComplete="email"
          />
          <p id="wa-email-error" role="alert" className={errorText("email")}>
            {errors.email}
          </p>
        </div>
        <div>
          <input
            className={field}
            placeholder="Company"
            aria-label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>
      <textarea
        className={`${field} min-h-[100px] resize-y`}
        placeholder="Tell us your State, coverage needs…"
        aria-label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn-gold w-full sm:w-auto">
        Send on WhatsApp
      </button>
      {tried && Object.keys(errors).length > 0 && (
        <p role="alert" className="text-xs font-semibold text-[var(--signal-red)]">
          Please fix the highlighted fields above and try again.
        </p>
      )}
      <p
        className={`text-xs font-medium ${light ? "text-[var(--ink-muted)]" : "text-[var(--text-dim)]"}`}
      >
        Submits a pre-filled WhatsApp message to our team — no password forms.
      </p>
    </form>
  );
}
