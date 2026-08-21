import {
  PiArrowRight,
  PiBriefcase,
  PiCheckCircle,
  PiIdentificationBadge,
  PiSealCheck,
  PiUserPlus,
} from "react-icons/pi";
import { getAppSignupUrl } from "@/lib/app-links";
import { LandingHero } from "./landing-hero";
import { WhyKairosSection } from "./why-kairos-section";
import { TrustSection } from "./trust-section";
import { Cofounders } from "./cofounders";
import { CardDoodles } from "./card-doodles";

const earlyAccessSteps = [
  {
    title: "Create your profile",
    description:
      "Share your experience, skills, work samples, and role preferences.",
    icon: PiUserPlus,
  },
  {
    title: "Prepare for vetting",
    description:
      "Complete available identity, profile, and skill verification steps.",
    icon: PiSealCheck,
  },
  {
    title: "Be considered as demand grows",
    description:
      "Relevant profiles may be considered as client demand expands.",
    icon: PiBriefcase,
  },
];

const readinessNotes = [
  "Create your profile before full launch",
  "Complete available verification steps",
  "Show credible work samples and experience",
  "Be ready as relevant demand grows",
];

export function TalentPrelaunchLanding() {
  const signupHref = getAppSignupUrl("talent");

  return (
    <div className="kairos-landing design-2-landing flex-1 overflow-hidden">
      <LandingHero audience="talent" />

      <section id="talent-early-access" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
              Early-access journey
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
              Build readiness before the opportunity arrives.
            </h2>
            <p className="mt-6 max-w-[58ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
              Join now, strengthen your profile, and prepare for the platform and client demand as they grow.
            </p>
            <a
              href={signupHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg"
            >
              Create early-access profile
              <PiArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <ol className="border-y border-black/10 dark:border-white/10 lg:col-span-7">
            {earlyAccessSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] gap-5 border-b border-black/10 py-8 last:border-b-0 dark:border-white/10 sm:grid-cols-[4rem_auto_1fr] sm:gap-6 sm:py-10"
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

      <section className="py-24 sm:py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 sm:px-8 lg:grid-cols-12">
          <article className="kairos-card-doodle relative overflow-hidden rounded-[28px] bg-[#C2185B] p-8 text-white sm:p-12 lg:col-span-7 lg:min-h-[430px]">
            <CardDoodles pattern={2} />
            <PiIdentificationBadge aria-hidden="true" className="h-10 w-10" />
            <div className="mt-24 max-w-2xl lg:mt-36">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Your professional signal
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl">
                More than a résumé. A credible profile built for global work.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                Present experience, verification, work samples, and role preferences in one clear place.
              </p>
            </div>
            <span className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-white/10" />
          </article>

          <aside className="kairos-card-doodle kairos-glass-card rounded-[28px] border border-black/10 p-8 sm:p-10 lg:col-span-5" data-doodle="left">
            <CardDoodles pattern={4} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2185B]">
              Launch readiness
            </p>
            <ul className="mt-10 space-y-7">
              {readinessNotes.map((note) => (
                <li key={note} className="flex gap-3 border-b border-black/10 pb-7 last:border-b-0 last:pb-0 dark:border-white/10">
                  <PiCheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#C2185B]" />
                  <span className="text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="platform-progress" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="kairos-card-doodle grid overflow-hidden rounded-[28px] bg-[#171717] text-white dark:bg-[#1D1D1D] lg:grid-cols-12">
            <CardDoodles pattern={1} />
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E887AD]">
                Platform preview
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-medium leading-[1.06] tracking-[-0.04em] sm:text-5xl">
                Explore the experience being built for talent.
              </h2>
              <p className="mt-6 max-w-[58ch] text-base leading-7 text-[#B7B7B2]">
                Some features and opportunities shown in the preview remain limited while the marketplace develops.
              </p>
              <a
                href={signupHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg"
              >
                Preview talent platform
                <PiArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <div className="border-t border-white/10 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#999995]">
                Important context
              </p>
              <p className="mt-8 text-xl font-medium leading-8 text-[#F5F5F2]">
                Early registration prepares your profile. It does not promise immediate work or placement.
              </p>
              <p className="mt-6 text-sm leading-6 text-[#B7B7B2]">
                Opportunities will expand as Kairos completes the platform and grows relevant business demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyKairosSection />
      <TrustSection />
      <Cofounders />

      <section className="px-5 pb-24 pt-8 sm:px-8 sm:pb-28 lg:pb-36">
        <div className="kairos-card-doodle kairos-glass-card mx-auto max-w-[1440px] rounded-[28px] border border-black/10 px-7 py-14 text-center sm:px-12 sm:py-20">
          <CardDoodles pattern={3} />
          <PiBriefcase aria-hidden="true" className="mx-auto h-8 w-8 text-[#C2185B]" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
            Talent early access
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
            Create your profile before launch.
          </h2>
          <p className="mx-auto mt-6 max-w-[60ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
            Join the early talent network and prepare to be considered as relevant client demand grows.
          </p>
          <a
            href={signupHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg"
          >
            Join early talent
            <PiArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
