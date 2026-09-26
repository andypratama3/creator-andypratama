"use client"

import { ThemeToggle } from "./theme-toggle"

/**
 * Client wrapper so server components (legal pages, media kit) can render the
 * theme toggle without becoming client components themselves.
 */
export function ThemeToggleIsland() {
  return <ThemeToggle />
}
