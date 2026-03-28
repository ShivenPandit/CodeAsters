import type { NextConfig } from "next";

const FALLBACK_CANONICAL_URL = "http://localhost:3000";

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

const nextConfig: NextConfig = {
  async redirects() {
    if (!shouldRedirectFromVercelHost) {
      return [];
    }

    return migrationHosts.map((host) => ({
      source: "/:path*",
      has: [
        {
          type: "host",
          value: host,
        },
      ],
      destination: `${canonicalSiteUrl}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
