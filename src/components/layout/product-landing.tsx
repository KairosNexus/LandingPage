"use client";

import {
  PiArrowRight,
  PiBriefcase,
  PiCheckCircle,
  PiHandshake,
  PiIdentificationBadge,
  PiMagnifyingGlass,
  PiSealCheck,
  PiSparkle,
  PiUserCheck,
} from "react-icons/pi";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import { Cofounders } from "./cofounders";
import { GsapScrollExperience } from "./gsap-scroll-experience";
import { LandingHero } from "./landing-hero";
import { ProductPreview, type PreviewKind } from "./product-preview";
import { TrustSection } from "./trust-section";
import { CompanyCapabilities } from "./company-capabilities";

type Audience = "company" | "talent";

type ProcessStep = {
  title: string;
  description: string;
  icon: typeof PiBriefcase;
};

type Workflow = {
  kind: PreviewKind;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

const processContent: Record<
  Audience,
  { heading: string; description: string; steps: ProcessStep[] }
> = {
  company: {
    heading: "Start with your need. We help find the right fit.",
    description:
      "Share your scope or speak with our team. We help you meet skilled professionals, starting in Nigeria, who are ready to work and can reduce hiring costs by up to 70% compared with equivalent U.S. hires.",
    steps: [
      {
        title: "Share your requirements",
        description:
          "Tell us about the role, required skills, timeline, budget, location, and preferred working style.",
        icon: PiBriefcase,
      },
      {
        title: "Review suitable professionals",
        description:
          "Review identity status, verified skill evidence, experience, CVs, certifications, and role-specific badges before deciding who moves forward.",
        icon: PiMagnifyingGlass,
      },
      {
        title: "Meet and decide",
        description:
          "Start a protected conversation, schedule an interview, and choose who should move forward.",
        icon: PiUserCheck,
      },
      {
        title: "Structure the engagement",
        description:
          "Agree scope, deliverables, dates, terms, and milestones so selected talent can deliver on time.",
        icon: PiHandshake,
      },
    ],
  },
  talent: {
    heading: "Prove your skills and pursue remote opportunities.",
    description:
      "Build proof employers can trust, discover remote roles, and position yourself for strong earnings and your next Kairos moment.",
    steps: [
      {
        title: "Complete your details",
        description:
          "Add your job interests, experience level, skills, employment preferences, education, CV, and certifications.",
        icon: PiIdentificationBadge,
      },
      {
        title: "Complete verification",
        description:
          "Verify your identity and prove role-specific skills through an available PDF case study or GitHub pull request.",
        icon: PiSealCheck,
      },
      {
        title: "Find remote opportunities",
        description:
          "Search remote jobs, save listings, create alerts, and apply for roles that value what you can deliver.",
        icon: PiMagnifyingGlass,
      },
      {
        title: "Create your Kairos moment",
        description:
          "Accept job message requests, attend interviews, and review contract terms as you move toward well-paid remote work.",
        icon: PiHandshake,
      },
    ],
  },
};

const workflowContent: Record<Audience, Workflow[]> = {
  company: [
    {
      kind: "talent",
      eyebrow: "Jobs and talent",
      title: "Post roles and review potential matches.",
      description:
        "Create detailed job listings, manage their status, explore the talent pool, and review applicants or recommended candidates.",
      points: [
        "Job creation, publishing, and status management",
        "Talent search, applicants, and recommendations",
        "Skill-match indicators, CVs, and certifications",
      ],
    },
    {
      kind: "verification",
      eyebrow: "Professional signals",
      title: "Review the information behind each profile.",
      description:
        "Identity status and role-specific skill badges show how each professional has been reviewed and what they are prepared to deliver. Verification status varies by profile.",
      points: [
        "Talent identity status",
        "Role-specific skill-verification evidence",
        "Readiness, availability, and delivery expectations",
      ],
    },
    {
      kind: "messaging",
      eyebrow: "Conversations and agreements",
      title: "Keep every next step tied to the opportunity.",
      description:
        "Speak with candidates, exchange relevant files, schedule interviews, and prepare standard or milestone contracts without losing the original hiring context.",
      points: [
        "Protected messaging and attachments",
        "Google Calendar interview scheduling",
        "Scope, deliverables, terms, and milestones",
      ],
    },
  ],
  talent: [
    {
      kind: "jobs",
      eyebrow: "Job discovery",
      title: "Search and organize relevant roles.",
      description:
        "Filter available jobs, review requirements, compare listed skills, save opportunities, and track submitted applications.",
      points: [
        "Job and location search with relevant filters",
        "Saved jobs, alerts, and applied-job tracking",
        "Skill-match indicators and application status",
      ],
    },
    {
      kind: "verification",
      eyebrow: "Identity and skills",
      title: "Demonstrate capability through structured submissions.",
      description:
        "Complete identity verification, choose an available role assessment, and submit the required PDF case study or GitHub pull request.",
      points: [
        "NIN identity verification",
        "Role-specific PDF or GitHub submission",
        "Submission progress and review history",
      ],
    },
    {
      kind: "contracts",
      eyebrow: "Opportunity follow-through",
      title: "Know the conversation, terms, and next action.",
      description:
        "Continue opportunity-linked conversations, receive interview invitations, and review an agreement before accepting the work.",
      points: [
        "Protected messages and attachments",
        "Interview invitations and notifications",
        "Accept, negotiate, or reject contract terms",
      ],
    },
  ],
};

const transparencyContent: Record<
  Audience,
  { eyebrow: string; heading: string; description: string; points: string[] }
> = {
  company: {
    eyebrow: "Platform progress",
    heading: "Technology where it helps. Human judgment where it matters.",
    description:
      "Kairos combines working product features with hands-on matching. Our team can source beyond the professionals visible in public search while the self-service marketplace continues to grow.",
    points: [
      "Available features continue to evolve",
      "Public search may not represent our full sourcing reach",
      "Verification status varies by account",
      "Recommendations depend on role requirements and available information",
      "Your team makes the final hiring decision",
    ],
  },
  talent: {
    eyebrow: "What to expect",
    heading: "A growing platform supported by real people.",
    description:
      "Kairos provides tools to help you prepare and respond to opportunities. Our team can also review suitable professionals for company requests while the marketplace continues to develop.",
    points: [
      "Registration does not guarantee job placement",
      "Available jobs can change over time",
      "Skill verification does not guarantee selection",
      "Companies make final hiring decisions",
    ],
  },
};

export function ProductLanding({ audience }: { audience: Audience }) {
  const { openRequestModal, openScheduleModal } = useBusinessInquiry();
  const signupHref = getAppSignupUrl("talent");
  const company = audience === "company";
  const process = processContent[audience];
  const workflows = workflowContent[audience];
  const transparency = transparencyContent[audience];

  const primaryAction = (
    label: string,
    className = "product-button product-button-primary",
  ) =>
    company ? (
      <button type="button" className={className} onClick={openRequestModal}>
        {label}
        <PiArrowRight aria-hidden="true" />
      </button>
    ) : (
      <a
        className={className}
        href={signupHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        <PiArrowRight aria-hidden="true" />
      </a>
    );

  return (
    <GsapScrollExperience>
      <div className="product-landing">
        <LandingHero audience={audience} />

        <section
          id="how-it-works"
          className="product-section product-process scroll-mt-24"
        >
          <div className="product-section-heading" data-reveal>
            <p className="product-eyebrow">How Kairos works</p>
            <h2>
              {company ? (
                <>
                  Start with your <span>need.</span>
                  <br />
                  We help find the right{" "}
                  <span>fit.</span>
                </>
              ) : (
                <>
                  Prove your skills and pursue <span>remote opportunities.</span>
                </>
              )}
            </h2>
            <p>{process.description}</p>
          </div>
          <ol className="product-process-list">
            {process.steps.map((step, index) => (
              <li key={step.title} data-reveal>
                <span className="product-index">0{index + 1}</span>
                <step.icon aria-hidden="true" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {company && <CompanyCapabilities />}

        <section
          id="product"
          className="product-workflow-stage scroll-mt-24"
          aria-label="Kairos product workflows"
        >
          <header className="product-horizontal-intro" data-reveal>
            <div>
              <p className="product-eyebrow">Inside Kairos</p>
              <h2>
                {company ? (
                  <>
                    See who is <span>verified and skilled,</span> then hire talent
                    ready to deliver.
                  </>
                ) : (
                  <>
                    <span>Prove your value.</span> Find work worth doing.
                  </>
                )}
              </h2>
              <p>
                {company
                  ? "Review skilled professionals in one place, with our team ready to support sourcing and introductions."
                  : "Set up your account, complete available verification, explore jobs, and manage each next step in one workspace."}
              </p>
              <a
                className="product-horizontal-cta"
                href={getAppSignupUrl(audience)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Platform preview
              </a>
            </div>
          </header>
          <div className="product-workflow-stack" data-stack-section>
            <div className="product-horizontal-progress" aria-hidden="true">
              <span data-stack-count>01 / 03</span>
              <i>
                <b data-stack-progress />
              </i>
              <span>Available workflows</span>
            </div>
            {workflows.map((workflow, index) => (
              <article
                className={`product-workflow ${index % 2 ? "is-reversed" : ""}`}
                key={workflow.kind}
                data-stack-panel
              >
                <div className="product-workflow-inner">
                  <div className="product-workflow-copy" data-stack-copy>
                    <p className="product-eyebrow">
                      0{index + 1} / {workflow.eyebrow}
                    </p>
                    <h2>{workflow.title}</h2>
                    <p>{workflow.description}</p>
                    <ul>
                      {workflow.points.map((point) => (
                        <li key={point}>
                          <PiCheckCircle aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ProductPreview kind={workflow.kind} audience={audience} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="platform-progress" className="product-transparency scroll-mt-24">
          <div data-reveal>
            <p className="product-eyebrow">{transparency.eyebrow}</p>
            <h2>{transparency.heading}</h2>
            <p>{transparency.description}</p>
          </div>
          <ul data-reveal>
            {transparency.points.map((item) => (
              <li key={item}>
                <PiSparkle aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <TrustSection />
        <Cofounders />

        <section className="product-final-cta" data-reveal>
          <PiIdentificationBadge aria-hidden="true" />
          <p className="product-eyebrow">
            {company ? "Start with your requirements" : "Prepare for relevant demand"}
          </p>
          <h2>
            {company
              ? <>Tell us what your team <span>needs.</span></>
              : <>Create your <span>Kairos moment.</span></>}
          </h2>
          <p>
            {company
              ? "Submit your scope or schedule a call. We will help you find skilled African professionals, starting in Nigeria, with potential savings of up to 70% compared with equivalent U.S. hiring costs."
              : "Prove your skills, explore remote roles, and pursue work that rewards what you can deliver."}
          </p>
          <div>
            {primaryAction(company ? "Submit your scope" : "Create your profile")}
            {company ? (
              <button
                type="button"
                className="product-button product-button-secondary"
                onClick={openScheduleModal}
              >
                Schedule a call
              </button>
            ) : (
           <></>
            )}
          </div>
        </section>
      </div>
    </GsapScrollExperience>
  );
}
