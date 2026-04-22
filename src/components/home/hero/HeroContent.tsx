import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0A0A0A] sm:text-5xl lg:text-[3.5rem]">
        Software built for <span className="inline-block text-[#6366F1]">performance</span>, scale, and precision.
      </h1>

      <p className="mb-6 max-w-lg text-base leading-relaxed text-[#4B5563] lg:text-lg">
        CodeAsters designs and develops high-quality websites, web applications, dashboards,
        ERP systems, and mobile apps - with modern architecture and production-grade execution.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/start"
          data-cursor="Start"
          className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-[#1a1a1a]"
        >
          Start a Project
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/work"
          data-cursor="View"
          className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] px-7 py-3.5 text-sm font-medium text-[#0A0A0A] transition-all duration-300 hover:border-[#6B7280]/40 hover:bg-white"
        >
          View Our Work
        </Link>
      </div>

      <div className="mt-4">
        <Link
          href="/be-a-codeaster"
          data-cursor="Join"
          className="group inline-flex items-center gap-2 text-sm text-[#6B7280] transition-colors duration-300 hover:text-[#6366F1]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6366F1]/10">
            <Sparkles size={10} className="text-[#6366F1]" />
          </span>
          <span>
            <span className="font-medium text-[#6366F1]">Be a CodeAster</span> - Earn up to 30% commission
          </span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
