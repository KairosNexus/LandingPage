"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { IntentProvider, useIntent } from "@/components/providers/intent-provider";
import { ClientIntentModal } from "@/components/ui/client-intent-modal";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { BusinessInquiryProvider } from "@/components/providers/business-inquiry-provider";

import { usePathname } from "next/navigation";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { setIntent, showModal, setShowModal } = useIntent();
  const pathname = usePathname();
  
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--background)] transition-colors duration-300">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>

      {!isDashboard && <Footer />}

      <ScrollToTop />

      <ClientIntentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={setIntent}
      />

      {!isDashboard && <CookieConsent />}
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <IntentProvider>
      <BusinessInquiryProvider>
        <LayoutContent>{children}</LayoutContent>
      </BusinessInquiryProvider>
    </IntentProvider>
  );
}
