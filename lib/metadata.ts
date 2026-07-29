import type { Metadata } from "next";
import { SITE } from "./config";

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
    : `${SITE.url}/assets/images/og/default-og.png`;

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
  return {
    title,
    description,
    keywords: [title, SITE.name, "PSARA License", ...keywords],
    ...ogMetadata(title, description, path, image),
  };
}
