'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { chooseMode, useSiteMode } from '@/lib/site-mode'

/**
 * Light / dark, ported from amezquita.dk's ModeToggle: a bare icon button,
 * the current mode's icon, the two crossfading in place. Which icon shows
 * comes from <html data-mode> in CSS, so it's right before React runs.
 */
export function ModeToggle() {
  const isDark = useSiteMode() === 'dark'
  return (
    <button
      type="button"
      className="mode-toggle"
      onClick={() => chooseMode(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <SunIcon className="mode-toggle__icon mode-toggle__icon--sun" aria-hidden="true" />
      <MoonIcon className="mode-toggle__icon mode-toggle__icon--moon" aria-hidden="true" />
    </button>
  )
}
