"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SpinnerIcon } from "@/components/DemoModalIcons";

type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * Inner form for the demo-request modal.
 * Remounted (via key={modalKey} on the parent) every time the
 * modal opens, so form state always starts fresh.
 */
export function DemoModalForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setErrorMessage("Email is required.");
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setErrorMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {status === "success" ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-fg">
            Thanks &mdash; we&rsquo;ll be in touch shortly.
          </h3>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-fg mb-1">
            See Reveyro in action
          </h3>
          <p className="text-sm text-text-dim mb-6">
            Enter your email and we&rsquo;ll send you a link to a live demo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-fg placeholder-text-dim focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal/30 transition-colors"
                aria-label="Email address"
                required
              />
              {errorMessage && status !== "loading" && (
                <p className="mt-1 text-sm text-red-400">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "w-full rounded-lg py-3 font-medium text-sm text-[#08211D] flex items-center justify-center gap-2 transition-all",
                status === "loading"
                  ? "cursor-not-allowed bg-teal/70"
                  : "bg-teal shadow-[0_0_24px_rgba(45,212,191,0.35)] hover:brightness-105"
              )}
            >
              {status === "loading" ? <SpinnerIcon /> : "Send demo link"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}
          </form>
        </>
      )}
    </>
  );
}