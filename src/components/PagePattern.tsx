"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Must live inside the same stacking context as page sections so translucent
 * section backgrounds composite over the tiles (fixed body::before does not).
 */
export default function PagePattern() {
  const reduce = useReducedMotion();

  return (
    <div
      className={`page-pattern-tiles pointer-events-none ${reduce ? "" : "page-pattern-tiles--animate"}`}
      aria-hidden
    />
  );
}
