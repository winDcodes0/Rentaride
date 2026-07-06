"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Apply global style class to hide regular cursor
    document.body.classList.add("custom-cursor-active");
    setIsVisible(true);

    // Initial position setup using GSAP quickTo
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Mouse leave / enter viewport
    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track mouseover to check interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, select, input, [data-hover='true']");
      
      if (interactiveEl) {
        const text = interactiveEl.getAttribute("data-cursor-text") || "";
        setCursorText(text);

        // Animate cursor state: expand and transform color
        gsap.to(ring, {
          width: text ? 72 : 54,
          height: text ? 72 : 54,
          backgroundColor: text ? "rgba(255, 51, 68, 0.08)" : "rgba(220, 38, 38, 0.12)",
          borderColor: text ? "#FF3344" : "#990011",
          borderWidth: "1.5px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: "#990011",
          duration: 0.3,
        });
      } else {
        setCursorText("");

        // Reset cursor state
        gsap.to(ring, {
          width: 32,
          height: 32,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(255, 51, 68, 0.5)",
          borderWidth: "1px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#FF3344",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/50 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ willChange: "transform, width, height, background-color, border-color" }}
      >
        {cursorText && (
          <span className="text-[8px] font-bold tracking-[0.15em] text-accent-cyan uppercase text-center select-none leading-none pl-[0.15em]">
            {cursorText}
          </span>
        )}
      </div>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-cyan rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ willChange: "transform, background-color" }}
      />
    </>
  );
}
