import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import StartProjectPage from "@/components/pages/StartProjectPage";
import {
  buildServiceSchema,
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const startTitle = "Start a Software Project";
const startDescription =
  "Send your project brief to CodeAsters with scope, budget, and timeline. Get a clear execution plan and next steps.";

export const metadata: Metadata = createSEOMetadata({
  title: startTitle,
  description: startDescription,
  path: "/start",
  keywords: [
    "start software project",
    "project brief",
    "hire software team",
    "web app development inquiry",
    "CodeAsters start project",
  ],
});

export default function Start() {
  return (
    <>
      <SEO
        idPrefix="start-schema"
        schema={[
          buildWebPageSchema({
            title: startTitle,
            description: startDescription,
            path: "/start",
          }),
          buildStandardBreadcrumb("Start a Project", "/start"),
          buildServiceSchema({
            name: "Project Discovery and Software Delivery",
            description: startDescription,
            path: "/start",
            serviceType: "Software Project Consultation",
          }),
        ]}
      />
      <StartProjectPage />
    </>
  );
}
