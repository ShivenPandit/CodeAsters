"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, XCircle, Clock } from "lucide-react";

type StatusState = "loading" | "completed" | "failed" | "pending" | "error";

type StatusResponse = {
  state?: string;
  amount?: number;
  paymentDetails?: Array<{ state?: string }>;
  errorContext?: {
    description?: string;
    errorCode?: string;
    detailedErrorCode?: string;
  };
};

export default function PhonePeReturnStatus({ merchantOrderId }: { merchantOrderId: string }) {
  const [resolvedOrderId, setResolvedOrderId] = useState(merchantOrderId);
  const [status, setStatus] = useState<StatusState>("loading");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (merchantOrderId) {
      if (merchantOrderId !== resolvedOrderId) {
        setResolvedOrderId(merchantOrderId);
      }
      return;
    }

    if (typeof window === "undefined") return;

    try {
      const stored =
        window.sessionStorage.getItem("phonepe:merchantOrderId") ||
        window.localStorage.getItem("phonepe:merchantOrderId");
      if (stored && stored !== resolvedOrderId) {
        setResolvedOrderId(stored);
      }
    } catch {
      // Ignore storage access failures.
    }
  }, [merchantOrderId, resolvedOrderId]);

  useEffect(() => {
    let active = true;

    const clearStoredOrderId = () => {
      if (typeof window === "undefined") return;
      try {
        window.sessionStorage.removeItem("phonepe:merchantOrderId");
        window.localStorage.removeItem("phonepe:merchantOrderId");
      } catch {
        // Ignore storage access failures.
      }
    };

    const loadStatus = async () => {
      if (!resolvedOrderId) {
        setStatus("error");
        setDetail("Missing order reference. Please contact support.");
        return;
      }

      try {
        const response = await fetch(
          `/api/phonepe/order-status?merchantOrderId=${encodeURIComponent(resolvedOrderId)}&details=false&errorContext=true`
        );

        const data = (await response.json().catch(() => null)) as
          | { ok?: boolean; status?: StatusResponse; error?: string }
          | null;

        if (!response.ok || !data?.status) {
          throw new Error(data?.error || "Unable to read payment status.");
        }

        if (!active) return;

        const state = (data.status.state || "").toUpperCase();
        if (state === "COMPLETED") {
          setStatus("completed");
          setDetail("Payment received. Thank you!");
          clearStoredOrderId();
        } else if (state === "FAILED") {
          setStatus("failed");
          const context = data.status.errorContext;
          const errorDetail =
            (context && context.description) ||
            (context && (context.errorCode || context.detailedErrorCode)) ||
            "Payment failed. You can try again.";
          setDetail(errorDetail);
          clearStoredOrderId();
        } else {
          setStatus("pending");
          setDetail("Payment is still pending. Check again shortly.");
        }
      } catch (error) {
        if (!active) return;
        const message =
          error instanceof Error ? error.message : "Unable to read payment status.";
        setStatus("error");
        setDetail(message);
      }
    };

    loadStatus();

    return () => {
      active = false;
    };
  }, [resolvedOrderId]);

  const iconClass = "h-5 w-5";

  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white/90 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        {status === "loading" && <Loader2 className={`${iconClass} animate-spin text-[#6366F1]`} />}
        {status === "completed" && <CheckCircle className={`${iconClass} text-emerald-600`} />}
        {status === "failed" && <XCircle className={`${iconClass} text-rose-600`} />}
        {status === "pending" && <Clock className={`${iconClass} text-amber-600`} />}
        {status === "error" && <XCircle className={`${iconClass} text-rose-600`} />}

        <div>
          <p className="text-sm font-semibold text-[#0A0A0A]">Payment status</p>
          <p className="text-xs text-[#6B7280]">Order: {resolvedOrderId || "Unknown"}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#4B5563]">{detail || "Checking payment status..."}</p>
    </div>
  );
}
