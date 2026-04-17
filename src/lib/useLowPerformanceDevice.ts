"use client";

import { useState } from "react";

function detectLowPerformanceDevice() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const browserNavigator = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
    };
  };
  const hardwareConcurrency = browserNavigator.hardwareConcurrency ?? 0;
  const deviceMemory = browserNavigator.deviceMemory ?? 0;
  const connection = browserNavigator.connection;

  return Boolean(
    (hardwareConcurrency > 0 && hardwareConcurrency <= 4) ||
      (deviceMemory > 0 && deviceMemory <= 4) ||
      connection?.saveData
  );
}

export function useLowPerformanceDevice() {
  const [isLowPerformanceDevice] = useState(() => detectLowPerformanceDevice());

  return isLowPerformanceDevice;
}
