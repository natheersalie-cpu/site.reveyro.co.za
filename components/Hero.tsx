"use client";

import { ParticleField } from "@/components/ParticleField";
import { HeroCTAs } from "@/components/HeroCTAs";

/**
 * Home-page hero: full-viewport ParticleField background with a centered
 * glass-panel headline, subhead, and dual CTAs.
 */
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Canvas particle field — mount-only RAF loop */}
      <ParticleField />

      {/* Centered glass panel */}
      <div className="absolute top-1/2 left-1/2 z-30 mx-auto w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-bg/42 px-[46px] py-[38px] text-center backdrop-blur-xl border border-white/8">
        <div className="eyebrow">SYSTEM ONLINE</div>

        <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Every transaction.
          <br />
          <span className="bg-gradient-to-r from-[#7DD9FF] to-indigo bg-clip-text text-transparent">
            Seen before it happens.
          </span>
        </h1>

        <p className="hero-sub">
          Reveyro gives your team one control surface for customers,
          invoices, and permissions — watching everything that moves
          through your business, in real time.
        </p>

        <HeroCTAs />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 z-30 text-center font-mono text-[10.5px] text-text-faint tracking-[0.1em]">
        SCROLL
        <div className="mt-2 h-6 w-[1px] bg-gradient-to-b from-teal to-transparent scroll-pulse" />
      </div>
    </section>
  );
}
