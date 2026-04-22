"use client";

import type { ReactNode } from "react";
import HeroAnimations from "@/components/home/hero/HeroAnimations";

export default function HeroShell({ children }: { children: ReactNode }) {
  return <HeroAnimations>{children}</HeroAnimations>;
}
