"use client";

import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const tiers = [
  {
    name: "Launch",
    price: "R499",
    period: "month",
    users: "3 users",
    recommended: false,
    placeholder: true,
  },
  {
    name: "Growth",
    price: "R1,499",
    period: "month",
    users: "10 users",
    recommended: true,
    placeholder: true,
  },
  {
    name: "Scale",
    price: "R3,499",
    period: "month",
    users: "25 users",
    recommended: false,
    placeholder: true,
  },
  {
    name: "Enterprise",
    price: null,
    period: null,
    users: "Custom",
    href: "/contact",
    cta: "Contact sales",
    placeholder: true,
  },
];

/* PLACEHOLDER_TIER_FEATURES — real list to follow separately */

export default function PricingPage() {
  return (
    <>
      <NavBar />

      <section className="section">
        <div className="section-eyebrow">PRICING</div>
        <h2>Everything your business needs, in one place.</h2>
        <p className="lede">
          Pay-as-you-grow pricing with no hidden fees. Simple monthly
          billing.
        </p>

        {/* Tier cards */}
        <div className="grid3 mt-12 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="section pt-0">
        <div className="section-eyebrow">ADD-ONS</div>
        <h2>Extend your plan.</h2>
        <p className="lede">
          Everything you need to scale beyond your initial tier.
        </p>
        <div className="mt-8 max-w-2xl">
          <AddonList />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 text-center">
        <p className="text-xs text-text-faint">
          Pricing shown is a working commercial model and subject to
          final approval at time of signature.
        </p>
      </section>

      <Footer />
    </>
  );
}

function TierCard({
  tier,
}: {
  tier: (typeof tiers)[number];
}) {
  const isEnterprise = tier.price === null;
  const priceDisplay = isEnterprise
    ? "Custom pricing"
    : `${tier.price} / ${tier.period}`;

  return (
    <div
      className={cn(
        "card relative flex flex-col",
        tier.recommended && "border-teal/40"
      )}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-3 py-1 text-xs font-medium text-[#08211D]">
          Recommended
        </div>
      )}
      <h3 className="text-base font-semibold text-fg mb-1">{tier.name}</h3>
      <p className="text-2xl font-bold text-fg mb-1">
        {priceDisplay}
      </p>
      <p className="text-sm text-text-dim mb-4">{tier.users}</p>

      {/* PLACEHOLDER_TIER_FEATURES — real feature list to follow separately */}
      <ul className="mb-6 space-y-2 text-sm text-text-dim">
        <li className="flex items-center">
          <span className="mr-2 text-teal">✓</span> All {tier.name} features
        </li>
      </ul>

      {isEnterprise ? (
        <a
          href={tier.href}
          className="mt-auto btn-primary text-center"
        >
          {tier.cta}
        </a>
      ) : (
        <button className="mt-auto btn-primary" disabled>
          Get started
        </button>
      )}
    </div>
  );
}

const addons = [
  { name: "Additional users", price: "R149/user/mo" },
  { name: "Assisted migration", price: "R2,500 once-off" },
  { name: "Priority onboarding", price: "R1,500 once-off" },
  { name: "Advanced reporting", price: "R299/mo" },
  { name: "Enterprise support", price: "Custom" },
];

function AddonList() {
  return (
    <div className="space-y-3">
      {addons.map((addon) => (
        <div
          key={addon.name}
          className="flex justify-between rounded-lg border border-white/5 px-4 py-3"
        >
          <span className="text-sm text-text-dim">{addon.name}</span>
          <span className="text-sm font-medium text-fg">{addon.price}</span>
        </div>
      ))}
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}