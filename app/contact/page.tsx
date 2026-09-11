import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Reveyro",
  description: "Get in touch with the Reveyro team.",
};

/* PLACEHOLDER_ADDRESS — replace with real address */
const PLACEHOLDER_ADDRESS = "123 Adderley Street\nCape Town, South Africa";
/* PLACEHOLDER_PHONE — replace with real phone number */
const PLACEHOLDER_PHONE = "+27 21 000 0000";

export default function ContactPage() {
  return (
    <>
      <NavBar />

      <section className="section">
        <div className="section-eyebrow">CONTACT</div>
                <h2>Let&apos;s talk.</h2>
        <p className="lede">
          Have a question, a partnership idea, or just want to see
                    Reveyro in action? Drop us a line — we&apos;re here to help.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-indigo">
                Address
              </h3>
              <p className="mt-2 text-sm whitespace-pre-line text-text-dim">
                {PLACEHOLDER_ADDRESS}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-indigo">
                Phone
              </h3>
              <p className="mt-2 text-sm text-text-dim">{PLACEHOLDER_PHONE}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-indigo">
                Email
              </h3>
              <p className="mt-2 text-sm text-text-dim">
                hello@reveyro.co.za
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}