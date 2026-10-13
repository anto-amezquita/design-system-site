'use client'

import { BRAND_STORAGE_KEY, DEFAULT_BRAND, isBaseRoute, isDemoBrand, type DemoBrand } from '@/lib/demo-brands'

/** The brand the visitor picked, or the default. Storage can be blocked; that's fine. */
export function storedBrand(): DemoBrand {
  try {
    const value = localStorage.getItem(BRAND_STORAGE_KEY)
    return isDemoBrand(value) ? value : DEFAULT_BRAND
  } catch {
    return DEFAULT_BRAND
  }
}

/** Puts the brand on <html>, or takes it off on a page about the base theme. */
export function applyBrand(brand: DemoBrand, pathname: string) {
  const root = document.documentElement
  if (isBaseRoute(pathname)) delete root.dataset.brand
  else root.dataset.brand = brand
}

/** Remembers the pick and applies it, with a crossfade unless motion is reduced. */
export function chooseBrand(brand: DemoBrand, pathname: string) {
  try { localStorage.setItem(BRAND_STORAGE_KEY, brand) } catch { /* not remembered */ }
  const apply = () => applyBrand(brand, pathname)
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !document.startViewTransition) apply()
  else document.startViewTransition(apply)
}
