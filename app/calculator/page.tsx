import type { Metadata } from "next";
import { pageMeta } from "../../lib/metadata";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = pageMeta(
  "PSARA License Fee Calculator — Estimate State Government Fees",
  "Estimate PSARA license government fees, training MOU costs and clearance timelines by state and district coverage. Quick statutory budget estimator.",
  "/calculator",
  ["psara fee calculator", "psara license fees", "psara cost estimate", "security agency budget"]
);

export default function CalculatorPage() {
  return <CalculatorClient />;
}
