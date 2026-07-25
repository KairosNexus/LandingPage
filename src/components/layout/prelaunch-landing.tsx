"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Eye,
  Handshake,
  Headphones,
  Landmark,
  Mail,
  Megaphone,
  Palette,
  Rocket,
  SearchCheck,
  Sparkles,
  Store,
  UserRound,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { Cofounders } from "./cofounders";
import { TrustSection } from "./trust-section";
import { getAppSignupUrl } from "@/lib/app-links";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { WhyKairosSection } from "./why-kairos-section";

const contactEmail = "info@kairosnexusglobal.com";

const processSteps = [
  {
    title: "Send your request",
    description:
      "Complete the request form with your scope of work, role, required skills, expected hours, timeline, and budget. Attach any helpful documents.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Kairos reviews",
    description: "Our team reviews the request and clarifies the experience, availability, and working style you need.",
    icon: SearchCheck,
  },
  {
    title: "We source and match",
    description: "We identify relevant vetted talent and coordinate a focused manual introduction.",
    icon: UserRoundCheck,
  },
  {
    title: "Begin the engagement",
    description: "Both sides align on scope, terms, and next steps, with Kairos helping the process move forward.",
    icon: Handshake,
  },
];

const audiences = [
  { title: "Founders", description: "Specialists who can help turn a defined need into shipped work.", icon: UserRound },
  { title: "Startups", description: "Flexible global talent for fast-moving product and growth priorities.", icon: Rocket },
  { title: "Growing businesses", description: "Skilled support for teams expanding capacity without adding avoidable hiring friction.", icon: Store },
  { title: "Organizations", description: "Vetted professionals for project, operational, and staffing needs.", icon: Landmark },
  { title: "Individuals", description: "Specialist help for clearly scoped professional projects.", icon: Users },
];

const categories = [
  { title: "Software Engineering", description: "Frontend, backend, full-stack, mobile, cloud, and quality assurance talent.", icon: Code2 },
  { title: "Data and AI", description: "Data analysts, data engineers, machine-learning professionals, and AI specialists.", icon: Sparkles },
  { title: "Product and Design", description: "Product managers, user interface and user experience designers, researchers, and creative specialists.", icon: Palette },
  { title: "Marketing and Growth", description: "Content, performance marketing, social media, and growth talent.", icon: Megaphone },
  { title: "Customer Success", description: "Customer support, onboarding, account management, and sales support.", icon: Headphones },
  { title: "Operations", description: "Virtual assistance, project coordination, finance, and administrative support.", icon: BriefcaseBusiness },
];

export function PrelaunchLanding() {
  const { openRequestModal, openScheduleModal } = useBusinessInquiry();

  return (
    <div className="flex-1 overflow-hidden">
      <section className="relative px-4 pb-20 pt-28 sm:px-6 lg:pb-28 lg:pt-36">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[720px] max-w-7xl rounded-b-[5rem] bg-[radial-gradient(circle_at_top_left,rgba(194,24,91,0.16),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_34%)]" />
        <div className="container mx-auto grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded- border border-[#C2185B]/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C2185B] shadow-sm backdrop-blur dark:bg-zinc-900/70">
              <Clock3 className="h-4 w-4" />
              Pre-launch concierge matching available now
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
              Global talent, matched to your business needs.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
              Kairos Nexus Global connects founders, businesses, organizations, and individuals with vetted global talent. Our full self-service platform is currently being built. In the meantime, our team is matching clients and talent manually.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={openRequestModal}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#C2185B] px-7 py-4 font-bold text-white shadow-xl shadow-pink-600/20 transition-all hover:-translate-y-0.5 hover:bg-[#A3154D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B] focus-visible:ring-offset-2"
              >
                <Mail className="h-5 w-5" />
                Send Us Your Scope of Work
              </button>
              <Link
                href="https://app.kairosng.com/auth/login"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-zinc-300 bg-white/70 px-7 py-4 font-bold text-zinc-900 backdrop-blur transition-all hover:border-[#C2185B] hover:text-[#C2185B] dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-white"
              >
                Explore Our Progress So Far
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
              Prefer email? Write directly to{" "}
              <a className="font-bold text-[#C2185B] underline underline-offset-4" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-[#C2185B]/10 blur-3xl" />
            <div className="rounded-[2.5rem] border border-zinc-200 bg-white/90 p-7 shadow-2xl shadow-zinc-950/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-9">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C2185B]">Operating today</p>
                  <h2 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">Human-led talent matching</h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-4">
                {["Tell us what you need", "We review and clarify the scope", "We identify relevant vetted talent", "We coordinate the introduction"].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/70">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C2185B] text-sm font-bold text-white">{index + 1}</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-100">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                Self-service marketplace remains in development. Manual matching is active now.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">How Kairos works today</span>
            <h2 className="mt-4 text-3xl font-bold text-zinc-950 dark:text-white sm:text-5xl">From defined need to relevant introduction.</h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our concierge process gives clients a clear route to talent while our self-service experience is being developed.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="relative rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <span className="absolute right-6 top-5 text-5xl font-black text-zinc-100 dark:text-zinc-800">{index + 1}</span>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C2185B]/10 text-[#C2185B]">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-7 text-xl font-bold text-zinc-950 dark:text-white">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-9 max-w-4xl text-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Send your scope of work, project need, role description, required skills, expected hours, timeline, and budget. Our team will review the request and identify relevant talent for a manual introduction and matching process.
          </p>
          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={openRequestModal}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C2185B] px-6 py-3 font-bold text-white transition-colors hover:bg-[#A3154D]"
            >
              Tell Us What You Need
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="who-we-serve" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">Who we serve</span>
            <h2 className="mt-4 text-3xl font-bold text-zinc-950 dark:text-white sm:text-5xl">Built for clear business and project needs.</h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Best results start with a defined outcome, role, project, or staffing requirement.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((audience) => (
              <article key={audience.title} className="rounded-[2rem] border border-zinc-200 bg-gradient-to-b from-white to-pink-50/70 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
                <audience.icon className="h-7 w-7 text-[#C2185B]" />
                <h3 className="mt-6 text-lg font-bold text-zinc-950 dark:text-white">{audience.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="talent-categories" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">Representative talent categories</span>
              <h2 className="mt-4 text-3xl font-bold text-zinc-950 dark:text-white sm:text-5xl">Expertise matched around your scope.</h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                These examples show areas Kairos can source. They do not represent a complete public inventory.
              </p>
            </div>
            <button
              type="button"
              onClick={openRequestModal}
              className="inline-flex items-center gap-2 font-bold text-[#C2185B] hover:underline"
            >
              Need another specialty? Tell us
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <article key={category.title} className="group rounded-[2rem] border border-zinc-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#C2185B]/30 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-[#C2185B] dark:bg-pink-950/40">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-zinc-950 dark:text-white">{category.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform-progress" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[3rem] bg-zinc-950 text-white shadow-2xl">
            <div className="grid lg:grid-cols-[1fr_0.85fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-pink-300">
                  <Eye className="h-4 w-4" />
                  Platform preview · work in progress
                </div>
                <h2 className="mt-7 text-3xl font-bold sm:text-5xl">Explore what we have built so far.</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
                  Our self-service marketplace is still in development. Some features and profiles shown in the platform preview may be limited or incomplete.
                </p>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={getAppSignupUrl("company")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#C2185B] px-7 py-4 font-bold text-white transition-colors hover:bg-[#A3154D]"
                  >
                    Preview Company Platform
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="border-t border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(194,24,91,0.4),transparent_45%)] p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">What preview means</p>
                <ul className="mt-7 space-y-5">
                  {["Features continue to evolve", "Public profiles may be limited", "Search does not represent our full sourcing reach", "Manual matching remains the best path today"].map((item) => (
                    <li key={item} className="flex gap-3 text-zinc-200">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pink-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyKairosSection />

      <TrustSection />

      <section id="mission" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto grid gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-[3rem] border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">Our mission</span>
            <h2 className="mt-5 text-3xl font-bold text-zinc-950 dark:text-white">Make global opportunity more accessible and trusted.</h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Kairos exists to connect capable professionals with serious work while helping businesses reach strong global talent with less friction and more confidence.
            </p>
          </article>
          <article className="rounded-[3rem] bg-[#C2185B] p-8 text-white shadow-xl shadow-pink-800/20 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-100">Our vision</span>
            <h2 className="mt-5 text-3xl font-bold">Build trusted infrastructure for cross-border work.</h2>
            <p className="mt-6 text-lg leading-relaxed text-pink-50">
              We are building toward a future where businesses and vetted talent can discover, evaluate, and begin meaningful engagements through a reliable self-service platform.
            </p>
          </article>
        </div>
      </section>

      <Cofounders />

      <section className="px-4 pb-24 pt-12 sm:px-6 lg:pb-32">
        <div className="container mx-auto overflow-hidden rounded-[3rem] bg-zinc-950 p-8 text-center text-white shadow-2xl sm:p-12 lg:p-20">
          <Mail className="mx-auto h-10 w-10 text-pink-400" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Ready to find the right talent?</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold sm:text-5xl">Tell us what you need. We will help you find the right talent.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            Send us your scope, required skills, expected hours, timeline, and budget through our request form. Prefer to talk it through? Schedule a call with our customer success team.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={openRequestModal}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#C2185B] px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#A3154D]"
            >
              Send Us Your Scope of Work
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openScheduleModal}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/25 px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <CalendarDays className="h-5 w-5" />
              Schedule a Call
            </button>
          </div>
          <p className="mt-5 break-all text-sm text-zinc-400 sm:break-normal">{contactEmail}</p>
        </div>
      </section>
    </div>
  );
}
