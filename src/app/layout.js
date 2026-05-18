import { Outfit } from "next/font/google";

import Header from "@/components/Header";
import SkipToContent from "@/components/SkipToContent";
import StructuredData from "@/components/seo/StructuredData";
import { AppProviders } from "@/components/providers/app-providers";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-Enabled Full Stack Developer`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Portfolio of Manish Kumar — AI-enabled full stack developer building React, Next.js, WordPress, Shopify, and modern web experiences.",
  applicationName: SITE_NAME,
  authors: [{ name: "Manish Kumar", url: SITE_URL }],
  creator: "Manish Kumar",
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071d1d",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>
        <StructuredData />
        <SkipToContent />
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
