"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PiArrowRight,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiXLogo,
} from "react-icons/pi";
import { useIntent } from "@/components/providers/intent-provider";
import { getAppSignupUrl } from "@/lib/app-links";

export function Footer() {
  const { intent } = useIntent();
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/kairosnexus?igsh=ZDh3NTYyazgycXJ2",
      icon: PiInstagramLogo,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/kairosnexus/",
      icon: PiLinkedinLogo,
    },
    {
      name: "X",
      href: "https://x.com/kairos_nexus?s=21",
      icon: PiXLogo,
    },
  ];

  const sections = [
    {
      title: "Platform",
      links:
        intent === "talent"
          ? [
              { name: "Talent early access", href: "/#talent-early-access" },
              {
                name: "Platform preview",
                href: getAppSignupUrl("talent"),
                external: true,
              },
            ]
          : [
              { name: "How it works", href: "/#how-it-works" },
              {
                name: "Platform preview",
                href: getAppSignupUrl("company"),
                external: true,
              },
            ],
    },
    {
      title: "Company",
      links: [
        { name: "About us", href: "/about" },
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
        { name: "Data governance", href: "/privacy-policy#section-9" },
        { name: "Cookie policy", href: "/privacy-policy#section-13" },
      ],
    },
  ];

  return (
    <footer className="border-t border-black/10 bg-[#EFEFEC] dark:border-white/10 dark:bg-[#141414]">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="text-lg font-semibold tracking-[-0.02em] text-[#171717] dark:text-[#F5F5F2]">
                Kairos Nexus Global
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
              Human-led global talent matching today, while we build the self-service platform for tomorrow.
            </p>
            <a
              href="mailto:info@kairosnexusglobal.com"
              className="mt-5 inline-block text-sm font-semibold text-[#C2185B] hover:underline"
            >
              info@kairosnexusglobal.com
            </a>
            <div className="mt-7 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#5F5F5B] transition-[border-color,color,box-shadow] hover:border-[#C2185B]/40 hover:text-[#C2185B] hover:shadow-md dark:border-white/10 dark:bg-[#1D1D1D] dark:text-[#B7B7B2]"
                >
                  <social.icon aria-hidden="true" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#777773] dark:text-[#999995]">
                  {section.title}
                </h3>
                <ul className="mt-6 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#5F5F5B] transition-colors hover:text-[#171717] dark:text-[#B7B7B2] dark:hover:text-[#F5F5F2]"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-[#5F5F5B] transition-colors hover:text-[#171717] dark:text-[#B7B7B2] dark:hover:text-[#F5F5F2]"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="kairos-glass-card mt-16 flex flex-col gap-7 rounded-[28px] border border-black/10 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C2185B]/10 text-[#C2185B]">
              <PiLinkedinLogo aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2185B]">
                LinkedIn newsletter
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#171717] dark:text-[#F5F5F2]">
                Kairos Nexus Global Insights
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#5F5F5B] dark:text-[#B7B7B2]">
                {intent === "talent"
                  ? "Practical ideas on remote work, career growth, and succeeding in global opportunities."
                  : "Practical ideas on global hiring, remote work, and building high-performing teams."}
              </p>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/newsletters/kairos-nexus-global-insights-7409364426522411008"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#C2185B] px-6 text-sm font-semibold text-white transition-[background-color,box-shadow] hover:bg-[#A3154D] hover:shadow-lg"
          >
            Subscribe
            <PiArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-10 text-xs text-[#777773] dark:text-[#999995]">
          © {new Date().getFullYear()} Kairos Nexus Global. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
