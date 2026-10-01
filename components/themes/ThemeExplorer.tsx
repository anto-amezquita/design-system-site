'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'
import { DemoProviders } from '@/components/demos/Demo'
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
                <div
                  className="theme-frame__panel"
                  data-mode={mode}
                  data-brand={theme.id === 'portfolio' ? 'portfolio' : undefined}
                >
                  <DemoProviders>
                    <SampleScreen />
                  </DemoProviders>
                </div>
              </figure>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
