import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import WorkPage from "@/components/pages/WorkPage";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const workTitle = "Work Portfolio & Case Studies";
const workDescription =
  "See selected CodeAsters projects across websites, e-commerce, dashboards, and enterprise ERP systems.";

export const metadata: Metadata = createSEOMetadata({
  title: workTitle,
  description: workDescription,
  path: "/work",
  keywords: [
    "software portfolio",
    "web development case studies",
    "ERP case study",
    "dashboard projects",
    "CodeAsters work",
  ],
});

export default function Work() {
  return (
    <>
      <SEO
        idPrefix="work-schema"
        schema={[
          buildWebPageSchema({
            title: workTitle,
            description: workDescription,
            path: "/work",
          }),
          buildStandardBreadcrumb("Work", "/work"),
        ]}
      />
      <WorkPage />
    </>
  );
}
