import type { Metadata } from "next";
import { CompanyLanding } from "@/components/layout/company-landing";

export const metadata: Metadata = {
  title: "For Businesses | Kairos Nexus Global",
  description: "Cut hiring costs by up to 70%. Access pre-vetted global talent with Kairos Nexus Global. Hire faster, save more, reduce risk.",
};

export default function ForBusinessPage() {
  return <CompanyLanding />;
}
