"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  ShoppingCart,
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
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

const iconMap = { Palette, Zap, Monitor, Layout, Globe, Database, BarChart3, Shield, Server, Package, Factory, TrendingUp, Settings } as const;

/* ---------- Mockup Components ---------- */

type FrameVariant = "minimal" | "balanced";

function getFrameClasses(variant: FrameVariant) {
  if (variant === "minimal") {
    return {
      wrapper: "ring-1 ring-[#E5E5E5]/45",
      chrome: "bg-[#FBFCFF]",
      url: "bg-white/75",
      canvas: "bg-[#F3F6FB]",
      footer: "bg-[#F9FAFD]",
    } as const;
  }

  return {
    wrapper: "ring-1 ring-[#E5E5E5]/70",
    chrome: "bg-[#FAFAFA]",
    url: "bg-white/90",
    canvas: "bg-[#EEF1F6]",
    footer: "bg-[#F6F7FB]",
  } as const;
}

type BrowserFrameMockupProps = {
  src: string;
  alt: string;
  label: string;
  imageWidth: number;
  imageHeight: number;
  imageQuality?: number;
  unoptimized?: boolean;
  footerLabel?: string;
  frameVariant?: FrameVariant;
};

function BrowserFrameMockup({
  src,
  alt,
  label,
  imageWidth,
  imageHeight,
  imageQuality = 95,
  unoptimized = false,
  footerLabel = "Live preview",
  frameVariant = "balanced",
}: BrowserFrameMockupProps) {
  const frame = getFrameClasses(frameVariant);

  return (
    <div className={`rounded-xl bg-white shadow-md shadow-black/[0.04] overflow-hidden ${frame.wrapper}`}>
      <div className={`flex items-center gap-1.5 px-3 py-2.5 ${frame.chrome}`}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
        </div>
        <div className="flex-1 ml-4">
          <div className={`h-5 rounded-md max-w-[210px] mx-auto flex items-center justify-center ${frame.url}`}>
            <span className="text-[9px] text-[#9CA3AF] font-mono">{label}</span>
          </div>
        </div>
      </div>
      <div className={`relative w-full ${frame.canvas}`}>
        <Image
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          sizes="(max-width: 1024px) 100vw, 60vw"
          quality={imageQuality}
          unoptimized={unoptimized}
          className="block w-full h-auto max-h-[min(70vh,520px)] object-cover object-top"
        />
      </div>
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2 ${frame.footer}`}
        aria-hidden
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA]">
          {footerLabel}
        </span>
        <div className="flex flex-1 justify-end">
          <div className="h-1 w-12 rounded-full bg-[#D4D4D4]/90" />
        </div>
      </div>
    </div>
  );
}

function DeepStudioMockup() {
  return (
    <BrowserFrameMockup
      src="/deepstudio-preview.png"
      alt="DeepStudio website preview"
      label="deep-studio.vercel.app"
      imageWidth={1280}
      imageHeight={720}
      imageQuality={100}
      unoptimized
      frameVariant="minimal"
    />
  );
}

function ManagementSystemMockup() {
  return (
    <BrowserFrameMockup
      src="/management-system-preview.png"
      alt="Management System dashboard preview"
      label="management / dashboard"
      imageWidth={1024}
      imageHeight={464}
      imageQuality={100}
      unoptimized
      frameVariant="balanced"
    />
  );
}

function MyChoicesMockup() {
  return (
    <BrowserFrameMockup
      src="/mychoices-preview.png"
      alt="My Choices website preview"
      label="my-choices-lovat.vercel.app"
      imageWidth={1280}
      imageHeight={720}
      imageQuality={100}
      unoptimized
      frameVariant="minimal"
    />
  );
}

function LabelStudioMockup() {
  return (
    <BrowserFrameMockup
      src="/label-studio-sjit.png"
      alt="Label Studio desktop application preview"
      label="label studio / sjit labels"
      imageWidth={1908}
      imageHeight={970}
      imageQuality={100}
      unoptimized
      footerLabel="Product preview"
      frameVariant="minimal"
    />
  );
}

function AICatalogGeneratorMockup() {
  return (
    <BrowserFrameMockup
      src="/ai-catalog-generator-preview.png"
      alt="AI Catalog Generator application preview"
      label="ai catalog / generator"
      imageWidth={1600}
      imageHeight={900}
      imageQuality={100}
      unoptimized
      footerLabel="AI workflow preview"
      frameVariant="minimal"
    />
  );
}

/* ---------- Data ---------- */

const projects = [
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
  {
    id: "mychoices",
    name: "My Choices",
    category: "E-commerce Website",
    categoryIcon: ShoppingCart,
    color: "#EC4899",
    url: "https://my-choices-lovat.vercel.app/",
    summary:
      "A client e-commerce website built in Next.js with a clean shopping flow, category-driven browsing, and responsive product experiences across devices.",
    problem: null,
    modules: null,
    scope: [
      "Next.js storefront architecture and responsive layout",
      "Product listing and category browsing flows",
      "Clean visual hierarchy for commerce conversion",
      "Performance-focused frontend implementation",
      "Deployment-ready production setup",
    ],
    highlights: [
      { icon: "Layout" as const, label: "Commerce UI" },
      { icon: "Monitor" as const, label: "Mobile Ready" },
      { icon: "Zap" as const, label: "Fast Frontend" },
      { icon: "Globe" as const, label: "Live in Production" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "E-commerce UX"],
    Mockup: MyChoicesMockup,
  },
  {
    id: "ams",
    name: "Management System",
    category: "Enterprise ERP / Business Platform",
    categoryIcon: Database,
    color: "#F97316",
    url: null,
    summary:
      "An enterprise-grade ERP system built for textile manufacturing and garment production management. The platform centralizes raw material tracking, production workflows, garment inventory, sales operations, and financial reporting into a unified, multi-module system — replacing fragmented spreadsheets and manual processes with structured, database-backed operations.",
    problem:
      "The operations team needed a centralized platform to manage the full lifecycle of textile manufacturing — from raw yarn procurement through knitting, dyeing, and finishing processes, to garment production, inventory management, multi-panel sales tracking, and financial settlements. Manual workflows were causing data inconsistency, production delays, and limited visibility into operational performance.",
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
    Mockup: ManagementSystemMockup,
  },
  {
    id: "labelstudio",
    name: "Label Studio",
    category: "Desktop Utility / Internal Tool",
    categoryIcon: Monitor,
    color: "#12D2D2",
    url: null,
    summary:
      "A unified barcode label generator desktop application combining FBA, SJIT, and Styli workflows into one tool with batch processing and PDF output.",
    problem:
      "Operations teams needed one reliable desktop utility to generate multiple barcode label formats from messy Excel inputs without manual template switching and repetitive formatting work.",
    modules: null,
    scope: [
      "Unified UI for FBA, SJIT, and Styli label workflows",
      "Excel/CSV ingestion with smart header detection",
      "Batch PDF generation at 300 DPI for print readiness",
      "Per-row quantity support and large dataset handling",
      "PyInstaller packaging into a portable desktop executable",
    ],
    highlights: [
      { icon: "Monitor" as const, label: "Desktop UX" },
      { icon: "Zap" as const, label: "Batch Processing" },
      { icon: "Settings" as const, label: "Workflow Modes" },
      { icon: "Layout" as const, label: "Dark UI System" },
    ],
    stack: ["Python", "CustomTkinter", "Pandas", "ReportLab", "PyInstaller"],
    Mockup: LabelStudioMockup,
  },
  {
    id: "aicatalog",
    name: "AI Catalog Generator",
    category: "AI Product Imaging / Commerce Automation",
    categoryIcon: Zap,
    color: "#0EA5E9",
    url: null,
    summary:
      "An AI-driven catalog workflow that transforms a single product photo into multiple clean, brand-consistent output views to accelerate listing and merchandising operations.",
    problem:
      "Catalog teams were manually creating product variants for each angle and marketplace format, resulting in slow turnaround times and inconsistent visual quality across listings.",
    modules: null,
    scope: [
      "Single-image upload and guided generation workflow",
      "Automated multi-view catalog output composition",
      "Consistent background and layout styling for product cards",
      "Batch-ready output panel for scalable merchandising",
      "Operator-friendly UI optimized for quick handoff",
    ],
    highlights: [
      { icon: "Zap" as const, label: "AI Generation" },
      { icon: "Layout" as const, label: "Catalog Outputs" },
      { icon: "Monitor" as const, label: "Operator UX" },
      { icon: "TrendingUp" as const, label: "Faster Listing" },
    ],
    stack: ["Next.js", "TypeScript", "AI Image Processing", "Prompt Engineering", "Cloud Storage"],
    Mockup: AICatalogGeneratorMockup,
  },
];

export default function WorkPage() {
  const canHover = useCanHover();

  return (
    <>
      <PageHeader
        label="Work"
        title="Real systems. Shipped to&nbsp;production."
        description="From enterprise ERP platforms to high-performance websites — built from concept to deployment with hands-on execution."
      />

      <section className="bg-page-soft section-space-bottom">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-10 md:space-y-12 lg:space-y-14">
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
                      whileHover={canHover ? { y: -4 } : undefined}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full"
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

                    {/* Problem statement for Management System */}
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

                    {/* Module breakdown for Management System */}
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
                          whileHover={canHover ? { scale: 1.02 } : undefined}
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
            className="mt-10 text-center md:mt-12 lg:mt-16"
          >
            <h3 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight mb-3">
              Have a project in mind?
            </h3>
            <p className="text-base text-[#4B5563] mb-6">
              Let&apos;s discuss what we can build together — with a clear scope, timeline, and technical approach.
            </p>
            <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/start"
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
