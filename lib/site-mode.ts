'use client'

import { useSyncExternalStore } from 'react'
import { MODE_STORAGE_KEY } from '@/lib/site-mode-key'

// Light or dark for the whole site, as on amezquita.dk: a visitor's pick is
// remembered; without one, the system setting decides. The before-paint
// script in app/layout.tsx applies it before first paint.
export type SiteMode = 'light' | 'dark'

export function chooseMode(mode: SiteMode) {
  try { localStorage.setItem(MODE_STORAGE_KEY, mode) } catch { /* not remembered */ }
  document.documentElement.dataset.mode = mode
}

/** The mode the site is in, from <html data-mode>. Light when it's unset. */
export function useSiteMode(): SiteMode {
  return useSyncExternalStore(subscribe, readMode, () => 'light')
}

function readMode(): SiteMode {
  return document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light'
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })
  return () => observer.disconnect()
}
