"use client";

import {
  motion,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Activity, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useCallback, useEffect, useState } from "react";
import { useCanHover } from "@/lib/useCanHover";

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ─── Cursor parallax hook (hero-scoped) ─── */

function useHeroParallax(isParallaxDisabled: boolean) {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isParallaxDisabled) return;
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      rawX.set(((e.clientX - left) / width) * 2 - 1);
      rawY.set(((e.clientY - top) / height) * 2 - 1);
    },
    [isParallaxDisabled, rawX, rawY]
  );

  const onMouseEnter = useCallback(() => {
    if (!isParallaxDisabled) setIsHovered(true);
  }, [isParallaxDisabled]);

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
  const float1X = useTransform(f1SX, [-1, 1], [-7, 7]);
  const float1Y = useTransform(f1SY, [-1, 1], [-6, 6]);

  // Float card 2 (Performance) — subtle motion so side/below cards stay off the mockup
  const f2SX = useSpring(rawX, { damping: 20, stiffness: 85, mass: 1.1 });
  const f2SY = useSpring(rawY, { damping: 20, stiffness: 85, mass: 1.1 });
  const float2X = useTransform(f2SX, [-1, 1], [-5, 5]);
  const float2Y = useTransform(f2SY, [-1, 1], [-4, 4]);

  // Glow — fast follow
  const gSX = useSpring(rawX, { damping: 35, stiffness: 200, mass: 0.25 });
  const gSY = useSpring(rawY, { damping: 35, stiffness: 200, mass: 0.25 });
  const glowLeft = useTransform(gSX, [-1, 1], ["20%", "80%"]);
  const glowTop = useTransform(gSY, [-1, 1], ["20%", "80%"]);

  return {
    sectionRef: ref,
    isHovered,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    textX,
    textY,
    mockX,
    mockY,
    mockRotateX: mockRX,
    mockRotateY: mockRY,
    float1X,
    float1Y,
    float2X,
    float2Y,
    glowLeft,
    glowTop,
  };
}

/* ─── Live typing code (hero mockup) ─── */

const LIVE_CODE_LINES = [
  "export async function ship() {",
  '  await cache.revalidate("/");',
  '  return Response.json({ ok: true });',
  "}",
];

function useHeroLiveCode() {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(0);
  const [col, setCol] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    if (done >= LIVE_CODE_LINES.length) {
      const reset = window.setTimeout(() => {
        setDone(0);
        setCol(0);
      }, 2600);
      return () => window.clearTimeout(reset);
    }

    const line = LIVE_CODE_LINES[done];
    if (col < line.length) {
      const t = window.setTimeout(
        () => setCol((c) => c + 1),
        line[col] === " " ? 28 : 38 + (col % 5) * 6
      );
      return () => window.clearTimeout(t);
    }

    const next = window.setTimeout(() => {
      setDone((d) => d + 1);
      setCol(0);
    }, 320);
    return () => window.clearTimeout(next);
  }, [done, col, reduceMotion]);

  return { done, col, reduceMotion };
}

function ColoredCodeLine({ index, hue }: { index: number; hue: number }) {
  const t = [
    { kw: "text-[#7C3AED]", id: "text-[#0EA5E9]", str: "text-[#059669]", muted: "text-[#64748B]", call: "text-[#D97706]", prop: "text-[#6366F1]" },
    { kw: "text-[#6366F1]", id: "text-[#14B8A6]", str: "text-[#DB2777]", muted: "text-[#64748B]", call: "text-[#EA580C]", prop: "text-[#8B5CF6]" },
    { kw: "text-[#4F46E5]", id: "text-[#0891B2]", str: "text-[#16A34A]", muted: "text-[#64748B]", call: "text-[#CA8A04]", prop: "text-[#7C3AED]" },
  ][hue % 3]!;

  switch (index) {
    case 0:
      return (
        <span>
          <span className={t.kw}>export </span>
          <span className={t.kw}>async </span>
          <span className={t.kw}>function </span>
          <span className={t.id}>ship</span>
          <span className={t.muted}>() {"{"}</span>
        </span>
      );
    case 1:
      return (
        <span>
          <span className={t.muted}> </span>
          <span className={t.kw}>await </span>
          <span className={t.id}>cache</span>
          <span className={t.muted}>.</span>
          <span className={t.call}>revalidate</span>
          <span className={t.muted}>(</span>
          <span className={t.str}>&quot;/&quot;</span>
          <span className={t.muted}>);</span>
        </span>
      );
    case 2:
      return (
        <span>
          <span className={t.muted}> </span>
          <span className={t.kw}>return </span>
          <span className={t.id}>Response</span>
          <span className={t.muted}>.</span>
          <span className={t.call}>json</span>
          <span className={t.muted}>({"{"} </span>
          <span className={t.prop}>ok</span>
          <span className={t.muted}>: </span>
          <span className={t.kw}>true</span>
          <span className={t.muted}> {"}"});</span>
        </span>
      );
    case 3:
      return <span className={t.muted}>{"}"}</span>;
    default:
      return null;
  }
}

function HeroLiveCodePanel({
  done,
  col,
  reduceMotion,
  hue,
}: {
  done: number;
  col: number;
  reduceMotion: boolean | null;
  hue: number;
}) {
  const textSize = "text-[10px] sm:text-[11px] lg:text-[12px] leading-[1.6]";
  const lineH = "min-h-[1.1em]";

  if (reduceMotion) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md">
        <div className="flex min-h-[2rem] flex-wrap items-center gap-2 border-b border-white/40 px-2 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[9px] font-semibold text-[#6366F1]">ship.ts</span>
          <span className="font-mono text-[8px] text-[#94A3B8]">route.ts</span>
          <span className="ml-auto text-[8px] font-medium uppercase tracking-wider text-[#94A3B8]">saved</span>
        </div>
        <div className={`flex min-w-0 font-mono ${textSize}`}>
          <div className="shrink-0 select-none border-r border-white/35 bg-white/25 px-2 py-2.5 text-right text-[#94A3B8] tabular-nums">
            {LIVE_CODE_LINES.map((_, i) => (
              <div key={i} className={lineH}>
                {i + 1}
              </div>
            ))}
          </div>
          <div className="min-h-[9rem] min-w-0 flex-1 space-y-0.5 overflow-x-hidden overflow-y-visible p-2.5 text-[#334155] sm:min-h-[11rem] lg:min-h-[12rem]">
            {LIVE_CODE_LINES.map((_, i) => (
              <div key={i} className={`whitespace-pre-wrap break-words [overflow-wrap:anywhere] ${lineH}`}>
                <ColoredCodeLine index={i} hue={hue} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-white/35 bg-white/15 px-2 py-1 font-mono text-[8px] text-[#64748B]">
          <span className="text-emerald-600">✓</span> 0 problems
        </div>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="overflow-hidden rounded-xl border border-white/55 bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_4px_24px_-8px_rgba(99,102,241,0.14)] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex min-h-[2rem] flex-wrap items-center gap-x-2 gap-y-1 border-b border-white/45 px-2 py-1.5 backdrop-blur-md sm:gap-3">
          <div className="relative flex min-w-0 shrink gap-2 font-mono sm:gap-3">
            {["ship.ts", "route.ts"].map((name, ti) => (
              <span key={name} className="relative px-0.5 pb-0.5 text-[9px] font-medium">
                <span className={ti === 0 ? "text-[#6366F1]" : "text-[#94A3B8]"}>{name}</span>
                {ti === 0 && (
                  <motion.span
                    layoutId="hero-tab-line"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#6366F1]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </span>
            ))}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.55)]"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.88, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
              editing
            </span>
          </div>
        </div>

      <div className={`flex min-w-0 font-mono ${textSize}`}>
        <div className="shrink-0 select-none border-r border-white/40 bg-white/20 px-2 py-2.5 text-right text-[#94A3B8] tabular-nums backdrop-blur-sm">
          {LIVE_CODE_LINES.map((_, i) => (
            <div key={i} className={`relative ${lineH}`}>
              {done === i && (
                <span className="absolute -left-2 top-0.5 bottom-0.5 w-0.5 rounded-full bg-[#6366F1]" />
              )}
              {i + 1}
            </div>
          ))}
        </div>

        <motion.div
          className="min-h-[9rem] min-w-0 flex-1 space-y-0.5 overflow-x-hidden overflow-y-visible bg-white/[0.08] p-2.5 sm:min-h-[11rem] lg:min-h-[12rem]"
          animate={{
            boxShadow: [
              "inset 0 0 0 0 rgba(99,102,241,0)",
              "inset 0 0 20px -12px rgba(99,102,241,0.12)",
              "inset 0 0 0 0 rgba(99,102,241,0)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {Array.from({ length: done }).map((_, i) => (
            <motion.div
              key={i}
              className={`whitespace-pre-wrap break-words text-[#334155] [overflow-wrap:anywhere] ${lineH}`}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ColoredCodeLine index={i} hue={hue} />
            </motion.div>
          ))}
          {done < LIVE_CODE_LINES.length && (
            <div className={`relative whitespace-pre-wrap break-words text-[#475569] [overflow-wrap:anywhere] ${lineH}`}>
              <span className="absolute -left-[14px] top-0.5 bottom-0.5 w-0.5 rounded-full bg-amber-400" />
              {LIVE_CODE_LINES[done].slice(0, col)}
              <span className="hero-code-cursor ml-px inline-block h-[12px] w-[2px] translate-y-px bg-[#6366F1] sm:h-[14px]" />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-white/40 bg-white/[0.12] px-2 py-1 font-mono text-[8px] sm:text-[9px]"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex min-w-0 items-center gap-1.5 text-[#64748B]">
          <motion.span
            className="text-emerald-600"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            ✓
          </motion.span>
          ESLint · 0
        </span>
        <span className="hidden text-[#94A3B8] sm:inline">TS strict</span>
        <motion.span
          className="text-[#6366F1]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ● save
        </motion.span>
      </motion.div>
      </div>
    </LayoutGroup>
  );
}

/* Live preview pane — UI “builds” as each code line finishes */
function HeroLiveSitePreview({
  done,
  reduceMotion,
  hue,
}: {
  done: number;
  reduceMotion: boolean | null;
  hue: number;
}) {
  const nav = reduceMotion || done >= 1;
  const hero = reduceMotion || done >= 2;
  const cards = reduceMotion || done >= 3;
  const stats = reduceMotion || done >= 4;
  const complete = reduceMotion || done >= LIVE_CODE_LINES.length;
  const hueRot = hue * 18;

  return (
    <div
      className="relative flex h-full min-h-[13.5rem] flex-col overflow-hidden rounded-xl border border-white/50 bg-gradient-to-b from-white/40 to-[#6366F1]/[0.1] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl backdrop-saturate-150 sm:min-h-[16rem] lg:min-h-[17rem]"
      style={reduceMotion ? undefined : { filter: `hue-rotate(${hueRot}deg)` }}
    >
      <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <motion.span
          className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6366F1]"
          animate={reduceMotion ? {} : { opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Preview
        </motion.span>
        {complete && !reduceMotion ? (
          <motion.span
            className="shrink-0 rounded border border-emerald-400/40 bg-emerald-500/15 px-1.5 py-0.5 text-[6px] font-bold uppercase leading-none tracking-wide text-emerald-800 sm:text-[7px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            Live
          </motion.span>
        ) : (
          <span className="shrink-0 text-[7px] font-medium leading-none text-[#94A3B8]">DOM</span>
        )}
      </div>

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col gap-2 rounded-lg border border-white/35 bg-white/20 p-2 backdrop-blur-sm">
        <AnimatePresence>
          {!nav && !reduceMotion && (
            <motion.div
              key="ph"
              className="absolute inset-0 z-0 flex items-center justify-center rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="h-10 w-[72%] rounded-lg border border-dashed border-[#6366F1]/30 bg-gradient-to-br from-[#6366F1]/[0.07] to-transparent"
                animate={{
                  opacity: [0.4, 0.75, 0.4],
                  scale: [0.98, 1, 0.98],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="relative z-[2] flex items-center justify-between gap-1"
          initial={false}
          animate={{
            opacity: nav ? 1 : 0,
            y: nav ? 0 : 6,
            filter: nav ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.45, ease }}
        >
          <div className="h-2 w-7 rounded-sm bg-[#0A0A0A]/15 ring-1 ring-white/40" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-4 rounded-sm bg-white/60 ring-1 ring-white/50"
                initial={false}
                animate={nav ? { scaleX: 1, opacity: 1 } : { scaleX: 0.3, opacity: 0 }}
                transition={{ delay: nav ? i * 0.06 : 0, duration: 0.35, ease }}
                style={{ originX: 0 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-[2] space-y-1.5 pt-0.5"
          initial={false}
          animate={{
            opacity: hero ? 1 : 0,
            y: hero ? 0 : 4,
          }}
          transition={{ duration: 0.4, ease }}
        >
          <motion.div
            className="h-2 rounded-md bg-gradient-to-r from-[#0A0A0A]/12 to-[#6366F1]/15 ring-1 ring-white/30"
            initial={false}
            animate={hero ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ originX: 0 }}
          />
          <motion.div
            className="h-2 w-[80%] rounded-md bg-[#0A0A0A]/10 ring-1 ring-white/25"
            initial={false}
            animate={hero ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease }}
            style={{ originX: 0 }}
          />
        </motion.div>

        <motion.div
          className="relative z-[2] grid grid-cols-3 gap-1.5"
          initial={false}
          animate={{ opacity: cards ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="space-y-1 rounded-md border border-white/45 bg-white/35 p-1.5 ring-1 ring-white/30 backdrop-blur-sm"
              initial={false}
              animate={
                cards
                  ? reduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 1, y: [0, -3, 0], scale: 1 }
                  : { opacity: 0, y: 8, scale: 0.92 }
              }
              transition={{
                delay: cards ? i * 0.1 : 0,
                duration: 0.45,
                ease,
                y: { duration: 2.8 + i * 0.35, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div
                className="mx-auto h-2 w-2 rounded-sm"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg,#6366F1,#8B5CF6)"
                      : i === 1
                        ? "linear-gradient(135deg,#F97316,#FBBF24)"
                        : "linear-gradient(135deg,#10B981,#34D399)",
                }}
              />
              <div className="h-1 w-full rounded-sm bg-white/50" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="relative z-[2] mt-auto flex justify-between gap-1 border-t border-white/30 pt-1"
          initial={false}
          animate={{
            opacity: stats ? 1 : 0,
          }}
          transition={{ duration: 0.35 }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 text-center">
              <div className="mx-auto mb-0.5 h-2 w-4 rounded-sm bg-[#6366F1]/20 ring-1 ring-white/40" />
              <div className="mx-auto h-1 w-5 rounded-sm bg-white/45" />
            </div>
          ))}
        </motion.div>

        <AnimatePresence>
          {complete && !reduceMotion && (
            <motion.div
              key="hr"
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="pointer-events-none absolute bottom-2 left-1.5 right-1.5 z-[3] rounded-md border border-emerald-400/35 bg-emerald-500/15 px-1 py-1.5 text-center font-mono text-[6px] font-semibold uppercase leading-snug tracking-wide text-emerald-800 shadow-lg backdrop-blur-md sm:left-2 sm:right-2 sm:text-[7px]"
            >
              <span className="block whitespace-normal break-words">Hot reload · DOM updated</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
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
  const { done, col, reduceMotion } = useHeroLiveCode();
  const [hue, setHue] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setHue((h) => (h + 1) % 3), 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="relative mx-auto mt-4 w-full min-w-0 max-w-xl px-0 pb-8 pt-2 sm:mt-6 sm:max-w-2xl sm:pb-10 md:px-2 md:mt-8 lg:mt-12 lg:max-w-none lg:pb-32 xl:mt-14 xl:max-w-[min(100%,62rem)] 2xl:max-w-[min(100%,72rem)] [perspective:1000px]"
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
        <div className="relative">
          {/* Primary creative halo */}
          <motion.div
            className="pointer-events-none absolute -inset-[5%] -z-10 rounded-[2.35rem] blur-3xl sm:-inset-[7%] sm:rounded-[2.85rem]"
            style={{
              background:
                "conic-gradient(from 120deg at 50% 50%, rgba(168,85,247,0.26), rgba(99,102,241,0.2), rgba(6,182,212,0.22), rgba(236,72,153,0.2), rgba(251,191,36,0.16), rgba(168,85,247,0.26))",
            }}
            animate={reduceMotion ? {} : { rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          {/* Counter-rotating softer wash */}
          <motion.div
            className="pointer-events-none absolute -inset-[12%] -z-10 rounded-[3rem] blur-[56px] sm:blur-[72px]"
            style={{
              background:
                "conic-gradient(from 300deg at 40% 40%, rgba(6,182,212,0.12), rgba(168,85,247,0.1), rgba(251,191,36,0.08), rgba(236,72,153,0.1), rgba(6,182,212,0.12))",
            }}
            animate={reduceMotion ? {} : { rotate: [360, 0] }}
            transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -inset-8 rounded-[1.75rem] bg-gradient-to-br from-[#6366F1]/30 via-[#8B5CF6]/20 to-[#EC4899]/15 opacity-90 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -inset-4 rounded-[1.5rem] bg-gradient-to-tr from-cyan-400/12 via-transparent to-[#6366F1]/18 blur-2xl"
            aria-hidden
          />

          {/* Accent orbs — float beside the frame (no negative crop vs section) */}
          {!reduceMotion && (
            <>
              <motion.div
                className="pointer-events-none absolute -right-2 bottom-[22%] z-0 h-3 w-3 rounded-full bg-gradient-to-br from-fuchsia-400/50 to-indigo-400/40 blur-[2px] sm:right-0 sm:h-3.5 sm:w-3.5"
                animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.15, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <motion.div
                className="pointer-events-none absolute -left-1 top-[38%] z-0 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-400/45 to-[#6366F1]/35 blur-[1px] sm:left-0 sm:h-3 sm:w-3"
                animate={{ opacity: [0.3, 0.75, 0.3], y: [0, -6, 0] }}
                transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                aria-hidden
              />
              <motion.div
                className="pointer-events-none absolute right-[8%] -top-3 z-0 h-2 w-2 rounded-full bg-amber-300/55 blur-[1px]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                aria-hidden
              />
            </>
          )}

          {/* Glass browser shell */}
          <div className="relative z-[1] overflow-hidden rounded-[1.35rem] border border-white/60 bg-gradient-to-b from-white/45 to-white/[0.2] p-[1px] shadow-[0_28px_60px_-14px_rgba(99,102,241,0.32),0_14px_40px_-14px_rgba(15,23,42,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-3xl">
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[1.33rem] border border-white/35 sm:rounded-[calc(1.5rem-1px)]"
              animate={reduceMotion ? {} : { opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

            <div className="overflow-hidden rounded-[1.1rem] border border-white/45 bg-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:rounded-[1.25rem]">
              {/* Title bar — URL scrolls instead of truncating; Creativity sits in chrome */}
              <div className="flex items-center gap-2 border-b border-white/40 bg-gradient-to-b from-white/50 to-white/25 px-3 py-4 backdrop-blur-md sm:gap-3 sm:px-5 sm:py-[1.125rem] lg:px-6">
                <div className="flex shrink-0 gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/90 ring-1 ring-black/[0.06]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/90 ring-1 ring-black/[0.06]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]/90 ring-1 ring-black/[0.06]" />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <div className="flex min-w-0 flex-1 justify-center">
                    <div className="no-scrollbar flex h-7 max-w-full min-w-0 items-center justify-center overflow-x-auto rounded-lg border border-white/50 bg-white/35 px-2 shadow-inner backdrop-blur-sm sm:h-8 sm:max-w-[min(100%,440px)] sm:px-3">
                      <span className="whitespace-nowrap px-0.5 font-mono text-[10px] text-[#4B5563] sm:text-[11px]">
                        app.codeasters.io
                      </span>
                    </div>
                  </div>
                  <motion.div
                    className="pointer-events-none flex shrink-0 items-center gap-1 rounded-full border border-white/60 bg-white/55 px-1.5 py-1 shadow-[0_8px_24px_-10px_rgba(99,102,241,0.35)] backdrop-blur-md sm:gap-1.5 sm:px-2.5 sm:py-1.5"
                    aria-hidden
                    initial={false}
                    animate={reduceMotion ? {} : { y: [0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-3 w-3 shrink-0 text-fuchsia-500 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
                    <span className="whitespace-nowrap bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#0891B2] bg-clip-text text-[8px] font-semibold tracking-wide text-transparent sm:text-[10px]">
                      Creativity
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Code + live preview — preview builds with each shipped line */}
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-12 sm:gap-7 sm:p-8 lg:gap-8 lg:p-9">
                <div className="sm:col-span-8">
                  <HeroLiveCodePanel
                    done={done}
                    col={col}
                    reduceMotion={reduceMotion}
                    hue={hue}
                  />
                </div>
                <div className="sm:col-span-4">
                  <HeroLiveSitePreview done={done} reduceMotion={reduceMotion} hue={hue} />
                </div>
              </div>
            </div>
          </div>

          {/* Float cards: anchored outside the browser so parallax does not stack on the mockup */}
          <motion.div
            initial={false}
            className="pointer-events-none absolute left-full top-[14%] z-10 hidden w-max pl-3 lg:block xl:pl-4 2xl:pl-5"
          >
            <motion.div style={{ x: float1.x, y: float1.y }} className="will-change-transform">
              <div className="rounded-xl border border-white/55 bg-white/50 px-3.5 py-2.5 shadow-[0_12px_32px_-8px_rgba(16,185,129,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl backdrop-saturate-150">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10">
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

          <motion.div
            initial={false}
            className="pointer-events-none absolute left-1/2 top-full z-10 mt-5 hidden w-max -translate-x-1/2 lg:block xl:mt-6"
          >
            <motion.div style={{ x: float2.x, y: float2.y }} className="will-change-transform">
              <div className="relative overflow-hidden rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-white/70 via-indigo-50/40 to-[#6366F1]/[0.08] px-4 py-3 shadow-[0_14px_36px_-10px_rgba(99,102,241,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#6366F1]/10 backdrop-blur-xl backdrop-saturate-150">
                <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#6366F1]/15 blur-2xl" aria-hidden />
                <div className="relative flex items-center gap-3">
                  <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-indigo-600/10 ring-1 ring-[#6366F1]/20">
                    {!reduceMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-xl bg-[#6366F1]/25"
                        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden
                      />
                    )}
                    <Activity className="relative h-4 w-4 text-[#4F46E5]" strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-tight text-[#0A0A0A]">Performance</span>
                      {!reduceMotion && (
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-[#6366F1] shadow-[0_0_10px_rgba(99,102,241,0.55)]"
                          animate={{ opacity: [1, 0.35, 1], scale: [1, 0.9, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="mt-0.5 text-[9px] font-medium leading-snug text-[#64748B]">Core Web Vitals · tuned</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Section ─── */

export default function Hero() {
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  const isParallaxDisabled = !canHover || !!reduceMotion;

  const {
    sectionRef,
    isHovered,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    textX,
    textY,
    mockX,
    mockY,
    mockRotateX,
    mockRotateY,
    float1X,
    float1Y,
    float2X,
    float2Y,
    glowLeft,
    glowTop,
  } = useHeroParallax(isParallaxDisabled);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-page-soft"
      aria-label="Hero"
    >
      {/* Cursor-follow glow */}
      <AnimatePresence>
        {isHovered && !isParallaxDisabled && (
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
                left: glowLeft,
                top: glowTop,
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-24 lg:px-10 lg:py-0 xl:px-12">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Left — text with subtle cursor parallax */}
          <motion.div
            style={isParallaxDisabled ? undefined : { x: textX, y: textY }}
            className="pt-16 md:pt-0 will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3 py-1"
            >
              {reduceMotion ? (
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/25" />
              ) : (
                <motion.span
                  className="relative h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"
                  animate={{ opacity: [1, 0.55, 1], scale: [1, 0.92, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span className="text-xs font-medium text-[#6B7280]">Available for new projects</span>
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
                  textShadow: isHovered
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
                  href="/start"
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

            {/* Be a CodeAster CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="mt-4"
            >
              <Link
                href="/be-a-codeaster"
                data-cursor="Join"
                className="group inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#6366F1] transition-colors duration-300"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#6366F1]/10">
                  <Sparkles size={10} className="text-[#6366F1]" />
                </span>
                <span>
                  <span className="font-medium text-[#6366F1]">Be a CodeAster</span>
                  {" "}— Earn up to 30% commission
                </span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — visual with cursor-reactive 3D depth (side card + below card need horizontal room) */}
          <div className="min-w-0 w-full lg:pr-4 xl:pr-8 2xl:pr-10">
            <HeroVisual
              mockup={{ x: mockX, y: mockY, rotateX: mockRotateX, rotateY: mockRotateY }}
              float1={{ x: float1X, y: float1Y }}
              float2={{ x: float2X, y: float2Y }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
