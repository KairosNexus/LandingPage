"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { List, SignOut, User, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/components/providers/auth-provider";
import { useIntent } from "@/components/providers/intent-provider";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { intent, setIntent } = useIntent();
  const { openRequestModal } = useBusinessInquiry();
  const isDashboard = pathname.startsWith("/dashboard");

  if (user && isDashboard) return null;

  const navLinks = intent === "company"
    ? [
        { name: "Find talent", href: "/#talent-categories" },
        { name: "Our process", href: "/#how-it-works" },
        { name: "Our standards", href: "/#why-kairos" },
        { name: "About", href: "/about" },
      ]
    : [
        { name: "Your profile", href: "/#talent-early-access" },
        { name: "Our standards", href: "/#why-kairos" },
        { name: "Product preview", href: "/#platform-progress" },
        { name: "About", href: "/about" },
      ];

  const switchAudience = () => {
    setIntent(intent === "talent" ? "company" : "talent");
    setIsMenuOpen(false);
    if (pathname !== "/") router.push("/");
  };

  const signOut = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const switchLabel = intent === "talent" ? "I'm hiring" : "I'm talent";
  const primaryLabel = intent === "talent" ? "Join early access" : "Send your scope";
  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "";

  const primaryAction = intent === "talent" ? (
    <a href={getAppSignupUrl("talent")} target="_blank" rel="noopener noreferrer" className="header-cta" onClick={() => setIsMenuOpen(false)}>
      {primaryLabel}
    </a>
  ) : (
    <button
      type="button"
      onClick={() => {
        setIsMenuOpen(false);
        openRequestModal();
      }}
      className="header-cta"
    >
      {primaryLabel}
    </button>
  );

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7">
        {!isDashboard && (
          <Link href="/" className="flex h-11 w-11 items-center justify-start" aria-label="Kairos Nexus Global home">
            <Image src="/logo.png" alt="" width={36} height={42} className="h-[38px] w-auto object-contain" priority />
          </Link>
        )}

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-[#5f5f5b] transition-colors duration-200 hover:text-[#171717] dark:text-[#b7b7b2] dark:hover:text-white">
              {link.name}
            </Link>
          ))}
          <button type="button" onClick={switchAudience} className="text-sm font-semibold text-[#C2185B] transition-opacity hover:opacity-70">
            {switchLabel}
          </button>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C2185B] text-sm font-semibold text-white"
                aria-label="Open account menu"
                aria-expanded={isUserMenuOpen}
              >
                {initials || "U"}
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#1d1d1d]">
                  <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm hover:bg-black/5 dark:hover:bg-white/5">
                    <User size={18} aria-hidden="true" /> Dashboard
                  </Link>
                  <button type="button" onClick={signOut} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                    <SignOut size={18} aria-hidden="true" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="https://app.kairosng.com/auth/login" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center px-3 text-sm font-medium text-[#5f5f5b] hover:text-[#171717] dark:text-[#b7b7b2] dark:hover:text-white">
                Sign in
              </a>
              {primaryAction}
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} weight="regular" /> : <List size={25} weight="regular" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-black/10 bg-[#f7f7f5] px-5 py-5 dark:border-white/10 dark:bg-[#141414] lg:hidden">
          <nav className="mx-auto flex max-w-[1440px] flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex min-h-12 items-center border-b border-black/10 text-base font-medium dark:border-white/10">
                {link.name}
              </Link>
            ))}
            <button type="button" onClick={switchAudience} className="flex min-h-12 items-center border-b border-black/10 text-left font-semibold text-[#C2185B] dark:border-white/10">
              {switchLabel}
            </button>
            {!user && (
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a href="https://app.kairosng.com/auth/login" target="_blank" rel="noopener noreferrer" className="button-secondary" onClick={() => setIsMenuOpen(false)}>
                  Sign in
                </a>
                {primaryAction}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
