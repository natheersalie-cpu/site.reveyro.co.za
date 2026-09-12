const items = [
  "Customers",
  "Quotes",
  "Invoices",
  "Payments",
  "Customer Portal",
  "eBook",
  "Receipt & Cost Reconciliation",
];

/**
 * Decorative infinite marquee of Reveyro capabilities. Pure CSS
 * animation, pauses on hover, static under reduced motion.
 */
export function FeatureMarquee() {
  return (
    <section aria-hidden="true" className="marquee-band">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={item}>
                {item}
                <span className="marquee-sep">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}