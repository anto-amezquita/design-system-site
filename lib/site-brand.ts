'use client'

import { useSyncExternalStore } from 'react'
import { BRAND_STORAGE_KEY, DEFAULT_BRAND, isDemoBrand, type DemoBrand } from '@/lib/demo-brands'

/** The brand the visitor picked, or the default. Storage can be blocked; that's fine. */
export function storedBrand(): DemoBrand {
  try {
    const value = localStorage.getItem(BRAND_STORAGE_KEY)
    return isDemoBrand(value) ? value : DEFAULT_BRAND
  } catch {
    return DEFAULT_BRAND
  }
}

/** Puts the brand on <html>. */
export function applyBrand(brand: DemoBrand) {
  document.documentElement.dataset.brand = brand
}

/** Remembers the pick and applies it, with a crossfade unless motion is reduced. */
export function chooseBrand(brand: DemoBrand) {
  try { localStorage.setItem(BRAND_STORAGE_KEY, brand) } catch { /* not remembered */ }
  const apply = () => applyBrand(brand)
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !document.startViewTransition) apply()
  else document.startViewTransition(apply)
}

/**
 * The brand the site wears, from <html data-brand>. Every control that sets
 * it (the hero's switch, the header's picker) reads it here, so they agree
 * whichever one was used. The server renders the default; the before-paint
 * script has already applied a stored pick, and this catches up on hydrate.
 */
export function useSiteBrand(): DemoBrand {
  return useSyncExternalStore(subscribe, readBrand, () => DEFAULT_BRAND)
}

function readBrand(): DemoBrand {
  const value = document.documentElement.dataset.brand
  return isDemoBrand(value) ? value : DEFAULT_BRAND
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-brand'] })
  return () => observer.disconnect()
}
