"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"

// Canonical "have we hydrated yet" check. Returns false on the server and during
// the first client render, then true — with no setState-in-effect and no
// hydration mismatch.
const emptySubscribe = () => () => {}
const useHydrated = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const hydrated = useHydrated()

  // resolvedTheme is undefined during SSR, so gate the label on hydration too.
  const isDark = hydrated && resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}
