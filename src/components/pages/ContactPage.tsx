"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import PageHeader from "@/components/PageHeader";
import { CONTACT_EMAIL, buildWhatsAppUrl } from "@/lib/contact";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

const topicOptions = [
  "General question",
  "Partnership or collaboration",
  "Support on existing work",
  "Something else",
];

const whatsappContactHref = buildWhatsAppUrl("");

export default function ContactPage() {
  const canHover = useCanHover();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
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
    if (status === "sending") return;
    if (honeypot) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          submittedAt,
          website: honeypot,
          name: form.name,
          email: form.email,
          phone: form.phone,
          topic: form.topic,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const responseBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          responseBody?.error || "Could not send your message right now."
        );
      }

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", topic: "", message: "" });
      setHoneypot("");
      setSubmittedAt(Date.now());
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not send your message right now.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] text-sm placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/10";

  return (
    <>
      <PageHeader
        label="Contact"
        title="Say hello."
        description="Quick questions or introductions — we usually reply within a day. For a full project scope, use Start a project."
      />

      <section className="bg-page-soft section-space-bottom">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Left — minimal, different from /start */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease }}
              className="space-y-4 lg:col-span-2"
            >
              <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-white p-5 shadow-sm">
                <p className="text-sm font-medium text-[#0A0A0A]">Need a proposal or timeline?</p>
                <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                  Use the project brief — it asks for scope, budget, and timing so we can respond with a real plan.
                </p>
                <Link
                  href="/start"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Start a project
                  <ArrowRight size={14} />
                </Link>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-4 transition-all hover:border-[#D4D4D4] hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4]">
                  <Mail className="h-[18px] w-[18px] text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0A0A0A]">Email</div>
                  <div className="truncate text-sm text-[#6B7280] group-hover:text-[#374151]">
                    {CONTACT_EMAIL}
                  </div>
                </div>
              </a>

              <a
                href={whatsappContactHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-4 transition-all hover:border-[#D4D4D4]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4]">
                  <MessageCircle className="h-[18px] w-[18px] text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0A0A0A]">WhatsApp</div>
                  <div className="text-sm text-[#6B7280]">Chat with us</div>
                </div>
              </a>
            </motion.div>

            {/* Right — short form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease }}
              className="lg:col-span-3"
            >
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-[#E5E5E5] bg-white p-10 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-[#0A0A0A]">Thanks — got it.</h3>
                  <p className="mb-6 text-sm text-[#4B5563]">We&apos;ll reply soon. Watch your inbox (and spam, just in case).</p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                      setSubmittedAt(Date.now());
                    }}
                    className="text-sm font-medium text-emerald-700 hover:underline"
                  >
                    Send another note
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8"
                >
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

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#374151]">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
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
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#374151]">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
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

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#374151]">
                      Phone <span className="text-xs font-normal text-[#9CA3AF]">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      maxLength={32}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputBase}
                      placeholder="+91 …"
                    />
                  </div>

                  <div>
                    <label htmlFor="topic" className="mb-2 block text-sm font-semibold text-[#374151]">
                      Topic
                    </label>
                    <div className="relative">
                      <select
                        id="topic"
                        value={form.topic}
                        onChange={(e) => update("topic", e.target.value)}
                        className={`${inputBase} appearance-none pr-10 ${!form.topic ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                      >
                        <option value="">What&apos;s this about?</option>
                        {topicOptions.map((t) => (
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

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#374151]">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      minLength={10}
                      maxLength={5000}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${inputBase} resize-none leading-relaxed`}
                      placeholder="What’s on your mind?"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm text-red-600">
                        {errorMessage || "Could not send your message right now."} Email us at{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={canHover ? { scale: status === "sending" ? 1 : 1.02 } : undefined}
                    whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-[#6B7280]">No spam — we only use this to reply.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
