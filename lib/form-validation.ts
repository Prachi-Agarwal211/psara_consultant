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

export function validatePhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
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
