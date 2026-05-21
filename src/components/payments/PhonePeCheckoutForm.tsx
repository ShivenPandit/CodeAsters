"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const inputBase =
  "w-full px-4 py-3 rounded-xl border border-[#D4D4D4] bg-white text-[#0A0A0A] text-sm placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10";

export default function PhonePeCheckoutForm() {
  const [amount, setAmount] = useState("499");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    const amountValue = Number(amount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setStatus("error");
      setErrorMessage("Enter a valid amount in INR.");
      return;
    }

    const amountPaise = Math.round(amountValue * 100);
    if (amountPaise < 100) {
      setStatus("error");
      setErrorMessage("Minimum amount is INR 1.");
      return;
    }

    try {
      const response = await fetch("/api/phonepe/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountPaise,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; redirectUrl?: string; merchantOrderId?: string; error?: string }
        | null;

      if (!response.ok || !data?.redirectUrl) {
        throw new Error(data?.error || "Unable to start the payment.");
      }

      if (data.merchantOrderId && typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem("phonepe:merchantOrderId", data.merchantOrderId);
          window.localStorage.setItem("phonepe:merchantOrderId", data.merchantOrderId);
        } catch {
          // Storage can be unavailable in some browser modes.
        }
      }

      window.location.href = data.redirectUrl;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to start the payment.";
      setStatus("error");
      setErrorMessage(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#0A0A0A] mb-2">Amount (INR)</label>
        <input
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className={inputBase}
          placeholder="499"
          inputMode="decimal"
        />
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting...
          </>
        ) : (
          <>
            Pay with PhonePe
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
