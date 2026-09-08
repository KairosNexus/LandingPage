"use client";

import {
  PiArrowRight,
  PiBank,
  PiBriefcase,
  PiCalendar,
  PiCheckCircle,
  PiCode,
  PiEnvelope,
  PiHandshake,
  PiHeadphones,
  PiMagnifyingGlass,
  PiMegaphone,
  PiPalette,
  PiRocket,
  PiSparkle,
  PiStorefront,
  PiUser,
  PiUserCheck,
  PiUsers,
} from "react-icons/pi";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import { LandingHero } from "./landing-hero";
import { WhyKairosSection } from "./why-kairos-section";
import { TrustSection } from "./trust-section";
import { Cofounders } from "./cofounders";
import { CardDoodles } from "./card-doodles";

const contactEmail = "info@kairosnexusglobal.com";

const processSteps = [
  {
    title: "Send your request",
    description:
      "Share the role, project, skills, expected hours, timeline, and budget.",
    icon: PiBriefcase,
  },
  {
    title: "Kairos reviews",
    description:
      "Our team clarifies the experience, availability, and working style you need.",
    icon: PiMagnifyingGlass,
  },
  {
    title: "We source and match",
    description:
      "We identify relevant vetted talent and prepare a focused introduction.",
    icon: PiUserCheck,
  },
  {
    title: "Begin the engagement",
    description:
      "Both sides align on scope, terms, and next steps with Kairos support.",
    icon: PiHandshake,
  },
];

const audiences = [
  {
    title: "Growing businesses",
    description:
      "Add focused capacity without avoidable hiring friction or a long local search.",
    icon: PiStorefront,
  },
  {
    title: "Founders",
    description: "Specialists who help turn a defined need into shipped work.",
    icon: PiUser,
  },
  {
    title: "Startups",
    description: "Flexible global talent for product and growth priorities.",
    icon: PiRocket,
  },
  {
    title: "Organizations",
    description: "Vetted professionals for projects, operations, and staffing.",
    icon: PiBank,
  },
  {
    title: "Individuals",
    description: "Specialist support for clearly scoped professional work.",
    icon: PiUsers,
  },
];

const categories = [
  {
    title: "Software Engineering",
    description:
      "Frontend, backend, full-stack, mobile, cloud, and quality assurance.",
    icon: PiCode,
  },
  {
    title: "Data and AI",
    description:
      "Data analysis, engineering, machine learning, and applied AI.",
    icon: PiSparkle,
  },
  {
    title: "Product and Design",
    description:
      "Product management, user experience, research, and visual design.",
    icon: PiPalette,
  },
  {
    title: "Marketing and Growth",
    description:
      "Content, performance marketing, social media, and growth strategy.",
    icon: PiMegaphone,
  },
  {
    title: "Customer Success",
    description: "Support, onboarding, account management, and sales support.",
    icon: PiHeadphones,
  },
  {
    title: "Operations",
    description:
      "Project coordination, finance, virtual assistance, and administration.",
    icon: PiBriefcase,
  },
];

const previewNotes = [
  "Features continue to evolve",
  "Public profiles may be limited",
  "Search does not represent our full sourcing reach",
  "Manual matching remains the best path today",
];

export function PrelaunchLanding() {
  const { openRequestModal, openScheduleModal } = useBusinessInquiry();

  return (
    <div className="kairos-landing design-2-landing flex-1 overflow-hidden">
      <LandingHero audience="company" />

      <section id="how-it-works" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
              How Kairos works today
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
              A clear route from business need to trusted introduction.
            </h2>
            <p className="mt-6 max-w-[58ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
              Our concierge process keeps decisions human while the self-service experience is being built.
            </p>
            <button
              type="button"
              onClick={openRequestModal}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B] focus-visible:ring-offset-2"
            >
              Tell us what you need
              <PiArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <ol className="border-y border-black/10 dark:border-white/10 lg:col-span-7">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] gap-5 border-b border-black/10 py-7 last:border-b-0 dark:border-white/10 sm:grid-cols-[4rem_auto_1fr] sm:items-start sm:gap-6 sm:py-9"
              >
                <span className="pt-1 text-xs font-semibold text-[#777773] dark:text-[#999995]">
                  0{index + 1}
                </span>
                <span className="hidden h-12 w-12 items-center justify-center rounded-[18px] bg-[#C2185B]/10 text-[#C2185B] sm:flex">
                  <step.icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#171717] dark:text-[#F5F5F2]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2] sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="who-we-serve" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
              Who we serve
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
              Built around real work, not hiring theatre.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <article className="kairos-card-doodle relative overflow-hidden rounded-[28px] bg-[#C2185B] p-8 text-white lg:col-span-7 lg:min-h-[430px] lg:p-12">
              <CardDoodles pattern={1} />
              <PiStorefront aria-hidden="true" className="h-10 w-10" />
              <div className="mt-24 max-w-xl lg:mt-36">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Primary fit
                </p>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
                  {audiences[0].title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">
                  {audiences[0].description}
                </p>
              </div>
              <span className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-white/10" />
            </article>

            <div className="kairos-card-doodle kairos-glass-card overflow-hidden rounded-[28px] border border-black/10 lg:col-span-5" data-doodle="left">
              <CardDoodles pattern={3} />
              {audiences.slice(1).map((audience) => (
                <article
                  key={audience.title}
                  className="flex gap-4 border-b border-black/10 p-6 last:border-b-0 dark:border-white/10 sm:p-7"
                >
                  <audience.icon aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#C2185B]" />
                  <div>
                    <h3 className="font-semibold text-[#171717] dark:text-[#F5F5F2]">
                      {audience.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
                      {audience.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="talent-categories" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
                Talent categories
              </p>
              <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
                Expertise matched around your scope.
              </h2>
            </div>
            <button
              type="button"
              onClick={openRequestModal}
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-black/10 px-5 text-sm font-semibold text-[#171717] transition-[border-color,box-shadow] hover:border-[#C2185B]/40 hover:shadow-md dark:border-white/10 dark:text-[#F5F5F2] lg:self-auto"
            >
              Ask for another specialty
              <PiArrowRight aria-hidden="true" className="h-4 w-4 text-[#C2185B]" />
            </button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            {categories.map((category, index) => (
              <article
                key={category.title}
                className={`kairos-glass-card kairos-glass-card-interactive rounded-[24px] border border-black/10 p-7 dark:border-white/10 ${index < 2 ? "kairos-card-doodle" : ""} ${
                  index === 0
                    ? "lg:col-span-7 lg:min-h-72 lg:p-10"
                    : index === 1
                      ? "lg:col-span-5 lg:min-h-72 lg:p-10"
                      : "lg:col-span-3"
                }`}
              >
                {index < 2 && <CardDoodles pattern={index === 0 ? 2 : 4} />}
                <category.icon aria-hidden="true" className="h-7 w-7 text-[#C2185B]" />
                <h3 className={`${index < 2 ? "mt-16 text-2xl" : "mt-10 text-lg"} font-semibold tracking-[-0.025em] text-[#171717] dark:text-[#F5F5F2]`}>
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform-progress" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="kairos-card-doodle grid overflow-hidden rounded-[28px] bg-[#171717] text-white dark:bg-[#1D1D1D] lg:grid-cols-12">
            <CardDoodles pattern={3} />
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E887AD]">
                Platform preview
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.06] tracking-[-0.04em] sm:text-5xl">
                Explore the product taking shape.
              </h2>
              <p className="mt-6 max-w-[58ch] text-base leading-7 text-[#B7B7B2]">
                Our self-service marketplace remains in development. Some features and profiles may be limited or incomplete.
              </p>
              <a
                href={getAppSignupUrl("company")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg"
              >
                Preview company platform
                <PiArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="border-t border-white/10 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999995]">
                What preview means
              </p>
              <ul className="mt-8 space-y-6">
                {previewNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm leading-6 text-[#D7D7D2]">
                    <PiCheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#E887AD]" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WhyKairosSection />
      <TrustSection />

      <section id="mission" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 sm:px-8 lg:grid-cols-12">
          <article className="kairos-card-doodle kairos-glass-card rounded-[28px] border border-black/10 p-8 sm:p-12 lg:col-span-7 lg:min-h-[420px]" data-doodle="left">
            <CardDoodles pattern={4} />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
              Our mission
            </p>
            <div className="mt-24 max-w-2xl lg:mt-36">
              <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-[#171717] dark:text-[#F5F5F2] sm:text-4xl">
                Make global opportunity more accessible and trusted.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
                Kairos connects capable professionals with serious work while helping businesses find strong global talent with less friction.
              </p>
            </div>
          </article>
          <article className="kairos-card-doodle rounded-[28px] bg-[#C2185B] p-8 text-white sm:p-12 lg:col-span-5">
            <CardDoodles pattern={2} />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Our vision
            </p>
            <h2 className="mt-20 text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:mt-32">
              Trusted infrastructure for cross-border work.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              A reliable self-service platform where businesses and vetted talent can discover, evaluate, and begin meaningful engagements.
            </p>
          </article>
        </div>
      </section>

      <Cofounders />

      <section className="px-5 pb-24 pt-8 sm:px-8 sm:pb-28 lg:pb-36">
        <div className="kairos-card-doodle kairos-glass-card mx-auto max-w-[1440px] rounded-[28px] border border-black/10 px-7 py-14 text-center sm:px-12 sm:py-20">
          <CardDoodles pattern={1} />
          <PiEnvelope aria-hidden="true" className="mx-auto h-8 w-8 text-[#C2185B]" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
            Ready to find the right talent?
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
            Tell us what you need. We will help you find the right fit.
          </h2>
          <p className="mx-auto mt-6 max-w-[60ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
            Share your scope, skills, hours, timeline, and budget. Prefer a conversation? Schedule time with our customer success team.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openRequestModal}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg"
            >
              Send your scope
              <PiArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openScheduleModal}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-6 text-sm font-semibold text-[#171717] transition-[border-color,box-shadow] hover:border-[#C2185B]/40 hover:shadow-md dark:border-white/10 dark:text-[#F5F5F2]"
            >
              <PiCalendar aria-hidden="true" className="h-4 w-4 text-[#C2185B]" />
              Schedule a call
            </button>
          </div>
          <a href={`mailto:${contactEmail}`} className="mt-5 inline-block text-sm font-medium text-[#C2185B] hover:underline">
            {contactEmail}
          </a>
        </div>
      </section>
    </div>
  );
}
