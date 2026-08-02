import { Resend } from "resend";
import { NextResponse } from "next/server";

const roleLabels: Record<string, string> = {
  apm: "Associate Product Manager",
  sa: "System Analyst",
  other: "Other",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const role = String(body.role || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !role || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "safhirara0@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    if (!apiKey || apiKey === "re_xxxxx") {
      console.info("[contact] Resend not configured. Payload:", {
        name,
        email,
        role,
        message,
      });
      return NextResponse.json({
        ok: true,
        mocked: true,
      });
    }

    const resend = new Resend(apiKey);
    const roleLabel = roleLabels[role] || role;

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${roleLabel} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Role interest: ${roleLabel}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
