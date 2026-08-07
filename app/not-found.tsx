import type { Metadata } from "next";
import Link from "next/link";
import StageShell from "./components/ui/StageShell";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page does not exist. Browse PSARA License guides or contact us.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StageShell showFooter={false}>
      <div className="flex min-h-[80dvh] flex-col items-center justify-center px-[var(--gutter)] text-center">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-metal">
          Not found
        </p>
        <h1
          className="mt-4 max-w-lg font-semibold leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "var(--font-display)" }}
        >
          This page is not in our registry.
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/" className="text-sm text-metal">
            Home
          </Link>
          <Link href="/services" className="text-sm" style={{ color: "var(--white-55)" }}>
            Services
          </Link>
          <Link href="/contact" className="text-sm" style={{ color: "var(--white-55)" }}>
            Contact
          </Link>
        </div>
      </div>
    </StageShell>
  );
}
