import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import ContactPage from "@/components/pages/ContactPage";
import {
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const contactTitle = "Contact CodeAsters";
const contactDescription =
  "Get in touch with CodeAsters for software development, product builds, and technical consulting. We usually reply within a day.";

export const metadata: Metadata = createSEOMetadata({
  title: contactTitle,
  description: contactDescription,
  path: "/contact",
  keywords: [
    "contact CodeAsters",
    "software development consultation",
    "project inquiry",
    "web development agency contact",
  ],
});

export default function Contact() {
  return (
    <>
      <SEO
        idPrefix="contact-schema"
        schema={[
          buildWebPageSchema({
            title: contactTitle,
            description: contactDescription,
            path: "/contact",
          }),
          buildStandardBreadcrumb("Contact", "/contact"),
        ]}
      />
      <ContactPage />
    </>
  );
}
