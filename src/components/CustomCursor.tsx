"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useCanHover } from "@/lib/useCanHover";
import { scheduleRafTask } from "@/lib/rafScheduler";

export default function CustomCursor() {
  const canHover = useCanHover();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const hoverTargetRef = useRef<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hoverStyle, setHoverStyle] = useState<"default" | "action">("default");
  const [isVisible, setIsVisible] = useState(true);
  const pointerRef = useRef({ x: -100, y: -100 });
  const frameCancelRef = useRef<(() => void) | null>(null);

  const moveCursor = useCallback(
    (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      if (frameCancelRef.current) return;

      frameCancelRef.current = scheduleRafTask(() => {
        frameCancelRef.current = null;
        cursorX.set(pointerRef.current.x);
        cursorY.set(pointerRef.current.y);
      });
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    if (!canHover) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("[data-cursor]") ||
        target.closest("input") ||
        target.closest("textarea");

      if (!interactive) return;

      const nextTarget = interactive as HTMLElement;
      if (hoverTargetRef.current === nextTarget) return;

      hoverTargetRef.current = nextTarget;
      setIsHovering(true);
      setHoverStyle(nextTarget.hasAttribute("data-cursor") ? "action" : "default");
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      if (
        hoverTargetRef.current &&
        relatedTarget &&
        hoverTargetRef.current.contains(relatedTarget)
      ) {
        return;
      }

      hoverTargetRef.current = null;
      setIsHovering(false);
      setHoverStyle("default");
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      frameCancelRef.current?.();
      frameCancelRef.current = null;
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [moveCursor, canHover]);

  if (!canHover) return null;

  const ringSize = isHovering ? (hoverStyle === "action" ? 56 : 48) : 22;
  const dotSize = isHovering ? 6 : 8;
  const ringColor = isHovering
    ? hoverStyle === "action"
      ? "rgba(99, 102, 241, 0.55)"
      : "rgba(15, 23, 42, 0.35)"
    : "rgba(15, 23, 42, 0.2)";
  const ringGlow = isHovering
    ? hoverStyle === "action"
      ? "0 0 18px rgba(99, 102, 241, 0.25)"
      : "0 0 12px rgba(15, 23, 42, 0.18)"
    : "0 0 0 transparent";
  const dotColor = isHovering ? "rgba(99, 102, 241, 0.9)" : "rgba(10, 10, 10, 0.9)";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isPressed ? 0.92 : 1,
      }}
      transition={{ duration: 0.12 }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full border"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringColor,
          boxShadow: ringGlow,
          backgroundColor: isHovering ? "rgba(99, 102, 241, 0.05)" : "rgba(15, 23, 42, 0.02)",
        }}
        transition={{ type: "spring", damping: 16, stiffness: 260, mass: 0.35 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
        transition={{ type: "spring", damping: 18, stiffness: 420, mass: 0.25 }}
      />
      {isHovering && (
        <div className="cursor-orbit" style={{ width: ringSize, height: ringSize }} />
      )}
    </motion.div>
  );
}
