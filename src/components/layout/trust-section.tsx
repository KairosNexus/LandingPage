import Image from "next/image";
import { Reveal } from "@/components/ui/landing-motion";
import { cn } from "@/lib/utils";

const organizations = [
  { name: "Jobberman", logo: "/jobberman.png" },
  { name: "PluralCode", logo: "/pluralcode.png" },
  { name: "Maryland TEDCO", logo: "/tedco.png" },
  { name: "Pava Innovation", logo: "/pava.png" },
  { name: "Spark Baltimore", logo: "/spark_baltimore.png" },
  { name: "Howard University PNC", logo: "/howard_pnc.png" },
];

export function TrustLogoRow({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6", className)}>
      {organizations.map((organization) => (
        <div key={organization.name} className="flex h-12 items-center justify-center px-2 grayscale opacity-55 transition duration-200 hover:opacity-100 hover:grayscale-0">
          <Image
            src={organization.logo}
            alt={organization.name}
            width={150}
            height={52}
            className="max-h-10 w-auto max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function TrustSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "px-5 pb-20 sm:px-7" : "px-5 py-24 sm:px-7 lg:py-32"}>
      <Reveal className="mx-auto max-w-[1280px] border-y border-black/15 py-9 dark:border-white/15">
        <p className="mb-7 text-center text-sm font-medium text-[#666662] dark:text-[#adada8]">
          Trusted by partners, builders, and institutions
        </p>
        <TrustLogoRow />
      </Reveal>
    </section>
  );
}
