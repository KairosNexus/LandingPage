"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";

import { usePathname } from "next/navigation";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>

      {!isDashboard && <Footer />}

      <ScrollToTop />

      {!isDashboard && <CookieConsent />}
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <LayoutContent>{children}</LayoutContent>;
}
