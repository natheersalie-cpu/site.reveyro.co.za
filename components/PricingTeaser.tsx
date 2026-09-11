import Link from "next/link";

/**
 * Pricing teaser — brief intro + link to the full Pricing page.
 */
export function PricingTeaser() {
  return (
    <section className="section">
      <div className="section-eyebrow">PRICING</div>
      <h2>Transparent tiers, built for every stage.</h2>
      <p className="lede">
                From solo founders to enterprise fleets, there&apos;s a plan that
        fits your scale — and add-ons to bridge the gap when you outgrow it.
      </p>
      <div className="mt-8">
        <Link
          href="/pricing"
          className="btn-primary inline-flex items-center justify-center"
        >
          See pricing
        </Link>
      </div>
    </section>
  );
}