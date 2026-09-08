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
    role: "Co-Founder & CEO",
    bio: "Jubelo Oyeniran is Co-Founder & CEO of Kairos Nexus Global and an MBA candidate at Johns Hopkins Carey Business School. He holds a B.S. in Accounting and an M.S. in Forensic Accounting & Investigative Finance from Stevenson University, where he received the SU Pin Award, the university’s highest student honor.\n\nJubelo brings four years of audit, accounting, and consulting experience across RSM US LLP, Citrin Cooperman, and Clearview Group. Having built a $105,000 business at 17, Jubelo has lived the founder side of the problem Kairos is solving and understands firsthand what it takes to build and grow a company. He previously served as SGA President and brings a proven track record across entrepreneurship, finance, and leadership.",
    image: "/Jubelo.jpeg",
    linkedin: "https://www.linkedin.com/in/jubelooyeniran/",
    twitter: null,
  },
  {
    name: "Ayorinde Alase",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Ayorinde Alase is the Co-Founder and Chief Technology Officer of Kairos Nexus Global and a Doctoral Candidate in Computer Engineering at the University of Arkansas at Little Rock. His research is supported by an NVIDIA Academic Research Grant.\n\nWith more than three years of experience building AI-powered products, Ayorinde combines advanced technical expertise with a strong record of delivering measurable business impact. He previously worked as a Data Scientist at AXA, a Fortune 500 company, where he developed solutions that supported critical financial and strategic decisions. He has also worked at HERE Technologies, a global location-data and technology company backed by leading automotive brands, including Mercedes-Benz and BMW.\n\nBefore relocating to the United States, Ayorinde worked remotely for U.S. companies while living in Nigeria. This firsthand experience gives him a deep understanding of the global talent challenges Kairos Nexus Global is working to solve. His expertise spans artificial intelligence, machine learning, algorithm development, and the creation of scalable, data-driven products.",
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C00079] dark:text-[#FEC2E8]">
            Meet the founders
          </p>
          <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:text-5xl">
            Built by operators who understand both sides.
          </h2>
          <p className="mt-6 max-w-[52ch] text-base leading-7 text-[#5F5F5B] dark:text-[#B7B7B2]">
            Jubelo has lived the founder side, building a $105,000 business at
            17. Ayorinde has lived the talent side, working remotely for U.S.
            companies from Nigeria. Together, they understand both the founders
            Kairos serves and the talent it creates opportunities for.
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C00079] dark:text-[#FEC2E8]">
                  {founder.role}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#171717] dark:text-[#F5F5F2]">
                  {founder.name}
                </h3>
                <p className="mt-4 whitespace-pre-line text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
                  {founder.bio}
                </p>
                <div className="mt-6 flex gap-2">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} on LinkedIn`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#5F5F5B] transition-[border-color,color,box-shadow] hover:border-[#DE028E]/40 hover:text-[#C00079] hover:shadow-md dark:border-white/10 dark:text-[#B7B7B2] dark:hover:border-[#FEC2E8]/50 dark:hover:text-[#FEC2E8]"
                  >
                    <PiLinkedinLogo aria-hidden="true" className="h-5 w-5" />
                  </a>
                  {founder.website && (
                    <a
                      href={founder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} website`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#5F5F5B] transition-[border-color,color,box-shadow] hover:border-[#DE028E]/40 hover:text-[#C00079] hover:shadow-md dark:border-white/10 dark:text-[#B7B7B2] dark:hover:border-[#FEC2E8]/50 dark:hover:text-[#FEC2E8]"
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
