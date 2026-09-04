"use client";

import Link from "next/link";
import { PiArrowRight, PiCheckCircle } from "react-icons/pi";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import { HeroParticles } from "./hero-particles";
import { ProductPreview } from "./product-preview";

type LandingHeroProps = { audience: "company" | "talent" };

const heroContent = {
  company: {
    eyebrow: "Verified. Skilled. Ready to work.",
    headline: "Verified talent. Right fit. Ready to deliver.",
    description:
      "Tell us what you need. We introduce skilled professionals with identity and role-specific verification signals, visible availability, and clear delivery expectations.",
    primaryLabel: "Submit your scope",
    secondaryLabel: "Schedule a call",
    exploreLabel: "Platform preview",
    exploreHref: getAppSignupUrl("company"),
    trustItems: [
      "Talent identity checks",
      "Role-specific skill evidence",
      "Availability and delivery alignment",
    ],
  },
  talent: {
    eyebrow: "Remote work. Strong earnings. Your Kairos moment.",
    headline: "Prove your skills. Earn well from anywhere.",
    description:
      "Build a credible profile, prove what you can deliver, and pursue well-paid remote opportunities. Your next breakthrough could be your Kairos moment.",
    primaryLabel: "Create your profile",
    secondaryLabel: "Explore opportunities",
    exploreLabel: "Platform preview",
    exploreHref: getAppSignupUrl("talent"),
    trustItems: [
      "Identity and skill verification",
      "Jobs and applications",
      "Protected messages and contracts",
    ],
  },
} as const;

export function LandingHero({ audience }: LandingHeroProps) {
  const content = heroContent[audience];
  const { openRequestModal, openScheduleModal } = useBusinessInquiry();

  return (
    <section className="product-hero" aria-labelledby="product-hero-title">
      <HeroParticles />
      <div className="product-hero-cursor-glow" aria-hidden="true" />
      <div className="product-hero-grid">
        <div className="product-hero-copy">
          <p className="product-eyebrow" data-hero-reveal>
            {content.eyebrow}
          </p>
          <h1 id="product-hero-title" data-hero-reveal>
            {audience === "company" ? (
              <>
                Verified talent. Right <span>fit.</span> Ready to deliver.
              </>
            ) : (
              <>
                Prove your skills. <span>Earn well</span> from anywhere.
              </>
            )}
          </h1>
          <p className="product-hero-summary" data-hero-reveal>
            {content.description}
          </p>
          <div className="product-hero-actions" data-hero-reveal>
            {audience === "company" ? (
              <>
                <button
                  type="button"
                  className="product-button product-button-primary"
                  onClick={openRequestModal}
                >
                  {content.primaryLabel}
                  <PiArrowRight aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="product-button product-button-secondary"
                  onClick={openScheduleModal}
                >
                  {content.secondaryLabel}
                </button>
              </>
            ) : (
              <>
                <a
                  className="product-button product-button-primary"
                  href={getAppSignupUrl("talent")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.primaryLabel}
                  <PiArrowRight aria-hidden="true" />
                </a>
                <Link
                  className="product-button product-button-secondary"
                  href="/jobs"
                >
                  {content.secondaryLabel}
                </Link>
              </>
            )}
          </div>
          <a
            className="product-hero-explore"
            href={content.exploreHref}
            target="_blank"
            rel="noopener noreferrer"
            data-hero-reveal
          >
            {content.exploreLabel}
          </a>
          {audience === "talent" && (
            <p className="product-hero-disclaimer" data-hero-reveal>
              Registration and verification do not guarantee immediate placement.
            </p>
          )}
        </div>

        <div className="product-hero-aside" data-hero-reveal>
          <p>Available workspace</p>
          <span>Home</span>
          <i />
          <span>Jobs</span>
          <i />
          <span>Messages</span>
          <i />
          <span>Contracts</span>
        </div>
      </div>

      <div className="product-hero-preview" data-hero-reveal>
        <ProductPreview kind="dashboard" audience={audience} />
        <div className="product-hero-detail product-hero-detail-one">
          <ProductPreview kind="verification" audience={audience} compact />
        </div>
        <div className="product-hero-detail product-hero-detail-two">
          <ProductPreview
            kind={audience === "company" ? "messaging" : "jobs"}
            audience={audience}
            compact
          />
        </div>
      </div>

      <ul
        className="product-trust-row"
        aria-label="Kairos service highlights"
        data-hero-reveal
      >
        {content.trustItems.map((item) => (
          <li key={item}>
            <PiCheckCircle aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
