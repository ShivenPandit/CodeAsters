"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPixelEvent } from "@/lib/metaPixel";

export default function MetaPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPixelEvent("PageView");
  }, [pathname]);

  return null;
}
