'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { applyBrand, storedBrand } from '@/lib/site-brand'

/**
 * Keeps <html data-brand> right as the visitor moves between pages. The
 * script in the root layout does the same before first paint; this covers
 * client-side navigation, which doesn't run it again.
 */
export function SiteBrand() {
  const pathname = usePathname()
  useEffect(() => applyBrand(storedBrand(), pathname), [pathname])
  return null
}
