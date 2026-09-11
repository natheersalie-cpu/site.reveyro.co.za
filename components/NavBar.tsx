"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Sticky navigation bar — always visible at the top of every page.
 * Brand mark (gradient), links, and a persistent "Request access" button.
 */
export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[42px] py-[22px]">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <span className="block h-[26px] w-[26px] rounded-[7px] bg-gradient-to-br from-teal to-indigo" />
        Reveyro
      </Link>

      {/* Links + CTA */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm transition-colors",
              pathname === link.href
                ? "text-white"
                : "text-text-dim hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="rounded-lg border border-white/18 bg-transparent px-4 py-2 text-xs text-white transition-colors hover:bg-white/5"
        >
          Request access
        </Link>
      </div>
    </nav>
  );
}