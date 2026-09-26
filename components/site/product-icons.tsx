import {
  BedDouble,
  Briefcase,
  Headphones,
  LampDesk,
  Mic,
  Package,
  ShoppingBag,
  Sparkles,
  Watch,
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

function KeyboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M7 16.5h10" />
    </svg>
  )
}

export const productIcon = {
  headphones: Headphones,
  watch: Watch,
  keyboard: KeyboardIcon,
  bed: BedDouble,
  lamp: LampDesk,
  sparkles: Sparkles,
  briefcase: Briefcase,
  mic: Mic,
  bag: ShoppingBag,
  box: Package,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>

export type ProductIconKey = keyof typeof productIcon
