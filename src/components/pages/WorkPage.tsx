"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Database,
  Palette,
  Zap,
  Monitor,
  Layout,
  BarChart3,
  Shield,
  Server,
  ExternalLink,
  Package,
  Factory,
  TrendingUp,
  Settings,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const ease = [0.25, 0.1, 0.25, 1] as const;

const iconMap = { Palette, Zap, Monitor, Layout, Database, BarChart3, Shield, Server, Package, Factory, TrendingUp, Settings } as const;

/* ---------- Mockup Components ---------- */

function DeepStudioMockup() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white shadow-md shadow-black/[0.04] overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
        </div>
        <div className="flex-1 ml-4">
          <div className="h-5 rounded-md bg-white border border-[#E5E5E5] max-w-[200px] mx-auto flex items-center justify-center">
            <span className="text-[9px] text-[#9CA3AF] font-mono">deep-studio.in</span>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="rounded-lg bg-[#0A0A0A] p-5 space-y-2.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-3 w-3 rounded bg-[#6366F1]" />
            <div className="h-2.5 w-16 rounded bg-white/15" />
          </div>
          <div className="h-5 w-4/5 rounded bg-white/20" />
          <div className="h-5 w-3/5 rounded bg-white/20" />
          <div className="h-3 w-full rounded bg-white/8 mt-1.5" />
          <div className="h-3 w-4/5 rounded bg-white/8" />
          <div className="flex gap-2.5 mt-3">
            <div className="h-7 w-24 rounded-full bg-[#6366F1]" />
            <div className="h-7 w-20 rounded-full bg-white/10 border border-white/15" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { color: "rgba(99,102,241,0.1)" },
            { color: "rgba(249,115,22,0.1)" },
            { color: "rgba(16,185,129,0.1)" },
          ].map((item, i) => (
            <div key={i} className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-3 space-y-2">
              <div className="w-6 h-6 rounded-md" style={{ backgroundColor: item.color }} />
              <div className="h-2.5 w-full rounded bg-[#E5E5E5]" />
              <div className="h-2 w-3/4 rounded bg-[#F0F0F0]" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div className="h-4 w-7 rounded bg-[#6366F1]/10 mb-0.5" />
                <div className="h-2 w-10 rounded bg-[#F0F0F0]" />
              </div>
            ))}
          </div>
          <div className="h-6 w-14 rounded-full bg-[#0A0A0A]" />
        </div>
      </div>
    </div>
  );
}

function AnthriloMockup() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white shadow-md shadow-black/[0.04] overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
        </div>
        <div className="flex-1 ml-4">
          <div className="h-5 rounded-md bg-white border border-[#E5E5E5] max-w-[200px] mx-auto flex items-center justify-center">
            <span className="text-[9px] text-[#9CA3AF] font-mono">anthrilo / management</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex gap-3">
        <div className="w-14 space-y-2.5 shrink-0 border-r border-[#F0F0F0] pr-3">
          <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 mx-auto flex items-center justify-center">
            <div className="w-4 h-4 rounded bg-[#F97316]/25" />
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-md mx-auto ${i === 0 ? "bg-[#F97316]/12" : "bg-[#F5F5F5]"}`}
            />
          ))}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-28 rounded bg-[#0A0A0A]/8" />
            <div className="flex gap-1.5">
              <div className="w-6 h-6 rounded-md bg-[#F5F5F5]" />
              <div className="w-6 h-6 rounded-md bg-[#F5F5F5]" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { color: "#F97316" },
              { color: "#10B981" },
              { color: "#6366F1" },
              { color: "#EF4444" },
            ].map((s, i) => (
              <div key={i} className="rounded-lg border border-[#F0F0F0] p-2.5">
                <div className="h-2 w-10 rounded bg-[#E5E5E5] mb-1.5" />
                <div className="h-4 w-12 rounded" style={{ backgroundColor: `${s.color}15` }} />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-[#F0F0F0]">
            <div className="px-3 py-2 border-b border-[#F0F0F0] bg-[#FAFAFA] flex gap-4">
              <div className="h-2 w-20 rounded bg-[#D4D4D4]" />
              <div className="h-2 w-14 rounded bg-[#D4D4D4]" />
              <div className="h-2 w-16 rounded bg-[#D4D4D4]" />
              <div className="h-2 w-12 rounded bg-[#D4D4D4]" />
              <div className="h-2 w-10 rounded bg-[#D4D4D4]" />
            </div>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="px-3 py-2 flex gap-4 border-b border-[#F0F0F0] last:border-0">
                <div className="h-2 w-20 rounded bg-[#F5F5F5]" />
                <div className="h-2 w-14 rounded bg-[#F5F5F5]" />
                <div className="h-2 w-16 rounded bg-[#F5F5F5]" />
                <div className="h-2 w-12 rounded bg-[#F5F5F5]" />
                <div
                  className="h-4 w-10 rounded-full"
                  style={{
                    backgroundColor:
                      i % 3 === 0 ? "rgba(16,185,129,0.12)" : i % 3 === 1 ? "rgba(249,115,22,0.12)" : "rgba(99,102,241,0.12)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Data ---------- */

const projects = [
  {
    id: "anthrilo",
    name: "Anthrilo Management System",
    category: "Enterprise ERP / Business Platform",
    categoryIcon: Database,
    color: "#F97316",
    url: null,
    summary:
      "An enterprise-grade ERP system built for textile manufacturing and garment production management. The platform centralizes raw material tracking, production workflows, garment inventory, sales operations, and financial reporting into a unified, multi-module system — replacing fragmented spreadsheets and manual processes with structured, database-backed operations.",
    problem:
      "Anthrilo needed a centralized platform to manage the full lifecycle of textile manufacturing — from raw yarn procurement through knitting, dyeing, and finishing processes, to garment production, inventory management, multi-panel sales tracking, and financial settlements. Manual workflows were causing data inconsistency, production delays, and limited visibility into operational performance.",
    modules: [
      {
        icon: "Package" as const,
        title: "Raw Material & Processing",
        details: "Yarn management with composition tracking, process management for knitting, dyeing, finishing, and printing operations, fabric management with GSM tracking across jersey, terry, and fleece types. Includes fabric stock sheets, order sheets, and cost sheet reporting.",
      },
      {
        icon: "Factory" as const,
        title: "Garment & Sales Operations",
        details: "Garment master data with SKU, size, MRP, and category management. Good and virtual stock inventory, daily sales and returns tracking across panels, production planning and tracking workflows. Reports for slow/fast moving items, panel-wise performance, and production plans.",
      },
      {
        icon: "TrendingUp" as const,
        title: "Financial & Marketing Intelligence",
        details: "Discount and rebate management, paid ads tracking with ROI analysis, settlement report generation, and listing performance metrics. Provides structured visibility into marketing spend effectiveness and financial operations.",
      },
    ],
    scope: [
      "Full-stack architecture with Next.js frontend and FastAPI backend",
      "PostgreSQL database with Redis caching layer",
      "Multi-module ERP covering raw materials, production, sales, and finance",
      "Role-based access control and admin management system",
      "Database-backed reporting with structured data pipelines",
      "Modular business workflows designed for scalability",
    ],
    highlights: [
      { icon: "Database" as const, label: "Enterprise Data" },
      { icon: "BarChart3" as const, label: "Business Intelligence" },
      { icon: "Shield" as const, label: "Role-Based Access" },
      { icon: "Server" as const, label: "Production Architecture" },
    ],
    stack: ["Next.js", "TypeScript", "React", "FastAPI", "Python", "PostgreSQL", "Redis"],
    Mockup: AnthriloMockup,
  },
  {
    id: "deepstudio",
    name: "DeepStudio",
    category: "Website Design & Development",
    categoryIcon: Globe,
    color: "#6366F1",
    url: "https://deep-studio.vercel.app/",
    summary:
      "A premium studio website built to reflect a high-end creative identity. The project required fluid page transitions, performance-first architecture, and bold visual design — delivered with a modern frontend stack and strong attention to interaction quality and front-end polish.",
    problem: null,
    modules: null,
    scope: [
      "Full website design and front-end development",
      "Responsive layouts across all breakpoints",
      "Performance-optimized production build",
      "Smooth scroll behavior and micro-interactions",
      "SEO structure and metadata configuration",
    ],
    highlights: [
      { icon: "Palette" as const, label: "Visual Design" },
      { icon: "Zap" as const, label: "Performance-First" },
      { icon: "Monitor" as const, label: "Fully Responsive" },
      { icon: "Layout" as const, label: "Front-End Polish" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Mockup: DeepStudioMockup,
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Real systems. Shipped to&nbsp;production."
        description="From enterprise ERP platforms to high-performance websites — built from concept to deployment with hands-on execution."
      />

      <section className="pb-24 bg-[#FAFAFB]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {projects.map((project, i) => {
              const CategoryIcon = project.categoryIcon;
              const Mockup = project.Mockup;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm hover:shadow-lg hover:shadow-black/[0.04] transition-shadow duration-500"
                >
                  {/* Visual mockup */}
                  <div className="p-6 lg:p-8 bg-[#FAFAFB] border-b border-[#E5E5E5]">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="max-w-lg mx-auto"
                    >
                      <Mockup />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-7 lg:p-9">
                    <div className="mb-5">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium mb-4 border"
                        style={{
                          color: project.color,
                          backgroundColor: `${project.color}08`,
                          borderColor: `${project.color}15`,
                        }}
                      >
                        <CategoryIcon size={11} />
                        {project.category}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-semibold text-[#0A0A0A] tracking-tight">
                        {project.name}
                      </h2>
                    </div>

                    <p className="text-sm lg:text-base text-[#4B5563] leading-relaxed mb-8 max-w-2xl">
                      {project.summary}
                    </p>

                    {/* Problem statement for Anthrilo */}
                    {project.problem && (
                      <div className="mb-8 p-5 rounded-xl bg-[#FAFAFB] border border-[#E5E5E5]">
                        <div className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-3">
                          The Challenge
                        </div>
                        <p className="text-sm text-[#4B5563] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {/* Module breakdown for Anthrilo */}
                    {project.modules && (
                      <div className="mb-8">
                        <div className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-4">
                          Core Modules
                        </div>
                        <div className="grid gap-4">
                          {project.modules.map((mod) => {
                            const ModIcon = iconMap[mod.icon];
                            return (
                              <div
                                key={mod.title}
                                className="p-5 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#D4D4D4] hover:shadow-sm transition-all duration-300"
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${project.color}10` }}
                                  >
                                    <ModIcon size={15} style={{ color: project.color }} />
                                  </div>
                                  <h4 className="text-sm font-semibold text-[#0A0A0A]">{mod.title}</h4>
                                </div>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{mod.details}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-4">
                          What We Delivered
                        </div>
                        <ul className="space-y-2.5">
                          {project.scope.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: project.color }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-4">
                          Key Highlights
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {project.highlights.map((h) => {
                            const Icon = iconMap[h.icon];
                            return (
                              <div
                                key={h.label}
                                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5]/60 hover:border-[#E5E5E5] transition-colors duration-300"
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: `${project.color}10` }}
                                >
                                  <Icon size={14} style={{ color: project.color }} />
                                </div>
                                <span className="text-xs font-medium text-[#374151]">{h.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5E5E5]">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-md text-xs font-medium text-[#6B7280] bg-[#F5F5F5] border border-[#E5E5E5]/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.url && (
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white text-sm font-medium rounded-full transition-colors duration-300 shadow-sm"
                        >
                          View Live Project
                          <ExternalLink size={14} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight mb-3">
              Have a project in mind?
            </h3>
            <p className="text-base text-[#4B5563] mb-6">
              Let&apos;s discuss what we can build together — with a clear scope, timeline, and technical approach.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-medium rounded-full text-sm transition-colors duration-300 shadow-md"
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
