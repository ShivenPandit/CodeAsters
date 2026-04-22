"use client";

import { useEffect, useRef, type RefObject } from "react";

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/**
 * Lightweight CSS-based scroll reveal that runs on the compositor thread.
 *
 * Unlike Framer Motion's `whileInView`, this does NOT trigger React re-renders.
 * A single IntersectionObserver watches all elements and toggles a CSS class,
 * so the animation runs entirely in CSS — no main-thread jank on iPhone.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   <div ref={ref} className="scroll-reveal">...</div>
 *
 * For staggered children, add `--reveal-delay` CSS variable:
 *   style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
 */
export function useScrollReveal<T extends HTMLElement>(
  options?: { margin?: string; once?: boolean }
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { margin = "-60px", once = true } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("scroll-reveal--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-reveal--visible");
          if (once) observer.unobserve(el);
        }
      },
      { rootMargin: margin, threshold: 0.01 }
    );

    if (isInViewport(el)) {
      el.classList.add("scroll-reveal--visible");
      if (once) {
        return () => observer.disconnect();
      }
    }

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin, once]);

  return ref;
}

/**
 * Batch version: observe multiple children of a container.
 * Each child with `.scroll-reveal` class gets revealed independently.
 */
export function useScrollRevealContainer<T extends HTMLElement>(
  options?: { margin?: string; once?: boolean }
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { margin = "-40px", once = true } = options ?? {};

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const children = container.querySelectorAll<HTMLElement>(".scroll-reveal");

    if (reduceMotion) {
      children.forEach((child) => child.classList.add("scroll-reveal--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("scroll-reveal--visible");
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: margin, threshold: 0.01 }
    );

    children.forEach((child) => {
      if (isInViewport(child)) {
        child.classList.add("scroll-reveal--visible");
      }
    });

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [margin, once]);

  return ref;
}
