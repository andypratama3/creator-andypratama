import Link from "next/link"

export interface Crumb {
  name: string
  /** Absolute path with a leading slash. The final crumb is rendered as plain text. */
  path: string
}

/**
 * Visible breadcrumb trail. Mirrors the `BreadcrumbList` node emitted by the page's
 * JSON-LD so the structured data always matches what a visitor can see and click.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="transition-colors hover:text-ink">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-ink-subtle">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
