"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
 * Gains a glass background once the page is scrolled; the active link
 * carries a glowing underline.
 */
export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={cn("nav-bar", scrolled && "nav-scrolled")}>
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <Image
          src="/reveyro-mark.svg"
          alt="Reveyro"
          width={32}
          height={32}
          priority
          className="h-8 w-8 rounded-[8px]"
        />
        <span>Reveyro</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "nav-link relative text-sm transition-colors",
              pathname === link.href
                ? "nav-link-active text-white"
                : "text-text-dim hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}