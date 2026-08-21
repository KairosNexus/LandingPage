import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ClientLayout } from "@/components/layout/client-layout";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairos Nexus Global | Vetted Global Talent, Matched to Your Needs",
  description: "Kairos manually matches founders, businesses, organizations, and individuals with vetted global talent while our self-service platform is being built.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HWKDMPSTMK"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-HWKDMPSTMK');
        `}
      </Script>
      <body 
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
