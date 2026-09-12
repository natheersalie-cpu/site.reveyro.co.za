import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";

/**
 * "Why Reveyro" — four-card feature grid explaining the value prop,
 * with scroll-reveal entrance and cursor-spotlight cards.
 */

const features = [
  {
    title: "Manage your customers",
    description:
      "Keep your customer information organised and accessible, so you always know who you're dealing with and what work you're doing for them.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
        <path d="M16.5 4.8a3.5 3.5 0 0 1 0 6.4" />
        <path d="M18.5 13.9c1.8 1 3 2.9 3 6.1" />
      </svg>
    ),
  },
  {
    title: "Quote with confidence",
    description:
      "Create professional quotes, send them to your customers and keep track of what happens next \u2014 without losing information between systems.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M15 2v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </svg>
    ),
  },
  {
    title: "Invoice and get paid",
    description:
      "Turn accepted quotes into invoices and keep your business records connected from the original quote through to payment.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 16v-8h2.5a2.5 2.5 0 0 1 0 5H9.5" />
        <path d="M12.5 13l2 3" />
      </svg>
    ),
  },
  {
    title: "Grow with Reveyro",
    description:
      "Start with the tools you need today and add more as your business grows \u2014 including Customer Portal, eBook and Receipt & Cost Reconciliation.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 17l6-6 4 4 7-7" />
        <path d="M14 8h6v6" />
      </svg>
    ),
  },
];

export function WhyReveyro() {
  return (
    <section className="section">
      <Reveal>
        <div className="section-eyebrow">WHY REVEYRO</div>
        <h2>Everything your business needs. Nothing you don&apos;t.</h2>
        <p className="lede">
          Running a small business shouldn&apos;t mean juggling spreadsheets,
          paperwork, WhatsApp messages and different systems just to keep
          track of what&apos;s happening.
        </p>
        <p className="lede mt-3">
          Reveyro brings the important parts of your business together in one
          simple platform &mdash; so you can stay organised, work
          professionally and focus on your customers.
        </p>
      </Reveal>

      <div className="grid3 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 90}>
            <SpotlightCard className="h-full">
              <div className="card-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}