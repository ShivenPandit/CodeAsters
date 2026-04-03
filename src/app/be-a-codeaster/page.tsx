import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import BeACodeAsterPage from "@/components/affiliate/BeACodeAsterPage";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const pageTitle = "Be a CodeAster — Affiliate Program";
const pageDescription =
  "Join CodeAsters as an open affiliate. Earn up to 30% commission by referring project leads — no tech experience required.";

export const metadata: Metadata = createSEOMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/be-a-codeaster",
  keywords: [
    "CodeAsters affiliate",
    "earn commission",
    "referral program",
    "software development affiliate",
    "be a CodeAster",
  ],
});

export default function BeACodeAster() {
  return (
    <>
      <SEO
        idPrefix="affiliate-schema"
        schema={[
          buildWebPageSchema({
            title: pageTitle,
            description: pageDescription,
            path: "/be-a-codeaster",
          }),
          buildStandardBreadcrumb("Be a CodeAster", "/be-a-codeaster"),
        ]}
      />
      <BeACodeAsterPage />
    </>
  );
}
