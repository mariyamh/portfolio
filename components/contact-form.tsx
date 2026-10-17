"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { LIMITS, validateContact, type FieldErrors } from "@/lib/validate-contact";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; mailto?: string };

const field =
  "mt-1.5 w-full rounded-md border border-line-strong bg-paper px-3 py-2 text-[0.9375rem] transition-colors focus:border-ink focus:outline-none";

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  // When the form was mounted. A submission faster than a human could type is
  // treated as automated. Set in an effect: reading the clock during render is
  // impure, and this value only matters once the form is interactive anyway.
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validateContact(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          website: String(data.get("website") ?? ""),
          startedAt: startedAt.current ?? Date.now(),
        }),
      });

      if (response.ok) {
        form.reset();
        startedAt.current = Date.now();
        setStatus({ state: "sent" });
        return;
      }

      const payload = await response.json().catch(() => ({}));

      if (response.status === 422 && payload.errors) {
        setErrors(payload.errors);
        setStatus({ state: "idle" });
        return;
      }

      // Nothing is lost if delivery is not set up: hand the message straight to
      // the mail client with everything already written.
      if (payload.error === "not_configured") {
        const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
          `Portfolio enquiry — ${fields.name}`,
        )}&body=${encodeURIComponent(fields.message)}`;
        setStatus({
          state: "error",
          message:
            "Email delivery is not configured on this deployment yet. Your message is safe — send it straight from your mail app:",
          mailto,
        });
        return;
      }

      setStatus({
        state: "error",
        message: payload.error ?? "Something went wrong. Please email me directly.",
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "The request did not get through — check your connection, or email me directly.",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div
        role="status"
        className="mt-8 rounded-md border border-line p-5"
      >
        <p className="text-sm">
          Thanks, your message reached me. I usually reply within a day or
          two.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="link mt-3 text-sm"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-reveal="stagger"
      className="mt-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name.max}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email.max}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message.max}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${field} resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {/* Not shown to people. Anything that fills it in is not a person. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="btn btn-primary"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <span aria-live="polite" className="text-xs text-muted">
          {sending ? "Sending your message…" : null}
        </span>
      </div>

      {status.state === "error" && (
        <div role="alert" className="mt-5 border-l-2 border-danger pl-4">
          <p className="text-sm leading-relaxed text-muted">{status.message}</p>
          {status.mailto && (
            <a
              href={status.mailto}
              className="link mt-2 inline-block text-sm"
            >
              Open it in your mail app →
            </a>
          )}
        </div>
      )}
    </form>
  );
}
