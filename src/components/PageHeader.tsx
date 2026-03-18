"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 bg-[#FAFAFB]" aria-label={label}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
            {label}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-base lg:text-lg text-[#6B7280] max-w-xl leading-relaxed">
              {description}
            </p>
          )}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-8 h-px bg-gradient-to-r from-[#6366F1]/30 via-[#6366F1]/10 to-transparent origin-left max-w-xs"
          />
        </motion.div>
      </div>
    </section>
  );
}
