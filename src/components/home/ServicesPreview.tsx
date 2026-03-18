"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Code2, Server, Layers, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

const ease = [0.25, 0.1, 0.25, 1] as const;

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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease }}
            className="lg:col-span-2"
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
              Full-stack software development.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="lg:col-span-3 flex items-end"
          >
            <p className="text-base text-[#4B5563] leading-relaxed">
              From websites and mobile apps to enterprise platforms and cloud infrastructure — we handle the full scope of modern software development.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                whileHover={{ y: -2 }}
                className="group p-6 rounded-xl border border-[#E5E5E5] bg-white hover:shadow-lg hover:shadow-black/[0.04] hover:border-[#D4D4D4] transition-all duration-300"
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
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 group/link"
          >
            View all 11 services
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
