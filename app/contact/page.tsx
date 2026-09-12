import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Reveyro",
  description: "Get in touch with the Reveyro team.",
};

const PUBLIC_EMAIL = "help@reveyro.co.za";
const WHATSAPP_URL = "https://wa.me/27832854686";

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
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-indigo">
                Email
              </h3>
              <p className="mt-2 text-sm text-text-dim">
                <a href={`mailto:${PUBLIC_EMAIL}`} className="transition-colors hover:text-white">
                  {PUBLIC_EMAIL}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-indigo">
                WhatsApp
              </h3>
              <p className="mt-2 text-sm text-text-dim">
                Prefer a quick chat? Message Reveyro directly on WhatsApp.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-4 inline-flex items-center justify-center"
              >
                Open WhatsApp
              </a>
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