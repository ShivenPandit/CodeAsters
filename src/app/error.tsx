"use client";

import Link from "next/link";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative overflow-hidden bg-page-soft pb-24 pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-28 top-10 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#6366F1]/10 blur-3xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="mb-4 inline-flex items-center rounded-full border border-rose-400/30 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">
          Error
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-5xl">
          Something Went Wrong
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6B7280]">
          We hit an unexpected issue while loading this page. Please try again.
        </p>

        {error.digest ? (
          <p className="mt-3 text-xs text-[#9CA3AF]">Reference: {error.digest}</p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1A1A1A]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#6366F1]/25 bg-white/80 px-6 py-2.5 text-sm font-medium text-[#6366F1] transition-colors duration-200 hover:bg-[#6366F1]/5"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
