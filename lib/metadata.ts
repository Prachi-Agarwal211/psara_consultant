import type { Metadata } from "next";
import { SITE } from "./config";

/** Root layout title template appends " | {SITE.name}" (~23 chars) to every title. */
const TITLE_SUFFIX = ` | ${SITE.name}`;
const TITLE_MAX = 60;
/** Space left for the page-specific part after the layout template suffix. */
export const TITLE_BUDGET = TITLE_MAX - TITLE_SUFFIX.length;

export function clampTitle(title: string, max = TITLE_BUDGET): string {
  const t = title.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const atSpace = cut.lastIndexOf(" ");
  return (atSpace > 20 ? cut.slice(0, atSpace) : cut).trimEnd() + "…";
}

/** Same clamp applied to full branded titles (OG/Twitter append the brand too). */

/**
 * Generate Open Graph and Twitter card metadata with optional per-page OG image.
 * @param image - path relative to SITE.url (e.g. "/assets/images/og/post-slug-og.svg")
 */
export function ogMetadata(
  title: string,
  description: string,
  path = "/",
  image?: string
): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const url = `${SITE.url}${path}`;
  const ogImage = image
    ? `${SITE.url}${image}`
    : `${SITE.url}/assets/images/og/default-og.jpg`;

  return {
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
  };
}

export function pageMeta(
  title: string,
  description: string,
  path: string,
  keywords: string[] = [],
  image?: string
): Metadata {
  // Clamp descriptions to ≤160 rendered chars (HTML-escaped) at a word boundary.
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const fits = (s: string) => esc(s).length <= 160;
  const clean = description.trim().replace(/\s+/g, " ");
  let trimmed = clean;
  if (!fits(clean)) {
    const cut = clean.slice(0, 159);
    const atSpace = cut.lastIndexOf(" ");
    const base = (atSpace > 80 ? cut.slice(0, atSpace) : cut).trimEnd();
    trimmed = base + "…";
    if (!fits(trimmed)) trimmed = base.slice(0, base.length - 1) + "…";
  }
  // Clamp the page title so the layout template suffix keeps the final
  // <title> under 60 chars (the #1 flag on automated SEO checkers).
  const clamped = clampTitle(title);
  return {
    title: clamped,
    description: trimmed,
    keywords: [clamped, SITE.name, "PSARA License", ...keywords],
    ...ogMetadata(clamped, trimmed, path, image),
  };
}
