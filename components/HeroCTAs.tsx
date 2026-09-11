"use client";

import Link from "next/link";
import { useModal } from "@/components/ModalContext";

interface HeroCTAsProps {
  primaryHref?: string;
}

/**
 * Hero section call-to-action buttons:
 *  - Primary: "Request access" → navigates (defaults to /contact)
 *  - Secondary: "See it in motion" → opens the DemoModal
 */
export function HeroCTAs({ primaryHref = "/contact" }: HeroCTAsProps) {
  const { open } = useModal();

  return (
    <div className="mt-8 flex gap-4 justify-center">
      <Link
        href={primaryHref}
        className="btn-primary inline-flex items-center justify-center"
      >
        Request access
      </Link>
      <button
        onClick={open}
        className="btn-ghost inline-flex items-center justify-center"
      >
        See it in motion
      </button>
    </div>
  );
}