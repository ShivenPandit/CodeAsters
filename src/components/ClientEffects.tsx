"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useCanHover } from "@/lib/useCanHover";
import { usePerformanceTier } from "@/lib/usePerformanceMode";

const SiteBackdrop = dynamic(() => import("@/components/SiteBackdrop"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function ClientEffects() {
  const canHover = useCanHover();
  const performanceTier = usePerformanceTier();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.performance = performanceTier;

    return () => {
      if (root.dataset.performance === performanceTier) {
        delete root.dataset.performance;
      }
    };
  }, [performanceTier]);

  return (
    <>
      <SiteBackdrop />
      {canHover ? <CustomCursor /> : null}
    </>
  );
}
