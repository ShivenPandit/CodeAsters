"use client";

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
import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

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
    description: "Refined across breakpoints, not just \u201Cworks on mobile.\u201D",
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
  const introRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollRevealContainer<HTMLDivElement>();
  const whatWeDoHeadingRef = useScrollReveal<HTMLDivElement>();
  const whatWeDoContentRef = useScrollReveal<HTMLDivElement>();
  const approachRef = useScrollReveal<HTMLDivElement>();
  const principlesRef = useScrollRevealContainer<HTMLDivElement>();
  const clientExpHeadingRef = useScrollReveal<HTMLDivElement>();
  const clientExpListRef = useScrollRevealContainer<HTMLDivElement>();
  const whyHeadingRef = useScrollReveal<HTMLDivElement>();
  const whyStackRef = useScrollRevealContainer<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader
        label="About"
        title="Software studio, production mindset."
        description="We design and ship products — sites, apps, dashboards, ERP, and cloud — with the same care we'd want on our own stack."
      />

      {/* Intro */}
      <section className="bg-page-soft section-space-bottom">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div
              ref={introRef}
              className="scroll-reveal"
            >
              <p className="text-base leading-relaxed text-[#64748B] lg:text-lg">
                Sites, apps, dashboards, ERP, APIs, and cloud — frontend through infrastructure, with
                design and engineering treated as one delivery.
              </p>
            </div>
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "End-to-End", label: "Project Delivery" },
                { value: "Modern", label: "Technology Stack" },
                { value: "Production", label: "Grade Quality" },
                { value: "Global", label: "Client Reach" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="scroll-reveal p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#D4D4D4] transition-colors duration-300"
                  style={{ "--reveal-delay": `${150 + i * 60}ms` } as CSSProperties}
                >
                  <div className="text-lg font-semibold text-[#0A0A0A] mb-0.5">{stat.value}</div>
                  <div className="text-xs text-[#6B7280]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-page-white-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            <div
              ref={whatWeDoHeadingRef}
              className="scroll-reveal lg:col-span-2"
            >
              <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
                What We Do
              </span>
              <h2 className="text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
                Capability + follow-through.
              </h2>
            </div>
            <div
              ref={whatWeDoContentRef}
              className="scroll-reveal lg:col-span-3"
              style={{ "--reveal-delay": "100ms" } as CSSProperties}
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

              <div className="mt-6 flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-page-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            ref={approachRef}
            className="scroll-reveal mb-8"
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
          </div>

          <div ref={principlesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="scroll-reveal rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:border-[#D4D4D4] hover:shadow-md"
                  style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366F1]/8">
                    <Icon size={20} className="text-[#6366F1]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748B]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Clients Can Expect */}
      <section className="bg-page-white-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div
              ref={clientExpHeadingRef}
              className="scroll-reveal"
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
            </div>

            <div ref={clientExpListRef}>
              <ul className="space-y-3.5">
                {expectations.map((item, i) => (
                  <li
                    key={i}
                    className="scroll-reveal flex items-start gap-3"
                    style={{ "--reveal-delay": `${150 + i * 40}ms` } as CSSProperties}
                  >
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#6366F1]" strokeWidth={2} />
                    <span className="text-sm leading-snug text-[#475569]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why CodeAsters */}
      <section className="bg-page-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            ref={whyHeadingRef}
            className="scroll-reveal mx-auto mb-8 max-w-3xl text-center"
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
          </div>

          <div ref={whyStackRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {stack.map((tech, i) => (
              <div
                key={tech}
                className="scroll-reveal px-4 py-3 rounded-xl text-center text-sm font-medium text-[#374151] bg-white border border-[#E5E5E5] hover:border-[#6366F1]/20 transition-colors duration-300"
                style={{ "--reveal-delay": `${100 + i * 30}ms` } as CSSProperties}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-page-white-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            ref={ctaRef}
            className="scroll-reveal max-w-2xl mx-auto text-center"
          >
            <h2 className="mb-3 text-3xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-4xl">
              Have something in mind?
            </h2>
            <p className="mb-6 text-base leading-relaxed text-[#64748B]">
              Brief us for scope &amp; timeline, or browse work first — your pace.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/10 transition-all hover:bg-[#1a1a1a] hover:scale-[1.02] active:scale-[0.97]"
              >
                Start a project
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-7 py-3.5 text-sm font-medium text-[#0A0A0A] transition-all hover:border-[#6B7280]/40 hover:bg-[#FAFAFA] hover:scale-[1.02] active:scale-[0.97]"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-5 py-3.5 text-sm font-medium text-[#6366F1] hover:underline"
              >
                Quick hello
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
