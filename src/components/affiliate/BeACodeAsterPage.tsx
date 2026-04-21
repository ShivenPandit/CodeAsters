"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Sparkles,
  Clock,
  DollarSign,
  Globe,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import {
  CONTACT_WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from "@/lib/contact";
import { useCanHover } from "@/lib/useCanHover";
import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

const experienceOptions = ["Beginner", "Intermediate", "Expert"];

const perks = [
  {
    icon: DollarSign,
    title: "Up to 30% commission",
    description: "Earn on every converted project lead you introduce.",
  },
  {
    icon: Clock,
    title: "Flexible contribution",
    description: "No fixed hours. Refer leads from your own network and pace.",
  },
  {
    icon: Globe,
    title: "Open globally",
    description: "You can refer clients from any city or country.",
  },
];

const programFlow = [
  {
    n: "01",
    title: "Get a project lead",
    detail: "Identify a business owner, founder, or team that needs website, app, ERP, or software work.",
  },
  {
    n: "02",
    title: "Share lead details",
    detail: "Submit their context, requirements, and contact details through this form.",
  },
  {
    n: "03",
    title: "Deal gets locked",
    detail: "Our team handles calls, scoping, proposal, and closure with the client.",
  },
  {
    n: "04",
    title: "Receive commission",
    detail: "After conversion and milestone confirmation, your affiliate payout is processed.",
  },
];

const payoutTiers = [
  { tier: "Starter", rate: "15%", condition: "First 3 converted deals" },
  { tier: "Growing", rate: "20%", condition: "4 to 10 converted deals" },
  { tier: "Pro", rate: "25%", condition: "11 to 25 converted deals" },
  { tier: "Elite", rate: "30%", condition: "25+ converted deals" },
];

const whatsappContactHref = buildWhatsAppUrl("");

export default function BeACodeAsterPage() {
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  const ambientOn = !reduceMotion;
  const howItWorksRef = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const stepsRef = useScrollRevealContainer<HTMLDivElement>();
  const payoutRef = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const payoutTiersRef = useScrollRevealContainer<HTMLDivElement>();
  const perksRef = useScrollRevealContainer<HTMLUListElement>();
  const formRef = useScrollReveal<HTMLDivElement>({ margin: "-30px" });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    linkedin: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [submittedAt, setSubmittedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || honeypot) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "affiliate",
          submittedAt,
          website: honeypot,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          city: form.city,
          experience: form.experience,
          linkedin: form.linkedin,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const responseBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          responseBody?.error || "Could not send your details right now."
        );
      }

      setStatus("sent");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        experience: "",
        linkedin: "",
        message: "",
      });
      setHoneypot("");
      setSubmittedAt(Date.now());
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not send your details right now.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] text-sm placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10";

  return (
    <>
      <PageHeader
        label="Be a CodeAster"
        title="Join as a referral partner"
        description="Share your details and network context. We will review your submission and get in touch soon."
      />

      <section className="relative overflow-hidden bg-page-soft section-space-bottom pt-3 md:pt-4">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {ambientOn && (
            <>
              <motion.div
                className="absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#6366F1]/[0.09] blur-3xl"
                animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.05, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-32 -left-24 h-[22rem] w-[22rem] rounded-full bg-[#8B5CF6]/[0.07] blur-3xl"
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.06),transparent)]" />
        </div>

        <div className="relative z-[1] mx-auto max-w-6xl px-6 lg:px-8">
          <div
            ref={howItWorksRef}
            className="scroll-reveal mb-8"
          >
            <h2 className="mb-6 text-2xl font-semibold tracking-[-0.02em] text-[#0A0A0A] sm:text-3xl">
              How this program works
            </h2>
            <div ref={stepsRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {programFlow.map((step, i) => (
                <div
                  key={step.n}
                  className="scroll-reveal rounded-2xl border border-[#E5E5E5] bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                  style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                >
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1]/10 text-xs font-bold text-[#6366F1]">
                    {step.n}
                  </span>
                  <p className="mb-1 text-sm font-semibold text-[#0A0A0A]">{step.title}</p>
                  <p className="text-xs leading-relaxed text-[#64748B]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={payoutRef}
            className="scroll-reveal mb-8 rounded-2xl border border-[#E5E5E5] bg-white/80 p-6 shadow-sm backdrop-blur-sm"
            style={{ "--reveal-delay": "50ms" } as CSSProperties}
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6366F1]">
                Commission and payout
              </h3>
            </div>
            <div ref={payoutTiersRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {payoutTiers.map((item, i) => (
                <div
                  key={item.tier}
                  className="scroll-reveal rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4"
                  style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}
                >
                  <p className="text-sm font-semibold text-[#0A0A0A]">{item.tier}</p>
                  <p className="mt-1 text-lg font-bold text-[#6366F1]">{item.rate}</p>
                  <p className="mt-1 text-xs text-[#64748B]">{item.condition}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <aside className="space-y-6 lg:col-span-4">
              <div
                className="rounded-2xl border border-[#E5E5E5] bg-white/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6366F1]">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                  Why Join
                </div>
                <ul ref={perksRef} className="space-y-4">
                  {perks.map((perk, i) => {
                    const Icon = perk.icon;
                    return (
                      <li
                        key={perk.title}
                        className="scroll-reveal flex gap-3"
                        style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#0A0A0A]">{perk.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#64748B]">{perk.description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div
                className="rounded-2xl border border-[#E5E5E5] bg-white/90 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0A0A0A]">
                  <MessageCircle className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
                  Need direct help?
                </div>
                <p className="text-sm leading-relaxed text-[#64748B]">
                  You can also reach us directly for faster coordination.
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={whatsappContactHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center gap-2 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2 transition-colors hover:bg-white"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" strokeWidth={2} />
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold text-[#0A0A0A]">WhatsApp</span>
                      <span className="block text-xs text-[#64748B] group-hover:text-[#374151]">
                        Chat with us
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="rounded-2xl border border-[#E5E5E5] bg-white p-10 text-center shadow-[0_20px_50px_-28px_rgba(99,102,241,0.15)]"
                >
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.05 }}
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10"
                  >
                    <CheckCircle className="h-7 w-7 text-emerald-600" strokeWidth={2} />
                  </motion.div>
                  <h2 className="mb-2 text-xl font-semibold text-[#0A0A0A]">Submission received</h2>
                  <p className="mb-6 text-sm text-[#64748B]">
                    Thanks for reaching out. We&apos;ll get in touch soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                      setSubmittedAt(Date.now());
                    }}
                    className="text-sm font-medium text-[#6366F1] hover:underline"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <div
                  ref={formRef}
                  className="scroll-reveal relative"
                >
                  <div className="pointer-events-none absolute -inset-px rounded-[1.05rem] bg-gradient-to-b from-white/80 to-transparent opacity-90" />
                  <motion.form
                    onSubmit={handleSubmit}
                    className="relative space-y-5 rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.12)] sm:p-8"
                    whileHover={
                      canHover && ambientOn
                        ? { boxShadow: "0 28px 70px -26px rgba(99, 102, 241, 0.12)" }
                        : undefined
                    }
                    transition={{ duration: 0.35 }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#6366F1]/25 to-transparent" />

                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                    />

                    <div className="mb-1 flex items-center gap-2 border-b border-[#F0F0F0] pb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366F1]/10">
                        <Send className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A0A0A]">Be a CodeAster form</p>
                        <p className="text-xs text-[#64748B]">All fields marked * are required.</p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ca-name" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Full name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ca-name"
                          required
                          minLength={2}
                          maxLength={80}
                          value={form.fullName}
                          onChange={(e) => update("fullName", e.target.value)}
                          className={inputBase}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="ca-email" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ca-email"
                          type="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputBase}
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ca-phone" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Phone number <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ca-phone"
                          type="tel"
                          required
                          maxLength={32}
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputBase}
                          placeholder="+91 ..."
                        />
                      </div>
                      <div>
                        <label htmlFor="ca-city" className="mb-2 block text-sm font-semibold text-[#374151]">
                          City / location <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="ca-city"
                          required
                          maxLength={80}
                          value={form.city}
                          onChange={(e) => update("city", e.target.value)}
                          className={inputBase}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ca-experience" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Experience level <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="ca-experience"
                            required
                            value={form.experience}
                            onChange={(e) => update("experience", e.target.value)}
                            className={`${inputBase} appearance-none pr-10 ${!form.experience ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                          >
                            <option value="" disabled>
                              Select level
                            </option>
                            {experienceOptions.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                            <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="ca-linkedin" className="mb-2 block text-sm font-semibold text-[#374151]">
                          LinkedIn / portfolio
                        </label>
                        <input
                          id="ca-linkedin"
                          maxLength={160}
                          value={form.linkedin}
                          onChange={(e) => update("linkedin", e.target.value)}
                          className={inputBase}
                          placeholder="linkedin.com/in/..."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ca-message" className="mb-2 block text-sm font-semibold text-[#374151]">
                        Tell us about your network or potential leads <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="ca-message"
                        required
                        rows={6}
                        minLength={10}
                        maxLength={5000}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={`${inputBase} resize-none leading-relaxed`}
                        placeholder="What kind of clients can you introduce? Any relevant context..."
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="text-sm text-red-600">
                          {errorMessage || "Could not send right now."} Please message us at{" "}
                          <a
                            href={whatsappContactHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline"
                          >
                            {CONTACT_WHATSAPP_DISPLAY}
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#1a1a1a] hover:scale-[1.02] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending details...
                        </>
                      ) : (
                        <>
                          Submit details
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#6B7280]">
                      Looking for project delivery instead?{" "}
                      <Link href="/start" className="font-medium text-[#6366F1] hover:underline">
                        Start a project
                      </Link>
                    </p>
                  </motion.form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
