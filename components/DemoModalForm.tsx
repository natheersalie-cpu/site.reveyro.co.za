"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SpinnerIcon } from "@/components/DemoModalIcons";

type SubmitStatus = "idle" | "loading" | "success" | "error";
type FieldErrors = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
};

/**
 * Inner form for the demo-request modal.
 * Remounted (via key={modalKey} on the parent) every time the
 * modal opens, so form state always starts fresh.
 */
export function DemoModalForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FieldErrors = {};
    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) nextErrors.name = "Name is required.";
    if (!trimmedCompany) nextErrors.company = "Company name is required.";
    if (!trimmedEmail) nextErrors.email = "Email is required.";
    else if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!trimmedPhone) nextErrors.phone = "Phone number is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          company: trimmedCompany,
          email: trimmedEmail,
          phone: trimmedPhone,
          message: trimmedMessage,
        }),
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
            Request access to Reveyro
          </h3>
          <p className="text-sm text-text-dim mb-6">
            Tell us who you are and we&rsquo;ll contact you about the right setup for your business.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="request-name"
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Jane Doe"
                error={errors.name}
                autoComplete="name"
                required
              />
              <Field
                id="request-company"
                label="Company"
                value={company}
                onChange={setCompany}
                placeholder="Company name"
                error={errors.company}
                autoComplete="organization"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="request-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
                error={errors.email}
                autoComplete="email"
                required
              />
              <Field
                id="request-phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="+27 82 123 4567"
                error={errors.phone}
                autoComplete="tel"
                required
              />
            </div>

            <div>
              <label
                htmlFor="request-message"
                className="block text-xs font-medium text-text-dim"
              >
                Message <span className="text-text-faint">(optional)</span>
              </label>
              <textarea
                id="request-message"
                rows={4}
                placeholder="Tell us what you need Reveyro to help with."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass(errors.message)}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
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
              {status === "loading" ? <SpinnerIcon /> : "Send request"}
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

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-text-dim">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(error)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-fg placeholder-text-dim transition-colors focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal/30",
    error && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
  );
}