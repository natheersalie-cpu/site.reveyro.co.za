"use client";

import { useEffect, useRef } from "react";
import { useModal } from "@/components/ModalContext";
import { cn } from "@/lib/utils";
import { XIcon } from "@/components/DemoModalIcons";
import { DemoModalForm } from "@/components/DemoModalForm";

/**
 * Demo modal — wrapper that handles backdrop, panel, transitions,
 * Escape key, and click-outside dismissal.  Form state lives in
 * <DemoModalForm /> which is keyed by modalKey so it remounts fresh
 * every time the modal opens (no setState-in-effect needed).
 */
export function DemoModal() {
  const { isOpen, close, modalKey } = useModal();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [isOpen, close]);

  /* click-outside */
  useEffect(() => {
    if (!isOpen) return;
    const onMousedown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    };
    window.addEventListener("mousedown", onMousedown);
    return () => window.removeEventListener("mousedown", onMousedown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
          "animate-in fade-in-0 duration-200"
        )}
      />

      {/* Modal panel — keyed by modalKey so <DemoModalForm> remounts fresh */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          key={modalKey}
          ref={panelRef}
          className={cn(
            "relative w-full max-w-md rounded-2xl border border-white/10 bg-bg p-8 shadow-xl",
            "animate-in fade-in-0 zoom-in-95 duration-300"
          )}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-text-dim hover:text-white"
            aria-label="Close"
          >
            <XIcon />
          </button>

          <DemoModalForm />
        </div>
      </div>
    </>
  );
}