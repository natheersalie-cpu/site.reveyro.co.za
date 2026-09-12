"use client";

import { useEffect, useRef } from "react";
import { HeroCTAs } from "@/components/HeroCTAs";

/**
 * Home-page hero: layered aurora background with a fine grid and a
 * cursor-following spotlight, wrapped around a centered glass panel.
 * All motion is transform/opacity only; everything collapses to a
 * static layout for users who prefer reduced motion.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlightRef.current?.style.setProperty(
          "background",
          `radial-gradient(560px circle at ${x}px ${y}px, rgba(45,212,191,0.10), transparent 65%)`
        );
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        panelRef.current?.style.setProperty("--px", `${(nx * 10).toFixed(1)}px`);
        panelRef.current?.style.setProperty("--py", `${(ny * 10).toFixed(1)}px`);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Layer 1: base gradients (kept from the previous design) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 38%, rgba(45,212,191,0.14), transparent 70%), radial-gradient(50% 40% at 70% 65%, rgba(129,140,248,0.12), transparent 70%), #02030a",
        }}
      />
      {/* Layer 2: fine grid, radially masked */}
      <div aria-hidden="true" className="grid-bg absolute inset-0 z-0" />
      {/* Layer 3: slow drifting aurora blobs */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="aurora-blob aurora-blob-teal" />
        <div className="aurora-blob aurora-blob-indigo" />
      </div>
      {/* Layer 4: cursor spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
      />

      {/* Centered glass panel */}
      <div
        ref={panelRef}
        className="glass-panel absolute top-1/2 left-1/2 z-30 mx-auto w-full max-w-[600px] rounded-[20px] px-[46px] py-[38px] text-center"
        style={{
          transform:
            "translate(calc(-50% + var(--px, 0px)), calc(-50% + var(--py, 0px)))",
        }}
      >
        <div className="hero-fade">
          <div className="alive-badge">
            <span className="alive-dot" />
            YOUR BUSINESS. ONE SIMPLE PLATFORM.
          </div>
        </div>

        <h1 className="hero-fade hero-fade-2 mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Customers. Quotes. Invoices.
          <br />
          <span className="gradient-text">All in one place.</span>
        </h1>

        <p className="hero-sub hero-fade hero-fade-3">
          Reveyro gives small businesses the tools to manage their day-to-day
          business professionally &mdash; without the complexity and cost of
          enterprise software.
        </p>

        <p className="hero-tagline hero-fade hero-fade-4">
          START SIMPLE. GROW WITH REVEYRO.
        </p>

        <div className="hero-fade hero-fade-5">
          <HeroCTAs />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 z-30 text-center font-mono text-[10.5px] text-text-faint tracking-[0.1em]">
        SCROLL
        <div className="mt-2 h-6 w-[1px] bg-gradient-to-b from-teal to-transparent scroll-pulse" />
      </div>
    </section>
  );
}