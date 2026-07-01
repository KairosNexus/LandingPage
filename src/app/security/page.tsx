import type { Metadata } from "next";
import { SecurityClient } from "./SecurityClient";

export const metadata: Metadata = {
  title: "Security & Compliance | Kairos Nexus Global",
  description: "Kairos Nexus Global security infrastructure, ethical AI principles, global compliance standards, data governance, and breach response protocols.",
};

export default function SecurityPage() {
  return <SecurityClient />;
}
