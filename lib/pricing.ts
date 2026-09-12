/**
 * Single source of truth for all approved Reveyro pricing.
 *
 * All prices are in South African rand (ZAR). Core-plan and module
 * prices are monthly; the setup fee is once-off. Never hard-code
 * these values in components — import them from here.
 */

export type CorePlan = {
  name: string;
  price: number;
  users: string;
  description: string;
  features: string[];
};

export type ModulePlan = {
  name: string;
  price: number;
  description: string;
};

export type BundlePlan = {
  name: string;
  price: number;
  includes: string[];
};

export type CompletePlan = {
  name: string;
  price: number;
  users: string;
  includes: string[];
};

const starter: CorePlan = {
  name: "Starter",
  price: 199,
  users: "1 user",
  description:
    "Everything you need to manage customers, quotes and invoices professionally.",
  features: ["Customers", "Quotes & invoices", "Payment tracking"],
};

const business: CorePlan = {
  name: "Business",
  price: 399,
  users: "Up to 5 users",
  description:
    "More users, more flexibility and access to advanced Reveyro modules.",
  features: ["Everything in Starter", "Up to 5 users", "Advanced Reveyro modules"],
};

const customerPortal: ModulePlan = {
  name: "Customer Portal",
  price: 99,
  description:
    "Give your customers a professional online space to interact with your business, view relevant information and request new work.",
};

const ebook: ModulePlan = {
  name: "eBook",
  price: 149,
  description:
    "Keep your business financial information organised with Reveyro's financial management tools.",
};

const reconciliation: ModulePlan = {
  name: "Receipt & Cost Reconciliation",
  price: 99,
  description:
    "Track supplier costs against customer invoices and see what your business actually earns.",
};

export const PRICING = {
  starter,
  business,
  modules: {
    customerPortal,
    ebook,
    reconciliation,
  },
  moduleBundle: {
    name: "All 3 Modules Bundle",
    price: 299,
    includes: [customerPortal.name, ebook.name, reconciliation.name],
  } satisfies BundlePlan,
  complete: {
    name: "Reveyro Complete",
    price: 599,
    users: "Up to 5 users",
    includes: [
      business.name,
      customerPortal.name,
      ebook.name,
      reconciliation.name,
      "Up to 5 users",
    ],
  } satisfies CompletePlan,
  setupFee: 1500,
};

/* ==== Derived values — always computed, never hard-coded ==== */

/** R99 + R149 + R99 = R347 */
export const MODULE_INDIVIDUAL_TOTAL =
  customerPortal.price + ebook.price + reconciliation.price;

/** R347 - R299 = R48 */
export const BUNDLE_SAVING = MODULE_INDIVIDUAL_TOTAL - PRICING.moduleBundle.price;

/** R399 + R99 + R149 + R99 = R746 */
export const COMPLETE_INDIVIDUAL_TOTAL = business.price + MODULE_INDIVIDUAL_TOTAL;

/** R746 - R599 = R147 */
export const COMPLETE_SAVING = COMPLETE_INDIVIDUAL_TOTAL - PRICING.complete.price;

/** R1,500 setup + R599 first month = R2,099 */
export const COMPLETE_FIRST_PAYMENT = PRICING.setupFee + PRICING.complete.price;

/** Applied to every new plan — once-off, not recurring. */
export const SETUP_FEE_DESCRIPTION =
  "Business configuration, company branding, user setup and initial onboarding.";

/**
 * Central VAT wording slot. Set to a string (e.g. "All prices include VAT.")
 * once the VAT treatment is confirmed — the wording then changes site-wide
 * from this single place. Null until decided (no wording is invented here).
 */
export const VAT_NOTE: string | null = null;

/** Format a rand amount the way the site displays prices, e.g. R1,500. */
export function formatRand(amount: number): string {
  return `R${amount.toLocaleString("en-US")}`;
}