import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import WorkPage from "@/components/pages/WorkPage";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const portfolioTitle = "Portfolio & Case Studies";
const portfolioDescription =
  "Selected CodeAsters work across AI systems, business platforms, and production-grade software.";

export const metadata: Metadata = createSEOMetadata({
  title: portfolioTitle,
  description: portfolioDescription,
  path: "/portfolio",
  keywords: [
    "portfolio",
    "case studies",
    "AI systems",
    "software projects",
  ],
});

export default function Portfolio() {
  return (
    <>
      <SEO
        idPrefix="portfolio-schema"
        schema={[
          buildWebPageSchema({
            title: portfolioTitle,
            description: portfolioDescription,
            path: "/portfolio",
          }),
          buildStandardBreadcrumb("Portfolio", "/portfolio"),
        ]}
      />
      <WorkPage
        header={{
          label: "Portfolio",
          title: "Production-ready systems, shipped.",
          description:
            "From AI-enabled platforms to enterprise workflows, delivered with a focus on reliability and polish.",
        }}
      />
    </>
  );
}
