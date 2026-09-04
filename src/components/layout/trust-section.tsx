import Image from "next/image";

const partners = [
  { name: "Jobberman", logo: "/jobberman.png" },
  { name: "PluralCode", logo: "/pluralcode.png" },
  { name: "Maryland TEDCO", logo: "/tedco.png" },
];

const recognition = [
  { name: "Pava Innovation", logo: "/pava.png" },
  { name: "Spark Impact", logo: "/spark_baltimore.png" },
  { name: "Howard University PNC", logo: "/howard_pnc.png" },
];

function LogoRow({ items }: { items: typeof partners }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex min-h-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-white p-2 sm:min-h-24 sm:rounded-[20px] sm:p-4"
        >
          <Image
            src={item.logo}
            alt={item.name}
            width={160}
            height={64}
            className="h-7 w-auto max-w-full object-contain grayscale transition-[filter,opacity] duration-300 hover:grayscale-0 sm:h-9"
          />
        </div>
      ))}
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="py-14 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-7 max-w-3xl sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C00079] dark:text-[#FEC2E8]">
            Credibility
          </p>
          <h2 className="mt-3 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-[#171717] dark:text-[#F5F5F2] sm:mt-5 sm:text-5xl">
            Trusted by builders. <span className="text-[#DE028E] dark:text-[#FEC2E8]">Backed by institutions.</span>
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-5 lg:grid-cols-12">
          <article className="kairos-glass-card rounded-[22px] border border-black/10 p-5 sm:rounded-[28px] sm:p-10 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5F5F5B] dark:text-[#B7B7B2]">
              Strategic partners and backers
            </p>
            <LogoRow items={partners} />
          </article>

          <article className="kairos-glass-card rounded-[22px] border border-black/10 p-5 sm:rounded-[28px] sm:p-10 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5F5F5B] dark:text-[#B7B7B2]">
              Recognition and awards
            </p>
            <LogoRow items={recognition} />
          </article>
        </div>
      </div>
    </section>
  );
}
