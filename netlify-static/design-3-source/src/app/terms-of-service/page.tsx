import type { Metadata } from "next";
import { TermsOfServiceClient } from "./TermsOfServiceClient";

export const metadata: Metadata = {
  title: "Terms of Service | Kairos Nexus Global",
  description: "Terms of Service for Kairos Nexus Global, rules, guidelines, and legal agreements for using our talent marketplace.",
};

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
