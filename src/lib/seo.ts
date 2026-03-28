import type { Metadata } from "next";

export const SITE_NAME = "CodeAsters";
export const SITE_EMAIL = "codeasters@gmail.com";
export const SITE_DESCRIPTION =
  "CodeAsters designs and builds production-grade websites, web applications, dashboards, ERP systems, mobile apps, and cloud-connected platforms.";
export const DEFAULT_OG_IMAGE_PATH = "/deepstudio-preview.png";

export const CORE_KEYWORDS = [
  "CodeAsters",
  "software development company",
  "full-stack development",
  "web development",
  "Next.js development",
  "React development",
  "ERP development",
  "dashboard development",
  "backend API development",
  "mobile app development",
  "cloud deployment",
  "SEO optimization",
];

const FALLBACK_LOCAL_URL = "http://localhost:3000";
const PRIMARY_HOSTS = new Set(["codeasters.com", "www.codeasters.com"]);

function ensureProtocol(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  const isLocal = /^localhost(?::\d+)?$/.test(url) || /^127\.0\.0\.1(?::\d+)?$/.test(url);
  return `${isLocal ? "http" : "https"}://${url}`;
}

function trimTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const fromPublicEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const fromVercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;

  const rawUrl = fromPublicEnv ?? fromVercel ?? FALLBACK_LOCAL_URL;
  return trimTrailingSlash(ensureProtocol(rawUrl));
}

export function getSiteHost() {
  return new URL(getSiteUrl()).host;
}

export function isPrimaryDomain() {
  return PRIMARY_HOSTS.has(getSiteHost());
}

export function absoluteUrl(path = "/") {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return new URL(safePath, getSiteUrl()).toString();
}

export function buildRobotsDirectives(noindex = false): Metadata["robots"] {
  const indexable = !noindex && isPrimaryDomain();

  if (!indexable) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        nosnippet: true,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export interface SEOInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImagePath?: string;
  noindex?: boolean;
  type?: "website" | "article";
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords,
  ogImagePath = DEFAULT_OG_IMAGE_PATH,
  noindex = false,
  type = "website",
}: SEOInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(ogImagePath);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      absolute: title,
    },
    description,
    keywords: keywords?.length ? keywords : CORE_KEYWORDS,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: buildRobotsDirectives(noindex),
  };
}

export type JsonLdNode = Record<string, unknown>;

export function buildOrganizationSchema(): JsonLdNode {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl,
    email: SITE_EMAIL,
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    sameAs: ["https://github.com/CodeAsters"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE_EMAIL,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function buildWebsiteSchema(): JsonLdNode {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };
}

interface WebPageSchemaInput {
  title: string;
  description: string;
  path: string;
}

export function buildWebPageSchema({
  title,
  description,
  path,
}: WebPageSchemaInput): JsonLdNode {
  const pageUrl = absoluteUrl(path);
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
    about: {
      "@id": `${siteUrl}#organization`,
    },
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  const listItems = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  };
}

export function buildStandardBreadcrumb(
  currentPageName: string,
  currentPagePath: string
): JsonLdNode {
  return buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: currentPageName, path: currentPagePath },
  ]);
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
}: ServiceSchemaInput): JsonLdNode {
  const siteUrl = getSiteUrl();
  const serviceUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name,
    description,
    serviceType,
    url: serviceUrl,
    areaServed: "Worldwide",
    provider: {
      "@id": `${siteUrl}#organization`,
    },
  };
}
