"use client";

import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your goals, users, and requirements before writing a single line of code.",
  },
  {
    number: "02",
    title: "Design",
    description: "Wireframes and high-fidelity interfaces — reviewed and approved before development begins.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Clean, production-grade code with iterative check-ins. No black boxes, no surprises.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Deployment, quality assurance, and post-launch support — handled with the same attention as every other stage.",
  },
];

export default function ProcessPreview() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const descRef = useScrollReveal<HTMLDivElement>({ margin: "-80px" });
  const gridRef = useScrollRevealContainer<HTMLDivElement>();

  return (
    <section className="bg-page-white-soft section-space defer-render">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          <div
            ref={headingRef}
            className="scroll-reveal lg:col-span-2"
          >
            <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
              Structured from start to&nbsp;finish.
            </h2>
          </div>
          <div
            ref={descRef}
            className="scroll-reveal lg:col-span-3 flex items-end"
            style={{ "--reveal-delay": "100ms" } as CSSProperties}
          >
            <p className="text-base text-[#4B5563] leading-relaxed">
              Every project follows a clear, repeatable process — designed for transparency,
              quality, and timely delivery.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#E5E5E5]" />

          {steps.map((step, i) => (
            <div
              key={step.title}
              className="scroll-reveal relative group"
              style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
            >
              <div className="relative z-10 w-14 h-14 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-[#6366F1]/30 group-hover:shadow-md">
                <span className="text-sm font-mono font-semibold text-[#6366F1]">
                  {step.number}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">{step.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
