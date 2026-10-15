import { validateContact, type ContactFields } from "@/lib/validate-contact";
import { site } from "@/content/site";

/**
 * The contact endpoint.
 *
 * Delivery is through Resend's HTTP API, called with fetch so the project needs
 * no SDK. The key never leaves the server. If the environment is not configured
 * the endpoint says so plainly and the form falls back to a mailto link, rather
 * than accepting a message it cannot deliver.
 */

export const runtime = "nodejs";

/** Best-effort, per-instance. A real deployment behind several instances would
 *  want this in Redis; for a personal site one process is the whole fleet. */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived process.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function json(body: unknown, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return json(
      { error: "That is a lot of messages. Try again later, or email me directly." },
      429,
    );
  }

  let body: Partial<ContactFields> & { website?: string; startedAt?: number };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Malformed request." }, 400);
  }

  // Spam, caught two ways: a field no human sees, and a form submitted faster
  // than anyone could type it. Both fail silently so a bot learns nothing.
  const looksAutomated =
    Boolean(body.website) ||
    typeof body.startedAt !== "number" ||
    Date.now() - body.startedAt < 2000;

  if (looksAutomated) return json({ ok: true }, 200);

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) return json({ errors }, 422);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey || !from) {
    return json({ error: "not_configured" }, 503);
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const message = body.message!.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Portfolio enquiry — ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      // The provider's response may carry details that are not mine to leak.
      console.error("contact: delivery failed", response.status);
      return json({ error: "Sending failed. Please email me directly." }, 502);
    }
  } catch (error) {
    console.error("contact: delivery threw", error);
    return json({ error: "Sending failed. Please email me directly." }, 502);
  }

  return json({ ok: true }, 200);
}
