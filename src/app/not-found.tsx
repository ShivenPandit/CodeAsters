import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-page-soft section-header-space">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-28 top-10 h-72 w-72 rounded-full bg-[#6366F1]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="mb-4 inline-flex items-center rounded-full border border-[#6366F1]/25 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#6366F1]">
          404 Error
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.025em] text-[#0A0A0A] sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6B7280]">
          The page you are looking for does not exist or has been moved. Let&apos;s get you back
          on track.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1A1A1A]"
          >
            Back to Home
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center justify-center rounded-full border border-[#6366F1]/25 bg-white/80 px-6 py-2.5 text-sm font-medium text-[#6366F1] transition-colors duration-200 hover:bg-[#6366F1]/5"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
