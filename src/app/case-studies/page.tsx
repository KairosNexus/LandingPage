import type { Metadata } from "next";
import { ReviewsClient } from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies | Kairos Nexus Global",
  description: "Read real experiences from talent and companies working with Kairos Nexus Global across Africa and beyond.",
};

export default function CaseStudiesPage() {
  return <ReviewsClient />;
}
