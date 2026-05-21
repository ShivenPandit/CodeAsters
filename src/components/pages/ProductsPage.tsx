"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  Boxes,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  type LucideIcon,
  MessageCircle,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

type ProductPreviewType = "catalog" | "voice" | "catalog-ai" | "labels";

type FeaturedProduct = {
  id: string;
  icon: LucideIcon;
  accent: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  pricing: string;
  pricingNotes: string[];
  features: string[];
  deployments?: string[];
  ctas: Array<{ label: string; href: string; variant: "primary" | "secondary" }>;
  preview?: ProductPreviewType;
  featured?: boolean;
};

const featuredProducts: FeaturedProduct[] = [
  {
    id: "whatsapp-core",
    icon: MessageCircle,
    accent: "#10B981",
    title: "WhatsApp Business Solutions",
    subtitle: "Meta-powered communication orchestration platform",
    description:
      "Meta's cloud-hosted WhatsApp API for messaging flows, chatbots, customer support, broadcast campaigns, and OTP verification.",
    tags: ["WhatsApp Cloud API", "Business Communications", "AI Messaging"],
    pricing: "Free setup + Pay per message",
    pricingNotes: [
      "First 1,000 conversations/month free",
      "Marketing: INR 0.5-2/msg",
      "Transactional: INR 0.3-1.5/msg",
      "Support: Free",
    ],
    features: [
      "Marketing messages",
      "Transactional alerts",
      "Customer support",
      "Authentication OTP",
      "CRM integration",
      "AI chatbot support",
    ],
    ctas: [
      { label: "Calculate Cost", href: "/contact", variant: "secondary" },
      { label: "Get Started", href: "/start", variant: "primary" },
    ],
    featured: true,
  },
  {
    id: "whatsapp-catalog",
    icon: Store,
    accent: "#6366F1",
    title: "WhatsApp Product Catalogs",
    subtitle: "Rich storefronts inside WhatsApp",
    description:
      "Showcase products directly inside WhatsApp chats with rich media storefronts customers can browse instantly.",
    tags: ["Catalog Sync", "Mobile Storefront", "Commerce"],
    pricing: "Free with Business Account",
    pricingNotes: [],
    features: [
      "Up to 500 products",
      "Product collections",
      "Video support",
      "Mobile storefront",
      "Shop integration",
    ],
    ctas: [{ label: "Launch Catalog", href: "/contact", variant: "primary" }],
    preview: "catalog",
  },
  {
    id: "ai-voice-agent",
    icon: PhoneCall,
    accent: "#0EA5E9",
    title: "AI Voice Calling Agent",
    subtitle: "AI-powered voice systems for modern teams",
    description:
      "Voice-first AI agents that handle inbound and outbound calls, capture intent, and move conversations forward at scale.",
    tags: ["Voice AI", "Speech Analytics", "Global Coverage"],
    pricing: "Usage-based pricing",
    pricingNotes: ["10x cheaper than human support agents"],
    features: [
      "24/7 AI calling",
      "Appointment scheduling",
      "Lead qualification",
      "Human handoff",
      "Automatic transcription",
      "CRM integration",
      "Multi-language support",
    ],
    ctas: [
      { label: "Estimate Pricing", href: "/contact", variant: "secondary" },
      { label: "Book Demo", href: "/start", variant: "primary" },
    ],
    preview: "voice",
  },
  {
    id: "ai-catalog",
    icon: Sparkles,
    accent: "#EC4899",
    title: "AI Catalog Generator",
    subtitle: "Fashion-grade image production from one photo",
    description:
      "Generate complete ecommerce catalog images from a single product photo with branded styling, lighting, and layouts.",
    tags: ["AI Imaging", "Fashion Tech", "Marketplace Ready"],
    pricing: "Custom quote",
    pricingNotes: ["Batch-ready output with export presets"],
    features: [
      "Multiple AI-generated views",
      "Fashion model generation",
      "Background replacement",
      "Batch processing",
      "Marketplace exports",
      "Cloud storage",
    ],
    ctas: [
      { label: "Generate Demo", href: "/contact", variant: "secondary" },
      { label: "Contact Sales", href: "/contact", variant: "primary" },
    ],
    preview: "catalog-ai",
  },
  {
    id: "label-studio",
    icon: Barcode,
    accent: "#F97316",
    title: "Label Studio",
    subtitle: "Enterprise barcode and shipping label engine",
    description:
      "Unified barcode label generator for Amazon FBA, SJIT, Styli, and warehouse workflows with high-volume output.",
    tags: ["Barcode", "Logistics", "Ops Tools"],
    pricing: "Custom quote",
    pricingNotes: ["Desktop or cloud deployment"],
    features: [
      "Excel/CSV parsing",
      "Bulk PDF generation",
      "Thermal printer support",
      "SKU mapping",
      "Memory-optimized processing",
    ],
    deployments: ["Desktop software", "Cloud version", "Enterprise integrations"],
    ctas: [
      { label: "View Features", href: "/contact", variant: "secondary" },
      { label: "Download Demo", href: "/contact", variant: "primary" },
    ],
    preview: "labels",
  },
];

const deploymentModels = [
  {
    icon: Cpu,
    title: "One-Time Deployment",
    description: "Best for internal business systems and private infrastructure builds.",
  },
  {
    icon: Wallet,
    title: "Subscription SaaS",
    description: "Monthly recurring AI platform pricing with ongoing upgrades.",
  },
  {
    icon: Building2,
    title: "Enterprise Customization",
    description: "Fully tailored AI systems designed for large organizations.",
  },
];

const industries = [
  { icon: ShoppingBag, title: "Fashion Brands" },
  { icon: Store, title: "E-commerce" },
  { icon: Stethoscope, title: "Healthcare" },
  { icon: Factory, title: "Logistics" },
  { icon: Building2, title: "Real Estate" },
  { icon: GraduationCap, title: "Education" },
];

const upcomingProducts = [
  "AI HR Assistant",
  "AI Receptionist",
  "AI Sales Agent",
  "AI CRM Assistant",
  "AI Inventory System",
  "AI Analytics Dashboard",
  "AI Ad Campaign Optimizer",
];

function ProductPreview({ type }: { type: "catalog" | "voice" | "catalog-ai" | "labels" }) {
  if (type === "catalog") {
    return (
      <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/70" />
          Live catalog
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-[#E5E5E5] bg-white p-3">
              <div className="h-16 rounded-lg bg-gradient-to-br from-[#6366F1]/10 via-white to-[#8B5CF6]/15" />
              <div className="mt-3 h-2 w-3/4 rounded bg-[#E5E5E5]" />
              <div className="mt-2 h-2 w-1/2 rounded bg-[#E5E5E5]/70" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-dashed border-[#6366F1]/40 bg-[#6366F1]/5 px-3 py-2 text-[11px] font-medium text-[#6366F1]">
          Tap-to-buy WhatsApp storefront
        </div>
      </div>
    );
  }

  if (type === "voice") {
    const bars = [18, 26, 12, 32, 20, 28, 16, 30, 14, 24, 18, 26];
    return (
      <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 via-white/60 to-[#0EA5E9]/10 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          Voice stream
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0EA5E9]/10 px-2 py-0.5 text-[9px] font-semibold text-[#0EA5E9]">
            live
          </span>
        </div>
        <div className="mt-5 flex items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="hero-activity-pulse w-1.5 rounded-full bg-gradient-to-t from-[#0EA5E9]/25 via-[#6366F1]/35 to-[#6366F1]/60"
              style={{ height: `${h}px`, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-[#64748B]">
          <span className="rounded-lg border border-[#E5E5E5] bg-white px-2 py-1">Intent: booking</span>
          <span className="rounded-lg border border-[#E5E5E5] bg-white px-2 py-1">Confidence: 94%</span>
        </div>
      </div>
    );
  }

  if (type === "catalog-ai") {
    return (
      <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 via-[#EC4899]/10 to-[#A855F7]/15 p-4 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          AI studio
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EC4899]/10 px-2 py-0.5 text-[9px] font-semibold text-[#EC4899]">
            ready
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-white/60 bg-white/60 p-2">
              <div className="h-20 rounded-lg bg-gradient-to-br from-[#EC4899]/20 via-white to-[#6366F1]/10" />
              <div className="mt-2 h-2 w-2/3 rounded bg-[#E5E5E5]" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/40" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-[#64748B]">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#EC4899]/60" />
          Model-ready product scenes
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
        <span className="inline-flex h-2 w-2 rounded-full bg-[#F97316]/70" />
        Label pipeline
      </div>
      <div className="mt-4 rounded-xl border border-[#E5E5E5] bg-white">
        <div className="flex items-center gap-2 border-b border-[#E5E5E5] px-3 py-2 text-[10px] text-[#64748B]">
          <span className="h-2 w-2 rounded-full bg-[#E5E5E5]" />
          batch_print.csv
        </div>
        <div className="grid grid-cols-3 gap-2 px-3 py-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-dashed border-[#F97316]/40 bg-[#F97316]/5 px-2 py-2">
              <div className="h-2 w-12 rounded bg-[#E5E5E5]" />
              <div className="mt-2 h-1 w-8 rounded bg-[#E5E5E5]/70" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-[#64748B]">
        <span className="inline-flex h-2 w-2 rounded-full bg-[#F97316]/70" />
        Thermal printer ready
      </div>
    </div>
  );
}

function PricingBlock({ pricing, notes }: { pricing: string; notes: string[] }) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFB] p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0A0A0A]">
        Pricing model
      </div>
      <div className="mt-2 text-lg font-semibold text-[#0A0A0A]">
        {pricing}
      </div>
      {notes.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-xs text-[#6B7280]">
          {notes.map((note) => (
            <li key={note} className="flex items-center gap-2">
              <BadgeCheck size={12} className="text-[#6366F1]" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      data-cursor={children}
      className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#1a1a1a] hover:scale-[1.02]"
    >
      {children}
      <ArrowRight size={14} />
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      data-cursor={children}
      className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition-all duration-300 hover:border-[#6B7280]/40 hover:bg-white hover:scale-[1.02]"
    >
      {children}
      <ArrowRight size={14} />
    </Link>
  );
}

export default function ProductsPage() {
  const productsRef = useScrollRevealContainer<HTMLDivElement>();
  const deploymentRef = useScrollRevealContainer<HTMLDivElement>();
  const industriesRef = useScrollRevealContainer<HTMLDivElement>();
  const upcomingRef = useScrollRevealContainer<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <section className="relative overflow-hidden bg-page-soft section-header-space">
        <div className="ambient-glow hero-ambient-glow -top-36 -right-24 opacity-70" />
        <div className="ambient-glow hero-ambient-glow -bottom-48 -left-24 opacity-50" style={{ animationDelay: "-8s" }} />
        <div className="floating-dot hero-floating-dot w-2.5 h-2.5 top-[18%] left-[12%]" />
        <div className="floating-dot hero-floating-dot w-2 h-2 top-[62%] left-[78%]" style={{ animationDelay: "-3s" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6366F1]">
              AI infrastructure + business systems
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold tracking-[-0.03em] leading-[1.05] text-[#0A0A0A]">
              AI Products & Business Systems
            </h1>
            <p className="mt-5 text-base lg:text-lg text-[#6B7280] leading-relaxed">
              Ready-to-deploy AI systems customized for your brand, workflow, and business operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton href="/services">Explore Services</PrimaryButton>
              <SecondaryButton href="/contact">Book Consultation</SecondaryButton>
              <SecondaryButton href="/payment">Pay with PhonePe</SecondaryButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-xs text-[#6B7280]">
              {[
                "Enterprise-ready delivery",
                "Secure-by-design architecture",
                "Rapid deployment playbooks",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white/70 px-3 py-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]/70" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-page-white-soft section-space defer-render">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Featured Products"
            title="Ready-to-deploy AI systems."
            titleAccent="Built to scale."
            description="Premium AI products designed to plug into your operations with minimal lift and maximum impact."
          />

          <div ref={productsRef} className="grid gap-6 lg:grid-cols-2">
            {featuredProducts.map((product, i) => {
              const Icon = product.icon;
              const highlight = product.featured ? "lg:col-span-2" : "";
              return (
                <article
                  key={product.id}
                  className={`scroll-reveal group relative overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-[#D4D4D4] hover:shadow-xl ${highlight}`}
                  style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at top, ${product.accent}18, transparent 65%)`,
                    }}
                  />

                  <div className={`relative z-10 grid gap-6 ${product.preview ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
                    <div>
                      <div className="flex items-start gap-4">
                        <div
                          className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${product.accent}18` }}
                        >
                          <Icon size={20} style={{ color: product.accent }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight">
                            {product.title}
                          </h3>
                          {product.subtitle && (
                            <p className="mt-1 text-sm text-[#6B7280]">
                              {product.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-[#4B5563] leading-relaxed">
                        {product.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#E5E5E5] bg-white px-3 py-1 text-[11px] font-medium text-[#6B7280]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 rounded-lg border border-[#E5E5E5]/70 bg-[#FAFAFB] px-3 py-2 text-xs text-[#4B5563]">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: product.accent }} />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {product.deployments && (
                        <div className="mt-5">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0A0A0A]">
                            Deployment options
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {product.deployments.map((option) => (
                              <span
                                key={option}
                                className="rounded-full border border-[#E5E5E5] bg-white px-3 py-1 text-xs text-[#6B7280]"
                              >
                                {option}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6">
                        <PricingBlock pricing={product.pricing} notes={product.pricingNotes} />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {product.ctas.map((cta) =>
                          cta.variant === "primary" ? (
                            <PrimaryButton key={cta.label} href={cta.href}>
                              {cta.label}
                            </PrimaryButton>
                          ) : (
                            <SecondaryButton key={cta.label} href={cta.href}>
                              {cta.label}
                            </SecondaryButton>
                          )
                        )}
                      </div>
                    </div>

                    {product.preview && (
                      <div className="lg:pt-4">
                        <ProductPreview type={product.preview} />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-page-soft section-space defer-render">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Deployment Models"
            title="Deploy AI the way your business works."
            description="Flexible delivery models for internal platforms, SaaS rollouts, and fully tailored enterprise systems."
          />

          <div ref={deploymentRef} className="grid gap-5 md:grid-cols-3">
            {deploymentModels.map((model, i) => {
              const Icon = model.icon;
              return (
                <div
                  key={model.title}
                  className="scroll-reveal rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#D4D4D4] hover:shadow-lg"
                  style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366F1]/10">
                      <Icon size={20} className="text-[#6366F1]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0A0A]">
                      {model.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
                    {model.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-page-white-soft section-space defer-render">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Industries"
            title="Built for real-world operations."
            description="Products aligned with the data, workflows, and customer journeys of high-volume industries."
          />

          <div ref={industriesRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.title}
                  className="scroll-reveal group rounded-2xl border border-[#E5E5E5] bg-white p-5 transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-md"
                  style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6366F1]/10">
                      <Icon size={18} className="text-[#6366F1]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0A0A0A]">
                        {industry.title}
                      </h3>
                      <p className="text-xs text-[#6B7280]">AI-ready systems and infrastructure</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-page-soft section-space defer-render">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Coming Soon"
            title="Upcoming AI products in the pipeline."
            description="Futuristic AI assistants and operational platforms landing next across core business functions."
          />

          <div ref={upcomingRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingProducts.map((item, i) => (
              <div
                key={item}
                className="scroll-reveal relative overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white/80 p-5 shadow-sm transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-lg"
                style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6366F1]/10">
                    <Zap size={16} className="text-[#6366F1]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
                      Coming soon
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-[#0A0A0A]">
                      {item}
                    </h3>
                  </div>
                </div>
                <div className="mt-4 h-2 w-24 rounded-full bg-gradient-to-r from-[#6366F1]/25 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page-soft section-space">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={ctaRef} className="scroll-reveal rounded-3xl border border-[#E5E5E5] bg-white/80 p-8 text-center shadow-lg sm:p-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6366F1]/10">
              <Boxes size={22} className="text-[#6366F1]" />
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-[#0A0A0A]">
              Need a Custom AI Solution?
            </h2>
            <p className="mt-4 text-base text-[#6B7280] leading-relaxed">
              We build scalable AI-powered infrastructure for growing businesses.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <PrimaryButton href="/start">Schedule Strategy Call</PrimaryButton>
              <SecondaryButton href="/contact">Contact Team</SecondaryButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
