"use client";

import { ArrowRight, Globe, Code2, Server, Layers, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Modern websites built for performance, SEO, and conversion — from marketing sites to content platforms.",
    accent: "#6366F1",
  },
  {
    icon: Code2,
    title: "Frontend & Backend Engineering",
    description: "Production-grade interfaces and scalable server systems using Next.js, React, Node.js, FastAPI, and PostgreSQL.",
    accent: "#3B82F6",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & Internal Tools",
    description: "Custom admin panels, reporting systems, and operational dashboards with real-time data and role-based access.",
    accent: "#F97316",
  },
  {
    icon: Settings,
    title: "ERP & Business Systems",
    description: "Multi-module enterprise platforms for inventory, production, finance, and business process management.",
    accent: "#10B981",
  },
  {
    icon: Layers,
    title: "Full-Stack Product Development",
    description: "End-to-end product delivery across frontend, backend, database, APIs, cloud deployment, and mobile.",
    accent: "#8B5CF6",
  },
  {
    icon: Server,
    title: "Cloud, APIs & Integrations",
    description: "REST APIs, third-party integrations, payment systems, deployment pipelines, and production infrastructure.",
    accent: "#0EA5E9",
  },
];

export default function ServicesPreview() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const descRef = useScrollReveal<HTMLDivElement>({ margin: "-80px" });
  const gridRef = useScrollRevealContainer<HTMLDivElement>();
  const linkRef = useScrollReveal<HTMLDivElement>({ margin: "-40px" });

  return (
    <section className="bg-page-white-soft section-space defer-render">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          <div
            ref={headingRef}
            className="scroll-reveal lg:col-span-2"
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
              Full-stack software development.
            </h2>
          </div>
          <div
            ref={descRef}
            className="scroll-reveal lg:col-span-3 flex items-end"
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <p className="text-base text-[#4B5563] leading-relaxed">
              From websites and mobile apps to enterprise platforms and cloud infrastructure — we handle the full scope of modern software development.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="scroll-reveal group p-6 rounded-xl border border-[#E5E5E5] bg-white hover:shadow-lg hover:shadow-black/[0.04] hover:border-[#D4D4D4] transition-all duration-300 transform-gpu will-change-transform"
                style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${service.accent}10` }}
                >
                  <Icon size={18} style={{ color: service.accent }} />
                </div>
                <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div
          ref={linkRef}
          className="scroll-reveal"
          style={{ "--reveal-delay": "300ms" } as CSSProperties}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 group/link"
          >
            Explore all services
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
