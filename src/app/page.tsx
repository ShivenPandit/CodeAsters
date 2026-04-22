import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import Hero from "@/components/home/Hero";
import HomePageSections from "@/sections/home/HomePageSections";
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/seo";

const homeTitle = "CodeAsters | Full-Stack Software Development Agency";
const homeDescription =
  "CodeAsters builds high-performance websites, full-stack products, dashboards, ERP systems, and cloud-ready platforms.";

export const metadata: Metadata = createSEOMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  keywords: [
    "CodeAsters",
    "software development agency",
    "full-stack development",
    "Next.js agency",
    "ERP development",
  ],
});

export default function Home() {
  return (
    <>
      <SEO
        idPrefix="home-schema"
        schema={[
          buildWebPageSchema({
            title: homeTitle,
            description: homeDescription,
            path: "/",
          }),
          buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <Hero />
      <HomePageSections />
    </>
  );
}
