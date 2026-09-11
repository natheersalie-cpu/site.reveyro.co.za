import { Resend } from "resend";

/**
 * Lazily construct the Resend client only after an API route has confirmed
 * RESEND_API_KEY exists. This prevents Next.js build-time route evaluation
 * from failing when local placeholder env values are blank.
 */
export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  return new Resend(apiKey);
}