"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  titleAccent?: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  titleAccent,
  description,
}: SectionHeadingProps) {
  const ref = useScrollReveal<HTMLDivElement>({ margin: "-80px" });

  return (
    <div
      ref={ref}
      className="scroll-reveal mb-6 lg:mb-8"
    >
      <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[#6366F1] mb-4">
        {label}
      </span>
      <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] leading-[1.1] text-[#0A0A0A]">
        {title}
        {titleAccent && (
          <span className="text-[#6B7280]/70"> {titleAccent}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[#6B7280] max-w-lg leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
