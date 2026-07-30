import {
  BadgeCheck,
  Globe2,
  ShieldCheck,
  Target,
} from "lucide-react";

const reasons = [
  {
    title: "Vetting With Context",
    description:
      "Identity checks, skill evidence, case studies, and work samples help us look beyond a résumé.",
    icon: BadgeCheck,
  },
  {
    title: "Global Access",
    description:
      "Access capable professionals across markets while keeping role fit, communication, and availability in focus.",
    icon: Globe2,
  },
  {
    title: "Hands-On Matching",
    description:
      "A real team reviews each request and coordinates introductions while our self-service tools are being built.",
    icon: Target,
  },
  {
    title: "Trust at Every Step",
    description:
      "Clear expectations, careful data handling, and transparent processes support confident decisions.",
    icon: ShieldCheck,
  },
];

export function WhyKairosSection() {
  return (
    <section id="why-kairos" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">
            Why Kairos
          </span>
          <h2 className="mt-4 text-3xl font-bold text-zinc-950 dark:text-white sm:text-5xl">
            Access, quality, and support built together.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="rounded-[2rem] border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <reason.icon className="h-7 w-7 text-[#C2185B]" />
              <h3 className="mt-6 text-xl font-bold text-zinc-950 dark:text-white">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
