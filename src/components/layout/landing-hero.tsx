"use client";

import Image from "next/image";
import { PiArrowRight } from "react-icons/pi";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";

type LandingHeroProps = { audience: "company" | "talent" };

const heroContent = {
  company: {
    eyebrow: "Human-led matching available now",
    headline: "Global talent,",
    accent: "matched with clarity.",
    description:
      "Tell us what your business needs. Kairos finds and introduces vetted global talent while our self-service platform is being built.",
    primaryLabel: "Send your scope",
    secondaryLabel: "Sign up for talent",
    trustItems: [
      "Human-led matching",
      "Vetted global talent",
      "Self-service platform in progress",
    ],
  },
  talent: {
    eyebrow: "Talent early access",
    headline: "Prepare today for",
    accent: "global opportunities.",
    description:
      "Build your profile and complete available verification steps as Kairos grows its network of global opportunities.",
    primaryLabel: "Join early talent",
    secondaryLabel: "Explore platform preview",
    trustItems: [
      "Early profile access",
      "Verification pathways",
      "Platform in progress",
    ],
  },
} as const;

export function LandingHero({ audience }: LandingHeroProps) {
  const content = heroContent[audience];
  const { openRequestModal } = useBusinessInquiry();
  const signupHref = getAppSignupUrl(audience);

  return (
    <section className="design-2-hero" aria-labelledby="design-2-hero-title">
      <div className="design-2-hero-inner">
        <p className="design-2-eyebrow kairos-hero-reveal kairos-hero-reveal-1">
          {content.eyebrow}
        </p>
        <h1 id="design-2-hero-title" className="design-2-title kairos-hero-reveal kairos-hero-reveal-2">
          <span>{content.headline}</span>{" "}<em>{content.accent}</em>
        </h1>
        <p className="design-2-summary kairos-hero-reveal kairos-hero-reveal-3">
          {content.description}
        </p>
        <div className="design-2-actions kairos-hero-reveal kairos-hero-reveal-4">
          {audience === "company" && (
            <button type="button" onClick={openRequestModal} className="design-2-primary-action">
              {content.primaryLabel}<PiArrowRight aria-hidden="true" />
            </button>
          )}
          <a href={signupHref} target="_blank" rel="noopener noreferrer" className="design-2-secondary-action">
            {content.secondaryLabel}
          </a>
        </div>
        {audience === "talent" && (
          <p className="design-2-disclaimer">Registration does not guarantee immediate placement.</p>
        )}
        <div className="design-2-scene-wrap kairos-hero-reveal kairos-hero-reveal-5">
          <Image
            src="/vector.svg"
            alt=""
            width={1344}
            height={768}
            priority
            unoptimized
            className="design-2-vector-scene"
            sizes="(max-width: 767px) 190vw, 100vw"
          />
        </div>
        <ul className="design-2-trust" aria-label="Kairos service highlights">
          {content.trustItems.map((item, index) => (
            <li key={item}><span>0{index + 1}</span>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
