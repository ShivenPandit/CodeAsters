"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const rafRef = useRef<number>(0);

  const springConfig = { damping: 25, stiffness: 500, mass: 0.35 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    const touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
    if (touch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("[data-cursor]") ||
        target.closest("input") ||
        target.closest("textarea");

      if (interactive) {
        setIsHovering(true);
        const el = interactive as HTMLElement;
        const cursorLabel =
          el.getAttribute("data-cursor") || "";
        setLabel(cursorLabel);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("[data-cursor]") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsHovering(false);
        setLabel("");
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [moveCursor]);

  if (isTouchDevice) return null;

  const hasLabel = label.length > 0;
  const size = hasLabel ? 64 : isHovering ? 44 : 8;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
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
          damping: 20,
          stiffness: 400,
          mass: 0.35,
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
