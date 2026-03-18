"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function CTA() {
  return (
    <section className="py-24 bg-[#FAFAFB]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A] mb-4">
            Have a project in mind?
          </h2>
          <p className="text-base text-[#4B5563] leading-relaxed mb-8">
            Tell us what you&apos;re building. We&apos;ll respond within 24 hours with a clear
            outline of how we can help — scope, timeline, and next&nbsp;steps.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                data-cursor="Start"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-medium rounded-full text-sm transition-colors duration-300 shadow-lg shadow-black/10"
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E5E5E5] hover:border-[#6B7280]/40 hover:bg-white text-[#0A0A0A] font-medium rounded-full text-sm transition-all duration-300"
              >
                Learn About Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
