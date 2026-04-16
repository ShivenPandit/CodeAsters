"use client";

import dynamic from "next/dynamic";

const SiteBackdrop = dynamic(() => import("@/components/SiteBackdrop"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function ClientEffects() {
  return (
    <>
      <SiteBackdrop />
      <CustomCursor />
    </>
  );
}
