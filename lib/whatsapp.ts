import { CONTACT, SITE } from "./config";

export function buildWhatsAppUrl(
  message: string,
  phone = CONTACT.whatsapp.number
): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(
  message: string,
  phone = CONTACT.whatsapp.number
): void {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(message, phone), "_blank", "noopener,noreferrer");
}

export type EnquiryFields = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  state?: string;
  city?: string;
  service?: string;
  message?: string;
  formType?: string;
  extra?: Record<string, string | undefined>;
};

export function formatEnquiryWhatsAppMessage(fields: EnquiryFields): string {
  const type = fields.formType || "Website Enquiry";
  const lines: string[] = [
    `*New ${type} — ${SITE.name}*`,
    "",
  ];

  if (fields.name?.trim()) lines.push(`*Name:* ${fields.name.trim()}`);
  if (fields.phone?.trim()) lines.push(`*Phone:* ${fields.phone.trim()}`);
  if (fields.email?.trim()) lines.push(`*Email:* ${fields.email.trim()}`);
  if (fields.company?.trim()) lines.push(`*Company:* ${fields.company.trim()}`);
  if (fields.state?.trim()) lines.push(`*State:* ${fields.state.trim()}`);
  if (fields.city?.trim()) lines.push(`*City:* ${fields.city.trim()}`);
  if (fields.service?.trim()) lines.push(`*Service:* ${fields.service.trim()}`);

  if (fields.extra) {
    for (const [key, value] of Object.entries(fields.extra)) {
      if (value?.trim()) lines.push(`*${key}:* ${value.trim()}`);
    }
  }

  if (fields.message?.trim()) {
    lines.push("", "*Message:*", fields.message.trim());
  }

  lines.push("", `_Sent from ${SITE.url.replace("https://", "")}_`);
  return lines.join("\n");
}

export const DEFAULT_WA = CONTACT.whatsapp.url;
export const TEL_HREF = `tel:+${CONTACT.phoneRaw}`;
