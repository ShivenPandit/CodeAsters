"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  Loader2,
  ArrowRight,
  ClipboardList,
  Sparkles,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { buildWhatsAppUrl } from "@/lib/contact";
import { useCanHover } from "@/lib/useCanHover";
import { useScrollReveal, useScrollRevealContainer } from "@/lib/useScrollReveal";
import type { CSSProperties } from "react";

const serviceOptions = [
  "Web Design & Development",
  "Frontend Engineering",
  "Backend Development",
  "Full-Stack Product",
  "Admin Dashboard / Internal Tools",
  "ERP / Business System",
  "E-commerce",
  "Mobile App",
  "UI/UX & Design Systems",
  "APIs & Integrations",
  "Cloud & Performance",
  "Automation",
  "Other / Not sure",
];

const budgetOptions = ["Not sure yet", "Under ~$5k", "$5k – $15k", "$15k – $50k", "$50k+"];

const timelineOptions = ["ASAP", "1–2 months", "3–6 months", "6+ months", "Flexible"];

const steps = [
  { n: "01", title: "Send the brief", detail: "Goals, scope, budget, timing — the more context, the sharper our reply." },
  { n: "02", title: "We review", detail: "Usually within 24 hours with questions or a proposed direction." },
  { n: "03", title: "Next steps", detail: "Scope, timeline, and how we’d collaborate if it’s a fit." },
];

const whatsappContactHref = buildWhatsAppUrl("");

export default function StartProjectPage() {
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  const stepsContainerRef = useScrollRevealContainer<HTMLUListElement>();
  const formContainerRef = useScrollReveal<HTMLDivElement>({ margin: "-30px" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [submittedAt, setSubmittedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const setThankYouParam = (enabled: boolean) => {
    if (typeof window === "undefined") return;

    const nextUrl = new URL(window.location.href);
    if (enabled) {
      nextUrl.searchParams.set("thank-you", "true");
    } else {
      nextUrl.searchParams.delete("thank-you");
    }

    window.history.replaceState(window.history.state, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  };

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
          formType: "project",
          submittedAt,
          website: honeypot,
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          service: form.service,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const responseBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          responseBody?.error || "Could not send your project brief right now."
        );
      }

      setThankYouParam(true);
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
      });
      setHoneypot("");
      setSubmittedAt(Date.now());
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not send your project brief right now.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] text-sm placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10";

  const ambientOn = !reduceMotion;

  return (
    <>
      <PageHeader
        label="Project brief"
        title="Start a project"
        description={`Share goals, scope, and timing. We'll reply with a clear outline — scope, timeline, and how we'd work together.`}
      />

      <section className="relative overflow-hidden bg-page-soft section-space-bottom pt-3 md:pt-4">
        {/* Theme-aligned ambient — soft indigo / violet (same family as site), not a dark block */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {ambientOn && (
            <>
              <div
                className="ambient-blob-loop absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#6366F1]/[0.09] blur-3xl"
                style={{
                  "--ambient-duration": "14s",
                  "--ambient-delay": "0s",
                  "--ambient-o-min": 0.45,
                  "--ambient-o-max": 0.75,
                  "--ambient-scale": 1.05,
                } as CSSProperties & Record<string, string | number>}
              />
              <div
                className="ambient-blob-loop absolute -bottom-32 -left-24 h-[22rem] w-[22rem] rounded-full bg-[#8B5CF6]/[0.07] blur-3xl"
                style={{
                  "--ambient-duration": "11s",
                  "--ambient-delay": "1s",
                  "--ambient-o-min": 0.35,
                  "--ambient-o-max": 0.65,
                  "--ambient-scale": 1,
                } as CSSProperties & Record<string, string | number>}
              />
              <div
                className="ambient-blob-loop absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/[0.06] blur-2xl"
                style={{
                  "--ambient-duration": "9s",
                  "--ambient-delay": "0.5s",
                  "--ambient-o-min": 0.25,
                  "--ambient-o-max": 0.5,
                  "--ambient-scale": 1,
                } as CSSProperties & Record<string, string | number>}
              />
            </>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.06),transparent)]" />
        </div>

        <div className="relative z-[1] mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Aside — scannable, light UI */}
            <aside className="space-y-6 lg:col-span-4">
              <div
                className="rounded-2xl border border-[#E5E5E5] bg-white/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6366F1]">
                  <ClipboardList className="h-3.5 w-3.5" strokeWidth={2} />
                  How it works
                </div>
                <ul ref={stepsContainerRef} className="space-y-4">
                  {steps.map((s, i) => (
                    <li
                      key={s.n}
                      className="scroll-reveal flex gap-3"
                      style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6366F1]/10 text-xs font-bold text-[#6366F1]">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#0A0A0A]">{s.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#64748B]">{s.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl border border-[#E5E5E5] bg-white/90 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0A0A0A]">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1]/10 ${ambientOn ? "ambient-icon-pulse" : ""}`}
                  >
                    <Sparkles className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
                  </span>
                  Quick signals
                </div>
                <ul className="space-y-2.5 text-sm text-[#64748B]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Same-day acknowledgment when possible
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#6366F1]" />
                    <a href="mailto:codeasters@gmail.com" className="font-medium text-[#0A0A0A] hover:text-[#6366F1]">
                      codeasters@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <a
                      href={whatsappContactHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-tight"
                    >
                      <span className="block text-sm font-semibold text-[#0A0A0A]">WhatsApp</span>
                      <span className="block text-xs text-[#6B7280] hover:text-[#374151]">Chat with us</span>
                    </a>
                  </li>
                </ul>
              </div>

              <p
                className="px-1 text-center text-xs text-[#94A3B8] lg:text-left"
              >
                Just saying hi?{" "}
                <Link href="/contact" className="font-medium text-[#6366F1] hover:underline">
                  General contact
                </Link>
              </p>
            </aside>

            {/* Form — unchanged fields, refined shell */}
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
                  <h2 className="mb-2 text-xl font-semibold text-[#0A0A0A]">Brief received</h2>
                  <p className="mb-6 text-sm text-[#64748B]">
                    We&apos;ll review and get back within 24 hours with next steps.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                      setSubmittedAt(Date.now());
                      setThankYouParam(false);
                    }}
                    className="text-sm font-medium text-[#6366F1] hover:underline"
                  >
                    Submit another brief
                  </button>
                </motion.div>
              ) : (
                <div
                  ref={formContainerRef}
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
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/25 to-transparent rounded-t-2xl" />

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
                        <p className="text-sm font-semibold text-[#0A0A0A]">Project brief</p>
                        <p className="text-xs text-[#64748B]">All fields marked * are required.</p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="sp-name" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="sp-name"
                          required
                          minLength={2}
                          maxLength={80}
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className={inputBase}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="sp-email" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="sp-email"
                          type="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={inputBase}
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="sp-phone" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Phone <span className="text-xs font-normal text-[#9CA3AF]">(optional)</span>
                        </label>
                        <input
                          id="sp-phone"
                          type="tel"
                          maxLength={32}
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={inputBase}
                          placeholder="+91 …"
                        />
                      </div>
                      <div>
                        <label htmlFor="sp-company" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Company / org
                        </label>
                        <input
                          id="sp-company"
                          maxLength={120}
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          className={inputBase}
                          placeholder="Acme Inc."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sp-service" className="mb-2 block text-sm font-semibold text-[#374151]">
                        What do you need? <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="sp-service"
                          required
                          value={form.service}
                          onChange={(e) => update("service", e.target.value)}
                          className={`${inputBase} appearance-none pr-10 ${!form.service ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                        >
                          <option value="" disabled>
                            Select an area
                          </option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
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

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="sp-budget" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Budget range
                        </label>
                        <div className="relative">
                          <select
                            id="sp-budget"
                            value={form.budget}
                            onChange={(e) => update("budget", e.target.value)}
                            className={`${inputBase} appearance-none pr-10 ${!form.budget ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                          >
                            <option value="">Select (optional)</option>
                            {budgetOptions.map((b) => (
                              <option key={b} value={b}>
                                {b}
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
                        <label htmlFor="sp-timeline" className="mb-2 block text-sm font-semibold text-[#374151]">
                          Timeline
                        </label>
                        <div className="relative">
                          <select
                            id="sp-timeline"
                            value={form.timeline}
                            onChange={(e) => update("timeline", e.target.value)}
                            className={`${inputBase} appearance-none pr-10 ${!form.timeline ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                          >
                            <option value="">Select (optional)</option>
                            {timelineOptions.map((t) => (
                              <option key={t} value={t}>
                                {t}
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
                    </div>

                    <div>
                      <label htmlFor="sp-message" className="mb-2 block text-sm font-semibold text-[#374151]">
                        Project details <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="sp-message"
                        required
                        rows={6}
                        minLength={20}
                        maxLength={8000}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={`${inputBase} resize-none leading-relaxed`}
                        placeholder="Goals, users, integrations, links to references…"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="text-sm text-red-600">
                          {errorMessage || "Something went wrong."} Email{" "}
                          <a href="mailto:codeasters@gmail.com" className="font-medium underline">
                            codeasters@gmail.com
                          </a>{" "}
                          directly.
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
                          Sending brief…
                        </>
                      ) : (
                        <>
                          Submit project brief
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#6B7280]">
                      Prefer a lighter touch?{" "}
                      <Link href="/contact" className="font-medium text-[#6366F1] hover:underline">
                        General contact
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
