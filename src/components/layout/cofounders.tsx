import Image from "next/image";
import { ArrowUpRight, GlobeSimple, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/landing-motion";

export type Founder = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter?: string | null;
  website?: string;
};

export const coFounders: Founder[] = [
  {
    name: "Jubelo Oyeniran",
    role: "Co-founder",
    bio: "An award-winning Stevenson University graduate with audit, consulting, entrepreneurship, and student leadership experience.",
    image: "/Jubelo.jpeg",
    linkedin: "https://www.linkedin.com/in/jubelooyeniran/",
  },
  {
    name: "Ayorinde Alase",
    role: "Co-founder",
    bio: "A computer engineering doctoral candidate and AI product builder with experience across insurance, healthcare, and machine learning.",
    image: "/Ayorinde.jfif",
    linkedin: "https://www.linkedin.com/in/ayorinde-alase/",
    website: "https://www.ayoalase.com",
  },
];

export function Cofounders() {
  return (
    <section id="founders" className="scroll-mt-24 px-5 py-24 sm:px-7 lg:py-36">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl">
            Built by people who understand both sides of the match.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {coFounders.map((founder, index) => (
            <Reveal key={founder.name} delay={index * 0.06}>
              <article className="grid min-h-full overflow-hidden rounded-[28px] border border-black/10 bg-white dark:border-white/10 dark:bg-[#1d1d1d] sm:grid-cols-[0.8fr_1.2fr]">
                <div className="relative min-h-72 bg-[#ececeb] sm:min-h-[420px]">
                  <Image src={founder.image} alt={founder.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                </div>
                <div className="flex flex-col p-7 sm:p-8">
                  <p className="text-sm font-semibold text-[#C2185B]">{founder.role}</p>
                  <h3 className="mt-2 text-3xl font-medium tracking-[-0.04em]">{founder.name}</h3>
                  <p className="mt-6 leading-7 text-[#666662] dark:text-[#adada8]">{founder.bio}</p>
                  <div className="mt-auto flex items-center gap-2 pt-8">
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="icon-button" aria-label={`${founder.name} on LinkedIn`}>
                      <LinkedinLogo size={20} weight="regular" aria-hidden="true" />
                    </a>
                    {founder.website && (
                      <a href={founder.website} target="_blank" rel="noopener noreferrer" className="icon-button" aria-label={`${founder.name}'s website`}>
                        <GlobeSimple size={20} weight="regular" aria-hidden="true" />
                      </a>
                    )}
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-2 text-sm font-semibold hover:text-[#C2185B]">
                      Profile
                      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
