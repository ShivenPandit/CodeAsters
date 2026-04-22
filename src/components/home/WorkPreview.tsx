"use client";

import { ArrowRight, ExternalLink, Globe, Database, ShoppingCart, Monitor, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCanHover } from "@/lib/useCanHover";
import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

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

function StaticImagePreview({
  src,
  label,
  frameVariant = "balanced",
  imageWidth,
  imageHeight,
  imageQuality = 85,
}: {
  src: string;
  label: string;
  frameVariant?: FrameVariant;
  imageWidth: number;
  imageHeight: number;
  imageQuality?: number;
}) {
  const frame = getFrameClasses(frameVariant);

  return (
    <div className={`rounded-xl bg-white shadow-sm overflow-hidden ${frame.wrapper}`}>
      <div className={`flex items-center gap-1.5 px-3 py-2 ${frame.chrome}`}>
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="flex-1 ml-3">
          <div className={`h-4 rounded max-w-[220px] mx-auto flex items-center justify-center px-2 ${frame.url}`}>
            <span className="text-[8px] text-[#9CA3AF] font-mono truncate">{label}</span>
          </div>
        </div>
      </div>
      <div className={`relative w-full ${frame.canvas}`}>
        <Image
          src={src}
          alt={`${label} preview`}
          width={imageWidth}
          height={imageHeight}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={imageQuality}
          className="block w-full h-auto max-h-[min(70vh,520px)] object-cover object-top"
        />
      </div>
      <div
        className={`flex items-center justify-between gap-3 px-3 py-2 ${frame.footer}`}
        aria-hidden
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
          Live preview
        </span>
        <div className="flex flex-1 justify-end">
          <div className="h-1 w-10 rounded-full bg-[#D4D4D4]/90" />
        </div>
      </div>
    </div>
  );
}

function ManagementSystemMockup() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white shadow-sm overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="flex-1 ml-3">
          <div className="h-4 rounded bg-white border border-[#E5E5E5] max-w-[120px] mx-auto flex items-center justify-center">
            <span className="text-[8px] text-[#9CA3AF] font-mono">management dashboard</span>
          </div>
        </div>
      </div>
      {/* Dashboard layout */}
      <div className="p-4">
        <div className="flex gap-3">
          {/* Sidebar */}
          <div className="w-12 space-y-2 shrink-0">
            <div className="w-8 h-8 rounded-md bg-[#F97316]/10 mx-auto" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`w-6 h-6 rounded mx-auto ${i === 0 ? "bg-[#F97316]/15" : "bg-[#F5F5F5]"}`} />
            ))}
          </div>
          {/* Main content */}
          <div className="flex-1 space-y-2.5">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md border border-[#F0F0F0] p-2">
                  <div className="h-2 w-8 rounded bg-[#E5E5E5] mb-1" />
                  <div className="h-3.5 w-10 rounded bg-[#F97316]/15" />
                </div>
              ))}
            </div>
            {/* Table */}
            <div className="rounded-md border border-[#F0F0F0]">
              <div className="px-2 py-1.5 border-b border-[#F0F0F0] flex gap-3">
                <div className="h-2 w-16 rounded bg-[#E5E5E5]" />
                <div className="h-2 w-12 rounded bg-[#E5E5E5]" />
                <div className="h-2 w-10 rounded bg-[#E5E5E5]" />
              </div>
              {[0, 1, 2].map((i) => (
                <div key={i} className="px-2 py-1.5 flex gap-3 border-b border-[#F0F0F0] last:border-0">
                  <div className="h-2 w-16 rounded bg-[#F5F5F5]" />
                  <div className="h-2 w-12 rounded bg-[#F5F5F5]" />
                  <div className="h-2 w-10 rounded bg-[#F5F5F5]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    name: "DeepStudio",
    category: "Website",
    categoryIcon: Globe,
    color: "#6366F1",
    url: "https://deep-studio.vercel.app/",
    summary:
      "A premium studio website with fluid interactions, performance-first architecture, and bold visual design — built with modern frontend tooling.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    previewType: "image" as const,
    previewLabel: "deep-studio.vercel.app",
    imageSrc: "/deepstudio-preview.png",
    imageWidth: 1280,
    imageHeight: 720,
    imageQuality: 85,
    frameVariant: "minimal" as const,
  },
  {
    name: "My Choices",
    category: "E-commerce Website",
    categoryIcon: ShoppingCart,
    color: "#EC4899",
    url: "https://my-choices-lovat.vercel.app/",
    summary:
      "A client e-commerce website built with Next.js, focused on product discovery, clean navigation, and responsive shopping experience.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "E-commerce UI"],
    previewType: "image" as const,
    previewLabel: "my-choices-lovat.vercel.app",
    imageSrc: "/mychoices-preview.png",
    imageWidth: 1280,
    imageHeight: 720,
    imageQuality: 85,
    frameVariant: "minimal" as const,
  },
  {
    name: "Management System",
    category: "Enterprise ERP",
    categoryIcon: Database,
    color: "#F97316",
    url: null,
    summary:
      "An enterprise-grade ERP system for textile manufacturing — managing raw materials, production workflows, garment inventory, multi-panel sales, and financial reporting across modular business operations.",
    stack: ["Next.js", "FastAPI", "Python", "PostgreSQL", "Redis"],
    previewType: "image" as const,
    previewLabel: "management / dashboard",
    imageSrc: "/management-system-preview.png",
    imageWidth: 1024,
    imageHeight: 464,
    imageQuality: 85,
    frameVariant: "balanced" as const,
  },
  {
    name: "Label Studio",
    category: "Desktop Utility",
    categoryIcon: Monitor,
    color: "#12D2D2",
    url: null,
    summary:
      "A unified desktop barcode label generator for FBA, SJIT, and Styli workflows with Excel/CSV parsing, bulk PDF output, and memory-optimized processing.",
    stack: ["Python", "CustomTkinter", "Pandas", "ReportLab", "PyInstaller"],
    previewType: "image" as const,
    previewLabel: "label-studio / sjit labels",
    imageSrc: "/label-studio-sjit.png",
    imageWidth: 1908,
    imageHeight: 970,
    imageQuality: 85,
    frameVariant: "minimal" as const,
  },
  {
    name: "AI Catalog Generator",
    category: "AI Product Imaging",
    categoryIcon: Zap,
    color: "#0EA5E9",
    url: null,
    summary:
      "An AI-powered catalog generation tool that converts a single product photo into multiple clean catalog-ready output views for faster merchandising workflows.",
    stack: ["Next.js", "TypeScript", "AI Image Processing", "Prompt Workflows", "Cloud Storage"],
    previewType: "image" as const,
    previewLabel: "ai catalog / generator",
    imageSrc: "/ai-catalog-generator-preview.png",
    imageWidth: 1600,
    imageHeight: 900,
    imageQuality: 85,
    frameVariant: "minimal" as const,
  },
];

export default function WorkPreview() {
  const canHover = useCanHover();
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollRevealContainer<HTMLDivElement>();
  const linkRef = useScrollReveal<HTMLDivElement>({ margin: "-40px" });

  return (
    <section className="bg-page-soft section-space defer-render">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={headingRef}
          className="scroll-reveal mb-8"
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
            Projects we&apos;ve delivered.
          </h2>
        </div>

        <div ref={gridRef} className="mb-8 space-y-6">
          {projects.map((project, i) => {
            const Icon = project.categoryIcon;
            return (
              <div
                key={project.name}
                className="scroll-reveal group rounded-2xl border border-[#E5E5E5] bg-white hover:shadow-xl hover:shadow-black/[0.04] hover:border-[#D4D4D4] transition-all duration-500 overflow-hidden"
                style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Text content */}
                  <div className="p-7 lg:p-9 flex flex-col justify-center">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium mb-4 border w-fit"
                      style={{
                        color: project.color,
                        backgroundColor: `${project.color}08`,
                        borderColor: `${project.color}15`,
                      }}
                    >
                      <Icon size={11} />
                      {project.category}
                    </div>

                    <h3 className="text-xl lg:text-2xl font-semibold text-[#0A0A0A] tracking-tight mb-3">
                      {project.name}
                    </h3>

                    <p className="text-sm text-[#6B7280] leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium text-[#6B7280] bg-[#F5F5F5] border border-[#E5E5E5]/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A] hover:text-[#6366F1] transition-all duration-300 w-fit hover:scale-[1.02] active:scale-[0.97]"
                      >
                        View Live Project
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                  {/* Visual mockup */}
                  <div className="p-5 lg:p-7 bg-[#FAFAFB] border-t md:border-t-0 md:border-l border-[#E5E5E5] flex items-center">
                    <div
                      className={`w-full transition-transform duration-300 ease-out ${canHover ? 'hover:-translate-y-1' : ''}`}
                    >
                      {project.previewType === "image" && project.imageSrc ? (
                        <StaticImagePreview
                          src={project.imageSrc}
                          label={project.previewLabel}
                          frameVariant={project.frameVariant}
                          imageWidth={project.imageWidth}
                          imageHeight={project.imageHeight}
                          imageQuality={project.imageQuality}
                        />
                      ) : (
                        <ManagementSystemMockup />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          ref={linkRef}
          className="scroll-reveal"
          style={{ "--reveal-delay": "200ms" } as CSSProperties}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 group/link"
          >
            View all work
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
