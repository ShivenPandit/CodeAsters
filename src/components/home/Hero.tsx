"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useCallback, useEffect, useState } from "react";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ─── Cursor parallax hook (hero-scoped) ─── */

function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setDisabled(isTouch || mq.matches);
    const handler = () => setDisabled(isTouch || mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      rawX.set(((e.clientX - left) / width) * 2 - 1);
      rawY.set(((e.clientY - top) / height) * 2 - 1);
    },
    [disabled, rawX, rawY]
  );

  const onMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  /* Layer springs — different mass/damping for depth separation */

  // Text — fast, small displacement
  const tSX = useSpring(rawX, { damping: 40, stiffness: 180, mass: 0.4 });
  const tSY = useSpring(rawY, { damping: 40, stiffness: 180, mass: 0.4 });
  const textX = useTransform(tSX, [-1, 1], [-4, 4]);
  const textY = useTransform(tSY, [-1, 1], [-3, 3]);

  // Mockup frame — medium lag, perspective tilt
  const mSX = useSpring(rawX, { damping: 30, stiffness: 120, mass: 0.7 });
  const mSY = useSpring(rawY, { damping: 30, stiffness: 120, mass: 0.7 });
  const mockX = useTransform(mSX, [-1, 1], [-8, 8]);
  const mockY = useTransform(mSY, [-1, 1], [-6, 6]);
  const mockRY = useTransform(mSX, [-1, 1], [-2.5, 2.5]);
  const mockRX = useTransform(mSY, [-1, 1], [2, -2]);

  // Float card 1 (Build Deployed) — more lag, more travel
  const f1SX = useSpring(rawX, { damping: 24, stiffness: 100, mass: 0.9 });
  const f1SY = useSpring(rawY, { damping: 24, stiffness: 100, mass: 0.9 });
  const float1X = useTransform(f1SX, [-1, 1], [-18, 18]);
  const float1Y = useTransform(f1SY, [-1, 1], [-14, 14]);

  // Float card 2 (Performance) — deepest lag
  const f2SX = useSpring(rawX, { damping: 20, stiffness: 85, mass: 1.1 });
  const f2SY = useSpring(rawY, { damping: 20, stiffness: 85, mass: 1.1 });
  const float2X = useTransform(f2SX, [-1, 1], [-14, 14]);
  const float2Y = useTransform(f2SY, [-1, 1], [-10, 10]);

  // Glow — fast follow
  const gSX = useSpring(rawX, { damping: 35, stiffness: 200, mass: 0.25 });
  const gSY = useSpring(rawY, { damping: 35, stiffness: 200, mass: 0.25 });
  const glowLeft = useTransform(gSX, [-1, 1], ["20%", "80%"]);
  const glowTop = useTransform(gSY, [-1, 1], ["20%", "80%"]);

  return {
    ref,
    isHovered,
    disabled,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
    text: { x: textX, y: textY },
    mockup: { x: mockX, y: mockY, rotateX: mockRX, rotateY: mockRY },
    float1: { x: float1X, y: float1Y },
    float2: { x: float2X, y: float2Y },
    glow: { left: glowLeft, top: glowTop },
  };
}

/* ─── Hero Visual (right column) ─── */

interface VisualProps {
  mockup: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
  };
  float1: { x: MotionValue<number>; y: MotionValue<number> };
  float2: { x: MotionValue<number>; y: MotionValue<number> };
}

function HeroVisual({ mockup, float1, float2 }: VisualProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease }}
      className="relative w-full max-w-md lg:max-w-lg mx-auto [perspective:800px]"
    >
      {/* Tilt container — reacts to cursor */}
      <motion.div
        style={{
          x: mockup.x,
          y: mockup.y,
          rotateX: mockup.rotateX,
          rotateY: mockup.rotateY,
        }}
        className="will-change-transform"
      >
        {/* Browser frame */}
        <div className="rounded-2xl border border-[#E5E5E5] bg-white shadow-xl shadow-black/[0.04] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0F0F0]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
            </div>
            <div className="flex-1 mx-6">
              <div className="h-5 rounded-md bg-[#F5F5F5] max-w-[180px] mx-auto" />
            </div>
          </div>
          {/* Content preview */}
          <div className="p-5 space-y-4">
            {/* Nav */}
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 rounded bg-[#0A0A0A]/10" />
              <div className="flex gap-3">
                <div className="h-2.5 w-10 rounded bg-[#E5E5E5]" />
                <div className="h-2.5 w-10 rounded bg-[#E5E5E5]" />
                <div className="h-2.5 w-10 rounded bg-[#E5E5E5]" />
              </div>
            </div>
            {/* Hero block */}
            <div className="pt-3 space-y-3">
              <div className="h-5 w-3/4 rounded bg-[#0A0A0A]/8" />
              <div className="h-5 w-1/2 rounded bg-[#0A0A0A]/8" />
              <div className="h-3 w-full rounded bg-[#E5E5E5]/80 mt-2" />
              <div className="h-3 w-4/5 rounded bg-[#E5E5E5]/80" />
            </div>
            {/* Cards */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1, ease }}
                  className="rounded-lg border border-[#E5E5E5]/70 p-3 space-y-2"
                >
                  <div
                    className="w-6 h-6 rounded-md"
                    style={{
                      backgroundColor:
                        i === 0 ? "rgba(99,102,241,0.1)" : i === 1 ? "rgba(249,115,22,0.1)" : "rgba(16,185,129,0.1)",
                    }}
                  />
                  <div className="h-2 w-full rounded bg-[#E5E5E5]" />
                  <div className="h-2 w-2/3 rounded bg-[#F0F0F0]" />
                </motion.div>
              ))}
            </div>
            {/* Stats row */}
            <div className="flex gap-4 pt-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex-1 text-center">
                  <div className="h-4 w-8 mx-auto rounded bg-[#6366F1]/10 mb-1" />
                  <div className="h-2 w-12 mx-auto rounded bg-[#F0F0F0]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating accent card — Build Deployed */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease }}
        className="absolute -right-4 top-1/3 hidden sm:block"
      >
        <motion.div style={{ x: float1.x, y: float1.y }} className="will-change-transform">
          <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-lg shadow-black/[0.06] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6.5L4.5 9L10 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#0A0A0A]">Build Deployed</div>
                <div className="text-[9px] text-[#6B7280]">Production ready</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating metrics card — Performance */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease }}
        className="absolute -left-3 bottom-16 hidden sm:block"
      >
        <motion.div style={{ x: float2.x, y: float2.y }} className="will-change-transform">
          <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-lg shadow-black/[0.06] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#6366F1]/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 9L4 5L7 7L11 2" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#0A0A0A]">Performance</div>
                <div className="text-[9px] text-[#6B7280]">Score 98/100</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Section ─── */

export default function Hero() {
  const p = useHeroParallax();
  const canHover = useCanHover();

  return (
    <section
      ref={p.ref}
      onMouseMove={p.handlers.onMouseMove}
      onMouseEnter={p.handlers.onMouseEnter}
      onMouseLeave={p.handlers.onMouseLeave}
      className="relative min-h-[90vh] flex items-center bg-[#FAFAFB] overflow-hidden"
      aria-label="Hero"
    >
      {/* Cursor-follow glow */}
      <AnimatePresence>
        {p.isHovered && !p.disabled && (
          <motion.div
            key="hero-glow"
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                left: p.glow.left,
                top: p.glow.top,
                translateX: "-50%",
                translateY: "-50%",
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0.015) 50%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ambient-glow top-[-200px] right-[-100px] opacity-60" />
      <div
        className="ambient-glow bottom-[-200px] left-[-150px] opacity-40"
        style={{ animationDelay: "-10s" }}
      />

      <div className="floating-dot w-3 h-3 top-[15%] left-[10%]" style={{ animationDelay: "0s" }} />
      <div className="floating-dot w-2 h-2 top-[70%] left-[85%]" style={{ animationDelay: "-2s" }} />
      <div className="floating-dot w-2.5 h-2.5 top-[40%] left-[5%]" style={{ animationDelay: "-4s" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-0 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text with subtle cursor parallax */}
          <motion.div
            style={p.disabled ? undefined : { x: p.text.x, y: p.text.y }}
            className="pt-16 md:pt-0 will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E5E5] bg-white mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-[#6B7280] font-medium">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.08] text-[#0A0A0A] mb-6"
            >
              Software built for{" "}
              <motion.span
                className="text-[#6366F1] inline-block"
                animate={{
                  textShadow: p.isHovered
                    ? "0 0 20px rgba(99,102,241,0.25), 0 0 40px rgba(99,102,241,0.08)"
                    : "0 0 0px rgba(99,102,241,0)",
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                performance
              </motion.span>
              , scale, and precision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-base lg:text-lg text-[#4B5563] max-w-lg leading-relaxed mb-10"
            >
              CodeAsters designs and develops high-quality websites, web applications, dashboards,
              ERP systems, and mobile apps — with modern architecture and production-grade&nbsp;execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="flex flex-wrap gap-3 items-center"
            >
              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  data-cursor="Start"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-medium rounded-full text-sm transition-colors duration-300 shadow-lg shadow-black/10"
                >
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div whileHover={canHover ? { scale: 1.02 } : undefined} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/work"
                  data-cursor="View"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E5E5E5] hover:border-[#6B7280]/40 hover:bg-white text-[#0A0A0A] font-medium rounded-full text-sm transition-all duration-300"
                >
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — visual with cursor-reactive 3D depth */}
          <div>
            <HeroVisual mockup={p.mockup} float1={p.float1} float2={p.float2} />
          </div>
        </div>
      </div>
    </section>
  );
}
