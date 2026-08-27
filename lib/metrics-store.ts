/**
 * Zero-Database Lead & Analytics Store
 * Server-side admin store. Lead PII is never mirrored into browser storage.
 */

export interface LeadEntry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  message?: string;
  sourcePage: string;
  timestamp: string;
  ip?: string;
}

export interface SectionMetric {
  id: string;
  name: string;
  views: number;
  clicks: number;
  lastActive: string;
}

const API_URL = "/api/metrics";
async function fetchMetrics<T>(token: string, endpoint = "", options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Metrics API error: ${response.status}`);
  }
  
  return response.json();
}

export async function getStoredLeads(token: string): Promise<LeadEntry[]> {
  const data = await fetchMetrics<{ leads: LeadEntry[] }>(token);
  return data.leads || [];
}

export async function getStoredMetrics(token: string): Promise<SectionMetric[]> {
  const data = await fetchMetrics<{ metrics: SectionMetric[] }>(token);
  return data.metrics || [];
}

// Admin functions (require special auth)
export async function clearAllData(password: string): Promise<void> {
  await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${password}`,
    },
    body: JSON.stringify({ clear: "all" }),
  });
}

export async function getAccessLog(password: string): Promise<Record<string, unknown>[]> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${password}`,
    },
    body: JSON.stringify({ type: "audit" }),
  });
  const data = await response.json();
  return data.accessLog || [];
}
