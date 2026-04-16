import type { NextConfig } from "next";

const FALLBACK_CANONICAL_URL =
  process.env.NODE_ENV === "production"
    ? "https://codeasters.com"
    : "http://localhost:3000";

function isLocalHost(value: string) {
  return /^localhost(?::\d+)?$/i.test(value) || /^127\.0\.0\.1(?::\d+)?$/i.test(value);
}

function ensureProtocol(value: string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const hostPart = trimmed.split("/")[0] ?? "";
  return `${isLocalHost(hostPart) ? "http" : "https"}://${trimmed}`;
}

function normalizeSiteUrl(value?: string | null) {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    return new URL(ensureProtocol(trimmed)).origin;
  } catch {
    return null;
  }
}

function getCanonicalSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    FALLBACK_CANONICAL_URL,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeSiteUrl(candidate);
    if (normalized) return normalized;
  }

  return FALLBACK_CANONICAL_URL;
}

const canonicalSiteUrl = getCanonicalSiteUrl();
const canonicalHost = new URL(canonicalSiteUrl).host.toLowerCase();
const migrationHosts = ["codeasters.vercel.app", "www.codeasters.vercel.app"];
const productionTargetHosts = new Set(["codeasters.com", "www.codeasters.com"]);
const shouldRedirectFromVercelHost = productionTargetHosts.has(canonicalHost);
const alternatePrimaryHost =
  canonicalHost === "codeasters.com"
    ? "www.codeasters.com"
    : canonicalHost === "www.codeasters.com"
      ? "codeasters.com"
      : null;

const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://www.googletagmanager.com",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async redirects() {
    const redirects: Array<{
      source: string;
      has: Array<{ type: "host"; value: string }>;
      destination: string;
      permanent: boolean;
    }> = [];

    if (alternatePrimaryHost) {
      redirects.push({
        source: "/:path*",
        has: [
          {
            type: "host" as const,
            value: alternatePrimaryHost,
          },
        ],
        destination: `${canonicalSiteUrl}/:path*`,
        permanent: true,
      });
    }

    if (!shouldRedirectFromVercelHost) {
      return redirects;
    }

    return [
      ...redirects,
      ...migrationHosts.map((host) => ({
        source: "/:path*",
        has: [
          {
            type: "host" as const,
            value: host,
          },
        ],
        destination: `${canonicalSiteUrl}/:path*`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
