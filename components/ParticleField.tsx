"use client";

import { useEffect, useRef } from "react";

type Hue = "teal" | "indigo";

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: Hue;
}

const AMBIENT_COUNT = 150;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ambientColor(p: AmbientParticle, a: number) {
  return p.hue === "teal"
    ? `rgba(45,212,191,${a})`
    : `rgba(129,140,248,${a})`;
}

/**
 * Full-screen canvas particle field — faithfully ported from the
 * reference HTML animation.
 *
 * - Particles are initialized ONCE on mount (not on every render).
 * - The animation loop runs via requestAnimationFrame inside a single useEffect.
 * - Resize handler updates canvas dimensions without re-creating particles.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ---------- resize ---------- */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---------- init particles (once) ---------- */
    const ambient: AmbientParticle[] = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambient.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: lerp(-0.22, 0.22, Math.random()),
        vy: lerp(-0.22, 0.22, Math.random()),
        r: lerp(0.6, 1.7, Math.random()),
        hue: Math.random() < 0.6 ? "teal" : "indigo",
      });
    }

    /* ---------- draw loop (const arrow → TS narrows captured vars) ---------- */
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.5;
      const cy = h * 0.5;

      /* trail fade */
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(2,3,10,0.16)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      /* particles */
      for (const p of ambient) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        /* subtle attraction toward screen centre when far away */
        if (dist > 320) {
          p.vx -= (dx * 0.0006);
          p.vy -= (dy * 0.0006);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = ambientColor(p, 0.55);
        ctx.shadowColor = ambientColor(p, 0.9);
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      /* connection lines (sampled to keep perf) */
      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < ambient.length; i++) {
        for (let j = i + 1; j < ambient.length; j += 6) {
          const a = ambient[i];
          const b = ambient[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < 95 * 95) {
            ctx.strokeStyle = "rgba(45,212,191,0.07)";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);

    /* ---------- cleanup ---------- */
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, []); /* empty deps → mount only */

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}