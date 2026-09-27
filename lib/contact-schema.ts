/**
 * Single source of truth for contact-form validation.
 * Imported by both the client form and the /api/contact route so the two can
 * never disagree, and unit-testable without spinning up a server.
 */

export const PROJECT_TYPES = ["Web Development", "Mobile App", "API Development", "Consulting", "Long-term"] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

export const LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 200,
  brandMax: 160,
  messageMin: 10,
  messageMax: 4000,
} as const

export const MESSAGES = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  brand: `Please keep the brand name under ${LIMITS.brandMax} characters.`,
  projectType: "Please choose one of the listed project types.",
  message: `Please write between ${LIMITS.messageMin} and ${LIMITS.messageMax} characters.`,
  consent: "Please agree to the privacy policy.",
} as const

export type ContactField = "name" | "email" | "brand" | "projectType" | "message" | "consent"
export type FieldErrors = Partial<Record<ContactField, string>>

export type ContactInput = {
  name?: unknown
  email?: unknown
  brand?: unknown
  projectType?: unknown
  message?: unknown
  consent?: unknown
}

export type CleanContact = {
  name: string
  email: string
  brand: string
  projectType: string
  message: string
  consent: boolean
}

// Intentionally permissive: the only goal is to reject obvious typos, not to
// re-implement RFC 5322. Over-strict patterns reject valid real addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export function isValidEmail(email: string): boolean {
  return email.length <= LIMITS.emailMax && EMAIL_RE.test(email)
}

/** Trim and coerce every field to a string, dropping unknown value types. */
export function normalizeContact(input?: ContactInput | null): CleanContact {
  // A JSON body of literal `null` parses to null, so never assume an object here.
  const i: ContactInput = input && typeof input === "object" ? input : {}
  return {
    name: str(i.name),
    email: str(i.email).toLowerCase(),
    brand: str(i.brand),
    projectType: str(i.projectType),
    message: str(i.message),
    consent: i.consent === true,
  }
}

/**
 * Returns a map of field -> message. An empty object means the input is valid.
 * `projectType` is optional: an empty value is allowed so "not sure yet" works.
 */
export function validateContact(input?: ContactInput | null): FieldErrors {
  const c = normalizeContact(input)
  const errors: FieldErrors = {}

  if (c.name.length < LIMITS.nameMin || c.name.length > LIMITS.nameMax) {
    errors.name = MESSAGES.name
  }
  if (!isValidEmail(c.email)) errors.email = MESSAGES.email
  if (c.brand.length > LIMITS.brandMax) errors.brand = MESSAGES.brand
  if (c.projectType && !PROJECT_TYPES.includes(c.projectType as ProjectType)) {
    errors.projectType = MESSAGES.projectType
  }
  if (c.message.length < LIMITS.messageMin || c.message.length > LIMITS.messageMax) {
    errors.message = MESSAGES.message
  }
  if (!c.consent) errors.consent = MESSAGES.consent

  return errors
}

export function isValidContact(input?: ContactInput | null): boolean {
  return Object.keys(validateContact(input)).length === 0
}
