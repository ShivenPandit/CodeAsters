"use client";

import dynamic from "next/dynamic";
import { useCanHover } from "@/lib/useCanHover";

const SiteBackdrop = dynamic(() => import("@/components/SiteBackdrop"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function ClientEffects() {
  const canHover = useCanHover();

  return (
    <>
      <SiteBackdrop />
      {canHover ? <CustomCursor /> : null}
    </>
  );
}
