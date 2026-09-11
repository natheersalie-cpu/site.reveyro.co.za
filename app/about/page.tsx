import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "About Reveyro",
  description:
    "Learn about Reveyro's mission to give every team one control surface for customers, invoices, and permissions.",
};

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <section className="section">
        <div className="section-eyebrow">ABOUT</div>
        <h2>Our story</h2>

        {/* PLACEHOLDER_ABOUT_COPY — real copy to follow separately */}
        <div className="mt-8 max-w-3xl space-y-6 text-text-dim">
          <p>
            Reveyro was born from a simple problem: teams ship features
            faster than they can track what happens to real money.
                        Whether it&apos;s a customer record that shouldn&apos;t exist, an
            invoice that skipped approvals, or a permission that was
            too broad — the signal is always there, buried in logs
            nobody reads until something goes wrong.
          </p>
          <p>
            We built Reveyro to turn that signal into a control
            surface: one place where access, financial state, and
                        audit history converge — so you can see what&apos;s about to
            happen before it does.
          </p>
          <p>
            Today we serve teams across fintech, SaaS, and enterprise
                        retail who can&apos;t afford to find out later.
          </p>
        </div>

        {/* Mission statement */}
        <div className="mt-16 border-l-2 border-teal/30 pl-6">
          <h3 className="font-mono text-xs text-indigo uppercase tracking-widest">
            Our mission
          </h3>
          <p className="mt-3 max-w-2xl text-xl text-fg">
            Give every team the visibility and control they need to
            move fast — without the blind spots that cost them sleep.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}