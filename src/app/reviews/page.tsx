import type { Metadata } from "next";
import { ReviewsClient } from "../case-studies/CaseStudiesClient";

export const metadata: Metadata = {
  title: "Reviews | Kairos Nexus Global",
  description: "Real reviews and success stories from Kairos Nexus Global talent and companies.",
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
