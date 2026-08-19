"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  IdentificationCard,
  ShieldCheck,
  Sparkle,
  UserCircleCheck,
} from "@phosphor-icons/react";
import { getAppSignupUrl } from "@/lib/app-links";
import { Cofounders } from "./cofounders";
import { TrustLogoRow } from "./trust-section";
import { WhyKairosSection } from "./why-kairos-section";
import { HeroReveal, Reveal } from "@/components/ui/landing-motion";
import { HeroSculptures } from "@/components/ui/hero-sculptures";

const earlyAccess = [
  {
    title: "Create a complete profile",
    description: "Show your experience, preferred work, availability, and strongest evidence in one clear place.",
    icon: IdentificationCard,
  },
  {
    title: "Complete readiness checks",
    description: "Finish the onboarding and verification steps available as the platform moves toward launch.",
    icon: ShieldCheck,
  },
  {
    title: "Be ready for a relevant match",
    description: "Kairos can consider your profile as qualified client demand grows across the network.",
    icon: UserCircleCheck,
  },
];

export function TalentPrelaunchLanding() {
  const signupUrl = getAppSignupUrl("talent");

  return (
    <div className="overflow-hidden">
      <section className="px-3 pb-14 pt-[84px] sm:px-5 lg:pb-20 lg:pt-[92px]">
        <div className="relative mx-auto flex min-h-[calc(100dvh-7.25rem)] max-w-[1440px] items-center overflow-hidden rounded-[28px] border border-black/10 bg-white px-5 py-16 dark:border-white/10 dark:bg-[#1d1d1d] sm:px-10 lg:px-16">
          <HeroSculptures />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <HeroReveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#C2185B]">Talent early access</p>
              <h1 className="text-[clamp(3rem,6vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.055em] text-[#171717] dark:text-[#f5f5f2]">
                Build your profile.<br />Be ready for more.
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.08} className="flex flex-col items-center">
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f5f5b] dark:text-[#b7b7b2]">
                Join Kairos early, complete your profile, and be ready as verified global opportunities begin to grow.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
                  Join early access
                  <ArrowRight aria-hidden="true" weight="bold" />
                </a>
                <a href="#talent-early-access" className="button-secondary">See what to expect</a>
              </div>
            </HeroReveal>
            <HeroReveal delay={0.14} className="mt-14 w-full border-t border-black/10 pt-7 dark:border-white/10">
              <TrustLogoRow className="gap-y-5" />
            </HeroReveal>
          </div>
        </div>
      </section>

      <section id="talent-early-access" className="scroll-mt-24 px-5 py-24 sm:px-7 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              Make your readiness visible.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#666662] dark:text-[#adada8]">
              Early access helps you prepare for future opportunities. Registration does not guarantee immediate work or placement.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-black/15 dark:border-white/15">
            {earlyAccess.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="grid gap-5 border-b border-black/15 py-9 dark:border-white/15 md:grid-cols-[72px_0.8fr_1.2fr] md:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C2185B]/10 text-[#C2185B]">
                    <item.icon size={25} weight="regular" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">{item.title}</h3>
                  <p className="max-w-xl leading-7 text-[#666662] dark:text-[#adada8]">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyKairosSection />

      <section id="platform-progress" className="scroll-mt-24 px-5 py-24 sm:px-7 lg:py-36">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="grid overflow-hidden rounded-[28px] border border-black/10 bg-[#171717] text-white dark:border-white/10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <Sparkle size={30} weight="regular" className="text-[#ef8ab6]" aria-hidden="true" />
              <h2 className="mt-10 max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
                See the platform taking shape.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                The marketplace is still in development. Some profiles, opportunities, and tools in the preview may be limited or incomplete.
              </p>
              <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="button-light mt-9">
                Preview platform
                <ArrowUpRight aria-hidden="true" weight="bold" />
              </a>
            </div>
            <div className="flex flex-col justify-end border-t border-white/10 bg-[#232323] p-8 lg:border-l lg:border-t-0 lg:p-12">
              <div className="space-y-5">
                {["Profiles can be prepared before full launch", "Features continue to evolve", "Opportunities expand as client demand grows"].map((item) => (
                  <div key={item} className="flex gap-3 border-b border-white/10 pb-5 text-white/75 last:border-0">
                    <Check size={20} weight="bold" className="mt-0.5 shrink-0 text-[#ef8ab6]" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Cofounders />

      <section className="px-5 pb-24 pt-12 sm:px-7 lg:pb-36">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="rounded-[28px] bg-[#C2185B] px-7 py-16 text-center text-white sm:px-12 sm:py-24">
            <UserCircleCheck size={36} weight="regular" className="mx-auto text-white/80" aria-hidden="true" />
            <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              Be ready when the right work appears.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Build a complete Kairos profile now and strengthen it as new verification steps become available.
            </p>
            <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="button-light mt-9">
              Join early access
              <ArrowRight aria-hidden="true" weight="bold" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
