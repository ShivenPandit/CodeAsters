"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCanHover } from "@/lib/useCanHover";

const links = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const pathname = usePathname();
  const canHover = useCanHover();
  const mobileMenuId = "mobile-primary-nav";

  useEffect(() => {
    const updateFromScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      setScrolled(currentScrollY > 20);

      if (open || currentScrollY <= 16) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(delta) > 6) {
        setIsVisible(delta < 0);
        lastScrollYRef.current = currentScrollY;
      }
    };

    lastScrollYRef.current = window.scrollY;
    updateFromScroll();

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        tickingRef.current = false;
        updateFromScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);


  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: isVisible ? "0%" : "-100%", opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-[#E5E5E5]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group leading-none">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden">
              <Image
                src="/codeasters-logo.png"
                alt="CodeAsters logo"
                fill
                sizes="36px"
                className="object-contain scale-[1.35]"
                priority
              />
            </span>
            <span className="flex flex-col items-start justify-center">
              <span className="text-[1.3rem] sm:text-[1.55rem] font-extrabold tracking-[-0.02em] leading-[0.9] text-[#050505]">
                CodeAsters
              </span>
              <span className="mt-1.5 ml-1 text-[10px] font-medium tracking-[0.12em] leading-none text-[#7A7F87]">
                <span className="navbar-tagline-typewriter">Code to Unite</span>
              </span>
            </span>
          </Link>

          <LayoutGroup>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
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

            {/* Be a CodeAsters CTA */}
            <motion.div
              whileHover={canHover ? { scale: 1.02 } : undefined}
              whileTap={{ scale: 0.97 }}
              className="relative group"
            >
              <Link
                href="/be-a-codeaster"
                data-cursor="Join"
                aria-current={pathname === "/be-a-codeaster" ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 px-4 py-2 border text-sm font-medium rounded-full transition-all duration-300 ${
                  pathname === "/be-a-codeaster"
                    ? "border-[#6366F1] bg-[#6366F1]/5 text-[#6366F1]"
                    : "border-[#6366F1]/30 text-[#6366F1] hover:border-[#6366F1] hover:bg-[#6366F1]/5"
                }`}
              >
                <Users size={14} />
                Be a CodeAster
              </Link>
              {/* Hover tooltip */}
              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-1">
                <div className="whitespace-nowrap rounded-xl border border-[#6366F1]/20 bg-white/95 px-4 py-2.5 text-xs font-medium text-[#4B5563] shadow-lg backdrop-blur-md">
                  <span className="text-[#6366F1] font-semibold">Earn up to 30% commission</span>{" "}
                  by closing deals with CodeAsters.
                  <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-[#6366F1]/20 bg-white/95" />
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
              <Link
                href="/start"
                data-cursor="Let's Talk"
                aria-current={pathname === "/start" ? "page" : undefined}
                className="px-5 py-2 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white text-sm font-medium rounded-full transition-colors duration-300 shadow-sm"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
          </LayoutGroup>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#6B7280]"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls={mobileMenuId}
            aria-haspopup="menu"
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
            id={mobileMenuId}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#E5E5E5]"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
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
                href="/be-a-codeaster"
                onClick={() => setOpen(false)}
                aria-current={pathname === "/be-a-codeaster" ? "page" : undefined}
                className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg text-[#6366F1] font-medium hover:bg-[#6366F1]/5 transition-colors"
              >
                <Users size={14} />
                Be a CodeAster
                <span className="ml-auto text-[10px] font-medium bg-[#6366F1]/10 px-2 py-0.5 rounded-full">
                  Earn 30%
                </span>
              </Link>
              <Link
                href="/start"
                onClick={() => setOpen(false)}
                aria-current={pathname === "/start" ? "page" : undefined}
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
