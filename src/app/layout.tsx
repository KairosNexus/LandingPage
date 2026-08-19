import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ClientLayout } from "@/components/layout/client-layout";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairos Nexus Global | Global Talent, Matched with Care",
  description: "Kairos connects businesses with vetted global professionals through a hands-on matching process built around each scope of work.",
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
      <body
        className="flex min-h-full flex-col"
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
