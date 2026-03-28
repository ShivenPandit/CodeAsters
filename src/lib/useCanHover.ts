"use client";

import { useSyncExternalStore } from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(HOVER_QUERY);
  const handler = () => onStoreChange();
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(HOVER_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Returns true only on devices that support hover (mouse/trackpad).
 * SSR-safe: defaults to false, resolved on mount.
 */
export function useCanHover() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
