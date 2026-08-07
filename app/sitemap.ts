import type { MetadataRoute } from "next";
import { SITE } from "../lib/config";
import { STATES } from "../data/states";
import { CITIES } from "../data/cities";
import { SERVICES } from "../data/services";
import { GUIDES } from "../data/guides";
import { BLOG_POSTS } from "../data/blog";
import { CASE_STUDIES } from "../data/case-studies";
import { INDUSTRIES } from "../data/industries";
import { CAREERS } from "../data/careers";

/**
 * Stable sitemap date. Google distrusts <lastmod> that changes on every
 * deploy (build-time `new Date()`) — it looks like artificial churn and can
 * keep pages stuck as "Discovered / crawled — currently not indexed".
 * Use a fixed launch date for templated pages so the sitemap stays honest:
 * only blog posts carry their real publication dates.
 */
const SITE_LAUNCH_DATE = new Date("2026-07-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  /** Use a stable "last reviewed" date for static pages so Googlebot
   *  doesn't re-crawl unchanged pages as if they were daily updates. */
  const stable = new Date("2026-01-15");

  const staticRoutes: MetadataRoute.Sitemap = [
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
    "/franchise",
    "/careers",
    "/case-studies",
    "/industries",
    "/certification",
    "/calculator",
    "/csr",
    "/gallery",
    "/emergency",
    "/security-services",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: path === "" || path === "/services" || path === "/states" || path === "/cities" ? now : stable,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path === "/about" || path === "/services" || path === "/contact" ? 0.9 : 0.8,
  }));

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const states: MetadataRoute.Sitemap = STATES.map((s) => ({
    url: `${base}/states/${s.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // NOTE: /security-services/{state} and /security-services/city/{city} are
  // thin duplicates of /states/{state} and /city/{city} — noindexed and
  // deliberately EXCLUDED from the sitemap to avoid duplicate-content signals.

  const cities: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${base}/city/${c.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${base}/${g.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.modifiedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${base}/case-studies/${cs.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((ind) => ({
    url: `${base}/industries/${ind.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const careerRoutes: MetadataRoute.Sitemap = CAREERS.map((c) => ({
    url: `${base}/careers/${c.slug}`,
    lastModified: SITE_LAUNCH_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...services,
    ...states,
    ...cities,
    ...guides,
    ...blogPosts,
    ...caseStudyRoutes,
    ...industryRoutes,
    ...careerRoutes,
  ];
}
