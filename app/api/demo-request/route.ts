import { NextRequest, NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

const FROM = "Reveyro <onboarding@reveyro.co.za>";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * POST /api/demo-request
 *
 * Receives { email } and sends a notification email
 * to DEMO_REQUEST_NOTIFY_EMAIL via Resend.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    /* ── validation ─ */
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const cleaned = email.trim();
    const safeEmail = escapeHtml(cleaned);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleaned)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* ── env check ─ */
    const to = process.env.DEMO_REQUEST_NOTIFY_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (!to || !apiKey) {
      console.error(
        "Missing RESEND_API_KEY or DEMO_REQUEST_NOTIFY_EMAIL — demo request notification skipped"
      );
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    /* ── send email ─ */
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM,
      to: to.split(",").map((s) => s.trim()),
      subject: "New demo request",
      html: `
        <p>A new demo request has been submitted from the Reveyro website.</p>
        <table cellpadding="8" style="border-collapse: collapse; font-family: sans-serif; color: #333;">
          <tr><td style="font-weight: 600;">Email:</td><td>${safeEmail}</td></tr>
          <tr><td style="font-weight: 600;">Submitted at:</td><td>${new Date().toISOString()}</td></tr>
          <tr><td style="font-weight: 600;">Source:</td><td>reveyro.co.za demo-request modal</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend demo-request error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send notification." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Demo request submitted." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected demo-request error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}