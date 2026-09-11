"use client";

import { useModal } from "@/components/ModalContext";

/**
 * Hero section call-to-action buttons:
 *  - Primary: "Request access" → opens the fuller lead form
 *  - Secondary: "See it in motion" → opens the same request form
 */
export function HeroCTAs() {
  const { open } = useModal();

  return (
    <div className="mt-8 flex gap-4 justify-center">
      <button
        type="button"
        onClick={open}
        className="btn-primary inline-flex items-center justify-center"
      >
        Request access
      </button>
      <button
        type="button"
        onClick={open}
        className="btn-ghost inline-flex items-center justify-center"
      >
        See it in motion
      </button>
    </div>
  );
}