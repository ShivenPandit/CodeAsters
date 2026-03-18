"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  titleAccent?: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  titleAccent,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="mb-10 lg:mb-12"
    >
      <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
        {label}
      </span>
      <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
        {title}
        {titleAccent && (
          <span className="text-[#6B7280]/70"> {titleAccent}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[#6B7280] max-w-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
