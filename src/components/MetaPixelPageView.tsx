"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPixelEvent } from "@/lib/metaPixel";

export default function MetaPixelPageView() {
  const pathname = usePathname();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    trackMetaPixelEvent("PageView", { page_path: pathname });
  }, [pathname]);

  return null;
}
