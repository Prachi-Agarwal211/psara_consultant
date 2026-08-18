import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Metrics Dashboard",
  description: "Private operational analytics dashboard for PSARA Consultant India.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function MetricsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
