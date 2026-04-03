"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Copy,
  DollarSign,
  Loader2,
  LogOut,
  MessageSquare,
  Plus,
  Send,
  TrendingUp,
  User,
  X,
  Eye,
} from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface AffiliateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  city: string;
  experienceLevel: string;
  referralId: string;
  isAdmin: boolean;
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  pending: number;
  contacted: number;
  converted: number;
  rejected: number;
  totalEarnings: number;
}

interface Lead {
  _id: string;
  affiliateId: string;
  clientName: string;
  clientContact: string;
  projectType: string;
  projectBudget: string;
  projectDescription: string;
  deadline: string;
  status: string;
  commissionAmount: number;
  adminNotes: string;
  createdAt: string;
  affiliateName?: string;
  affiliateEmail?: string;
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Contacted: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  Converted: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Rejected: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

const projectTypes = ["Website", "App", "AI", "ERP", "Dashboard", "Other"] as const;

export default function AffiliateDashboard() {
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const ambientOn = !reduceMotion;

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState<Lead | null>(null);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");

  // Admin state
  const [adminEditingLead, setAdminEditingLead] = useState<string | null>(null);
  const [adminStatus, setAdminStatus] = useState("");
  const [adminCommission, setAdminCommission] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [adminSaving, setAdminSaving] = useState(false);

  const [leadForm, setLeadForm] = useState({
    clientName: "",
    clientContact: "",
    projectType: "",
    projectBudget: "",
    projectDescription: "",
    deadline: "",
  });

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/affiliate/me");
      if (!res.ok) {
        router.push("/be-a-codeaster");
        return;
      }
      const data = await res.json();
      setProfile(data.affiliate);
      setStats(data.stats);
    } catch {
      router.push("/be-a-codeaster");
    }
  }, [router]);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/affiliate/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchProfile(), fetchLeads()]).finally(() => setLoading(false));
  }, [fetchProfile, fetchLeads]);

  const handleLogout = async () => {
    await fetch("/api/affiliate/logout", { method: "POST" });
    router.push("/be-a-codeaster");
  };

  const copyReferralId = () => {
    if (!profile) return;
    navigator.clipboard.writeText(profile.referralId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadSubmitting(true);
    setLeadError("");

    try {
      const res = await fetch("/api/affiliate/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm),
      });

      const data = await res.json();
      if (!res.ok) {
        setLeadError(data.error || "Failed to submit lead.");
        setLeadSubmitting(false);
        return;
      }

      setLeadForm({
        clientName: "",
        clientContact: "",
        projectType: "",
        projectBudget: "",
        projectDescription: "",
        deadline: "",
      });
      setShowLeadForm(false);
      setLeadSubmitting(false);
      await Promise.all([fetchLeads(), fetchProfile()]);
    } catch {
      setLeadError("Network error. Please try again.");
      setLeadSubmitting(false);
    }
  };

  const handleAdminUpdate = async (leadId: string) => {
    setAdminSaving(true);
    try {
      const body: Record<string, unknown> = {};
      if (adminStatus) body.status = adminStatus;
      if (adminCommission) body.commissionAmount = Number(adminCommission);
      if (adminNotes) body.adminNotes = adminNotes;

      const res = await fetch(`/api/affiliate/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setAdminEditingLead(null);
        setAdminStatus("");
        setAdminCommission("");
        setAdminNotes("");
        await Promise.all([fetchLeads(), fetchProfile()]);
      }
    } catch {
      // silent
    } finally {
      setAdminSaving(false);
    }
  };

  const updateLead = (field: string, value: string) =>
    setLeadForm((prev) => ({ ...prev, [field]: value }));

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] text-sm placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10";

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-page-soft">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#6366F1]" />
          <p className="text-sm text-[#64748B]">Loading your dashboard…</p>
        </div>
      </section>
    );
  }

  if (!profile || !stats) return null;

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, icon: Send, color: "text-[#6366F1]", bg: "bg-[#6366F1]/10" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10" },
    { label: "Converted", value: stats.converted, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-500/10" },
    { label: "Earnings", value: `₹${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: "text-fuchsia-600", bg: "bg-fuchsia-500/10" },
  ];

  return (
    <section className="relative min-h-screen bg-page-soft pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {ambientOn && (
          <>
            <motion.div
              className="absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[#6366F1]/[0.05] blur-3xl"
              animate={{ opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -left-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-emerald-500/[0.04] blur-3xl"
              animate={{ opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#6366F1]">
              Dashboard
            </span>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#0A0A0A] sm:text-3xl">
              Welcome back, {profile.fullName.split(" ")[0]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={canHover ? { scale: 1.02 } : undefined}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowLeadForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#1a1a1a]"
            >
              <Plus size={16} />
              Submit New Lead
            </motion.button>
            <button
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] text-[#6B7280] transition-colors hover:border-red-200 hover:text-red-500"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </motion.div>

        {/* Profile Card + Referral ID */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="rounded-2xl border border-[#E5E5E5] bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:col-span-2 lg:col-span-2">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6366F1]/10">
                <User className="h-6 w-6 text-[#6366F1]" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-[#0A0A0A]">{profile.fullName}</h2>
                <p className="text-sm text-[#64748B]">{profile.email} · {profile.phone}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#FAFAFA] border border-[#E5E5E5] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
                    {profile.city}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#6366F1]/10 px-2.5 py-0.5 text-xs font-medium text-[#6366F1]">
                    {profile.experienceLevel}
                  </span>
                  {profile.isAdmin && (
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#6366F1]/15 bg-gradient-to-br from-[#6366F1]/5 to-transparent p-5 shadow-sm backdrop-blur-sm">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-[#6366F1]">
              Your Referral ID
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl font-bold text-[#0A0A0A]">{profile.referralId}</span>
              <motion.button
                whileHover={canHover ? { scale: 1.1 } : undefined}
                whileTap={{ scale: 0.9 }}
                onClick={copyReferralId}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#6B7280] transition-colors hover:border-[#6366F1]/30 hover:text-[#6366F1]"
                aria-label="Copy referral ID"
              >
                {copied ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </motion.button>
            </div>
            <p className="mt-2 text-xs text-[#94A3B8]">
              {copied ? "Copied!" : "Share this ID with your leads"}
            </p>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
          className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + 0.06 * i, ease }}
              className="group rounded-2xl border border-[#E5E5E5] bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
            >
              <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} strokeWidth={2} />
              </div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{stat.value}</p>
              <p className="text-xs text-[#64748B]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease }}
          className="rounded-2xl border border-[#E5E5E5] bg-white/80 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-[#F0F0F0] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#0A0A0A]">
              {profile.isAdmin ? "All Leads" : "Your Leads"}{" "}
              <span className="font-normal text-[#94A3B8]">({leads.length})</span>
            </h2>
            <motion.button
              whileHover={canHover ? { scale: 1.02 } : undefined}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowLeadForm(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] px-3 py-1.5 text-xs font-medium text-[#6B7280] transition-colors hover:border-[#6366F1]/30 hover:text-[#6366F1]"
            >
              <Plus size={12} />
              New Lead
            </motion.button>
          </div>

          {leads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAFA]">
                <Send className="h-5 w-5 text-[#94A3B8]" />
              </div>
              <p className="text-sm text-[#64748B]">No leads yet. Submit your first project lead!</p>
              <motion.button
                whileHover={canHover ? { scale: 1.02 } : undefined}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowLeadForm(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a1a1a]"
              >
                <Plus size={14} />
                Submit Lead
              </motion.button>
            </div>
          ) : (
            <div className="divide-y divide-[#F0F0F0]">
              {leads.map((lead) => {
                const sc = statusColors[lead.status] || statusColors.Pending;
                return (
                  <div key={lead._id} className="group px-5 py-4 transition-colors hover:bg-[#FAFAFA]/60">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-[#0A0A0A]">{lead.clientName}</h3>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.text}`}>
                            <span className={`h-1 w-1 rounded-full ${sc.dot}`} />
                            {lead.status}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#64748B]">
                          {lead.projectType} · {lead.projectBudget}
                          {lead.affiliateName && ` · by ${lead.affiliateName}`}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-[#94A3B8]">{lead.projectDescription}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {lead.commissionAmount > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            <DollarSign size={10} />₹{lead.commissionAmount.toLocaleString()}
                          </span>
                        )}
                        <button
                          onClick={() => setShowLeadDetail(lead)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#6B7280] transition-colors hover:border-[#6366F1]/30 hover:text-[#6366F1]"
                        >
                          <Eye size={14} />
                        </button>
                        {profile.isAdmin && (
                          <button
                            onClick={() => {
                              setAdminEditingLead(lead._id);
                              setAdminStatus(lead.status);
                              setAdminCommission(lead.commissionAmount?.toString() || "0");
                              setAdminNotes(lead.adminNotes || "");
                            }}
                            className="flex h-8 items-center gap-1 rounded-lg border border-[#E5E5E5] px-2 text-xs text-[#6B7280] transition-colors hover:border-amber-300 hover:text-amber-600"
                          >
                            <TrendingUp size={12} />
                            Manage
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Admin inline edit */}
                    <AnimatePresence>
                      {profile.isAdmin && adminEditingLead === lead._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className="rounded-xl border border-amber-200/50 bg-amber-50/50 p-4">
                            <div className="grid gap-3 sm:grid-cols-3">
                              <div>
                                <label className="mb-1 block text-xs font-medium text-[#374151]">Status</label>
                                <select
                                  value={adminStatus}
                                  onChange={(e) => setAdminStatus(e.target.value)}
                                  className={`${inputBase} text-xs py-2`}
                                >
                                  {["Pending", "Contacted", "Converted", "Rejected"].map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-[#374151]">Commission (₹)</label>
                                <input
                                  type="number"
                                  value={adminCommission}
                                  onChange={(e) => setAdminCommission(e.target.value)}
                                  className={`${inputBase} text-xs py-2`}
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-[#374151]">Notes</label>
                                <input
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  className={`${inputBase} text-xs py-2`}
                                  placeholder="Internal notes…"
                                />
                              </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                onClick={() => handleAdminUpdate(lead._id)}
                                disabled={adminSaving}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1a1a1a] disabled:opacity-50"
                              >
                                {adminSaving ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                                Save
                              </button>
                              <button
                                onClick={() => setAdminEditingLead(null)}
                                className="text-xs text-[#6B7280] hover:text-[#0A0A0A]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Lead Submit Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            onClick={() => setShowLeadForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366F1]/10">
                    <MessageSquare className="h-4 w-4 text-[#6366F1]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A]">Submit New Lead</p>
                    <p className="text-xs text-[#64748B]">Share a potential project opportunity.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLeadForm(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#FAFAFA] hover:text-[#0A0A0A]"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ld-name" className="mb-1.5 block text-sm font-semibold text-[#374151]">
                      Client Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ld-name"
                      required
                      value={leadForm.clientName}
                      onChange={(e) => updateLead("clientName", e.target.value)}
                      className={inputBase}
                      placeholder="Client's name"
                    />
                  </div>
                  <div>
                    <label htmlFor="ld-contact" className="mb-1.5 block text-sm font-semibold text-[#374151]">
                      Client Email / Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ld-contact"
                      required
                      value={leadForm.clientContact}
                      onChange={(e) => updateLead("clientContact", e.target.value)}
                      className={inputBase}
                      placeholder="client@email.com or phone"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ld-type" className="mb-1.5 block text-sm font-semibold text-[#374151]">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="ld-type"
                        required
                        value={leadForm.projectType}
                        onChange={(e) => updateLead("projectType", e.target.value)}
                        className={`${inputBase} appearance-none pr-10 ${!leadForm.projectType ? "text-[#9CA3AF]" : "text-[#0A0A0A]"}`}
                      >
                        <option value="" disabled>Select type</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
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
                    <label htmlFor="ld-budget" className="mb-1.5 block text-sm font-semibold text-[#374151]">
                      Project Budget <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ld-budget"
                      required
                      value={leadForm.projectBudget}
                      onChange={(e) => updateLead("projectBudget", e.target.value)}
                      className={inputBase}
                      placeholder="e.g. ₹50,000 or $5,000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ld-desc" className="mb-1.5 block text-sm font-semibold text-[#374151]">
                    Project Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="ld-desc"
                    required
                    rows={4}
                    value={leadForm.projectDescription}
                    onChange={(e) => updateLead("projectDescription", e.target.value)}
                    className={`${inputBase} resize-none leading-relaxed`}
                    placeholder="What does the client need? Any tech preferences, references…"
                  />
                </div>

                <div>
                  <label htmlFor="ld-deadline" className="mb-1.5 block text-sm font-semibold text-[#374151]">
                    Deadline{" "}
                    <span className="text-xs font-normal text-[#9CA3AF]">(optional)</span>
                  </label>
                  <input
                    id="ld-deadline"
                    value={leadForm.deadline}
                    onChange={(e) => updateLead("deadline", e.target.value)}
                    className={inputBase}
                    placeholder="e.g. End of May 2026"
                  />
                </div>

                {leadError && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{leadError}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={leadSubmitting}
                  whileHover={canHover ? { scale: leadSubmitting ? 1 : 1.02 } : undefined}
                  whileTap={{ scale: leadSubmitting ? 1 : 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {leadSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Lead
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {showLeadDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            onClick={() => setShowLeadDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-md rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#0A0A0A]">Lead Details</h3>
                <button
                  onClick={() => setShowLeadDetail(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#FAFAFA]"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Client", value: showLeadDetail.clientName },
                  { label: "Contact", value: showLeadDetail.clientContact },
                  { label: "Project", value: `${showLeadDetail.projectType} · ${showLeadDetail.projectBudget}` },
                  { label: "Description", value: showLeadDetail.projectDescription },
                  { label: "Deadline", value: showLeadDetail.deadline || "Not specified" },
                  { label: "Status", value: showLeadDetail.status },
                  ...(showLeadDetail.commissionAmount > 0
                    ? [{ label: "Commission", value: `₹${showLeadDetail.commissionAmount.toLocaleString()}` }]
                    : []),
                  ...(showLeadDetail.adminNotes
                    ? [{ label: "Admin Notes", value: showLeadDetail.adminNotes }]
                    : []),
                  { label: "Submitted", value: new Date(showLeadDetail.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-medium text-[#94A3B8]">{item.label}</p>
                    <p className="text-sm text-[#0A0A0A]">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
