type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  projectType?: unknown;
  location?: unknown;
  budget?: unknown;
  message?: unknown;
};

function sanitizeText(value: unknown): string {
  if (value == null) return "";
  return String(value)
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed." });
    return;
  }

  let payload: ContactPayload;
  try {
    const rawBody =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : Buffer.isBuffer(req.body)
          ? JSON.parse(req.body.toString("utf-8"))
          : req.body ?? {};

    payload = rawBody as ContactPayload;
  } catch {
    res.status(400).json({ message: "The inquiry could not be read. Please try again." });
    return;
  }
  const name = sanitizeText(payload.name);
  const email = sanitizeText(payload.email).toLowerCase();
  const phone = sanitizeText(payload.phone);
  const projectType = sanitizeText(payload.projectType);
  const location = sanitizeText(payload.location);
  const budget = sanitizeText(payload.budget);
  const message = sanitizeText(payload.message);

  if (!name || !email || !projectType || !budget || !message) {
    res.status(400).json({ message: "Please complete all required fields before submitting your inquiry." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }

  if (name.length > 100 || email.length > 120 || phone.length > 50 || projectType.length > 80 || location.length > 120 || budget.length > 80 || message.length > 2000) {
    res.status(400).json({ message: "One or more fields are too long to send a valid inquiry." });
    return;
  }

  const toAddress = process.env.CONTACT_TO_EMAIL || "info@victoryvintage.co.zw";
  const fromAddress = process.env.RESEND_FROM_EMAIL || "Victory Vintage <noreply@victoryvintage.co.zw>";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info("Contact form demo mode: inquiry received", {
      name,
      email,
      phone,
      projectType,
      location,
      budget,
      message,
    });

    res.status(200).json({ message: "Inquiry received. Add RESEND_API_KEY to enable email delivery." });
    return;
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <h2 style="margin-bottom: 12px;">New project inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Location:</strong> ${escapeHtml(location || "Not provided")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
      <div style="margin-top: 16px;">
        <strong>Project details:</strong>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      reply_to: email,
      subject: `Project inquiry from ${name}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend email error", errorText);
    res.status(500).json({ message: "There was a problem sending your inquiry. Please try again later." });
    return;
  }

  res.status(200).json({ message: "Inquiry sent successfully." });
}
