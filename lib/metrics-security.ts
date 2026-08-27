// Metrics contains lead data. Never ship a usable fallback credential.
export const METRICS_PASSWORD = process.env.METRICS_PASSWORD || "";
export const MAX_LEADS_PER_HOUR = 30;
export const ADMIN_IP_WHITELIST: string[] = (process.env.METRICS_ADMIN_IPS || "")
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);
