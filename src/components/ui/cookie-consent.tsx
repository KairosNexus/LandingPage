"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  CheckCircle,
  Cookie,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import { getStorageItem, setStorageItem } from "@/lib/storage";

type CookiePreferences = {
  analytics: boolean;
  marketing: boolean;
};

const essentialPreferences: CookiePreferences = {
  analytics: false,
  marketing: false,
};

const allPreferences: CookiePreferences = {
  analytics: true,
  marketing: true,
};

function readStoredPreferences(): CookiePreferences | null {
  const saved = getStorageItem("cookieConsent");

  if (!saved) return null;
  if (saved === "all") return allPreferences;
  if (saved === "essential") return essentialPreferences;

  try {
    const parsed = JSON.parse(saved) as Partial<CookiePreferences>;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [decision, setDecision] = useState<CookiePreferences | null | undefined>(undefined);
  const [showManage, setShowManage] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftMarketing, setDraftMarketing] = useState(false);

  const storedPreferences = mounted ? readStoredPreferences() : undefined;
  const preferences = decision === undefined ? storedPreferences : decision;
  const showConsent = mounted && preferences === null;

  const savePreferences = (nextPreferences: CookiePreferences) => {
    setStorageItem("cookieConsent", JSON.stringify(nextPreferences));
    setDecision(nextPreferences);
    setShowManage(false);
  };

  const openPreferences = () => {
    setDraftAnalytics(preferences?.analytics ?? false);
    setDraftMarketing(preferences?.marketing ?? false);
    setShowManage(true);
  };

  return (
    <>
      {preferences?.analytics && (
        <>
          <Script
            async
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-HWKDMPSTMK"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HWKDMPSTMK');
            `}
          </Script>
        </>
      )}

      {showConsent && !showManage && (
        <aside
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[820px] rounded-[24px] border border-black/10 bg-white/95 p-4 shadow-[0_22px_70px_rgba(55,18,34,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1d1d1d]/95 sm:inset-x-5 sm:bottom-5 sm:p-5"
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C2185B]/10 text-[#C2185B]">
                <Cookie size={21} weight="regular" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-semibold tracking-[-0.02em]">Your privacy, your choice</h2>
                <p className="mt-1 max-w-lg text-sm leading-6 text-[#666662] dark:text-[#b7b7b2]">
                  We use optional analytics to understand what works. Essential cookies keep Kairos running. Read our{" "}
                  <Link href="/privacy-policy" className="font-semibold text-[#C2185B] underline-offset-4 hover:underline">privacy policy</Link>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold transition-colors hover:border-[#C2185B] hover:text-[#C2185B] dark:border-white/15"
              >
                <SlidersHorizontal size={17} aria-hidden="true" />
                Preferences
              </button>
              <button
                type="button"
                onClick={() => savePreferences(essentialPreferences)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-semibold transition-colors hover:border-[#C2185B] hover:text-[#C2185B] dark:border-white/15"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => savePreferences(allPreferences)}
                className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-full bg-[#C2185B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#A3154D]"
              >
                Allow all
              </button>
            </div>
          </div>
        </aside>
      )}

      {showConsent && showManage && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#171717]/45 p-3 backdrop-blur-sm sm:items-center sm:p-5">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_28px_90px_rgba(23,23,23,0.24)] dark:border-white/10 dark:bg-[#1d1d1d]"
          >
            <header className="flex items-start justify-between border-b border-black/10 p-6 dark:border-white/10">
              <div>
                <p className="text-sm font-semibold text-[#C2185B]">Privacy controls</p>
                <h2 id="cookie-preferences-title" className="mt-1 text-2xl font-medium tracking-[-0.035em]">Choose what Kairos can use</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowManage(false)}
                className="icon-button shrink-0"
                aria-label="Close cookie preferences"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div className="space-y-3 p-6">
              <div className="flex items-start justify-between gap-5 rounded-[20px] bg-[#f7f7f5] p-4 dark:bg-white/5">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <CheckCircle size={19} className="text-[#C2185B]" aria-hidden="true" />
                    Essential
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#666662] dark:text-[#b7b7b2]">Required for security, forms, and saved preferences.</p>
                </div>
                <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#666662] dark:text-[#b7b7b2]">Always on</span>
              </div>

              <PreferenceRow
                title="Analytics"
                description="Helps us understand visits and improve the experience."
                enabled={draftAnalytics}
                onChange={() => setDraftAnalytics((enabled) => !enabled)}
              />
              <PreferenceRow
                title="Marketing"
                description="Allows more relevant campaign measurement and messaging."
                enabled={draftMarketing}
                onChange={() => setDraftMarketing((enabled) => !enabled)}
              />
            </div>

            <footer className="grid grid-cols-2 gap-2 border-t border-black/10 p-6 dark:border-white/10">
              <button type="button" onClick={() => savePreferences(essentialPreferences)} className="button-secondary">
                Essential only
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ analytics: draftAnalytics, marketing: draftMarketing })}
                className="button-primary"
              >
                Save choices
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

function PreferenceRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-5 rounded-[20px] bg-[#f7f7f5] p-4 dark:bg-white/5">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#666662] dark:text-[#b7b7b2]">{description}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-checked={enabled}
        aria-label={`${title} cookies`}
        className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors ${enabled ? "bg-[#C2185B]" : "bg-black/15 dark:bg-white/20"}`}
      >
        <span className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}
