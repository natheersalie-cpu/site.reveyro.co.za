import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PRICING, formatRand } from "@/lib/pricing";

/**
 * Pricing teaser — brief intro + link to the full Pricing page.
 * All prices come from lib/pricing.ts (never hard-coded here).
 */
export function PricingTeaser() {
  return (
    <section className="section">
      <Reveal>
        <div className="section-eyebrow">PRICING</div>
        <h2>Simple pricing that grows with you.</h2>
        <p className="lede">
          Plans from {formatRand(PRICING.starter.price)}/month &mdash; or get
          everything with {PRICING.complete.name} at{" "}
          {formatRand(PRICING.complete.price)}/month. All new plans include a{" "}
          {formatRand(PRICING.setupFee)} once-off setup.
        </p>
        <div className="mt-8">
          <Link
            href="/pricing"
            className="btn-primary inline-flex items-center justify-center"
          >
            See pricing
          </Link>
        </div>
      </Reveal>
    </section>
  );
}