import { sendResendEmail } from "@/lib/contact/resend-fetch";
import { validateContactPayload } from "@/lib/contact/validate";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "manidev0788@gmail.com";

function formatFromAddress(raw) {
  const value = (raw ?? "onboarding@resend.dev").trim();
  if (value.includes("<")) return value;
  return `Portfolio Contact <${value}>`;
}

const FROM_EMAIL = formatFromAddress(process.env.RESEND_FROM_EMAIL);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resendErrorMessage(payload, status) {
  if (typeof payload?.message === "string") return payload.message;
  if (Array.isArray(payload?.errors) && payload.errors[0]?.message) {
    return payload.errors[0].message;
  }
  if (status === 401 || status === 403) {
    return "Invalid Resend API key or sender address. Check .env.local and restart npm run dev.";
  }
  if (status === 422) {
    return "Email could not be sent. With onboarding@resend.dev, testing may only work for your verified Resend account email until you add a domain.";
  }
  return "Failed to send message. Please try again shortly.";
}

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email service is not configured. Add RESEND_API_KEY to .env.local." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { valid, errors, data, spamDetected } = validateContactPayload(body);

    if (spamDetected) {
      return Response.json({ success: true, message: "Message sent successfully." });
    }

    if (!valid) {
      return Response.json(
        { error: "Please fix the highlighted fields and try again.", errors },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const html = `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f1f1f;max-width:560px">
        <h2 style="margin:0 0 16px;color:#071d1d">New portfolio contact message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p style="margin:0 0 8px"><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p style="margin:0 0 8px"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <hr style="border:none;border-top:1px solid #d8ebe6;margin:20px 0" />
        <p style="margin:0 0 8px;font-weight:600">Message</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
      </div>
    `;

    const result = await sendResendEmail({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html,
    });

    if (!result.ok) {
      console.error("[contact] Resend API", result.status, result.body);
      return Response.json(
        { error: resendErrorMessage(result.body, result.status) },
        { status: result.status || 502 }
      );
    }

    return Response.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("[contact]", err);
    const message =
      err?.cause?.code === "ENOTFOUND" || err?.message?.includes("fetch failed")
        ? "Could not reach the email service. Check your internet connection and try again."
        : "Something went wrong. Please try again.";
    return Response.json({ error: message }, { status: 500 });
  }
}
