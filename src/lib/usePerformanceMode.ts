"use client";

import { useEffect, useState } from "react";

type ConnectionInfo = {
  saveData?: boolean;
};

type NavigatorWithPerformance = Navigator & {
  deviceMemory?: number;
  connection?: ConnectionInfo;
};

export type PerformanceTier = "full" | "lite";

function detectPerformanceTier(): PerformanceTier {
  if (typeof navigator === "undefined") return "full";

  const nav = navigator as NavigatorWithPerformance;
  const cores = nav.hardwareConcurrency;
  const memory = nav.deviceMemory;
  const saveData = Boolean(nav.connection?.saveData);

  const lowCores = typeof cores === "number" && cores > 0 && cores <= 4;
  const lowMemory = typeof memory === "number" && memory > 0 && memory <= 4;

  return lowCores || lowMemory || saveData ? "lite" : "full";
}

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>("full");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTier(detectPerformanceTier());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return tier;
}
