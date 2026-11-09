import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ClientLayout } from "@/components/layout/client-layout";
import Script from "next/script";
import "./globals.css";

const shareImage = {
  url: "https://www.kairosng.com/kairos-share.png",
  width: 1200,
  height: 630,
  alt: "Kairos Nexus Global logo",
};

export const metadata: Metadata = {
  title: "Kairos Nexus Global | Skilled African Talent, Starting in Nigeria",
  description: "Kairos connects companies with skilled African professionals through human-led matching, starting in Nigeria, with potential savings of up to 70% compared with equivalent U.S. hiring costs.",
  openGraph: {
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage],
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
