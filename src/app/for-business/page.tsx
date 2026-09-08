import type { Metadata } from "next";
import { CompanyLanding } from "@/components/layout/company-landing";

export const metadata: Metadata = {
  title: "For Businesses | Kairos Nexus Global",
  description: "Hire skilled African professionals, starting in Nigeria, at up to 70% less than the cost of equivalent U.S. hires.",
};

export default function ForBusinessPage() {
  return <CompanyLanding />;
}
