import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import Hero from "@/components/home/Hero";
import ServicesPreview from "@/components/home/ServicesPreview";
import WorkPreview from "@/components/home/WorkPreview";
import ProcessPreview from "@/components/home/ProcessPreview";
import CTA from "@/components/home/CTA";
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
      <ServicesPreview />
      <WorkPreview />
      <ProcessPreview />
      <CTA />
    </>
  );
}
