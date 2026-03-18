"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const ease = [0.25, 0.1, 0.25, 1] as const;

const services = [
  {
    title: "Web Development",
    description:
      "Fast, modern websites built with Next.js and React. Optimized for performance, SEO, and conversion.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    preview: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-md bg-[#E5E5E5]/60" />
          <div className="h-2.5 w-20 rounded bg-[#E5E5E5]" />
          <div className="ml-auto flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-2.5 w-10 rounded bg-[#E5E5E5]/60" />
            ))}
          </div>
        </div>
        <div className="h-36 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center">
          <div className="text-center space-y-2.5">
            <div className="h-3 w-44 rounded bg-[#E5E5E5] mx-auto" />
            <div className="h-2.5 w-32 rounded bg-[#E5E5E5]/60 mx-auto" />
            <div className="h-7 w-24 rounded-full bg-[#6366F1]/15 mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]" />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Admin Dashboards",
    description:
      "Custom business dashboards with real-time analytics, role-based access, and data visualization.",
    stack: ["React", "Charts", "REST API", "Auth"],
    preview: (
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-10 space-y-2 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-5 w-5 mx-auto rounded ${i === 1 ? "bg-[#6366F1]/20" : "bg-[#E5E5E5]/60"}`} />
            ))}
          </div>
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {["₹4.2L", "1,847", "98.5%"].map((v) => (
                <div key={v} className="p-2 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]">
                  <div className="text-xs font-medium text-[#0A0A0A]">{v}</div>
                  <div className="h-1 w-full rounded bg-[#E5E5E5] mt-2">
                    <div className="h-full rounded bg-[#6366F1]/30" style={{ width: "65%" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-24 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] flex items-end p-2 gap-1">
              {[30, 50, 40, 70, 55, 80, 60, 90, 75, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-[#6366F1]/15 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "Clean, intentional interfaces designed around your users. From wireframes to polished design systems.",
    stack: ["Figma", "Design System", "Prototyping"],
    preview: (
      <div className="space-y-3">
        <div className="grid grid-cols-5 gap-2">
          {["#6366F1", "#A78BFA", "#818CF8", "#C4B5FD", "#4F46E5"].map((c) => (
            <div key={c} className="aspect-square rounded-lg border border-[#E5E5E5] flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c, opacity: 0.5 }} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
            <div className="text-sm font-medium text-[#0A0A0A]/40">Aa</div>
            <div className="h-2 w-full rounded bg-[#E5E5E5]" />
            <div className="h-2 w-3/4 rounded bg-[#E5E5E5]/60" />
          </div>
          <div className="p-3 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
            <div className="h-6 w-14 rounded bg-[#6366F1]/15" />
            <div className="h-6 w-full rounded-full bg-[#E5E5E5]/60" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Performance & SEO",
    description:
      "We optimize existing sites for speed and search. Code splitting, caching, Core Web Vitals — 95+ PageSpeed.",
    stack: ["Lighthouse", "CDN", "Caching"],
    preview: (
      <div className="space-y-3">
        <div className="flex items-center gap-4 p-3 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]">
          <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 flex items-center justify-center">
            <span className="text-sm font-semibold text-emerald-600">98</span>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { label: "Performance", value: 98 },
              { label: "SEO", value: 100 },
              { label: "Accessibility", value: 95 },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-[10px] text-[#6B7280] w-20">{m.label}</span>
                <div className="flex-1 h-1 rounded bg-[#E5E5E5]">
                  <div className="h-full rounded bg-emerald-500/40" style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "FCP", value: "0.8s" },
            { label: "LCP", value: "1.2s" },
            { label: "CLS", value: "0.01" },
          ].map((v) => (
            <div key={v.label} className="p-2 text-center rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]">
              <div className="text-xs text-emerald-600 font-medium">{v.value}</div>
              <div className="text-[10px] text-[#6B7280]">{v.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <section id="services" className="relative py-20 bg-[#FAFAFB]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Services"
          title="What we build."
          description="End-to-end digital solutions, from concept to launch."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: text list */}
          <div className="space-y-1">
            {services.map((service, i) => (
              <motion.button
                key={service.title}
                onClick={() => setActiveIndex(i)}
                whileHover={{ x: i !== activeIndex ? 4 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full text-left group"
              >
                <div
                  className={`relative px-5 py-4 rounded-xl transition-all duration-400 ${
                    i === activeIndex
                      ? "bg-white border border-[#E5E5E5] shadow-sm"
                      : "border border-transparent hover:bg-white/60"
                  }`}
                >
                  {i === activeIndex && (
                    <motion.div
                      layoutId="service-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full bg-[#6366F1]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-base font-medium transition-colors duration-300 ${
                        i === activeIndex ? "text-[#0A0A0A]" : "text-[#6B7280] group-hover:text-[#0A0A0A]"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <span className="text-xs font-mono text-[#E5E5E5]">
                      0{i + 1}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {i === activeIndex && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex gap-2 mt-3">
                          {service.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-medium rounded bg-[#FAFAFA] border border-[#E5E5E5] text-[#6B7280]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: preview panel */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E5E5E5]/60">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
                      <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
                      <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
                    </div>
                    <span className="text-[10px] text-[#6B7280]/40 font-mono ml-2">
                      {active.title.toLowerCase().replace(/ /g, "-")}.preview
                    </span>
                  </div>
                  {active.preview}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
