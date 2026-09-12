"use client";

import { type ReactNode } from "react";

/**
 * Card with a cursor-following spotlight: a radial highlight and border
 * glow track the pointer via CSS custom properties (--mx/--my), so all
 * movement is GPU-composited (background/opacity only).
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`spotlight-card ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
    >
      {children}
    </div>
  );
}