import type { MetadataRoute } from "next";
import { SITE } from "../lib/config";
import { STATES } from "../data/states";
import { CITIES } from "../data/cities";
import { SERVICES } from "../data/services";
import { GUIDES } from "../data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/faq",
    "/states",
    "/cities",
    "/google",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const services = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const states = STATES.map((s) => ({
    url: `${base}/states/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const cities = CITIES.map((c) => ({
    url: `${base}/city/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guides = GUIDES.map((g) => ({
    url: `${base}/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...services, ...states, ...cities, ...guides];
}
