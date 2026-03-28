import type { NextConfig } from "next";

function getCanonicalSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const isLocalHost =
    /^localhost(?::\d+)?$/.test(rawUrl) ||
    /^127\.0\.0\.1(?::\d+)?$/.test(rawUrl);
  const withProtocol = /^https?:\/\//i.test(rawUrl)
    ? rawUrl
    : `${isLocalHost ? "http" : "https"}://${rawUrl}`;
  return withProtocol.replace(/\/$/, "");
}

const canonicalSiteUrl = getCanonicalSiteUrl();
const canonicalHost = new URL(canonicalSiteUrl).host;
const migrationHosts = ["codeasters.vercel.app", "www.codeasters.vercel.app"];
const shouldRedirectFromVercelHost = !migrationHosts.includes(canonicalHost);

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
