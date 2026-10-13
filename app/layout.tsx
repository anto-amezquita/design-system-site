import type { Metadata } from 'next'
import Script from 'next/script'
import '@amezquita/design-system/styles/reset.css'
import '@amezquita/design-system/styles/brands/base-light.css'
import '@amezquita/design-system/styles/brands/base-dark.css'
import '@amezquita/design-system/styles/brands/demo-cool-scoped.css'
import '@amezquita/design-system/styles/brands/demo-warm-scoped.css'
import '@amezquita/design-system/styles/brands/demo-soft-scoped.css'
// Base scoped to [data-brand="base"], for the Themes page's Base panel. Last,
// so a base panel inside a demo brand wins ties (scripts/build-base-scoped.mjs).
import './generated/base-scoped.css'
import './site.css'
import { getBrandFonts } from '@/lib/ds'
import { BRAND_STORAGE_KEY, DEFAULT_BRAND, DEMO_BRANDS } from '@/lib/demo-brands'
import { SITE_URL } from '@/lib/site'
import { MODE_STORAGE_KEY } from '@/lib/site-mode-key'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'amezquita design system',
    template: '%s · amezquita design system',
  },
  description:
    'Documentation for @amezquita/design-system: tokens, components and themes, shown in a demo brand you can switch. A new project starts from the brand-neutral base theme.',
}

// Runs before first paint, so there's no flash:
// - the mode: the base theme's dark values apply under [data-mode="dark"];
//   a visitor's pick (lib/site-mode), else the system preference;
// - the brand: the site wears the demo brand picked in the landing hero
//   (lib/demo-brands), remembered in the browser.
// next/script with beforeInteractive puts it in the initial HTML; a plain
// <script> in a component made React warn ("Encountered a script tag").
const beforePaintScript = [
  `try{var m=localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)});if(m!=='light'&&m!=='dark')m=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.mode=m}catch(e){}`,
  `try{var b=localStorage.getItem(${JSON.stringify(BRAND_STORAGE_KEY)});if(${JSON.stringify(DEMO_BRANDS)}.indexOf(b)>=0)document.documentElement.dataset.brand=b}catch(e){}`,
].join(';')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = getBrandFonts('base')
  const stylesheetOrigin = new URL(fonts.href).origin
  return (
    <html lang="en" data-brand={DEFAULT_BRAND} suppressHydrationWarning>
      <head>
        <Script id="before-paint" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: beforePaintScript }} />
        {/* The base theme's fonts, from the package's tokens/fonts.json. Font files are CORS requests. */}
        {fonts.preconnect.map(origin => (
          <link key={origin} rel="preconnect" href={origin} crossOrigin={origin === stylesheetOrigin ? undefined : ''} />
        ))}
        <link rel="stylesheet" href={fonts.href} />
        {/* Every demo brand's fonts, so switching never waits on a download. */}
        {DEMO_BRANDS.map(b => <link key={b} rel="stylesheet" href={getBrandFonts(b).href} />)}
      </head>
      <body>{children}</body>
    </html>
  )
}
