/**
 * One validator, imported by both the browser and the route handler, so the two
 * cannot drift apart. The server always re-runs it: the client copy exists to
 * give fast feedback, never as the real gate.
 */

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  message: { min: 20, max: 4000 },
} as const;

/** Deliberately loose. Anything stricter rejects addresses that are valid. */
const EMAIL = /^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/;

export function validateContact(fields: Partial<ContactFields>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (fields.name ?? "").trim();
  const email = (fields.email ?? "").trim();
  const message = (fields.message ?? "").trim();

  if (name.length < LIMITS.name.min) {
    errors.name = "Please add your name.";
  } else if (name.length > LIMITS.name.max) {
    errors.name = `That is longer than ${LIMITS.name.max} characters.`;
  }

  if (!EMAIL.test(email)) {
    errors.email = "That does not look like an email address.";
  } else if (email.length > LIMITS.email.max) {
    errors.email = "That address is too long.";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = `A little more detail, please — at least ${LIMITS.message.min} characters.`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `That is over ${LIMITS.message.max} characters. Email me directly instead.`;
  }

  return errors;
}
