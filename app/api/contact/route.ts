import { NextResponse } from "next/server"
import { creator } from "@/lib/creator-data"
import { normalizeContact, validateContact, type ContactInput } from "@/lib/contact-schema"

export const runtime = "nodejs"

// Naive in-memory throttle. Good enough for a single-instance deployment;
// swap for Redis/Upstash if this is ever scaled horizontally.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function throttled(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local"

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages from this address. Please try again shortly." },
      { status: 429 },
    )
  }

  let body: ContactInput
  try {
    body = (await request.json()) as ContactInput
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    )
  }

  // Honeypot filled in → pretend success so bots don't learn anything.
  const honeypot = (body as { website?: unknown } | null)?.website
  if (typeof honeypot === "string" && honeypot.trim()) {
    return NextResponse.json({ ok: true })
  }

  const errors = validateContact(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const enquiry = normalizeContact(body)

  // Wire this to an email provider (Resend / Postmark / SES) or a CRM.
  // Without a configured transport we log server-side so nothing is lost.
  console.info("[contact] new enquiry", {
    name: enquiry.name,
    email: enquiry.email,
    brand: enquiry.brand,
    projectType: enquiry.projectType,
    messageLength: enquiry.message.length,
    at: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true, message: `Thanks — I'll reply within ${creator.responseTime}.` })
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 })
}
