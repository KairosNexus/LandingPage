"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/kairosnexus?igsh=ZDh3NTYyazgycXJ2", icon: FaInstagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/kairosnexus/", icon: FaLinkedin },
    { name: "X", href: "https://x.com/kairos_nexus?s=21", icon: FaXTwitter },
  ];

  const sections = [
    {
      title: "PLATFORM",
      links: [
        // { name: "For Businesses", href: "/for-business" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Hire Talent", href: "/hire-talent" },
      ],
    },
    {
      title: "COMPANY",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Security", href: "/security" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Data Governance", href: "/privacy-policy#section-9" },
        { name: "Cookie Policy", href: "/privacy-policy#section-13" },
      ],
    },
  ];

  return (
    <footer className="bg-transparent pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Kairos Nexus Global logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold dark:text-white">Kairos Nexus Global</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed mb-6">
              The premium bridge for companies hiring exceptional remote talent with more speed, confidence, and cost efficiency.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#C2185B] hover:text-white transition-all hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold tracking-widest text-gray-900 dark:text-white mb-6 uppercase">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-12 overflow-hidden rounded-3xl border border-[#C2185B]/20 bg-gradient-to-br from-[#C2185B]/10 via-white to-blue-500/10 p-6 shadow-[0_20px_60px_-30px_rgba(194,24,91,0.45)] dark:via-zinc-950 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A66C2] text-white shadow-lg shadow-blue-600/20">
                <FaLinkedin className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#C2185B]">
                  LinkedIn newsletter
                </p>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white sm:text-2xl">
                  Kairos Nexus Global Insights
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Get practical insights on global hiring, remote work, and building high-performing teams.
                </p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/newsletters/kairos-nexus-global-insights-7409364426522411008"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C2185B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#C2185B]/25 transition-all hover:-translate-y-0.5 hover:bg-[#a91450] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              aria-label="Subscribe to Kairos Nexus Global Insights on LinkedIn"
            >
              Subscribe on LinkedIn
              <FaLinkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-8 text-center md:text-left">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Kairos Nexus Global. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
