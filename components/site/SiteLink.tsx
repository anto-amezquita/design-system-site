'use client'

import NextLink from 'next/link'
import { Link } from '@amezquita/design-system/components/primitives/Link'

type SiteLinkProps = {
  href: string
  variant?: 'inline' | 'standalone'
  children: React.ReactNode
}

/**
 * Link styled as the package's Link, routed by Next. Server pages use this
 * instead of `<Link asChild><NextLink/></Link>`: built in a server component,
 * the NextLink child crosses to the client as a lazy reference, and Radix's
 * Slot sometimes can't resolve it ("Slot failed to slot onto its
 * Slottable"). Built here, the child is a plain element.
 */
export function SiteLink({ href, variant, children }: SiteLinkProps) {
  return (
    <Link asChild variant={variant}>
      <NextLink href={href}>{children}</NextLink>
    </Link>
  )
}
