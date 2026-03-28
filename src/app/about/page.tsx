import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import AboutPage from "@/components/pages/AboutPage";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const aboutTitle = "About CodeAsters";
const aboutDescription =
  "Meet CodeAsters, a production-focused software studio building websites, apps, dashboards, ERP systems, and cloud-ready products.";

export const metadata: Metadata = createSEOMetadata({
  title: aboutTitle,
  description: aboutDescription,
  path: "/about",
  keywords: [
    "about CodeAsters",
    "software studio",
    "product engineering team",
    "full-stack agency",
  ],
});

export default function About() {
  return (
    <>
      <SEO
        idPrefix="about-schema"
        schema={[
          buildWebPageSchema({
            title: aboutTitle,
            description: aboutDescription,
            path: "/about",
          }),
          buildStandardBreadcrumb("About", "/about"),
        ]}
      />
      <AboutPage />
    </>
  );
}
