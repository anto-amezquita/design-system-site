'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'
import { ThemeScope } from '@amezquita/design-system/components/composition/ThemeScope'
import { SampleScreen } from '@/components/demos/SampleScreen'

const THEMES = [
  { id: 'base', label: 'Base', note: 'Built in. What every project starts from.' },
  { id: 'portfolio', label: 'Portfolio', note: 'A brand file loaded after base.' },
] as const

/**
 * The same sample screen, once per theme, side by side on this page. The
 * Themes page loads portfolio-scoped.css, and each panel is a ThemeScope:
 * the portfolio one sets the brand, both set the tab's mode, so the tabs work
 * whatever mode the page is in. Menus and selects opened in a panel follow
 * it, although they render at the end of the page (the library's
 * decisions/0021).
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
                <ThemeScope
                  className="theme-frame__panel"
                  mode={mode}
                  brand={theme.id === 'portfolio' ? 'portfolio' : undefined}
                >
                  {/* Two sample screens on one page: name each breadcrumb landmark. */}
                  <SampleScreen breadcrumbLabel={`Breadcrumb, ${theme.label.toLowerCase()} theme`} />
                </ThemeScope>
              </figure>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
