"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useCanHover } from "@/lib/useCanHover";
import { scheduleRafTask } from "@/lib/rafScheduler";

export default function CustomCursor() {
  const canHover = useCanHover();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const hoverTargetRef = useRef<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [label, setLabel] = useState("");
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
      setLabel(nextTarget.getAttribute("data-cursor") || "");
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
      setLabel("");
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

  const hasLabel = label.length > 0;
  const size = hasLabel ? 64 : isHovering ? 44 : 8;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center"
        animate={{
          width: size,
          height: size,
          backgroundColor: isHovering
            ? "rgba(99, 102, 241, 0.1)"
            : "rgba(10, 10, 10, 0.9)",
          scale: isPressed ? 0.85 : 1,
          boxShadow: isHovering
            ? "0 0 0 1.5px rgba(99, 102, 241, 0.15)"
            : "0 0 0 0px transparent",
        }}
        transition={{
          type: "spring",
          damping: 14,
          stiffness: 620,
          mass: 0.18,
        }}
      >
        <AnimatePresence>
          {hasLabel && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-medium text-[#6366F1] select-none whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
