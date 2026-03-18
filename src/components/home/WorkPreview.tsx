"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Globe, Database } from "lucide-react";
import Link from "next/link";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

function DeepStudioMockup() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white shadow-sm overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="flex-1 ml-3">
          <div className="h-4 rounded bg-white border border-[#E5E5E5] max-w-[140px] mx-auto flex items-center justify-center">
            <span className="text-[8px] text-[#9CA3AF] font-mono">deep-studio.in</span>
          </div>
        </div>
      </div>
      {/* Page content */}
      <div className="p-4 space-y-3">
        {/* Dark hero block */}
        <div className="rounded-lg bg-[#0A0A0A] p-4 space-y-2">
          <div className="h-3 w-20 rounded bg-white/15" />
          <div className="h-4 w-3/4 rounded bg-white/20" />
          <div className="h-4 w-1/2 rounded bg-white/20" />
          <div className="h-2.5 w-full rounded bg-white/8 mt-1" />
          <div className="h-2.5 w-4/5 rounded bg-white/8" />
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-20 rounded-full bg-[#6366F1]" />
            <div className="h-6 w-16 rounded-full bg-white/10" />
          </div>
        </div>
        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md bg-[#FAFAFA] border border-[#F0F0F0] p-2 space-y-1.5">
              <div className="w-5 h-5 rounded bg-[#6366F1]/10" />
              <div className="h-2 w-full rounded bg-[#E5E5E5]" />
              <div className="h-2 w-2/3 rounded bg-[#F0F0F0]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnthriloMockup() {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white shadow-sm overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
        <div className="flex-1 ml-3">
          <div className="h-4 rounded bg-white border border-[#E5E5E5] max-w-[120px] mx-auto flex items-center justify-center">
            <span className="text-[8px] text-[#9CA3AF] font-mono">anthrilo dashboard</span>
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
    name: "Anthrilo Management System",
    category: "Enterprise ERP",
    categoryIcon: Database,
    color: "#F97316",
    url: null,
    summary:
      "An enterprise-grade ERP system for textile manufacturing — managing raw materials, production workflows, garment inventory, multi-panel sales, and financial reporting across modular business operations.",
    stack: ["Next.js", "FastAPI", "Python", "PostgreSQL", "Redis"],
    Mockup: AnthriloMockup,
  },
  {
    name: "DeepStudio",
    category: "Website",
    categoryIcon: Globe,
    color: "#6366F1",
    url: "https://deep-studio.vercel.app/",
    summary:
      "A premium studio website with fluid interactions, performance-first architecture, and bold visual design — built with modern frontend tooling.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Mockup: DeepStudioMockup,
  },
];

export default function WorkPreview() {
  const canHover = useCanHover();

  return (
    <section className="py-24 bg-[#FAFAFB]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
            Projects we&apos;ve delivered.
          </h2>
        </motion.div>

        <div className="space-y-8 mb-10">
          {projects.map((project, i) => {
            const Icon = project.categoryIcon;
            const Mockup = project.Mockup;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="group rounded-2xl border border-[#E5E5E5] bg-white hover:shadow-xl hover:shadow-black/[0.04] hover:border-[#D4D4D4] transition-all duration-500 overflow-hidden"
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
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={canHover ? { scale: 1.02 } : undefined}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A] hover:text-[#6366F1] transition-colors duration-300 w-fit"
                      >
                        View Live Project
                        <ExternalLink size={13} />
                      </motion.a>
                    )}
                  </div>

                  {/* Visual mockup */}
                  <div className="p-5 lg:p-7 bg-[#FAFAFB] border-t md:border-t-0 md:border-l border-[#E5E5E5] flex items-center">
                    <motion.div
                      whileHover={canHover ? { y: -4 } : undefined}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full"
                    >
                      <Mockup />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 group/link"
          >
            View all work
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
