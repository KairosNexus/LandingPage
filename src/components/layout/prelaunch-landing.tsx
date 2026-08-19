"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Briefcase,
  CalendarBlank,
  ChartLineUp,
  Check,
  Code,
  Handshake,
  Headset,
  MagnifyingGlass,
  Megaphone,
  Palette,
  ShieldCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import { Cofounders } from "./cofounders";
import { TrustLogoRow } from "./trust-section";
import { WhyKairosSection } from "./why-kairos-section";
import { HeroReveal, Reveal } from "@/components/ui/landing-motion";
import { HeroSculptures } from "@/components/ui/hero-sculptures";

const process = [
  {
    title: "Share the work",
    description: "Tell us the outcome, skills, timeline, and budget you have in mind.",
    icon: Briefcase,
  },
  {
    title: "We sharpen the brief",
    description: "A Kairos specialist reviews the scope and closes any important gaps.",
    icon: MagnifyingGlass,
  },
  {
    title: "Meet relevant talent",
    description: "We source vetted professionals and coordinate focused introductions.",
    icon: UsersThree,
  },
  {
    title: "Start with clarity",
    description: "Both sides align on terms, availability, and the first meaningful milestone.",
    icon: Handshake,
  },
];

const categories = [
  {
    title: "Software engineering",
    description: "Frontend, backend, mobile, cloud, and quality engineering.",
    icon: Code,
    className: "md:col-span-7 md:row-span-2 bg-[#171717] text-white",
    iconClassName: "bg-white/10 text-white",
    image: "/talent_hero_.png",
  },
  {
    title: "Data and AI",
    description: "Analysts, data engineers, machine learning, and AI specialists.",
    icon: Brain,
    className: "md:col-span-5 bg-[#f7dce8] text-[#35101f]",
    iconClassName: "bg-white/70 text-[#C2185B]",
  },
  {
    title: "Product and design",
    description: "Product managers, designers, researchers, and creative specialists.",
    icon: Palette,
    className: "md:col-span-5 bg-white dark:bg-[#1d1d1d]",
    iconClassName: "bg-[#C2185B]/10 text-[#C2185B]",
  },
  {
    title: "Marketing and growth",
    description: "Content, acquisition, social media, and growth talent.",
    icon: Megaphone,
    className: "md:col-span-4 bg-white dark:bg-[#1d1d1d]",
    iconClassName: "bg-[#C2185B]/10 text-[#C2185B]",
  },
  {
    title: "Customer success",
    description: "Onboarding, account management, support, and sales enablement.",
    icon: Headset,
    className: "md:col-span-4 bg-[#ececeb] dark:bg-[#242424]",
    iconClassName: "bg-white dark:bg-white/10 text-[#C2185B]",
  },
  {
    title: "Operations",
    description: "Project coordination, finance, administration, and specialist support.",
    icon: ChartLineUp,
    className: "md:col-span-4 bg-[#C2185B] text-white",
    iconClassName: "bg-white/15 text-white",
  },
];

export function PrelaunchLanding() {
  const { openRequestModal, openScheduleModal } = useBusinessInquiry();

  return (
    <div className="overflow-hidden">
      <section className="px-3 pb-14 pt-[84px] sm:px-5 lg:pb-20 lg:pt-[92px]">
        <div className="relative mx-auto flex min-h-[calc(100dvh-7.25rem)] max-w-[1440px] items-center overflow-hidden rounded-[28px] border border-black/10 bg-white px-5 py-16 dark:border-white/10 dark:bg-[#1d1d1d] sm:px-10 lg:px-16">
          <HeroSculptures />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <HeroReveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#C2185B]">Human-led global talent matching</p>
              <h1 className="text-[clamp(3rem,6vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.055em] text-[#171717] dark:text-[#f5f5f2]">
                Global talent.<br />Matched with care.
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.08} className="flex flex-col items-center">
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f5f5b] dark:text-[#b7b7b2]">
                Kairos connects businesses with vetted global professionals through a hands-on process built around your exact scope.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={openRequestModal} className="button-primary">
                  Send your scope
                  <ArrowRight aria-hidden="true" weight="bold" />
                </button>
                <Link href="#how-it-works" className="button-secondary">See how it works</Link>
              </div>
            </HeroReveal>

            <HeroReveal delay={0.14} className="mt-14 w-full border-t border-black/10 pt-7 dark:border-white/10">
              <TrustLogoRow className="gap-y-5" />
            </HeroReveal>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 px-5 py-24 sm:px-7 lg:py-36">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="max-w-lg text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              A clear path from need to introduction.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-[#666662] dark:text-[#adada8]">
              You bring the brief. We bring focused review, careful sourcing, and a real person to keep the process moving.
            </p>
          </Reveal>

          <div className="border-t border-black/15 dark:border-white/15">
            {process.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="grid gap-5 border-b border-black/15 py-8 dark:border-white/15 sm:grid-cols-[64px_1fr] sm:py-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C2185B]/10 text-[#C2185B]">
                    <item.icon size={24} weight="regular" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.025em]">{item.title}</h3>
                    <p className="mt-2 max-w-xl leading-7 text-[#666662] dark:text-[#adada8]">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="talent-categories" className="scroll-mt-24 px-5 py-24 sm:px-7 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C2185B]">Talent categories</p>
            <h2 className="max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              Expertise for the work in front of you.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#666662] dark:text-[#adada8]">
              From product delivery to operations, we source around the outcome you need rather than a fixed public inventory.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
            {categories.map((category, index) => (
              <Reveal key={category.title} className={`relative overflow-hidden rounded-[28px] ${category.className}`} delay={index * 0.04}>
                <article className="relative flex h-full min-h-56 flex-col overflow-hidden rounded-[28px] border border-black/10 p-7 dark:border-white/10 sm:p-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.iconClassName}`}>
                    <category.icon size={24} weight="regular" aria-hidden="true" />
                  </div>
                  <div className="mt-auto pt-12">
                    <h3 className="text-2xl font-medium tracking-[-0.03em]">{category.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 opacity-75">{category.description}</p>
                  </div>
                  {category.image && (
                    <div className="pointer-events-none absolute bottom-0 right-2 hidden h-[92%] w-[46%] md:block">
                      <Image src={category.image} alt="" fill sizes="36vw" className="object-contain object-bottom" />
                    </div>
                  )}
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
                Human support now. Self-service next.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                Manual matching is active while the Kairos marketplace continues to grow. Explore the product preview to see what is taking shape.
              </p>
              <a href={getAppSignupUrl("company")} target="_blank" rel="noopener noreferrer" className="button-light mt-9">
                Preview platform
                <ArrowUpRight aria-hidden="true" weight="bold" />
              </a>
            </div>
            <div className="flex flex-col justify-end border-t border-white/10 bg-[#232323] p-8 lg:border-l lg:border-t-0 lg:p-12">
              <div className="space-y-5">
                {["Manual matching is available today", "Platform features continue to evolve", "A Kairos specialist reviews every business request"].map((item) => (
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
            <ShieldCheck size={34} weight="regular" className="mx-auto text-white/80" aria-hidden="true" />
            <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
              Bring us the brief. We will find the people.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Share the work, timeline, and budget. Our team will help turn it into a focused talent search.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={openRequestModal} className="button-light">
                Send your scope
                <ArrowRight aria-hidden="true" weight="bold" />
              </button>
              <button type="button" onClick={openScheduleModal} className="button-on-color">
                <CalendarBlank aria-hidden="true" weight="regular" />
                Book a call
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
