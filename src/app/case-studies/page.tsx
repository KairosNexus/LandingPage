import type { Metadata } from "next";
import { CaseStudiesClient } from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies | Kairos Nexus Global",
  description: "Real success stories from Kairos Nexus Global, see how talent land dream roles and companies save 60–70% on hiring with our vetted marketplace.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
