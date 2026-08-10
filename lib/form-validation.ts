/**
 * Shared client-side form validation used by WhatsAppForm and ContactForm.
 * Keeps the two enquiry forms on the same rules: name required, phone must
 * be a plausible Indian/international mobile (10–13 digits), email optional
 * but valid when provided.
 */

export type EnquiryErrors = {
  name?: string;
  phone?: string;
  email?: string;
  state?: string;
};

/** Indian mobile: 10 digits starting 6–9, or 91 + 10 digits. */
export function validatePhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  const national =
    digits.startsWith("91") && digits.length >= 12 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(national);
}

export function validateEmail(raw: string): boolean {
  if (!raw.trim()) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

/**
 * Run the shared rules and return a field-error map. Empty object = valid.
 */
export function validateEnquiryFields(input: {
  name: string;
  phone: string;
  email?: string;
  state?: string;
}): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!input.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!input.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!validatePhone(input.phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (input.email?.trim() && !validateEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (input.state !== undefined && !input.state.trim()) {
    errors.state = "Please select your state of operation.";
  }
  return errors;
}
