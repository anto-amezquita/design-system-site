'use client'

import { useEffect, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'
import { SampleScreen } from '@/components/demos/SampleScreen'

const THEMES = [
  { id: 'base', label: 'Base', note: 'Built in. What every project starts from.' },
  { id: 'portfolio', label: 'Portfolio', note: 'A brand file loaded after base.' },
] as const

/**
 * The same sample screen, once per theme, side by side on this page. The
 * Themes page loads portfolio-scoped.css, which applies only under
 * [data-brand="portfolio"], so the portfolio panel takes the brand and
 * everything around it stays base. Each panel sets its own data-mode, so the
 * Light and Dark tabs work whatever mode the page is in.
 */
export function ThemeExplorer() {
  const root = useRef<HTMLDivElement>(null)

  // Two sample screens on one page give two <nav aria-label="Breadcrumb">
  // landmarks, and the package's Breadcrumb takes no aria-label to tell them
  // apart. Name each one after its panel. Spec §9; check-workarounds.mjs
  // warns when Breadcrumb accepts aria-label and this can go.
  useEffect(() => {
    const label = () =>
      root.current?.querySelectorAll<HTMLElement>('.theme-frame__panel').forEach(panel => {
        const nav = panel.querySelector('nav.breadcrumb')
        nav?.setAttribute('aria-label', `Breadcrumb, ${panel.dataset.theme} theme`)
      })
    label()
    // Tabs mount the other mode's panels when it's selected.
    const observer = new MutationObserver(label)
    if (root.current) observer.observe(root.current, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={root}>
      <Tabs defaultValue="light" variant="pill" size="sm">
        <TabsList aria-label="Colour mode">
          <TabsTrigger value="light">Light</TabsTrigger>
          <TabsTrigger value="dark">Dark</TabsTrigger>
        </TabsList>
        {(['light', 'dark'] as const).map(mode => (
          <TabsContent key={mode} value={mode}>
            <div className="theme-frames">
              {THEMES.map(theme => (
                <figure key={theme.id} className="theme-frame">
                  <figcaption className="theme-frame__caption">
                    <span className="theme-frame__name">{theme.label}</span>
                    <span className="token-muted">{theme.note}</span>
                  </figcaption>
                  <div
                    className="theme-frame__panel"
                    data-mode={mode}
                    data-brand={theme.id === 'portfolio' ? 'portfolio' : undefined}
                    data-theme={theme.id}
                  >
                    <SampleScreen />
                  </div>
                </figure>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
