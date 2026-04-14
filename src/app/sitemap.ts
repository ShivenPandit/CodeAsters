import type { MetadataRoute } from "next";
import { absoluteUrl, BRAND_IMAGE_PATH, DEFAULT_OG_IMAGE_PATH } from "@/lib/seo";

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  imagePaths?: string[];
};

const routes: SitemapEntry[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    imagePaths: [DEFAULT_OG_IMAGE_PATH, BRAND_IMAGE_PATH],
  },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/start", changeFrequency: "weekly", priority: 0.9 },
  { path: "/be-a-codeaster", changeFrequency: "weekly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => {
    const url = absoluteUrl(route.path);

    return {
      url,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      images: route.imagePaths?.map((path) => absoluteUrl(path)),
      alternates: {
        languages: {
          "en-US": url,
          "x-default": url,
        },
      },
    };
  });
}
