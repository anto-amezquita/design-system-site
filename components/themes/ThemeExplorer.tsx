'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'

const THEMES = [
  { id: 'base', label: 'Base', note: 'Built in. What every project starts from.' },
  { id: 'portfolio', label: 'Portfolio', note: 'A brand file loaded after base.' },
] as const

/**
 * The same sample screen, once per theme, side by side. Each frame is its own
 * document, so the portfolio CSS never touches this page (spec §9, item 1).
 */
export function ThemeExplorer() {
  return (
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
                <iframe
                  className="theme-frame__iframe"
                  src={`/themes/preview/${theme.id}/${mode}`}
                  title={`Sample screen in the ${theme.label.toLowerCase()} theme, ${mode} mode`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
