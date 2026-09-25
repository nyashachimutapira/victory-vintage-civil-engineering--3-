import { beforeEach, describe, expect, it, vi } from "vitest";

import handler from "../api/contact";

describe("contact API", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.RESEND_API_KEY = "demo-key";
    process.env.RESEND_FROM_EMAIL = "Victory Vintage <noreply@demo.com>";
    process.env.CONTACT_TO_EMAIL = "info@victoryvintage.co.zw";
  });

  it("accepts a valid inquiry and calls the email provider", async () => {
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: vi.fn().mockResolvedValue("") });

    vi.stubGlobal("fetch", fetchMock);

    await handler(
      {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phone: "+263712345678",
          projectType: "Commercial building",
          location: "Harare",
          budget: "USD 75,000 – 150,000",
          message: "We need a site visit and a quote for our office expansion.",
        }),
      },
      { status, json, setHeader: vi.fn() },
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ message: "Inquiry sent successfully." });
  });

  it("rejects invalid email addresses", async () => {
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    await handler(
      {
        method: "POST",
        body: JSON.stringify({
          name: "Test User",
          email: "not-an-email",
          projectType: "Residential building",
          budget: "Under USD 25,000",
          message: "Need a quote for a renovation.",
        }),
      },
      { status, json, setHeader: vi.fn() },
    );

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ message: "Please provide a valid email address." });
  });
});
