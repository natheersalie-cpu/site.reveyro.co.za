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
 * POST /api/contact
 *
 * Receives { name, email, message } and sends a notification email
 * to CONTACT_NOTIFY_EMAIL via Resend.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    /* ── validation ─ */
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }
    const cleanedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }
    const cleanedName = name.trim();
    const cleanedMessage = message.trim();
    const safeName = escapeHtml(cleanedName);
    const safeEmail = escapeHtml(cleanedEmail);
    const safeMessage = escapeHtml(cleanedMessage).replaceAll("\n", "<br />");

    /* ── env check ─ */
    const to = process.env.CONTACT_NOTIFY_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (!to || !apiKey) {
      console.error(
        "Missing RESEND_API_KEY or CONTACT_NOTIFY_EMAIL — contact notification skipped"
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
      subject: "New contact form submission",
      html: `
        <p>A new contact form submission has been received from the Reveyro website.</p>
        <table cellpadding="8" style="border-collapse: collapse; font-family: sans-serif; color: #333;">
          <tr><td style="font-weight: 600;">Name:</td><td>${safeName}</td></tr>
          <tr><td style="font-weight: 600;">Email:</td><td>${safeEmail}</td></tr>
          <tr><td style="font-weight: 600;">Message:</td><td>${safeMessage}</td></tr>
          <tr><td style="font-weight: 600;">Submitted at:</td><td>${new Date().toISOString()}</td></tr>
          <tr><td style="font-weight: 600;">Source:</td><td>reveyro.co.za contact form</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend contact error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send notification." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected contact error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}