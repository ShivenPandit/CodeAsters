"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  TrendingUp,
  Eye,
  Layers,
  CheckCircle2,
  Monitor,
  Gauge,
  Code2,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

const principles = [
  {
    icon: Eye,
    title: "Design with Purpose",
    description:
      "Interfaces are built around real user needs — structured layouts, clear hierarchy, and deliberate visual decisions that support business goals.",
  },
  {
    icon: Gauge,
    title: "Performance as Standard",
    description:
      "Optimized builds, efficient rendering, and fast load times are baseline requirements — not afterthoughts.",
  },
  {
    icon: Code2,
    title: "Production-Grade Code",
    description:
      "TypeScript, scalable architecture, and maintainable component patterns — built for stability, not just demos.",
  },
  {
    icon: Smartphone,
    title: "Responsive Across Devices",
    description:
      "Every project functions consistently across mobile, tablet, and desktop — tested and refined at every breakpoint.",
  },
  {
    icon: Target,
    title: "Outcome-Oriented",
    description:
      "We focus on what actually drives results — usability, clarity, and systems that work reliably under real conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Reliability",
    description:
      "Code is written for the long run — clean, documented, and structured to support future growth and iteration.",
  },
];

const expectations = [
  "Thoughtful execution with attention to every detail",
  "Honest, direct communication throughout the project",
  "Organized delivery with clear milestones and timelines",
  "Responsive behavior tested across all devices",
  "Visual consistency maintained across every screen",
  "Performance optimization as a core deliverable",
  "Post-launch support and reliable handoff",
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "FastAPI",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "REST APIs",
  "VPS",
  "Docker",
  "Figma",
];

export default function AboutPage() {
  const canHover = useCanHover();

  return (
    <>
      <PageHeader
        label="About"
        title="A modern software development company built for serious work."
        description="CodeAsters designs and engineers production-ready digital products — from websites and mobile apps to enterprise platforms, cloud systems, and business software."
      />

      {/* Intro */}
      <section className="pb-20 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-base lg:text-lg text-[#4B5563] leading-relaxed">
                Our work spans websites, web applications, admin dashboards, ERP systems, backend
                services, mobile applications, and cloud-connected platforms. We operate across
                the full technical stack — frontend, backend, database, API, and infrastructure
                — with equal attention to design quality and engineering rigor.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "End-to-End", label: "Project Delivery" },
                { value: "Modern", label: "Technology Stack" },
                { value: "Production", label: "Grade Quality" },
                { value: "Global", label: "Client Reach" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease }}
                  className="p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#D4D4D4] transition-colors duration-300"
                >
                  <div className="text-lg font-semibold text-[#0A0A0A] mb-0.5">{stat.value}</div>
                  <div className="text-xs text-[#6B7280]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="lg:col-span-2"
            >
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
                Full-stack capability. Real&nbsp;execution.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-3"
            >
              <div className="space-y-4 text-sm lg:text-base text-[#4B5563] leading-relaxed">
                <p>
                  We handle frontend engineering, backend architecture, database design, API development,
                  cloud deployment, and product delivery. Our portfolio includes enterprise ERP systems,
                  custom admin dashboards, high-performance websites, and mobile-ready applications.
                </p>
                <p>
                  Every project is built with modern tooling across Next.js, React, TypeScript, Node.js,
                  FastAPI, Python, PostgreSQL, and MongoDB — chosen for production reliability, not trends.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {["Websites", "Web Apps", "Dashboards", "ERP Systems", "Backend Services", "Mobile Apps", "Cloud Platforms"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-[#374151] bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#6366F1]/20 transition-colors duration-200"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            className="mb-12"
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-4">
              Direct, structured, and&nbsp;production&#8209;ready.
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed max-w-2xl">
              From planning and interface design to development and launch, each stage is handled
              with clarity, feedback, and production-level attention to detail. The goal is not
              just to ship something good-looking, but to deliver something useful, stable, and
              ready to support growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                  className="p-6 rounded-xl border border-[#E5E5E5] bg-white hover:shadow-md hover:border-[#D4D4D4] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#6366F1]/8 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#6366F1]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Clients Can Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
                Client Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-4">
                What you can expect.
              </h2>
              <p className="text-sm lg:text-base text-[#4B5563] leading-relaxed">
                Clients can expect thoughtful execution, honest communication, organized delivery,
                and a strong focus on quality. We care about responsive behavior, visual consistency,
                performance, usability, and long-term maintainability — not just first impressions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <ul className="space-y-3.5">
                {expectations.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.04, ease }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="text-[#6366F1] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#4B5563] leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why CodeAsters */}
      <section className="py-20 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
              Why CodeAsters
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-5">
              Built for businesses that need serious technical execution.
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed">
              We deliver production-grade software — from premium websites and mobile apps
              to enterprise ERP systems and cloud infrastructure. Modern stack. Clean architecture.
              Real results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {stack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.03, ease }}
                className="px-4 py-3 rounded-xl text-center text-sm font-medium text-[#374151] bg-white border border-[#E5E5E5] hover:border-[#6366F1]/20 transition-colors duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-4">
              Have a project in mind?
            </h2>
            <p className="text-base text-[#4B5563] leading-relaxed mb-8">
              Let&apos;s start the conversation. Tell us what you&apos;re building and we&apos;ll
              outline how we can help — with a clear plan and timeline.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-medium rounded-full text-sm transition-colors duration-300 shadow-lg shadow-black/10"
                >
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E5E5E5] hover:border-[#6B7280]/40 hover:bg-[#FAFAFA] text-[#0A0A0A] font-medium rounded-full text-sm transition-all duration-300"
                >
                  View Our Work
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
