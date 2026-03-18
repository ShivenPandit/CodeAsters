"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-[#E5E5E5]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-base font-semibold tracking-tight text-[#0A0A0A]">
              CodeAsters
            </span>
          </Link>

          <LayoutGroup>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#0A0A0A] font-medium"
                    : "text-[#6B7280] hover:text-[#0A0A0A]"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6366F1] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                data-cursor="Let's Talk"
                className="px-5 py-2 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white text-sm font-medium rounded-full transition-colors duration-300 shadow-sm"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
          </LayoutGroup>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#6B7280]"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#E5E5E5]"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-[#0A0A0A] font-medium bg-[#FAFAFA]"
                      : "text-[#6B7280] hover:text-[#0A0A0A] hover:bg-[#FAFAFA]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block mt-2 text-center px-5 py-2.5 bg-[#0A0A0A] text-white text-sm font-medium rounded-full"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
