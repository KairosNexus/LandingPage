import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  outputFileTracingRoot: "../../",
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "kairos-nexus-global",
  project: process.env.SENTRY_PROJECT || "landing-page-nextj",
  silent: !process.env.CI,
});
