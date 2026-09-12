"use client";

import { useEffect, useRef } from "react";

type Hue = "teal" | "indigo";

/* ============ tunable constants ============ */
const AMBIENT_COUNT = 350; // total particles — keep high so the wordmark reads clearly
const WORDMARK_TEXT = "REVEYRO";
const DRIFT_MS = 3000; // free-drift phase (ms)
const EASE_MS = 1800; // ease-in / ease-out duration (ms)
const HOLD_MS = 6000; // hold-formed position (ms)
const LOOP = true; // repeat the cycle indefinitely
const FORM_Y_RATIO = 0.22; // wordmark vertical position (ratio of viewport height, above the hero card)

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: Hue;
  jphase: number; // per-particle phase for sine-wave jitter
  target: { x: number; y: number } | null;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function particleColor(p: Particle, a: number) {
  return p.hue === "teal"
    ? `rgba(45,212,191,${a})`
    : `rgba(129,140,248,${a})`;
}

/**
 * Full-screen canvas particle field.
 * - Particles drift freely in the background with connecting-thread lines.
 * - After DRIFT_MS they ease into forming the WORDMARK_TEXT wordmark above
 *   the hero card.
 * - Hold the formed shape for HOLD_MS with gentle sine jitter, then ease
 *   back out. Repeats when LOOP is true.
 *
 * Particle array + animation state live in useRef so React re-renders never
 * reset the field. Setup runs in a single useEffect([]), and the returned
 * cleanup cancels the animation frame (important under Strict Mode).
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const textPointsRef = useRef<{ x: number; y: number }[]>([]);
  const startRef = useRef<number>(0);
  const wRef = useRef(0);
  const hRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    let w = 0;
    let h = 0;

    /* ---------- init particles (once, into ref) ---------- */
    const particles: Particle[] = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: lerp(-1.1, 1.1, Math.random()),
        vy: lerp(-1.1, 1.1, Math.random()),
        r: lerp(1.0, 2.4, Math.random()),
        hue: Math.random() < 0.6 ? "teal" : "indigo",
        jphase: Math.random() * Math.PI * 2,
        target: null,
      });
    }
    particlesRef.current = particles;

    /* ============ sample the wordmark into target points ============ */
    function buildTextTargets() {
      const offW = Math.min(1100, w * 0.9);
      const offH = 240;
      if (offW <= 0) return;
      const off = document.createElement("canvas");
      off.width = Math.floor(offW);
      off.height = offH;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      const fontSize = Math.min(170, (offW / WORDMARK_TEXT.length) * 1.7);
      octx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(WORDMARK_TEXT, offW / 2, offH / 2);

      const data = octx.getImageData(0, 0, off.width, offH).data;
      const pts: { x: number; y: number }[] = [];
      const step = 3; // smaller = denser text, requires more particles to fill
      for (let yy = 0; yy < offH; yy += step) {
        for (let xx = 0; xx < off.width; xx += step) {
          const alpha = data[(yy * off.width + xx) * 4 + 3];
          if (alpha > 128) {
            pts.push({
              x: w / 2 - offW / 2 + xx,
              y: h * FORM_Y_RATIO - offH / 2 + yy,
            });
          }
        }
      }
      textPointsRef.current = pts;

      // assign each particle a target, cycling through points if particles > points
      for (let i = 0; i < particles.length; i++) {
        const base = pts.length
          ? pts[i % pts.length]
          : { x: w / 2, y: h * FORM_Y_RATIO };
        particles[i].target = base;
      }
    }

    /* ---------- resize ---------- */
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      wRef.current = w;
      hRef.current = h;
      buildTextTargets();
    };
    window.addEventListener("resize", resize);
    resize();

    // wait for the webfont so the sampled glyph shapes are correct, not a fallback font
    try {
      const fonts = (
        document as Document & { fonts?: FontFaceSet }
      ).fonts;
      if (fonts) {
        fonts
          .load('700 100px "Space Grotesk"')
          .then(() => {
            resize();
          })
          .catch(() => {
            resize();
          });
      }
    } catch {
      /* webfont wait is best-effort — the fallback targets are already built */
    }

    /* ============ animation loop ============ */
    const start = performance.now();
    startRef.current = start;
    const CYCLE_MS = LOOP ? DRIFT_MS + EASE_MS + HOLD_MS + EASE_MS : Infinity;

    function pullFactor(elapsed: number) {
      const t = LOOP ? elapsed % CYCLE_MS : Math.min(elapsed, CYCLE_MS);
      if (t < DRIFT_MS) return 0;
      const formT = t - DRIFT_MS;
      if (formT < EASE_MS) return smoothstep(formT / EASE_MS);
      if (formT < EASE_MS + HOLD_MS) return 1;
      if (!LOOP) return 1;
      const outT = formT - EASE_MS - HOLD_MS;
      return smoothstep(1 - outT / EASE_MS);
    }

    function draw(now: number) {
      const elapsed = now - start;
      const factor = pullFactor(elapsed);
      const cw = wRef.current || w;
      const ch = hRef.current || h;
      const g = ctx as CanvasRenderingContext2D;

      g.globalCompositeOperation = "source-over";
      g.fillStyle = "rgba(2,3,10,0.16)";
      g.fillRect(0, 0, cw, ch);

      g.globalCompositeOperation = "lighter";

      for (const p of particles) {
        if (factor > 0 && p.target) {
          // gentle shimmer so the formed wordmark doesn't look frozen/dead
          const jx = Math.sin(now * 0.0016 + p.jphase) * 1.4;
          const jy = Math.cos(now * 0.0013 + p.jphase) * 1.4;
          const tx = p.target.x + jx;
          const ty = p.target.y + jy;
          const pull = 0.09 * factor + 0.02 * factor * factor;
          const ax = (tx - p.x) * pull;
          const ay = (ty - p.y) * pull;
          const damp = 1 - factor * 0.75;
          p.vx = p.vx * damp + ax;
          p.vy = p.vy * damp + ay;
          // cap speed so the word snaps in fast without slingshotting past targets
          const sp = Math.hypot(p.vx, p.vy);
          const maxSp = 3 + factor * 9;
          if (sp > maxSp) {
            p.vx = (p.vx / sp) * maxSp;
            p.vy = (p.vy / sp) * maxSp;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        g.fillStyle = particleColor(p, 0.85);
        g.shadowColor = particleColor(p, 1);
        g.shadowBlur = 8;
        g.fill();
      }
      g.shadowBlur = 0;

      // connecting threads only make sense while particles are loose — fade them out as text forms
      const threadAlpha = (1 - factor) * 0.12;
      if (threadAlpha > 0.003) {
        g.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j += 8) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (dx * dx + dy * dy < 90 * 90) {
              g.strokeStyle = `rgba(45,212,191,${threadAlpha})`;
              g.beginPath();
              g.moveTo(a.x, a.y);
              g.lineTo(b.x, b.y);
              g.stroke();
            }
          }
        }
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);

    /* ---------- cleanup ---------- */
    return () => {
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, []); /* empty deps → mount only */

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}