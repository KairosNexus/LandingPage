"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { useIntent } from "@/components/providers/intent-provider";
import { getAppSignupUrl } from "@/lib/app-links";

export function Footer() {
  const { intent } = useIntent();
  const platformLinks = intent === "talent"
    ? [
        { name: "Talent early access", href: "/#talent-early-access" },
        { name: "Platform preview", href: getAppSignupUrl("talent"), external: true },
      ]
    : [
        { name: "How it works", href: "/#how-it-works" },
        { name: "Talent categories", href: "/#talent-categories" },
        { name: "Platform preview", href: getAppSignupUrl("company"), external: true },
      ];

  const groups = [
    { title: "Platform", links: platformLinks },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Reviews", href: "/reviews" },
        { name: "Security", href: "/security" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy policy", href: "/privacy-policy" },
        { name: "Terms of service", href: "/terms-of-service" },
        { name: "Cookie policy", href: "/privacy-policy#section-13" },
      ],
    },
  ];

  return (
    <footer className="border-t border-black/10 px-5 pb-8 pt-16 dark:border-white/10 sm:px-7 lg:pt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" />
              <span className="font-semibold tracking-[-0.02em]">Kairos Nexus Global</span>
            </Link>
            <p className="mt-6 max-w-sm leading-7 text-[#666662] dark:text-[#adada8]">
              Human-led global talent matching today, with a trusted self-service marketplace taking shape for tomorrow.
            </p>
            <a href="mailto:info@kairosnexusglobal.com" className="mt-5 inline-block text-sm font-semibold text-[#C2185B] hover:underline">
              info@kairosnexusglobal.com
            </a>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-5 space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#666662] hover:text-[#C2185B] dark:text-[#adada8]">
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-[#666662] hover:text-[#C2185B] dark:text-[#adada8]">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-black/10 pt-8 dark:border-white/10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-semibold">Kairos Nexus Global Insights</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#666662] dark:text-[#adada8]">
              Practical thinking on global hiring, remote work, and building stronger distributed teams.
            </p>
            <a href="https://www.linkedin.com/newsletters/kairos-nexus-global-insights-7409364426522411008" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C2185B] hover:underline">
              Read on LinkedIn <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com/kairosnexus?igsh=ZDh3NTYyazgycXJ2" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="Instagram">
              <InstagramLogo size={20} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/company/kairosnexus/" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="LinkedIn">
              <LinkedinLogo size={20} aria-hidden="true" />
            </a>
            <a href="https://x.com/kairosNexus_?s=21" target="_blank" rel="noopener noreferrer" className="icon-button" aria-label="X">
              <XLogo size={20} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-[#777772]">© {new Date().getFullYear()} Kairos Nexus Global. All rights reserved.</p>
      </div>
    </footer>
  );
}
