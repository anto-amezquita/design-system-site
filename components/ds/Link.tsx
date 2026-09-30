'use client'

// The package's Link has no 'use client' directive but renders Radix Slot,
// which needs React context, so it can't render from a Server Component.
// Re-exporting it from a client module is Next's documented pattern for
// third-party components in this state. Remove once the library marks Link
// as a client component (docs/backlog.md).
export { Link } from '@amezquita/design-system/components/primitives/Link'
