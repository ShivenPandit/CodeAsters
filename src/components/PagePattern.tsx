"use client";

import { useEffect, useRef } from "react";

/**
 * Must live inside the same stacking context as page sections so translucent
 * section backgrounds composite over the tiles (fixed body::before does not).
 */
export default function PagePattern() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!layerRef.current) return;
      const isVisible = document.visibilityState !== "hidden";
      layerRef.current.classList.toggle("page-pattern-layer--animate", isVisible);
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div className="page-pattern-tiles pointer-events-none" aria-hidden>
      <div
        ref={layerRef}
        className="page-pattern-layer page-pattern-layer--animate"
      />
    </div>
  );
}
