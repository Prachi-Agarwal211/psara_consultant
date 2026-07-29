import type { Metadata } from "next";
import { SITE } from "./config";

export function ogMetadata(
  title: string,
  description: string,
  path = "/"
): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const url = `${SITE.url}${path}`;
  return {
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
    },
  };
}

export function pageMeta(
  title: string,
  description: string,
  path: string,
  keywords: string[] = []
): Metadata {
  return {
    title,
    description,
    keywords: [title, SITE.name, "PSARA License", ...keywords],
    ...ogMetadata(title, description, path),
  };
}
