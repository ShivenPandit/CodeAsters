"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
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
      "Marketing sites and landing pages built for clarity, Core Web Vitals, SEO, and real conversion goals.",
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
      "Fast, accessible UIs with solid components, motion where it helps, and architecture that scales past the first release.",
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
      "APIs, auth, business logic, and data workflows — structured for security, performance, and real operational load.",
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
      "End-to-end builds: UI, server, database, integrations, deploy, and handoff — one accountable technical path to launch.",
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
      "Dashboards, reporting, and internal tools with roles, filters, and workflows — tailored to how your team actually works.",
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
      "Multi-module ERP-style systems: inventory, ops, finance, production, and reporting — built for serious day-to-day use.",
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
      "Storefronts, catalog, checkout, orders, and payments — UX customers feel and backends that hold up under volume.",
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
      "Cross-platform apps aligned with your APIs and product — consistent experience on phones and tablets.",
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
      "Flows, wireframes, UI systems, and handoff that developers can implement without guesswork.",
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
      "REST APIs and integrations — payments, CRMs, webhooks, and pipelines with sane error handling and observability.",
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
      "Deploy, SSL, Nginx, CI/CD, performance passes, and SEO-friendly foundations — so production stays boring in a good way.",
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
  {
    icon: Bot,
    accent: "#06B6D4",
    title: "Automation & Workflow Systems",
    summary:
      "Rules, triggers, and notifications across your tools — less manual work, clearer handoffs, fewer mistakes.",
    includes: [
      "Custom workflow and rules engine implementation",
      "Trigger-based task automation across systems",
      "Email, Slack, and webhook notification workflows",
      "Approval routing and escalation logic",
      "Monitoring, logging, and failure recovery handling",
    ],
    ideal: "Teams that want to replace repetitive manual work with reliable, measurable automation.",
    tags: ["Automation", "Webhooks", "APIs", "Node.js", "FastAPI"],
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
  "Automation Workflows",
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
        title="Build across the full stack."
        description="Websites, products, dashboards, ERP, mobile, and cloud — shipped with modern tooling and production discipline."
      />

      {/* Intro */}
      <section className="bg-page-soft section-space-bottom-compact">
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
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] leading-[1.15] text-[#0A0A0A]">
                One team for design, engineering, data, and&nbsp;ops.
              </h2>
            </div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <p className="text-base text-[#4B5563] leading-relaxed mb-6">
                Frontend, backend, databases, APIs, and infrastructure — we ship systems you can run in production, not slide decks.
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
      <section className="bg-page-soft section-space-bottom">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-8 lg:space-y-10">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease }}
                  className="rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:border-[#D4D4D4] hover:shadow-md lg:p-8"
                >
                  <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
                    <div className="lg:col-span-3">
                      <div className="mb-4 flex items-start gap-4">
                        <div
                          className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${service.accent}12` }}
                        >
                          <Icon size={20} style={{ color: service.accent }} strokeWidth={1.75} />
                        </div>
                        <h3 className="pt-1 text-xl font-semibold tracking-tight text-[#0A0A0A]">
                          {service.title}
                        </h3>
                      </div>
                      <p className="mb-5 max-w-prose text-[15px] leading-relaxed text-[#64748B]">
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
                      <div className="mb-4 rounded-xl bg-[#FAFAFA] p-4 ring-1 ring-[#E5E5E5]/80">
                        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#0A0A0A]">
                          Included
                        </div>
                        <ul className="space-y-2">
                          {service.includes.map((item) => (
                            <li key={item} className="flex gap-2.5 text-sm leading-snug text-[#475569]">
                              <Check size={15} className="mt-0.5 shrink-0" style={{ color: service.accent }} strokeWidth={2.25} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-xs leading-relaxed text-[#64748B]">
                        <span className="font-semibold text-[#334155]">Best for:</span> {service.ideal}
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
      <section className="bg-page-white-soft section-space">
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
            <h2 className="mb-3 text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
              Stack we trust in production.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#64748B]">
              Picked for speed, maintainability, and real-world reliability — not hype cycles.
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
      <section className="bg-page-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            className="text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-[#0A0A0A]">
              Ready when you are.
            </h3>
            <p className="mx-auto mb-8 max-w-md text-base text-[#64748B]">
              Send a project brief for scope &amp; timeline, or a short note if you&apos;re still exploring.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-3.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#1a1a1a]"
                >
                  Start a project
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-7 py-3.5 text-sm font-medium text-[#0A0A0A] transition-colors hover:border-[#CBD5E1] hover:bg-white"
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
