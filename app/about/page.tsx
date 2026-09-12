import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "About Reveyro",
  description:
    "Reveyro's story and mission: simple, professional business software that helps small businesses work smarter, stay organised and grow - without the complexity or cost of enterprise solutions.",
};

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <section className="section">
        <div className="section-eyebrow">ABOUT</div>
        <h2>Our story</h2>

        <Reveal>
          <div className="mt-8 max-w-3xl space-y-6 text-text-dim">
            <p>
              Reveyro was born from a simple idea:{" "}
              <strong className="font-medium text-fg">
                running a business shouldn&apos;t require expensive, complicated
                software.
              </strong>
            </p>
            <p>
              Many small businesses manage customers, quotes, invoices and
              payments across spreadsheets, WhatsApp messages, emails and
              paperwork. As the business grows, things get missed, information
              gets lost, and keeping track of what&apos;s happening becomes
              harder.
            </p>
            <p>
              We built Reveyro to bring those everyday business processes
              together in one simple platform.
            </p>
            <p>
              From creating a customer and sending a quote, to turning an
              accepted quote into an invoice and keeping track of the money that
              comes in, Reveyro helps businesses stay organised, professional
              and in control.
            </p>
            <p>
              And because every business is different, Reveyro is built to grow
              with you &mdash; with tools and modules that can be enabled as your
              business needs them.
            </p>
          </div>
        </Reveal>

        {/* Mission statement */}
        <Reveal delay={120}>
          <div className="mt-16 border-l-2 border-teal/30 pl-6">
            <h3 className="font-mono text-xs text-indigo uppercase tracking-widest">
              Our mission
            </h3>
            <p className="mt-3 max-w-2xl text-xl text-fg">
              To give small businesses access to simple, professional business
              software that helps them work smarter, stay organised and grow
              &mdash; without the complexity or cost of enterprise solutions.
            </p>
            <p className="mt-4 max-w-2xl text-text-dim">
              Reveyro is built for businesses that want to spend less time
              managing paperwork and systems, and more time running their
              business.
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}