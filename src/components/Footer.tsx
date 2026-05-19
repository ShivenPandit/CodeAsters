import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SocialLink from "@/components/SocialLink";

const footerLinks = {
  Company: [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Start a project", href: "/start" },
    { name: "Be a CodeAster", href: "/be-a-codeaster" },
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
  { icon: Instagram, href: "https://www.instagram.com/codeasters", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/codeasters", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/CodeAsters", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[#E5E5E5]/80 bg-page-white-soft py-12 text-[#0A0A0A] backdrop-blur-sm" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E5E5]" />

      <div className="max-w-[88rem] mx-auto px-5 sm:px-6 lg:px-10">
        <h2 className="sr-only">Footer links and company details</h2>
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <Image
                src="/codeasters-logo.png"
                alt="CodeAsters logo"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
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
            <ul className="flex gap-3" aria-label="Social links">
              {socials.map((social) => (
                <li key={social.label}>
                  <SocialLink href={social.href} label={social.label}>
                    <social.icon size={15} />
                  </SocialLink>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="font-medium text-xs tracking-widest uppercase text-[#6B7280] mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="link-hover text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col xl:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            © 2026 CodeAsters. All rights reserved.
          </p>
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
