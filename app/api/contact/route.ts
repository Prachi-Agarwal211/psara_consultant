import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "../../../lib/config";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  state?: unknown;
  city?: unknown;
  districts?: unknown;
  message?: unknown;
  formType?: unknown;
  sourcePage?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

type StoredLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  districts: string;
  message: string;
  formType: string;
  sourcePage: string;
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), ".data", "contact-leads.json");
const requestLog = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function text(value: unknown, max: number): string {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max)
    : "";
}

function getClientKey(request: NextRequest): string {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function allowed(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    requestLog.set(key, recent);
    return false;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return true;
}

function validPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  const national = digits.startsWith("91") && digits.length >= 12 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(national);
}

function validEmail(email: string): boolean {
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

function saveLead(lead: StoredLead): void {
  const directory = path.dirname(DATA_FILE);
  fs.mkdirSync(directory, { recursive: true });
  let leads: StoredLead[] = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      const parsed: unknown = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      if (Array.isArray(parsed)) leads = parsed as StoredLead[];
    } catch {
      leads = [];
    }
  }
  leads.unshift(lead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads.slice(0, 1000), null, 2), "utf8");
}

async function notifyByEmail(lead: StoredLead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEADS_TO_EMAIL || process.env.CONTACT_EMAIL;
  if (!apiKey || !recipient) return false;

  const html = `
    <h2>New PSARA enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email || "Not provided")}</p>
    <p><strong>State / city:</strong> ${escapeHtml(lead.state)} / ${escapeHtml(lead.city || "Not provided")}</p>
    <p><strong>Scope:</strong> ${escapeHtml(lead.districts || "Not provided")}</p>
    <p><strong>Message:</strong><br>${escapeHtml(lead.message || "Not provided").replace(/\n/g, "<br>")}</p>
    <p><strong>Source:</strong> ${escapeHtml(lead.sourcePage)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || `PSARA Website <onboarding@resend.dev>`,
      to: [recipient],
      subject: `PSARA enquiry — ${lead.state}`,
      html,
    }),
  });
  return response.ok;
}

export async function POST(request: NextRequest) {
  const key = getClientKey(request);
  if (!allowed(key)) {
    return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid enquiry payload." }, { status: 400 });
  }

  // Honeypot and instant-submit checks quietly accept bots without storing data.
  const startedAt = Number(body.startedAt || 0);
  if (text(body.website, 120) || (startedAt > 0 && Date.now() - startedAt < 1200)) {
    return NextResponse.json({ success: true });
  }

  const lead: StoredLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: text(body.name, 100),
    phone: text(body.phone, 30),
    email: text(body.email, 160),
    state: text(body.state, 80),
    city: text(body.city, 100),
    districts: text(body.districts, 120),
    message: text(body.message, 2000),
    formType: text(body.formType, 100) || "Website Enquiry",
    sourcePage: text(body.sourcePage, 200) || "/",
    createdAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.state || !validPhone(lead.phone) || !validEmail(lead.email)) {
    return NextResponse.json({ error: "Please provide a valid name, phone number, state, and email if supplied." }, { status: 422 });
  }

  try {
    saveLead(lead);
  } catch {
    // A production deployment should use a managed database or queue. The
    // email notification below still provides a delivery path when configured.
  }

  let notified = false;
  try {
    notified = await notifyByEmail(lead);
  } catch {
    notified = false;
  }

  return NextResponse.json({ success: true, notified, site: SITE.name }, { status: 202 });
}
