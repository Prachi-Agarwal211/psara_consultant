import type { Metadata } from "next";
import QuoteTool from "./QuoteTool";

/** Internal pricing desk — unlisted, never indexed (see robots.ts disallow /quote/). */
export const metadata: Metadata = {
  title: "Quote Tool",
  robots: { index: false, follow: false },
};

export default function QuotePage() {
  return <QuoteTool />;
}
