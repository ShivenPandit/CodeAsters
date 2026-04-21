import type { Metadata } from "next";
import SEO, { createSEOMetadata } from "@/components/SEO";
import ServicesPage from "@/components/pages/ServicesPage";
import {
  buildFAQSchema,
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

const serviceFAQs = [
  {
    question: "What tech stack does CodeAsters use?",
    answer:
      "We build with Next.js, React, TypeScript, and Tailwind CSS on the frontend; Node.js, FastAPI, and Python on the backend; and PostgreSQL, MongoDB, and Redis for data. Infrastructure runs on VPS with Docker, Nginx, and CI/CD pipelines.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope. A marketing website typically takes 2–4 weeks. Full-stack web applications range from 4–10 weeks. ERP and enterprise systems can take 8–16 weeks or more, depending on the number of modules.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "We work with both. From early-stage startups building their first product to established businesses upgrading legacy systems or launching new platforms.",
  },
  {
    question: "What does your development process look like?",
    answer:
      "Every project follows four stages: Discover (requirements and goals), Design (wireframes and UI), Develop (production code with iterative check-ins), and Deliver (deployment, QA, and post-launch support).",
  },
  {
    question: "Can you work on an existing codebase?",
    answer:
      "Yes. We regularly join existing projects for feature development, performance optimization, bug fixes, and codebase modernization.",
  },
];

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
          buildFAQSchema(serviceFAQs),
        ]}
      />
      <ServicesPage />
    </>
  );
}
