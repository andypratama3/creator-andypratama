"use client"

import { Loader2, Mail, MapPin, Send } from "lucide-react"
import { socialLinks } from "@/lib/seo"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { PROJECT_TYPES, validateContact, type FieldErrors } from "@/lib/contact-schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { creator } from "@/lib/creator-data"
import { cn } from "@/lib/utils"
import { socialIcon } from "./icons"
import { Reveal } from "./reveal"

const projectTypes = PROJECT_TYPES

export function Contact() {
  const [type, setType] = useState<string>("Web Development")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<{ kind: "error" | "success" | "pending"; text: string } | null>(
    null,
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      brand: String(fd.get("brand") ?? "").trim(),
      projectType: String(fd.get("projectType") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
      consent: fd.get("consent") === "on",
    }

    const next = validateContact(payload)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus({ kind: "error", text: "Please fix the highlighted fields." })
      toast.error("Check the highlighted fields")
      // Move focus to the first invalid control so keyboard users land on it.
      const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    setLoading(true)
    setStatus({ kind: "pending", text: "Sending your message…" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        message?: string
        errors?: FieldErrors
      }

      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors)
        throw new Error(data.message || "Something went wrong.")
      }

      form.reset()
      setType("Web Development")
      setStatus({ kind: "success", text: `Message sent. I'll reply within ${creator.responseTime}.` })
      toast.success("Message sent", {
        description: `Thanks — I'll get back to you within ${creator.responseTime}.`,
      })
    } catch (err) {
      setStatus({
        kind: "error",
        text: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      })
      toast.error("Couldn't send that", {
        description:
          err instanceof Error
            ? err.message
            : "Please try again, or email me directly at " + creator.email,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="px-4 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="ring-gradient glow-top relative overflow-hidden rounded-[2rem]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left: pitch */}
              <div className="relative flex flex-col justify-between gap-12 bg-surface-2 p-8 sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full opacity-80 blur-3xl"
                  style={{
                    background: "radial-gradient(closest-side, var(--brand-soft), transparent)",
                  }}
                />
                <div className="relative">
                  <p className="text-[11px] font-medium tracking-[0.2em] text-brand uppercase">
                    Let&apos;s collaborate
                  </p>
                  <h2 className="mt-3.5 text-balance text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.08] font-semibold tracking-tight">
                    Ready to build something amazing?
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
                    Tell me about your project and goals. I&apos;ll reply with ideas and a
                    tailored plan for your development needs — usually within {creator.responseTime}.
                  </p>
                </div>

                <div className="relative space-y-4">
                  <a
                    href={`mailto:${creator.email}`}
                    className="group flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="grid size-9 place-items-center rounded-full border border-hairline bg-surface transition-colors group-hover:border-brand group-hover:text-brand">
                      <Mail className="size-4" />
                    </span>
                    {creator.email}
                  </a>
                  <p className="flex items-center gap-3 text-sm text-ink-muted">
                    <span className="grid size-9 place-items-center rounded-full border border-hairline bg-surface">
                      <MapPin className="size-4" />
                    </span>
                    {creator.location} · {creator.timezone}
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    {(Object.keys(socialIcon) as (keyof typeof socialIcon)[]).map((k) => {
                      const Icon = socialIcon[k]
                      return (
                        <a
                          key={k}
                          href={socialLinks[k]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${creator.name} on ${k}`}
                          className="grid size-10 place-items-center rounded-full border border-hairline bg-surface text-ink-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                        >
                          <Icon className="size-4" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="bg-surface p-8 sm:p-10">
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className="h-11"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-danger">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@brand.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="h-11"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-danger">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Company / Organization</Label>
                    <Input
                      id="brand"
                      name="brand"
                      autoComplete="organization"
                      placeholder="Your company"
                      className="h-11"
                    />
                  </div>

                  <fieldset className="space-y-2.5">
                    <legend className="text-sm leading-none font-medium">Project type</legend>
                    <input type="hidden" name="projectType" value={type} />
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setType(t)}
                          aria-pressed={type === t}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                            type === t
                              ? "border-brand bg-brand-soft font-medium text-brand"
                              : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project, requirements, and timeline…"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-danger">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot — hidden from users, blocks naive bots. */}
                  <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="consent"
                      className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-muted"
                    >
                      <input
                        id="consent"
                        type="checkbox"
                        name="consent"
                        required
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-0.5 size-4 shrink-0 rounded border-hairline-strong accent-[var(--brand)]"
                      />
                      <span>
                        I agree that my details are used to reply to this enquiry, as described in
                        the{" "}
                        <a href="/privacy" className="font-medium text-brand underline underline-offset-2">
                          privacy policy
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" className="text-xs text-danger">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 w-full rounded-full"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send />
                      </>
                    )}
                  </Button>

                  {/* Toasts are unreliable for screen readers — announce here too. */}
                  <p
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className={cn(
                      "text-center text-xs transition-opacity",
                      status
                        ? status.kind === "error"
                          ? "text-danger opacity-100"
                          : "text-ok opacity-100"
                        : "opacity-0",
                    )}
                  >
                    {status?.text ?? " "}
                  </p>

                  <p className="text-center text-xs text-ink-subtle">
                    Average reply time: {creator.responseTime}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
