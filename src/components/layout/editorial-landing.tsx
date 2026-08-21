"use client";

import Image from "next/image";
import {
  PiArrowRight,
  PiBriefcase,
  PiCheckCircle,
  PiCode,
  PiHandshake,
  PiHeadset,
  PiMagnifyingGlass,
  PiPalette,
  PiSealCheck,
  PiSparkle,
  PiUserCirclePlus,
} from "react-icons/pi";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import { WhyKairosSection } from "./why-kairos-section";
import { TrustSection } from "./trust-section";
import { Cofounders } from "./cofounders";

type Audience = "company" | "talent";

const companySteps = [
  ["Share the request", "Tell us the outcome, skills, timing, and budget.", PiBriefcase],
  ["Kairos reviews", "A person reviews your scope and clarifies the need.", PiMagnifyingGlass],
  ["We source and match", "We identify vetted professionals relevant to the work.", PiSealCheck],
  ["Meet and engage", "Kairos coordinates an introduction so both sides can align.", PiHandshake],
] as const;

const talentSteps = [
  ["Build your profile", "Share your experience, skills, and work preferences.", PiUserCirclePlus],
  ["Prepare for verification", "Complete available readiness and verification steps.", PiSealCheck],
  ["Enter consideration", "Relevant profiles may be considered as client demand grows.", PiBriefcase],
] as const;

const categories = [
  ["Software engineering", "Frontend, backend, mobile, cloud, and quality assurance.", PiCode],
  ["Data and AI", "Data analysis, engineering, machine learning, and AI support.", PiSparkle],
  ["Product and design", "Product management, research, interface, and experience design.", PiPalette],
  ["Customer operations", "Customer success, onboarding, sales support, and administration.", PiHeadset],
] as const;

export function EditorialLanding({ audience }: { audience: Audience }) {
  const { openRequestModal, openScheduleModal } = useBusinessInquiry();
  const company = audience === "company";
  const steps = company ? companySteps : talentSteps;
  const platformHref = getAppSignupUrl(audience);

  return (
    <div className="editorial-page">
      <section className={`editorial-hero editorial-hero-${audience}`} aria-labelledby="landing-title">
        <div className="editorial-hero-copy hero-reveal hero-reveal-1">
          <p className="editorial-eyebrow">{company ? "Human-led matching available now" : "Talent early access"}</p>
          <h1 id="landing-title">
            {company ? <>Global talent,<em>thoughtfully introduced.</em></> : <>Your skills,<em>ready for what is next.</em></>}
          </h1>
          <p className="editorial-summary">
            {company
              ? "Kairos connects clear business needs with vetted global professionals through a human-led matching service."
              : "Build a credible profile and prepare for consideration as Kairos grows its global client network."}
          </p>
          <div className="editorial-actions">
            {company ? (
              <button type="button" onClick={openRequestModal} className="editorial-primary">Send your scope <PiArrowRight /></button>
            ) : (
              <a href={platformHref} target="_blank" rel="noopener noreferrer" className="editorial-primary">Preview talent platform <PiArrowRight /></a>
            )}
            <button type="button" onClick={openScheduleModal} className="editorial-secondary">Schedule a call</button>
          </div>
          {!company && <p className="editorial-note">Registration does not guarantee immediate work or placement.</p>}
        </div>

        <div className="editorial-art hero-reveal hero-reveal-2">
          <span className="art-note">{company ? "clear need" : "real experience"}</span>
          <Image src="/vector.svg" alt="" width={760} height={620} priority />
          <span className="art-note art-note-right">trusted introduction</span>
        </div>

        <ul className="editorial-assurances" aria-label="Kairos service assurances">
          <li><PiCheckCircle /> Human-led process</li>
          <li><PiCheckCircle /> Vetted professionals</li>
          <li><PiCheckCircle /> Platform in progress</li>
        </ul>
      </section>

      <main>
        <section id={company ? "how-it-works" : "talent-early-access"} className="editorial-section editorial-process">
          <div className="editorial-heading">
            <p className="editorial-eyebrow">{company ? "How Kairos works today" : "Early-access journey"}</p>
            <h2>{company ? "A clear route from request to introduction." : "Prepare well before opportunity arrives."}</h2>
          </div>
          <ol className="process-line">
            {steps.map(([title, description, Icon], index) => (
              <li key={title}>
                <span className="process-number">0{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        {company && (
          <section id="talent-categories" className="editorial-section category-story">
            <div className="category-intro">
              <p className="editorial-eyebrow">Expertise shaped around your scope</p>
              <h2>Good matches begin with the work, not a crowded directory.</h2>
              <p>These are representative areas Kairos can source. They are not a complete public inventory.</p>
              <button type="button" onClick={openRequestModal} className="text-action">Ask for another specialty <PiArrowRight /></button>
            </div>
            <div className="category-grid">
              {categories.map(([title, description, Icon], index) => (
                <article key={title} className={index === 0 ? "category-featured" : ""}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section id="platform-progress" className="editorial-section platform-story">
          <div>
            <p className="editorial-eyebrow">Platform preview</p>
            <h2>Human service now. Self-service tools in progress.</h2>
            <p>Preview the product being built. Features, profiles, and search coverage may be limited or incomplete.</p>
            <a href={platformHref} target="_blank" rel="noopener noreferrer" className="editorial-light-action">Explore the preview <PiArrowRight /></a>
          </div>
          <ul>
            <li><span>01</span> Current functionality continues to evolve</li>
            <li><span>02</span> Preview content does not show full sourcing reach</li>
            <li><span>03</span> Human-led matching remains the active service</li>
          </ul>
        </section>

        <WhyKairosSection />
        <TrustSection />
        <Cofounders />

        <section className="editorial-closing">
          <p className="editorial-eyebrow">{company ? "Have a clear need?" : "Ready to build your profile?"}</p>
          <h2>{company ? "Let us find the right people for the work." : "Prepare for future global opportunities."}</h2>
          {company ? (
            <button type="button" onClick={openRequestModal} className="editorial-primary">Send your scope <PiArrowRight /></button>
          ) : (
            <a href={platformHref} target="_blank" rel="noopener noreferrer" className="editorial-primary">Preview talent platform <PiArrowRight /></a>
          )}
        </section>
      </main>
    </div>
  );
}
