"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticContainerProps {
  children: React.ReactElement;
  range?: number; // Distance threshold to trigger magnetic pull
  strength?: number; // How strongly it pulls (0.1 to 1)
}

export default function MagneticContainer({
  children,
  range = 45,
  strength = 0.35,
}: MagneticContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The target element is the first child of the container
    const child = container.firstElementChild as HTMLElement;
    if (!child) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate Euclidean distance
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        // Pull child towards mouse
        gsap.to(child, {
          x: distanceX * strength,
          y: distanceY * strength,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Snap back if cursor is outside range but still within bounds
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = () => {
      // Elastic snap back to origin
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
