"use client";

import { useState } from "react";
import Link from "next/link";
import StageShell from "../components/ui/StageShell";
import { PageHero, PageMain } from "../../components/PageShell";
import { GlassCard } from "../../components/v3/PagePrimitives";
import { getStoredLeads, getStoredMetrics, LeadEntry, SectionMetric } from "@/lib/metrics-store";

export default function MetricsDashboardPage() {
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const [metrics, setMetrics] = useState<SectionMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "heatmap" | "traffic">("leads");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/metrics", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${password}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        loadData(password);
      } else {
        setAuthError("Incorrect password");
      }
    } catch {
      setAuthError("Connection error");
    }
  };

  const loadData = async (token: string) => {
    try {
      const [leadsData, metricsData] = await Promise.all([
        getStoredLeads(token),
        getStoredMetrics(token)
      ]);
      setLeads(leadsData);
      setMetrics(metricsData.length > 0 ? metricsData : [
        { id: "sec-hero", name: "Hero CTA & Banner Clicks", views: 0, clicks: 0, lastActive: "—" },
        { id: "sec-whatsapp", name: "WhatsApp Quick Inquiry", views: 0, clicks: 0, lastActive: "—" },
        { id: "sec-contact-form", name: "Contact Form Submissions", views: 0, clicks: 0, lastActive: "—" }
      ]);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setAuthError("");
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.product && l.product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Requirement", "Source Page", "Timestamp", "IP Address"];
    const rows = leads.map((l) => [
      l.id,
      ...[l.name, l.phone, l.email || "", l.product || "", l.sourcePage, l.timestamp, l.ip || "N/A"].map((value) => `"${String(value).replace(/"/g, '""')}"`),
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalClicks = metrics.reduce((acc, curr) => acc + curr.clicks, 0);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <StageShell key="login">
        <PageHero title="Restricted Access" lead="This dashboard contains sensitive lead data. Authentication required." image="/assets/images/graded/corridor.webp" crumbs={[{ label: "Analytics Portal" }]} />
        <PageMain className="v3-tool v3-metrics">
          <div className="flex items-center justify-center">
        <GlassCard className="max-w-md w-full p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E76F00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#FFB547]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl text-white">Secured Analytics Portal</h2>
            <p className="text-[#B9C2D3] mt-2">This dashboard contains sensitive lead data. Authentication required.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="metrics-password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                id="metrics-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter dashboard password"
                className="w-full px-4 py-3 bg-[#081426] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#FFB547]"
              />
            </div>

            {authError && (
              <p className="text-red-400 text-sm">{authError}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#E76F00] hover:bg-[#FFB547] text-black font-semibold rounded-lg transition-all"
            >
              Access Dashboard
            </button>

            <Link
              href="/"
              className="block text-center text-[#B9C2D3] hover:text-white text-sm transition-colors"
            >
              ← Back to Website
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-[#B9C2D3] text-center">
              Secured Analytics Portal
            </p>
          </div>
        </GlassCard>
          </div>
        </PageMain>
      </StageShell>
    );
  }

  // DASHBOARD (only shown when authenticated)
  return (
    <StageShell key="dashboard">
      <PageHero title="Client Analytics & Lead Intelligence" lead="Secured Dashboard" image="/assets/images/graded/desk.webp" crumbs={[{ label: "Analytics Portal" }]} />
      <PageMain className="v3-tool v3-metrics">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl">Client Analytics &amp; Lead Intelligence</h2>
          </div>
          <p className="text-sm text-[#B9C2D3] mt-1">
            Secured Dashboard • {" "}
            <span className="text-emerald-400">● Authenticated</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2"
          >
            Export Leads (CSV)
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-sm transition-all"
          >
            Logout
          </button>
          <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all">
            Back to Website
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 space-y-8">
        {loading ? (
          <div className="text-center py-20 text-[#B9C2D3]">Loading analytics data...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5">
                <span className="text-xs uppercase tracking-wider text-[#B9C2D3] font-semibold">Total Leads Captured</span>
                <div className="text-3xl font-extrabold text-[#FFB547] mt-2">{leads.length}</div>
                <span className="text-[11px] text-emerald-400 mt-1 block">Inquiry form submissions</span>
              </div>

              <div className="p-5">
                <span className="text-xs uppercase tracking-wider text-[#B9C2D3] font-semibold">Total Section Clicks</span>
                <div className="text-3xl font-extrabold text-[#FF7A00] mt-2">{totalClicks}</div>
                <span className="text-[11px] text-[#FF7A00] mt-1 block">Active user interactions</span>
              </div>

              <div className="p-5">
                <span className="text-xs uppercase tracking-wider text-[#B9C2D3] font-semibold">Latest Lead</span>
                <div className="text-lg font-bold text-white mt-2 truncate">
                  {leads[0]?.name || "No leads yet"}
                </div>
                <span className="text-[11px] text-[#B9C2D3] mt-1 block">
                  {leads[0]?.phone || "—"}
                </span>
              </div>

              <div className="p-5">
                <span className="text-xs uppercase tracking-wider text-[#B9C2D3] font-semibold">Trackable Sections</span>
                <div className="text-3xl font-extrabold text-orange-400 mt-2">{metrics.length}</div>
                <span className="text-[11px] text-orange-400 mt-1 block">Analytics endpoints active</span>
              </div>
            </div>

            <div className="flex flex-wrap border-b border-white/10 gap-x-6 gap-y-3">
              <button
                onClick={() => setActiveTab("leads")}
                className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "leads" ? "border-[#FFB547] text-[#FFB547]" : "border-transparent text-[#B9C2D3] hover:text-white"
                }`}
              >
                Leads & Phone Submissions ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("heatmap")}
                className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "heatmap" ? "border-[#FFB547] text-[#FFB547]" : "border-transparent text-[#B9C2D3] hover:text-white"
                }`}
              >
                Section Click Heatmap
              </button>
              <button
                onClick={() => setActiveTab("traffic")}
                className={`pb-3 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "traffic" ? "border-[#FFB547] text-[#FFB547]" : "border-transparent text-[#B9C2D3] hover:text-white"
                }`}
              >
                Traffic Overview
              </button>
            </div>

            {activeTab === "leads" && (
              <div className="overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
                  <input
                    type="text"
                    placeholder="Search leads by name, phone, or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80 px-4 py-2 bg-[#081426] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#FFB547]"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm text-gray-300">
                    <thead className="bg-[#081426] text-xs uppercase text-[#B9C2D3] border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Contact Name</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">Requirement</th>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-white">{lead.name}</td>
                          <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">{lead.phone}</td>
                          <td className="py-3.5 px-4 text-gray-200">{lead.product || "General Inquiry"}</td>
                          <td className="py-3.5 px-4 text-xs font-mono text-amber-300">{lead.sourcePage}</td>
                          <td className="py-3.5 px-4 text-xs text-[#B9C2D3]">
                            {new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-mono text-[#B9C2D3]">{lead.ip || "N/A"}</td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-[#B9C2D3]">
                            No leads found. Leads will appear here as visitors submit inquiries.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "heatmap" && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-bold text-white">Section Engagement &amp; Click Share</h3>
                <div className="space-y-4">
                  {metrics.map((m) => {
                    const percentage = totalClicks > 0 ? Math.round((m.clicks / totalClicks) * 100) : 0;
                    return (
                      <div key={m.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-gray-200">{m.name}</span>
                          <span className="text-xs text-[#FFB547] font-mono">{m.clicks} clicks</span>
                        </div>
                        <div className="w-full bg-[#081426] h-3 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="bg-gradient-to-r from-[#FFE8D1] to-[#E76F00] h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percentage, 2)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "traffic" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Traffic Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#B9C2D3]">Total Leads:</span>
                      <span className="font-semibold text-emerald-400">{leads.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B9C2D3]">Total Clicks:</span>
                      <span className="font-semibold text-[#FF7A00]">{totalClicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B9C2D3]">Active Sections:</span>
                      <span className="font-semibold text-orange-400">{metrics.length}</span>
                    </div>
                  </div>
                </GlassCard>
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Security Status</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      Password Protection: Active
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      Rate Limiting: 100 req/hour
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      IP Logging: Enabled
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      Data Storage: Secure (.data folder)
                    </li>
                  </ul>
                </GlassCard>
              </div>
            )}
          </>
        )}
      </div>
      </PageMain>
    </StageShell>
  );
}
