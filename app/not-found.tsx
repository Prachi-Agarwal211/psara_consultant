import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageMain } from "../components/PageShell";
import StageShell from "./components/ui/StageShell";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page does not exist. Browse PSARA License guides or contact us.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StageShell>
      <PageHero
        title="This page is not in our registry."
        lead="The requested page does not exist. Browse PSARA License guides or contact us."
        image="/assets/images/graded/corridor.webp"
        crumbs={[{ label: "Not found" }]}
      />
      <PageMain>
        <nav aria-label="Page recovery" className="flex flex-wrap items-center gap-4">
          <Link href="/" className="v3-button v3-button--saffron">Home</Link>
          <Link href="/services" className="v3-button v3-button--ghost">Services</Link>
          <Link href="/contact" className="v3-button v3-button--ghost">Contact</Link>
        </nav>
      </PageMain>
    </StageShell>
  );
}
