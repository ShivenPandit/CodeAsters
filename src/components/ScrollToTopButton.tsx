"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useCanHover } from "@/lib/useCanHover";

export default function ScrollToTopButton() {
  const canHover = useCanHover();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      whileHover={canHover ? { y: -2 } : undefined}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-full border border-[#E5E5E5] hover:border-[#6366F1]/40 hover:text-[#6366F1] flex items-center justify-center transition-colors duration-300 text-[#6B7280]"
      aria-label="Scroll to top"
    >
      <ArrowUp size={15} />
    </motion.button>
  );
}
