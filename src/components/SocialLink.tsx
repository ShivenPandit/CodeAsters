"use client";

import { motion } from "framer-motion";
import { useCanHover } from "@/lib/useCanHover";

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export default function SocialLink({ href, label, children }: SocialLinkProps) {
  const canHover = useCanHover();

  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={canHover ? { y: -2, scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-9 h-9 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] hover:border-[#6366F1]/30 hover:text-[#6366F1] flex items-center justify-center transition-colors duration-300 text-[#6B7280]"
    >
      {children}
    </motion.a>
  );
}
