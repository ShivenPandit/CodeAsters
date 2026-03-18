"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowUp, Mail } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Company: [
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ],
  Services: [
    { name: "Web Development", href: "/services" },
    { name: "Backend & APIs", href: "/services" },
    { name: "ERP Systems", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/CodeAsters", label: "GitHub" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white text-[#0A0A0A] py-16" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E5E5]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <span className="text-lg font-semibold tracking-tight">
                CodeAsters
              </span>
            </Link>
            <p className="text-[#4B5563] leading-relaxed max-w-sm mb-4 text-sm">
              Modern software development across web, mobile, backend, and
              cloud — from premium websites to enterprise ERP systems.
            </p>
            <a
              href="mailto:codeasters@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 mb-6"
            >
              <Mail size={14} />
              codeasters@gmail.com
            </a>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-9 h-9 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] hover:border-[#6366F1]/30 hover:text-[#6366F1] flex items-center justify-center transition-colors duration-300 text-[#6B7280]"
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium text-xs tracking-widest uppercase text-[#6B7280] mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} CodeAsters. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full border border-[#E5E5E5] hover:border-[#6366F1]/40 hover:text-[#6366F1] flex items-center justify-center transition-colors duration-300 text-[#6B7280]"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
