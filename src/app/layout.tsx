import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const gtmContainerId = "GTM-M9R7GNGL";

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
  category: "technology",
  classification: "Software Development Agency",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: absoluteUrl("/manifest.webmanifest"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  title: {
    default: "CodeAsters | Full-Stack Software Development Agency",
    template: "%s | CodeAsters",
  },
  description: SITE_DESCRIPTION,
  keywords: CORE_KEYWORDS,
  verification: metadataVerification,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "en-US": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
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
  const gtmBootstrapScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmContainerId}');
`;

  const gaConfigScript = gaMeasurementId
    ? `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
`
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFB] text-[#0A0A0A]`}
      >
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {gtmBootstrapScript}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {gaConfigScript}
            </Script>
          </>
        ) : null}
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
