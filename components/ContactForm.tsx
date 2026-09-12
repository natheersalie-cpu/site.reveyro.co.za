"use client";

import { useState } from "react";
import { isValidEmail, cn } from "@/lib/utils";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

/**
 * Contact form: name, email, message -> POST /api/contact
 * Client-side validation with inline error messages.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email address.";
    if (!message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setServerError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-bg/40 p-8 text-center">
        <h3 className="text-xl font-semibold text-fg">
          Thanks &mdash; we&apos;ll be in touch shortly.
        </h3>
        <p className="mt-2 text-sm text-text-dim">
          We typically respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-medium text-text-dim"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass(errors.name)}
          placeholder="Jane Doe"
          required
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-text-dim"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass(errors.email)}
          placeholder="you@company.com"
          required
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-text-dim"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass(errors.message)}
          placeholder="How can we help?"
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-400">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "btn-primary w-full text-center",
          status === "sending" && "cursor-not-allowed opacity-70"
        )}
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

/* == shared input class == */
function inputClass(error?: string) {
  const base =
    "mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-fg placeholder-text-dim hover:border-white/25 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal/30 transition-colors";
  return cn(base, error && "border-red-400 focus:ring-red-400/30");
}