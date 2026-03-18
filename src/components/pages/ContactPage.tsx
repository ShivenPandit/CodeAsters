"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, CheckCircle, Loader2, ArrowRight, Clock } from "lucide-react";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import PageHeader from "@/components/PageHeader";

const ease = [0.25, 0.1, 0.25, 1] as const;

const EMAILJS_SERVICE_ID = "service_3zcdde9";
const EMAILJS_TEMPLATE_CONTACT = "template_vbd0nmv";
const EMAILJS_PUBLIC_KEY = "Tp5Pjp94y14gtbUti";

const serviceOptions = [
  "Website Design & Development",
  "Admin Dashboard",
  "Business System",
  "UI/UX Design",
  "Performance Optimization",
  "Ongoing Support",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (honeypot) return;

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_CONTACT,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] text-sm placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10";

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's discuss your project."
        description="Tell us what you're building. We'll respond within 24 hours with a clear outline of how we can help."
      />

      <section className="pb-24 bg-[#FAFAFB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="lg:col-span-2 space-y-4"
            >
              <a
                href="mailto:codeasters@gmail.com"
                className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E5E5] bg-white transition-all duration-300 hover:shadow-md hover:border-[#D4D4D4] group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#6366F1]/8 flex items-center justify-center shrink-0">
                  <Mail className="w-[18px] h-[18px] text-[#6366F1]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0A0A0A]">Email</div>
                  <div className="text-sm text-[#6B7280]">codeasters@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#D4D4D4] transition-colors duration-300">
                <div className="w-11 h-11 rounded-lg bg-[#6366F1]/8 flex items-center justify-center shrink-0">
                  <MapPin className="w-[18px] h-[18px] text-[#6366F1]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0A0A0A]">Location</div>
                  <div className="text-sm text-[#6B7280]">India — Working Globally</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#D4D4D4] transition-colors duration-300">
                <div className="w-11 h-11 rounded-lg bg-[#6366F1]/8 flex items-center justify-center shrink-0">
                  <Clock className="w-[18px] h-[18px] text-[#6366F1]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0A0A0A]">Response Time</div>
                  <div className="text-sm text-[#6B7280]">Within 24 hours</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#6366F1]/5 border border-[#6366F1]/10">
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  <span className="font-semibold text-[#0A0A0A]">How it works:</span>{" "}
                  Share your project details through the form. We&apos;ll review your
                  requirements and reply with a clear scope, estimated timeline, and next steps.
                </p>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease }}
              className="lg:col-span-3"
            >
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 rounded-2xl border border-[#E5E5E5] bg-white shadow-sm text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">Message received.</h3>
                  <p className="text-sm text-[#4B5563] mb-6">
                    Thank you for reaching out. We&apos;ll review your project details and
                    respond within 24 hours with a clear next step.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm font-medium text-[#6366F1] hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 lg:p-8 rounded-2xl border border-[#E5E5E5] bg-white shadow-sm hover:shadow-md transition-shadow duration-500 space-y-5"
                >
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#374151] mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className={inputBase}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#374151] mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputBase}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#374151] mb-2">
                        Phone <span className="text-xs font-normal text-[#9CA3AF]">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={inputBase}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-[#374151] mb-2">
                        Service Needed <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          required
                          value={form.service}
                          onChange={(e) => update("service", e.target.value)}
                          className={`${inputBase} appearance-none pr-10 ${!form.service ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s} className="text-[#0A0A0A]">
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
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#374151] mb-2">
                      Project Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${inputBase} resize-none leading-relaxed`}
                      placeholder="Describe your project goals, requirements, and timeline..."
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-200">
                      <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again or email us directly at{" "}
                        <a href="mailto:codeasters@gmail.com" className="underline font-medium">
                          codeasters@gmail.com
                        </a>
                      </p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-8 bg-[#0A0A0A] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-colors duration-200 shadow-md"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-[#6B7280]">
                    Your information is secure and never shared with third parties.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
