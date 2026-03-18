"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Code2,
  Server,
  Layers,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Smartphone,
  Palette,
  Plug,
  Cloud,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

const services = [
  {
    icon: Globe,
    accent: "#6366F1",
    title: "Web Design & Development",
    summary:
      "Modern marketing websites, business websites, brand-led sites, landing pages, and content-driven platforms built for clarity, performance, and conversion. Every build is optimized for Core Web Vitals, structured for SEO, and designed to serve real business objectives.",
    includes: [
      "Custom responsive design and development",
      "SEO-ready architecture and metadata structure",
      "Performance-optimized production builds",
      "Content management integration where needed",
      "Analytics, tracking, and conversion optimization",
    ],
    ideal: "Businesses, startups, and organizations launching or upgrading their digital presence.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Code2,
    accent: "#3B82F6",
    title: "Frontend Engineering",
    summary:
      "High-quality responsive interfaces with strong focus on usability, interaction quality, and maintainable component architecture. We build frontends that are fast, accessible, and structured for long-term scalability — not just visual prototypes.",
    includes: [
      "Component-driven UI architecture",
      "State management and data flow patterns",
      "Animation and interaction design",
      "Accessibility compliance and testing",
      "Design system implementation",
    ],
    ideal: "Products that need production-grade frontend work beyond basic templates.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Server,
    accent: "#10B981",
    title: "Backend Development",
    summary:
      "Scalable backend systems covering APIs, authentication flows, business logic, admin operations, and data workflows. We architect backends that handle real-world complexity — from role-based access control to multi-module data pipelines and reporting engines.",
    includes: [
      "RESTful API design and implementation",
      "Authentication and authorization systems",
      "Database architecture and query optimization",
      "Business logic and workflow automation",
      "Caching, rate limiting, and security hardening",
    ],
    ideal: "Applications that need robust, secure, and well-structured server-side systems.",
    tags: ["Node.js", "FastAPI", "Python", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    icon: Layers,
    accent: "#8B5CF6",
    title: "Full-Stack Product Development",
    summary:
      "End-to-end product development across frontend, backend, database, integrations, deployment, and operational tooling. We take products from concept through architecture, development, testing, and production launch — handling the full technical scope.",
    includes: [
      "Architecture planning and technical scoping",
      "Frontend and backend development in parallel",
      "Database design and migration management",
      "Third-party service integrations",
      "Deployment pipeline and production launch",
    ],
    ideal: "Teams building new products or rebuilding existing platforms from the ground up.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    icon: LayoutDashboard,
    accent: "#F97316",
    title: "Admin Dashboards & Internal Tools",
    summary:
      "Custom dashboards, reporting systems, operational panels, workflow management interfaces, and role-based business tools. Built for teams that need structured visibility into their data, operations, and business processes — not generic off-the-shelf admin templates.",
    includes: [
      "Custom dashboard architecture and data visualization",
      "Role-based access control and permissions",
      "Real-time data synchronization and filtering",
      "Reporting modules with export capabilities",
      "Workflow management and operational panels",
    ],
    ideal: "Operations teams, internal stakeholders, and businesses managing complex data or workflows.",
    tags: ["React", "TypeScript", "REST APIs", "Charts", "Auth"],
  },
  {
    icon: Settings,
    accent: "#059669",
    title: "ERP & Business Management Systems",
    summary:
      "Complex internal systems for inventory, operations, finance, production tracking, reporting, and business process management. Our work on the Anthrilo Management System — a full ERP for textile manufacturing — demonstrates this capability across multi-module enterprise workflows.",
    includes: [
      "Multi-module platform architecture",
      "Inventory, production, and operations management",
      "Financial reporting and settlement systems",
      "Data pipelines, analytics, and business intelligence",
      "Scalable admin systems with role-based access",
    ],
    ideal: "Manufacturing, operations, and enterprise businesses that need structured internal platforms.",
    tags: ["FastAPI", "Python", "PostgreSQL", "React", "Redis"],
  },
  {
    icon: ShoppingCart,
    accent: "#EC4899",
    title: "E-commerce Solutions",
    summary:
      "Custom storefronts, catalog systems, checkout flows, order dashboards, inventory views, payment integrations, and performance-focused commerce experiences. We build e-commerce platforms that handle real transaction volume with clean UX and reliable backend operations.",
    includes: [
      "Custom storefront design and development",
      "Product catalog and inventory management",
      "Checkout flows and payment gateway integration",
      "Order management dashboards",
      "Performance optimization for commerce at scale",
    ],
    ideal: "Brands and businesses that need custom commerce experiences beyond standard platforms.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Payment APIs"],
  },
  {
    icon: Smartphone,
    accent: "#EF4444",
    title: "Mobile App Development",
    summary:
      "Cross-platform mobile applications for Android and iOS, aligned with backend systems and product workflows. We deliver mobile-ready product architecture that ensures consistent experiences across devices — from native apps to responsive progressive web applications.",
    includes: [
      "Cross-platform mobile application development",
      "Mobile-first responsive architecture",
      "Backend API integration for mobile clients",
      "Push notifications and offline capabilities",
      "App store deployment and release management",
    ],
    ideal: "Products that need mobile presence alongside their web platform.",
    tags: ["React Native", "TypeScript", "REST APIs", "Mobile UI"],
  },
  {
    icon: Palette,
    accent: "#A855F7",
    title: "UI/UX Design Systems",
    summary:
      "Interface structure, design systems, user flows, interaction patterns, wireframes, high-fidelity screens, and usability-focused design decisions. We design with implementation in mind — every component, spacing decision, and interaction pattern is production-ready.",
    includes: [
      "User research and journey mapping",
      "Wireframing and high-fidelity screen design",
      "Design system and component library creation",
      "Interactive prototyping and usability testing",
      "Developer-ready handoff with precise specifications",
    ],
    ideal: "Products that need a complete design foundation or a scalable system for ongoing development.",
    tags: ["Figma", "Design Systems", "Prototyping", "UI Architecture"],
  },
  {
    icon: Plug,
    accent: "#0EA5E9",
    title: "API Development & Integrations",
    summary:
      "REST APIs, third-party integrations, payment systems, CRM connectors, reporting pipelines, and business workflow automation. We build integration layers that connect your systems reliably — handling data transformation, error handling, and operational monitoring.",
    includes: [
      "Custom REST API design and development",
      "Payment gateway and financial integrations",
      "CRM and third-party service connectors",
      "Webhook handling and event-driven workflows",
      "API documentation and versioning",
    ],
    ideal: "Businesses connecting multiple systems or building API-first products.",
    tags: ["Node.js", "FastAPI", "REST APIs", "Webhooks"],
  },
  {
    icon: Cloud,
    accent: "#14B8A6",
    title: "Cloud, Deployment & Performance",
    summary:
      "VPS deployment, Nginx configuration, SSL setup, environment management, performance optimization, SEO-friendly architecture, and ongoing technical support. We handle the infrastructure side so your product runs reliably in production — with monitoring, backups, and continuous delivery.",
    includes: [
      "VPS deployment with Nginx and SSL configuration",
      "CI/CD pipeline setup and automation",
      "Performance auditing and Core Web Vitals optimization",
      "SEO technical architecture and indexing",
      "Ongoing maintenance, monitoring, and backups",
    ],
    ideal: "Products moving to production or existing applications that need infrastructure and performance work.",
    tags: ["VPS", "Docker", "Nginx", "CI/CD", "SEO"],
  },
];

const techCategories = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "FastAPI", "Python", "REST APIs"],
  },
  {
    label: "Data & Storage",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Infrastructure",
    items: ["VPS", "Docker", "Nginx", "CI/CD"],
  },
];

const buildTypes = [
  "Websites",
  "Web Applications",
  "Admin Dashboards",
  "ERP Systems",
  "E-commerce Platforms",
  "Backend Systems",
  "Cloud-Connected Platforms",
  "Mobile Applications",
];

export default function ServicesPage() {
  const canHover = useCanHover();

  return (
    <>
      <PageHeader
        label="Services"
        title="Modern software development across every layer."
        description="From websites and mobile apps to enterprise platforms and cloud infrastructure — we deliver production-ready digital products."
      />

      {/* Intro */}
      <section className="pb-16 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="grid lg:grid-cols-5 gap-12 lg:gap-16"
          >
            <div className="lg:col-span-2">
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
                What We Build
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
                Full-stack capability across web, mobile, backend, and&nbsp;cloud.
              </h2>
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p className="text-base text-[#4B5563] leading-relaxed mb-6">
                CodeAsters operates as a modern software development company — handling frontend engineering, backend architecture, database design, API integrations, cloud deployment, and product delivery. We work across the full technical stack to deliver systems that are production-ready, maintainable, and built for real business operations.
              </p>
              <div className="flex flex-wrap gap-2">
                {buildTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#374151] bg-white border border-[#E5E5E5] hover:border-[#6366F1]/20 transition-colors duration-200"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-24 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease }}
                  className="p-7 lg:p-8 rounded-xl border border-[#E5E5E5] bg-white hover:shadow-md hover:border-[#D4D4D4] transition-all duration-300 group"
                >
                  <div className="grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.accent}10` }}
                        >
                          <Icon size={18} style={{ color: service.accent }} />
                        </div>
                        <h3 className="text-xl font-semibold text-[#0A0A0A] tracking-tight pt-1.5">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#4B5563] leading-relaxed mb-5">
                        {service.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium text-[#6B7280] bg-[#F5F5F5] border border-[#E5E5E5]/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="mb-5">
                        <div className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-3">
                          What&apos;s Included
                        </div>
                        <ul className="space-y-2">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-[#4B5563]">
                              <Check size={14} className="mt-0.5 shrink-0" style={{ color: service.accent }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-xs text-[#6B7280]">
                        <span className="font-semibold text-[#374151]">Ideal for:</span>{" "}
                        {service.ideal}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
              How We Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-4">
              Modern stack. Production-grade&nbsp;tooling.
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
              Every project is built with technologies selected for performance, maintainability, and long-term reliability — not trends. We use what works at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ci * 0.08, ease }}
                className="p-6 rounded-xl border border-[#E5E5E5] bg-[#FAFAFB] hover:border-[#D4D4D4] transition-colors duration-300"
              >
                <div className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider mb-4">
                  {cat.label}
                </div>
                <div className="space-y-2.5">
                  {cat.items.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-[#374151] bg-white border border-[#E5E5E5] text-center"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight mb-3">
              Ready to scope your project?
            </h3>
            <p className="text-base text-[#4B5563] mb-6 max-w-lg mx-auto">
              Tell us what you&apos;re building. We&apos;ll respond with a clear technical scope, estimated timeline, and the right approach for your requirements.
            </p>
            <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-medium rounded-full text-sm transition-colors duration-300 shadow-md"
              >
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
