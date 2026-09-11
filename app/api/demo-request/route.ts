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
 * Receives { name, company, email, phone, message } and sends a notification email
 * to DEMO_REQUEST_NOTIFY_EMAIL via Resend.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, message } = body;

    /* ── validation ─ */
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!company || typeof company !== "string" || !company.trim()) {
      return NextResponse.json(
        { success: false, error: "Company name is required." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    const cleanedName = name.trim();
    const cleanedCompany = company.trim();
    const cleanedEmail = email.trim();
    const cleanedPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanedMessage = typeof message === "string" ? message.trim() : "";
    const safeName = escapeHtml(cleanedName);
    const safeCompany = escapeHtml(cleanedCompany);
    const safeEmail = escapeHtml(cleanedEmail);
    const safePhone = escapeHtml(cleanedPhone);
    const safeMessage = escapeHtml(cleanedMessage || "No message supplied.").replaceAll("\n", "<br />");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!cleanedPhone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    /* ── env check ─ */
    const to = process.env.DEMO_REQUEST_NOTIFY_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    if (!to || !apiKey) {
      console.error(
        "Missing RESEND_API_KEY or DEMO_REQUEST_NOTIFY_EMAIL — request access notification skipped"
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
      replyTo: cleanedEmail,
      subject: `New Reveyro access request — ${cleanedCompany}`,
      html: `
        <p>A new access request has been submitted from the Reveyro website.</p>
        <table cellpadding="8" style="border-collapse: collapse; font-family: sans-serif; color: #333;">
          <tr><td style="font-weight: 600;">Name:</td><td>${safeName}</td></tr>
          <tr><td style="font-weight: 600;">Company:</td><td>${safeCompany}</td></tr>
          <tr><td style="font-weight: 600;">Email:</td><td>${safeEmail}</td></tr>
          <tr><td style="font-weight: 600;">Phone:</td><td>${safePhone}</td></tr>
          <tr><td style="font-weight: 600;">Message:</td><td>${safeMessage}</td></tr>
          <tr><td style="font-weight: 600;">Submitted at:</td><td>${new Date().toISOString()}</td></tr>
          <tr><td style="font-weight: 600;">Source:</td><td>reveyro.co.za request-access form</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend request-access error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send notification." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Access request submitted." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected request-access error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}