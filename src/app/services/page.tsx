import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import ServicesPage from "@/components/pages/ServicesPage";
import {
  buildServiceSchema,
  buildStandardBreadcrumb,
  buildWebPageSchema,
} from "@/lib/seo";

const servicesTitle = "Software Development Services";
const servicesDescription =
  "Explore CodeAsters services: web development, frontend and backend engineering, ERP systems, admin dashboards, mobile apps, and cloud deployment.";

export const metadata: Metadata = createSEOMetadata({
  title: servicesTitle,
  description: servicesDescription,
  path: "/services",
  keywords: [
    "software development services",
    "web development services",
    "ERP development services",
    "dashboard development",
    "backend API services",
    "mobile app services",
  ],
});

export default function Services() {
  return (
    <>
      <SEO
        idPrefix="services-schema"
        schema={[
          buildWebPageSchema({
            title: servicesTitle,
            description: servicesDescription,
            path: "/services",
          }),
          buildStandardBreadcrumb("Services", "/services"),
          buildServiceSchema({
            name: "CodeAsters Software Development Services",
            description: servicesDescription,
            path: "/services",
            serviceType: "Full-Stack Software Development",
          }),
        ]}
      />
      <ServicesPage />
    </>
  );
}
