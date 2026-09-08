import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Eye,
  UserRoundPlus,
} from "lucide-react";
import { Cofounders } from "./cofounders";
import { TrustSection } from "./trust-section";
import { getAppSignupUrl } from "@/lib/app-links";
import { WhyKairosSection } from "./why-kairos-section";

const earlyAccessSteps = [
  {
    title: "Create your profile",
    description: "Join through our pre-launch onboarding and share your experience, skills, and work preferences.",
    icon: UserRoundPlus,
  },
  {
    title: "Prepare for vetting",
    description: "Complete the available profile and verification steps so your information is ready as the platform grows.",
    icon: BadgeCheck,
  },
  {
    title: "Be considered as demand grows",
    description: "Kairos may consider relevant profiles as client demand expands. Registration does not guarantee immediate placement.",
    icon: BriefcaseBusiness,
  },
];

export function TalentPrelaunchLanding() {
  return (
    <div className="flex-1 overflow-hidden">
      <section className="relative px-4 pb-20 pt-28 sm:px-6 lg:pb-28 lg:pt-36">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[680px] max-w-7xl rounded-b-[5rem] bg-[radial-gradient(circle_at_top_left,rgba(194,24,91,0.16),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_34%)]" />
        <div className="container mx-auto grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C2185B]/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C2185B] shadow-sm backdrop-blur dark:bg-zinc-900/70">
              <Clock3 className="h-4 w-4" />
              Talent early access · pre-launch
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
              Prepare for future global opportunities.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-xl">
              Kairos Nexus Global is building a platform that will connect vetted global talent with businesses and organizations. Join our early talent network as we complete the platform and grow client demand.
            </p>
            <p className="mt-4 font-semibold text-zinc-800 dark:text-zinc-200">
              Registration does not guarantee an immediate opportunity or placement.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={getAppSignupUrl("talent")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#C2185B] px-7 py-4 font-bold text-white shadow-xl shadow-pink-600/20 transition-all hover:-translate-y-0.5 hover:bg-[#A3154D]"
              >
                Join Our Early Talent Network
                <ArrowRight className="h-5 w-5" />
              </a>
          
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-zinc-200 bg-white/90 p-8 shadow-2xl shadow-zinc-950/10 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C2185B]">What early access means</p>
            <h2 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">Build launch readiness now.</h2>
            <ul className="mt-7 space-y-5">
              {[
                "Create your talent profile before full launch",
                "Complete available onboarding and verification steps",
                "Be considered as relevant client demand grows",
                "Expect more opportunities as the platform expands",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C2185B]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
              Self-service platform remains in development. Early registration prepares your profile for future opportunities; it does not promise immediate work.
            </p>
          </aside>
        </div>
      </section>

      <section id="talent-early-access" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">Early-access journey</span>
            <h2 className="mt-4 text-3xl font-bold text-zinc-950 dark:text-white sm:text-5xl">Join now. Prepare for what comes next.</h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Opportunities will expand as Kairos completes the platform and grows business demand.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {earlyAccessSteps.map((step, index) => (
              <article key={step.title} className="rounded-[2rem] border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C2185B]/10 text-[#C2185B]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-black text-zinc-100 dark:text-zinc-800">{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-zinc-950 dark:text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform-progress" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[3rem] bg-zinc-950 p-8 text-white shadow-2xl sm:p-12 lg:p-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-pink-300">
              <Eye className="h-4 w-4" />
              Platform preview · work in progress
            </div>
            <h2 className="mt-7 max-w-3xl text-3xl font-bold sm:text-5xl">Explore the product being built.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
              Our self-service marketplace is still in development. Some features, opportunities, and profiles shown in the preview may be limited or incomplete.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={getAppSignupUrl("talent")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#C2185B] px-7 py-4 font-bold text-white transition-colors hover:bg-[#A3154D]"
              >
                Preview Talent Platform
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={getAppSignupUrl("talent")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-7 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Create Early-Access Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhyKairosSection />
      <TrustSection />
      <Cofounders />

      <section className="px-4 pb-24 pt-12 sm:px-6 lg:pb-32">
        <div className="container mx-auto rounded-[3rem] bg-zinc-950 p-8 text-center text-white shadow-2xl sm:p-12 lg:p-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Talent early access</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold sm:text-5xl">Create your talent profile before launch.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            Join our early talent network to be considered for opportunities as client demand grows and the platform moves toward full launch. Registration does not guarantee immediate placement.
          </p>
          <a
            href={getAppSignupUrl("talent")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#C2185B] px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#A3154D]"
          >
            Join Our Early Talent Network
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
