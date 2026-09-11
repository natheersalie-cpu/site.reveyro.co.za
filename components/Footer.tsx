import Link from "next/link";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Site footer — nav links, copyright, and the WhatsAppFloat button.
 */
export function Footer() {
  return (
    <>
      <footer className="mt-auto border-t border-white/5 pt-12 pb-6">
        <div className="mx-auto max-w-[1080px] px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Brand + copyright */}
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="block h-[26px] w-[26px] rounded-[7px] bg-gradient-to-br from-teal to-indigo" />
                Reveyro
              </div>
              <p className="text-xs text-text-faint">
                © {new Date().getFullYear()} Reveyro. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}