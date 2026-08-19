import {
  GlobeHemisphereWest,
  SealCheck,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/landing-motion";

const reasons = [
  {
    title: "Evidence before introduction",
    description: "Identity, work samples, skill evidence, and role context help us look beyond a polished résumé.",
    icon: SealCheck,
  },
  {
    title: "A wider talent map",
    description: "Reach capable professionals across markets without losing sight of communication, availability, or fit.",
    icon: GlobeHemisphereWest,
  },
  {
    title: "A real person in the loop",
    description: "A Kairos specialist reviews the brief, coordinates introductions, and keeps the process moving.",
    icon: Target,
  },
  {
    title: "Trust built into the process",
    description: "Clear expectations, careful data handling, and transparent steps support better decisions on both sides.",
    icon: ShieldCheck,
  },
];

export function WhyKairosSection() {
  return (
    <section id="why-kairos" className="scroll-mt-24 px-5 py-24 sm:px-7 lg:py-36">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
            Global reach without losing the human judgment.
          </h2>
        </Reveal>

        <div className="mt-14 grid border-t border-black/15 dark:border-white/15 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              delay={index * 0.04}
              className={index % 2 === 0 ? "md:border-r md:border-black/15 dark:md:border-white/15" : ""}
            >
              <article className={`min-h-60 border-b border-black/15 py-8 dark:border-white/15 md:py-10 ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                <reason.icon size={30} weight="regular" className="text-[#C2185B]" aria-hidden="true" />
                <h3 className="mt-9 text-2xl font-medium tracking-[-0.03em]">{reason.title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-[#666662] dark:text-[#adada8]">{reason.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
