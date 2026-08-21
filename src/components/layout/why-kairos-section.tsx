import {
  PiGlobe,
  PiSealCheck,
  PiShieldCheck,
  PiTarget,
} from "react-icons/pi";

const reasons = [
  {
    title: "Vetting with context",
    description:
      "Identity checks, skill evidence, case studies, and work samples help us look beyond a résumé.",
    icon: PiSealCheck,
  },
  {
    title: "Global access",
    description:
      "Reach capable professionals across markets while keeping role fit, communication, and availability in focus.",
    icon: PiGlobe,
  },
  {
    title: "Hands-on matching",
    description:
      "A real team reviews each request and coordinates introductions while self-service tools are being built.",
    icon: PiTarget,
  },
  {
    title: "Trust at every step",
    description:
      "Clear expectations, careful data handling, and transparent processes support confident decisions.",
    icon: PiShieldCheck,
  },
];

export function WhyKairosSection() {
  return (
    <section id="why-kairos" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
            Why Kairos
          </p>
          <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
            Access, quality, and support built together.
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
            Strong matches need more than a directory. Kairos combines human judgment with credible professional signals.
          </p>
        </div>

        <div className="border-y border-black/10 dark:border-white/10 lg:col-span-7">
          {reasons.map((reason, index) => (
            <article
              key={reason.title}
              className="grid grid-cols-[auto_1fr] gap-5 border-b border-black/10 py-8 last:border-b-0 dark:border-white/10 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-6 sm:py-10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#C2185B]/10 text-[#C2185B]">
                <reason.icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#171717] dark:text-[#F5F5F2]">
                  {reason.title}
                </h3>
                <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2] sm:text-base">
                  {reason.description}
                </p>
              </div>
              <span className="hidden pt-1 text-xs font-semibold text-[#999995] sm:block">
                0{index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
