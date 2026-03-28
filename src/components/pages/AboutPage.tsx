"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Eye,
  CheckCircle2,
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
    title: "Design with purpose",
    description: "Hierarchy and layout that match how people actually use the product.",
  },
  {
    icon: Gauge,
    title: "Performance as standard",
    description: "Fast loads and efficient UI — baseline, not a late add-on.",
  },
  {
    icon: Code2,
    title: "Production-grade code",
    description: "TypeScript, clear structure, patterns that survive the next feature.",
  },
  {
    icon: Smartphone,
    title: "Responsive everywhere",
    description: "Refined across breakpoints, not just “works on mobile.”",
  },
  {
    icon: Target,
    title: "Outcome-oriented",
    description: "Usability and reliability under real load — not demo polish only.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    description: "Readable, documented enough to hand off and extend without fear.",
  },
];

const expectations = [
  "Direct communication — no jargon walls",
  "Milestones you can plan around",
  "Tested layouts on real breakpoints",
  "Performance treated as a feature",
  "Clean handoff and sensible docs",
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
        title="Software studio, production mindset."
        description="We design and ship products — sites, apps, dashboards, ERP, and cloud — with the same care we’d want on our own stack."
      />

      {/* Intro */}
      <section className="bg-page-soft pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-base leading-relaxed text-[#64748B] lg:text-lg">
                Sites, apps, dashboards, ERP, APIs, and cloud — frontend through infrastructure, with
                design and engineering treated as one delivery.
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
      <section className="bg-page-white-soft py-20">
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
              <h2 className="text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
                Capability + follow-through.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="lg:col-span-3"
            >
              <ul className="space-y-3 text-base leading-relaxed text-[#64748B]">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366F1]" />
                  <span>Engineering across UI, APIs, data, deploy, and ops — not handoffs between silos.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366F1]" />
                  <span>Portfolio spans ERP, dashboards, marketing sites, and mobile-friendly products.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366F1]" />
                  <span>Stack: Next.js, React, TypeScript, Node, FastAPI, Python, Postgres, Mongo — chosen for reliability.</span>
                </li>
              </ul>

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
      <section className="bg-page-soft py-20">
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
            <h2 className="mb-3 text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
              Clear process. Production bar.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[#64748B]">
              Plan → build → ship with tight feedback. Pretty is table stakes; stable and useful is the goal.
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
                  className="rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:border-[#D4D4D4] hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366F1]/8">
                    <Icon size={20} className="text-[#6366F1]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748B]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Clients Can Expect */}
      <section className="bg-page-white-soft py-20">
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
              <h2 className="mb-3 text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
                What you can expect.
              </h2>
              <p className="text-base leading-relaxed text-[#64748B]">
                Quality without the theatre — we care how it behaves in production, not just in a demo.
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
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#6366F1]" strokeWidth={2} />
                    <span className="text-sm leading-snug text-[#475569]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why CodeAsters */}
      <section className="bg-page-soft py-20">
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
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
              For teams that need real execution.
            </h2>
            <p className="text-base leading-relaxed text-[#64748B]">
              From polished marketing sites to heavy ERP and cloud work — modern stack, clear architecture, outcomes over slides.
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
      <section className="bg-page-white-soft py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="mb-3 text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
              Have something in mind?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#64748B]">
              Brief us for scope &amp; timeline, or browse work first — your pace.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/10 transition-colors hover:bg-[#1a1a1a]"
                >
                  Start a project
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-7 py-3.5 text-sm font-medium text-[#0A0A0A] transition-all hover:border-[#6B7280]/40 hover:bg-[#FAFAFA]"
                >
                  View work
                </Link>
              </motion.div>
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent px-5 py-3.5 text-sm font-medium text-[#6366F1] hover:underline"
                >
                  Quick hello
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
