"use client";

import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useModal } from "@/components/ModalContext";
import {
  PRICING,
  MODULE_INDIVIDUAL_TOTAL,
  BUNDLE_SAVING,
  COMPLETE_INDIVIDUAL_TOTAL,
  COMPLETE_SAVING,
  COMPLETE_FIRST_PAYMENT,
  SETUP_FEE_DESCRIPTION,
  VAT_NOTE,
  formatRand,
  type CorePlan,
  type ModulePlan,
} from "@/lib/pricing";

const corePlans: CorePlan[] = [PRICING.starter, PRICING.business];

const modulePlans: ModulePlan[] = [
  PRICING.modules.customerPortal,
  PRICING.modules.ebook,
  PRICING.modules.reconciliation,
];

export default function PricingPage() {
  const { open } = useModal();

  return (
    <>
      <NavBar />

      {/* Core plans */}
      <section className="section">
        <div className="section-eyebrow">PRICING</div>
        <h2>Simple pricing that grows with your business.</h2>
        <p className="lede">
          Start with the plan you need today &mdash; add modules or upgrade to
          Reveyro Complete whenever you are ready.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {corePlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90}>
              <PlanCard plan={plan} onGetStarted={open} />
            </Reveal>
          ))}
        </div>

        {/* Once-off setup fee — always shown separately from monthly pricing */}
        <Reveal delay={200}>
          <div className="card mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-fg">
                {formatRand(PRICING.setupFee)} once-off setup
              </p>
              <p className="mt-1 text-sm text-text-dim">
                {SETUP_FEE_DESCRIPTION}
              </p>
            </div>
            <span className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-xs text-text-faint">
              Not recurring
            </span>
          </div>
        </Reveal>
      </section>

      {/* Optional modules */}
      <section className="section pt-0">
        <div className="section-eyebrow">OPTIONAL MODULES</div>
        <h2>Add modules as you grow.</h2>
        <p className="lede">
          Enable more of Reveyro when your business needs it &mdash; and
          bundle all three for one price.
        </p>

        <div className="grid3 md:grid-cols-3">
          {modulePlans.map((mod, i) => (
            <Reveal key={mod.name} delay={i * 90}>
              <SpotlightCard className="flex h-full flex-col">
                <h3 className="text-base font-semibold text-fg">{mod.name}</h3>
                <p className="mb-3 mt-2 text-2xl font-bold text-fg">
                  +{formatRand(mod.price)}
                  <span className="text-sm font-normal text-text-dim"> / month</span>
                </p>
                <p>{mod.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Bundle callout */}
        <Reveal delay={150}>
          <SpotlightCard className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-fg">
                  {PRICING.moduleBundle.name}
                </h3>
                <p className="mt-1 text-sm text-text-dim">
                  {PRICING.moduleBundle.includes.join(" + ")}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-bold text-fg">
                  {formatRand(PRICING.moduleBundle.price)}
                  <span className="text-sm font-normal text-text-dim"> / month</span>
                </p>
                <p className="mt-1 text-xs text-teal">
                  Normally {formatRand(MODULE_INDIVIDUAL_TOTAL)}/month &mdash; save{" "}
                  {formatRand(BUNDLE_SAVING)}/month
                </p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* Reveyro Complete — strongest overall value */}
      <section className="section pt-0">
        <div className="section-eyebrow">REVEYRO COMPLETE</div>
        <h2>Everything Reveyro offers, in one package.</h2>

        <Reveal>
          <div className="complete-card card relative mt-2">
            <div className="badge-pop">Best full package</div>
            <div className="grid gap-8 pt-4 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-fg">
                  {formatRand(PRICING.complete.price)}
                  <span className="text-base font-normal text-text-dim"> / month</span>
                </h3>
                <p className="mt-1 text-sm text-teal">
                  Normally {formatRand(COMPLETE_INDIVIDUAL_TOTAL)}/month &mdash; save{" "}
                  {formatRand(COMPLETE_SAVING)}/month
                </p>
                <p className="mt-4 max-w-md text-sm text-text-dim">
                  The full Reveyro platform: {PRICING.business.name} plus all
                  three modules, for businesses that want everything working
                  together from day one.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-text-dim">
                  {PRICING.complete.includes.map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="mr-2 text-teal">&#10003;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-indigo">
                  Payment example
                </p>
                <div className="mt-4 space-y-2 text-sm text-text-dim">
                  <div className="flex justify-between">
                    <span>Once-off setup</span>
                    <span className="font-medium text-fg">
                      {formatRand(PRICING.setupFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>First month</span>
                    <span className="font-medium text-fg">
                      {formatRand(PRICING.complete.price)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span>Total first payment</span>
                    <span className="font-semibold text-fg">
                      {formatRand(COMPLETE_FIRST_PAYMENT)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>From month 2</span>
                    <span className="font-medium text-teal">
                      {formatRand(PRICING.complete.price)}/month
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={open}
                  className="btn-primary mt-6 w-full text-center"
                >
                  Request access
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Disclaimer */}
      <section className="pb-12 text-center">
        <p className="text-xs text-text-faint">
          {VAT_NOTE ??
            "Prices in South African rand (ZAR). The once-off setup fee is separate from monthly subscription pricing."}
        </p>
      </section>

      <Footer />
    </>
  );
}

function PlanCard({
  plan,
  onGetStarted,
}: {
  plan: CorePlan;
  onGetStarted: () => void;
}) {
  return (
    <SpotlightCard className="flex h-full flex-col">
      <h3 className="text-base font-semibold text-fg">{plan.name}</h3>
      <p className="mt-2 text-3xl font-bold text-fg">
        {formatRand(plan.price)}
        <span className="text-sm font-normal text-text-dim"> / month</span>
      </p>
      <p className="mt-1 text-xs text-text-faint">{plan.users}</p>
      <p className="mt-3 text-sm text-text-dim">{plan.description}</p>
      <ul className="mb-6 mt-4 space-y-2 text-sm text-text-dim">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <span className="mr-2 text-teal">&#10003;</span> {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onGetStarted}
        className="btn-primary mt-auto inline-flex items-center justify-center"
      >
        Get started
      </button>
    </SpotlightCard>
  );
}