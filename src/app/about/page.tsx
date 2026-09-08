import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Kairos Nexus Global",
  description: "Kairos connects companies with skilled African professionals, starting in Nigeria, while building a wider path to global opportunity.",
};

export default function AboutPage() {
  return <AboutClient />;
}
