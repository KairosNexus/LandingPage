import Image from "next/image";
import { PiGlobe, PiLinkedinLogo } from "react-icons/pi";

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
    role: "Co-Founder",
    bio: "Award-winning Stevenson University graduate and SU Pin Award recipient, the university’s valedictorian equivalent, Jubelo is a CPA candidate pursuing a master’s degree in forensic accounting. He brings more than three years of audit and consulting experience across Citrin Cooperman and Clearview Group, is a two-time national Johns Hopkins consulting case competition winner, built a $105,000 business at 17, has been featured by the NFL, and previously served as SGA President.",
    image: "/Jubelo.jpeg",
    linkedin: "https://www.linkedin.com/in/jubelooyeniran/",
    twitter: null,
  },
  {
    name: "Ayorinde Alase",
    role: "Co-Founder",
    bio: "Doctoral candidate in Computer Engineering at the University of Arkansas at Little Rock, with more than three years of experience building AI products. Former digital solutions developer at AXA, specializing in machine learning for insurance and healthcare. Expert in Python, deep learning, and algorithm development driving innovation in global technology solutions.",
    image: "/Ayorinde.jfif",
    linkedin: "https://www.linkedin.com/in/ayorinde-alase/",
    website: "https://www.ayoalase.com",
  },
];

export function Cofounders() {
  return (
    <section id="founders" className="scroll-mt-24 py-24 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2185B]">
            Meet the founders
          </p>
          <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
            Built by operators who understand both sides.
          </h2>
          <p className="mt-6 max-w-[52ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
            Kairos combines experience across business, technology, global hiring, and professional development.
          </p>
        </div>

        <div className="border-y border-black/10 dark:border-white/10 lg:col-span-8">
          {coFounders.map((founder) => (
            <article
              key={founder.name}
              className="grid gap-7 border-b border-black/10 py-8 last:border-b-0 dark:border-white/10 sm:grid-cols-[10rem_1fr] sm:py-10"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#EFEFEC]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2185B]">
                  {founder.role}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#171717] dark:text-[#F5F5F2]">
                  {founder.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
                  {founder.bio}
                </p>
                <div className="mt-6 flex gap-2">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} on LinkedIn`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#5F5F5B] transition-[border-color,color,box-shadow] hover:border-[#C2185B]/40 hover:text-[#C2185B] hover:shadow-md dark:border-white/10 dark:text-[#B7B7B2]"
                  >
                    <PiLinkedinLogo aria-hidden="true" className="h-5 w-5" />
                  </a>
                  {founder.website && (
                    <a
                      href={founder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} website`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#5F5F5B] transition-[border-color,color,box-shadow] hover:border-[#C2185B]/40 hover:text-[#C2185B] hover:shadow-md dark:border-white/10 dark:text-[#B7B7B2]"
                    >
                      <PiGlobe aria-hidden="true" className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
