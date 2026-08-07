import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { STATES } from "@/data/states";
import { CITIES } from "@/data/cities";
import { SERVICES } from "@/data/services";
import { GUIDES } from "@/data/guides";
import { BLOG_POSTS } from "@/data/blog";
import { CASE_STUDIES } from "@/data/case-studies";
import { INDUSTRIES } from "@/data/industries";
import { CAREERS } from "@/data/careers";

/**
 * POST /api/indexnow — submits the entire site URL set to IndexNow
 * for instant Bing/Yandex/Naver indexing after a deploy or content change.
 *
 * Usage: curl -X POST https://consult.psaraconsultantindia.com/api/indexnow
 */
export async function POST() {
  const statics = [
    "/", "/about", "/contact", "/services", "/faq", "/states", "/cities",
    "/google", "/privacy-policy", "/terms", "/disclaimer", "/franchise",
    "/careers", "/case-studies", "/industries", "/certification",
    "/calculator", "/csr", "/gallery", "/emergency", "/security-services",
  ];

  // security-services/{state} and security-services/city/{city} are noindexed
  // duplicates of /states/* and /city/* — intentionally NOT submitted.
  const urls = [
    ...statics,
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...STATES.map((s) => `/states/${s.slug}`),
    ...CITIES.map((c) => `/city/${c.slug}`),
    ...GUIDES.map((g) => `/${g.slug}`),
    ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
    ...CASE_STUDIES.map((cs) => `/case-studies/${cs.slug}`),
    ...INDUSTRIES.map((ind) => `/industries/${ind.slug}`),
    ...CAREERS.map((c) => `/careers/${c.slug}`),
  ];

  const result = await submitToIndexNow({ urls });

  return NextResponse.json(
    {
      ok: result.success,
      submitted: urls.length,
      ...(result.error ? { error: result.error } : {}),
      ...(result.status ? { status: result.status } : {}),
    },
    { status: result.success ? 200 : 502 }
  );
}
