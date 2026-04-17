"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLowPerformanceDevice } from "@/lib/useLowPerformanceDevice";

/**
 * Must live inside the same stacking context as page sections so translucent
 * section backgrounds composite over the tiles (fixed body::before does not).
 */
export default function PagePattern() {
  const reduce = useReducedMotion();
  const isLowPerformanceDevice = useLowPerformanceDevice();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState !== "hidden");
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div
      className={`page-pattern-tiles pointer-events-none ${
        reduce || isLowPerformanceDevice || !isDocumentVisible ? "" : "page-pattern-tiles--animate"
      }`}
      aria-hidden
    />
  );
}
