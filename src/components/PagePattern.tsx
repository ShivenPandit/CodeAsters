"use client";

/**
 * Must live inside the same stacking context as page sections so translucent
 * section backgrounds composite over the tiles (fixed body::before does not).
 */
export default function PagePattern() {
  return (
    <div className="page-pattern-tiles pointer-events-none" aria-hidden>
      <div
        className="page-pattern-layer page-pattern-layer--animate"
      />
    </div>
  );
}
