import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SiteBackdrop from "@/components/SiteBackdrop";
import PagePattern from "@/components/PagePattern";
import SEO from "@/components/SEO";
import {
  CORE_KEYWORDS,
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_DESCRIPTION,
  absoluteUrl,
  buildOrganizationSchema,
  buildRobotsDirectives,
  buildWebsiteSchema,
  getSiteUrl,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleVerificationToken = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingVerificationToken = process.env.BING_SITE_VERIFICATION?.trim();

const metadataVerification: Metadata["verification"] = {
  google: googleVerificationToken || undefined,
  other: bingVerificationToken
    ? { "msvalidate.01": bingVerificationToken }
    : undefined,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  title: {
    default: "CodeAsters | Full-Stack Software Development Agency",
    template: "%s | CodeAsters",
  },
  description: SITE_DESCRIPTION,
  keywords: CORE_KEYWORDS,
  verification: metadataVerification,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    title: "CodeAsters | Full-Stack Software Development Agency",
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: "CodeAsters preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeAsters | Full-Stack Software Development Agency",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
  robots: buildRobotsDirectives(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFB] text-[#0A0A0A]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0A0A0A] focus:shadow"
        >
          Skip to main content
        </a>
        <SEO
          schema={[buildOrganizationSchema(), buildWebsiteSchema()]}
          idPrefix="global-schema"
        />
        <SiteBackdrop />
        <div className="noise-overlay" />
        <CustomCursor />
        <header>
          <Navbar />
        </header>
        <div className="page-shell relative z-10 isolate">
          <PagePattern />
          <main id="main-content" className="relative z-[1]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
