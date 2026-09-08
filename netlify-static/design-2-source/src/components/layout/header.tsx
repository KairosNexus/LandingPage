"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PiList, PiSignOut, PiUser, PiX } from "react-icons/pi";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/components/providers/auth-provider";
import { useIntent } from "@/components/providers/intent-provider";
import { useBusinessInquiry } from "@/components/providers/business-inquiry-provider";
import { getAppSignupUrl } from "@/lib/app-links";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2185B] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#141414]";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { intent, setIntent } = useIntent();
  const { openRequestModal } = useBusinessInquiry();
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const menu = mobileMenuRef.current;
    const menuButton = menuButtonRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusFirstControl = window.requestAnimationFrame(() => {
      menu?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        menuButton?.focus();
        return;
      }

      if (event.key !== "Tab" || !menu) return;
      const controls = Array.from(
        menu.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (controls.length === 0) return;

      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menu?.contains(target) && !menuButton?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.cancelAnimationFrame(focusFirstControl);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const navLinks =
    intent === "company"
      ? [
          { name: "How it works", href: "/#how-it-works" },
          { name: "Talent", href: "/#talent-categories" },
          { name: "Platform", href: "/#platform-progress" },
          { name: "Why Kairos", href: "/#why-kairos" },
        ]
      : [
          { name: "Early access", href: "/#talent-early-access" },
          { name: "Platform", href: "/#platform-progress" },
          { name: "Why Kairos", href: "/#why-kairos" },
          { name: "Founders", href: "/#founders" },
        ];

  const chooseIntent = (nextIntent: "company" | "talent") => {
    setIntent(nextIntent);
    setIsMenuOpen(false);
    if (pathname !== "/") router.push("/");
  };

  const primaryHref = getAppSignupUrl("talent");
  const primaryLabel =
    intent === "talent" ? "Join early talent" : "Send your scope";
  const userInitials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "";

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  if (user && isDashboard) return null;

  const primaryAction =
    intent === "talent" ? (
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "kairos-header-primary-action inline-flex min-h-11 items-center justify-center rounded-full bg-[#C2185B] px-5 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#A3154D] hover:shadow-[0_10px_24px_rgba(194,24,91,0.2)]",
          focusRing,
        )}
      >
        {primaryLabel}
      </a>
    ) : (
      <button
        type="button"
        onClick={() => {
          setIsMenuOpen(false);
          openRequestModal();
        }}
        className={cn(
          "kairos-header-primary-action inline-flex min-h-11 items-center justify-center rounded-full bg-[#C2185B] px-5 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#A3154D] hover:shadow-[0_10px_24px_rgba(194,24,91,0.2)]",
          focusRing,
        )}
      >
        {primaryLabel}
      </button>
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div
        className={cn(
          "kairos-header-glass kairos-header-bar mx-auto max-w-[1440px] rounded-full px-3 transition-[background-color,box-shadow,border-color] duration-300 sm:px-4",
          isScrolled && "is-scrolled",
        )}
      >
        <div className="kairos-header-row flex h-14 items-center justify-between gap-3">
          {!isDashboard && (
            <Link
              href="/"
              aria-label="Kairos Nexus Global home"
              className={cn(
                "kairos-header-brand flex min-h-11 shrink-0 items-center gap-2.5 rounded-full pr-2",
                focusRing,
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white shadow-sm dark:border-white/10 dark:bg-[#1D1D1D]">
                <Image
                  src="/logo.png"
                  alt=""
                  width={30}
                  height={34}
                  priority
                  className="h-[30px] w-auto object-contain"
                />
              </span>
              <span aria-hidden="true" className="text-[0.95rem] font-semibold tracking-[-0.025em] text-[#171717] dark:text-[#F5F5F2]">
                Kairos<span className="hidden sm:inline"> Nexus Global</span>
              </span>
            </Link>
          )}

          <nav
            aria-label="Primary navigation"
            className="kairos-header-primary-nav hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "rounded-full py-2 text-sm font-medium text-[#5F5F5B] transition-colors hover:text-[#171717] dark:text-[#B7B7B2] dark:hover:text-[#F5F5F2]",
                  focusRing,
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="kairos-header-actions hidden items-center gap-2 lg:flex">
            <div
              className="kairos-audience-switch flex rounded-full border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/[0.04]"
              aria-label="Choose audience"
            >
              {(["company", "talent"] as const).map((audience) => (
                <button
                  key={audience}
                  type="button"
                  onClick={() => chooseIntent(audience)}
                  aria-pressed={intent === audience}
                  className={cn(
                    "min-h-9 rounded-full px-3 text-xs font-semibold capitalize transition-colors",
                    intent === audience
                      ? "bg-[#171717] text-white dark:bg-[#F5F5F2] dark:text-[#171717]"
                      : "text-[#5F5F5B] hover:text-[#171717] dark:text-[#B7B7B2] dark:hover:text-white",
                    focusRing,
                  )}
                >
                  {audience === "company" ? "Companies" : "Talent"}
                </button>
              ))}
            </div>

            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((open) => !open)}
                  aria-label="Open account menu"
                  aria-expanded={isUserMenuOpen}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full bg-[#C2185B] text-sm font-semibold text-white",
                    focusRing,
                  )}
                >
                  {userInitials || "U"}
                </button>
                {isUserMenuOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close account menu"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-12 z-50 w-52 rounded-[20px] border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#1D1D1D]">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-[#5F5F5B] hover:bg-[#F7F7F5] dark:text-[#B7B7B2] dark:hover:bg-white/[0.06]"
                      >
                        <PiUser aria-hidden="true" className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-sm text-[#C2185B] hover:bg-[#C2185B]/[0.06]"
                      >
                        <PiSignOut aria-hidden="true" className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <a
                  href="https://app.kairosng.com/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "kairos-header-signin inline-flex min-h-11 items-center rounded-full px-2 text-sm font-medium text-[#5F5F5B] transition-colors hover:text-[#171717] dark:text-[#B7B7B2] dark:hover:text-white",
                    focusRing,
                  )}
                >
                  Sign in
                </a>
                {primaryAction}
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            {user && (
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                aria-label="Open dashboard"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full bg-[#C2185B] text-sm font-semibold text-white",
                  focusRing,
                )}
              >
                {userInitials || "U"}
              </button>
            )}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="kairos-mobile-menu"
              className={cn(
                "kairos-header-menu-button inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#171717] dark:text-[#F5F5F2]",
                focusRing,
              )}
            >
              <span>Menu</span>
              {isMenuOpen ? (
                <PiX aria-hidden="true" className="h-5 w-5" />
              ) : (
                <PiList aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="kairos-mobile-menu"
          aria-modal="true"
          role="dialog"
          className="kairos-header-glass kairos-header-menu-glass mx-auto mt-2 max-w-[1440px] overflow-hidden rounded-[24px] lg:hidden"
        >
        <nav aria-label="Mobile navigation" className="p-4 sm:p-5">
          <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#777773] dark:text-[#999995]">
            Navigation
          </p>
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#171717] hover:bg-white dark:text-[#F5F5F2] dark:hover:bg-white/[0.06]",
                  focusRing,
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#171717] hover:bg-white dark:text-[#F5F5F2] dark:hover:bg-white/[0.06]",
                focusRing,
              )}
            >
              About
            </Link>
          </div>

          <div className="my-4 h-px bg-black/10 dark:bg-white/10" />
          <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#777773] dark:text-[#999995]">
            I am here to
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => chooseIntent("company")}
              aria-pressed={intent === "company"}
              className={cn(
                "min-h-11 rounded-full border text-sm font-semibold",
                intent === "company"
                  ? "border-[#171717] bg-[#171717] text-white dark:border-[#F5F5F2] dark:bg-[#F5F5F2] dark:text-[#171717]"
                  : "border-black/10 bg-white text-[#5F5F5B] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#B7B7B2]",
                focusRing,
              )}
            >
              Hire talent
            </button>
            <button
              type="button"
              onClick={() => chooseIntent("talent")}
              aria-pressed={intent === "talent"}
              className={cn(
                "min-h-11 rounded-full border text-sm font-semibold",
                intent === "talent"
                  ? "border-[#171717] bg-[#171717] text-white dark:border-[#F5F5F2] dark:bg-[#F5F5F2] dark:text-[#171717]"
                  : "border-black/10 bg-white text-[#5F5F5B] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#B7B7B2]",
                focusRing,
              )}
            >
              Find work
            </button>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {!user && (
              <a
                href="https://app.kairosng.com/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-[#171717] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F5F5F2]",
                  focusRing,
                )}
              >
                Sign in
              </a>
            )}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center rounded-full bg-[#C2185B] px-5 text-sm font-semibold text-white",
                    focusRing,
                  )}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center rounded-full border border-[#C2185B]/20 px-5 text-sm font-semibold text-[#C2185B]",
                    focusRing,
                  )}
                >
                  Log out
                </button>
              </>
            ) : (
              primaryAction
            )}
          </div>
        </nav>
        </div>
      )}
    </header>
  );
}
