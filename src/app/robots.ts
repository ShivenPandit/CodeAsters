import type { MetadataRoute } from "next";
import { getSiteUrl, isPrimaryDomain } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const siteHost = new URL(siteUrl).host;
  const alternatePrimaryHost =
    siteHost === "codeasters.com"
      ? "www.codeasters.com"
      : siteHost === "www.codeasters.com"
        ? "codeasters.com"
        : null;
  const sitemapUrls = alternatePrimaryHost
    ? [`${siteUrl}/sitemap.xml`, `https://${alternatePrimaryHost}/sitemap.xml`]
    : [`${siteUrl}/sitemap.xml`];

  if (!isPrimaryDomain()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: sitemapUrls,
      host: siteHost,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
    sitemap: sitemapUrls,
    host: siteHost,
  };
}
