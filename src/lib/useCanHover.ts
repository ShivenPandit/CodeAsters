"use client";

import { useState, useEffect } from "react";

/**
 * Returns true only on devices that support hover (mouse/trackpad).
 * SSR-safe: defaults to false, resolved on mount.
 */
export function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return canHover;
}
