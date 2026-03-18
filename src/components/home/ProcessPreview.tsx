"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

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
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
              Structured from start to&nbsp;finish.
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
              Every project follows a clear, repeatable process — designed for transparency,
              quality, and timely delivery.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#E5E5E5]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease }}
              className="relative group"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
