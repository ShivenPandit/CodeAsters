"use client";

import { motion, useReducedMotion } from "framer-motion";

const sideOrbs = [
  { side: "left" as const, top: "10%", left: "-8%", size: 280, delay: 0, duration: 22 },
  { side: "left" as const, top: "58%", left: "2%", size: 200, delay: 4, duration: 26 },
  { side: "right" as const, top: "14%", right: "-6%", size: 260, delay: 2, duration: 24 },
  { side: "right" as const, top: "62%", right: "0%", size: 220, delay: 5, duration: 20 },
];

const sparkles = [
  { side: "left" as const, top: "22%", offset: "12%", delay: 0 },
  { side: "left" as const, top: "42%", offset: "8%", delay: 1.2 },
  { side: "left" as const, top: "78%", offset: "18%", delay: 0.6 },
  { side: "right" as const, top: "28%", offset: "10%", delay: 0.8 },
  { side: "right" as const, top: "48%", offset: "14%", delay: 1.5 },
  { side: "right" as const, top: "72%", offset: "9%", delay: 0.3 },
];

export default function SiteBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-y-0 left-0 hidden w-[min(26vw,440px)] md:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/[0.07] via-[#6366F1]/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-[#6366F1]/20 to-transparent opacity-60" />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-[min(26vw,440px)] md:block">
        <div className="absolute inset-0 bg-gradient-to-l from-[#8B5CF6]/[0.06] via-[#8B5CF6]/[0.02] to-transparent" />
        <div className="absolute bottom-0 right-0 top-0 w-px bg-gradient-to-b from-transparent via-[#8B5CF6]/20 to-transparent opacity-60" />
      </div>

      {sideOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute hidden rounded-full blur-[90px] md:block ${orb.side === "left"
              ? "bg-[#6366F1]/[0.11]"
              : "bg-[#8B5CF6]/[0.1]"
            }`}
          style={{
            top: orb.top,
            width: orb.size,
            height: orb.size,
            ...(orb.side === "left"
              ? { left: orb.left }
              : { right: orb.right }),
          }}
          animate={
            reduce
              ? undefined
              : {
                x: orb.side === "left" ? [0, 18, -8, 0] : [0, -16, 10, 0],
                y: [0, 32, -12, 0],
                opacity: [0.45, 0.75, 0.5, 0.45],
              }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {sparkles.map((s, i) => (
        <motion.div
          key={`sp-${i}`}
          className="absolute hidden h-1 w-1 rounded-full bg-[#6366F1]/40 shadow-[0_0_12px_rgba(99,102,241,0.35)] md:block"
          style={{
            top: s.top,
            ...(s.side === "left" ? { left: s.offset } : { right: s.offset }),
          }}
          animate={
            reduce
              ? undefined
              : {
                y: [0, -14, 0],
                opacity: [0.2, 0.55, 0.2],
                scale: [1, 1.4, 1],
              }
          }
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={reduce ? undefined : { backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
