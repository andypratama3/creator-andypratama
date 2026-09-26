import { describe, expect, it } from "vitest"
import {
  isValidContact,
  isValidEmail,
  LIMITS,
  normalizeContact,
  PROJECT_TYPES,
  validateContact,
} from "./contact-schema"

const valid = {
  name: "Sarah Lim",
  email: "sarah@brand.co",
  brand: "Northwind",
  projectType: "UGC",
  message: "We need three vertical videos for a Q4 launch.",
  consent: true,
}

describe("isValidEmail", () => {
  it("accepts real-world addresses", () => {
    for (const e of [
      "sarah@brand.co",
      "a.b+tag@sub.domain.io",
      "user_name-1@example.museum",
      "UPPER@Example.COM",
    ]) {
      expect(isValidEmail(e), e).toBe(true)
    }
  })

  it("rejects malformed addresses", () => {
    for (const e of [
      "",
      "no-at-sign",
      "@brand.co",
      "sarah@",
      "sarah@brand",
      "sarah@.co",
      "sarah brand@brand.co",
      "sarah@brand.c",
    ]) {
      expect(isValidEmail(e), e).toBe(false)
    }
  })

  it("rejects addresses beyond the length limit", () => {
    const long = `${"a".repeat(LIMITS.emailMax)}@brand.co`
    expect(long.length).toBeGreaterThan(LIMITS.emailMax)
    expect(isValidEmail(long)).toBe(false)
  })
})

describe("normalizeContact", () => {
  it("trims whitespace and lowercases the email", () => {
    const c = normalizeContact({ ...valid, name: "  Sarah Lim  ", email: " Sarah@Brand.CO " })
    expect(c.name).toBe("Sarah Lim")
    expect(c.email).toBe("sarah@brand.co")
  })

  it("coerces non-string values to empty strings instead of leaking them through", () => {
    const c = normalizeContact({ name: 42, email: { evil: true }, message: ["a"] } as never)
    expect(c.name).toBe("")
    expect(c.email).toBe("")
    expect(c.message).toBe("")
  })

  it("only accepts a literal boolean true for consent", () => {
    expect(normalizeContact({ consent: true }).consent).toBe(true)
    for (const v of ["on", "true", 1, "yes"]) {
      expect(normalizeContact({ consent: v }).consent).toBe(false)
    }
  })
})

describe("validateContact", () => {
  it("accepts a well-formed enquiry", () => {
    expect(validateContact(valid)).toEqual({})
    expect(isValidContact(valid)).toBe(true)
  })

  it("treats projectType as optional", () => {
    expect(validateContact({ ...valid, projectType: "" })).toEqual({})
  })

  it("rejects an unknown projectType", () => {
    const errors = validateContact({ ...valid, projectType: "ugc" })
    expect(errors.projectType).toBeDefined()
  })

  it("accepts every declared project type", () => {
    for (const t of PROJECT_TYPES) {
      expect(validateContact({ ...valid, projectType: t }), t).toEqual({})
    }
  })

  it("rejects a missing consent flag", () => {
    expect(validateContact({ ...valid, consent: false }).consent).toBeDefined()
    expect(validateContact({ ...valid, consent: undefined }).consent).toBeDefined()
  })

  it("enforces the message length bounds on both ends", () => {
    expect(validateContact({ ...valid, message: "too short" }).message).toBeDefined()
    expect(
      validateContact({ ...valid, message: "x".repeat(LIMITS.messageMax + 1) }).message,
    ).toBeDefined()
    expect(
      validateContact({ ...valid, message: "x".repeat(LIMITS.messageMax) }).message,
    ).toBeUndefined()
  })

  it("rejects an over-long brand name", () => {
    expect(validateContact({ ...valid, brand: "b".repeat(LIMITS.brandMax + 1) }).brand).toBeDefined()
  })

  it("rejects an empty payload with every required field flagged", () => {
    const errors = validateContact({})
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "message", "name"])
  })

  it("does not crash on a null prototype or array input", () => {
    expect(() => validateContact([] as never)).not.toThrow()
    expect(() => validateContact(Object.create(null) as never)).not.toThrow()
    expect(validateContact(undefined as never)).toBeTypeOf("object")
  })
})
