import type { Metadata } from 'next'
import '@amezquita/design-system/styles/reset.css'
import '@amezquita/design-system/styles/brands/base-light.css'
import '@amezquita/design-system/styles/brands/base-dark.css'
import '@amezquita/design-system/styles/brands/demo-cool-scoped.css'
import '@amezquita/design-system/styles/brands/demo-warm-scoped.css'
import '@amezquita/design-system/styles/brands/demo-soft-scoped.css'
import './site.css'
import { SiteBrand } from '@/components/site/SiteBrand'
import { getBrandFonts } from '@/lib/ds'
import { BASE_ROUTES, BRAND_STORAGE_KEY, DEFAULT_BRAND, DEMO_BRANDS } from '@/lib/demo-brands'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'amezquita design system',
    template: '%s · amezquita design system',
  },
  description:
    'Documentation for @amezquita/design-system: tokens, components and themes. The site wears a demo brand you can switch; the pages about tokens and themes show the base theme a new project starts from.',
}

// The base theme's dark values apply under [data-mode="dark"]. Set it from
// the system preference before first paint, so there's no light flash.
const colorSchemeScript = `try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.mode='dark'}catch(e){}`

// The site wears the demo brand picked in the landing hero (lib/demo-brands).
// Read it before first paint, so a returning visitor sees no flash of the
// default; pages about the base theme take the attribute off. SiteBrand keeps
// it right on client-side navigation.
const brandScript = `try{var r=document.documentElement,b=localStorage.getItem(${JSON.stringify(BRAND_STORAGE_KEY)}),p=location.pathname;if(${JSON.stringify(DEMO_BRANDS)}.indexOf(b)>=0)r.dataset.brand=b;if(${JSON.stringify(BASE_ROUTES)}.some(function(x){return p===x||p.indexOf(x+'/')===0}))delete r.dataset.brand}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = getBrandFonts('base')
  const stylesheetOrigin = new URL(fonts.href).origin
  return (
    <html lang="en" data-brand={DEFAULT_BRAND} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />
        <script dangerouslySetInnerHTML={{ __html: brandScript }} />
        {/* The base theme's fonts, from the package's tokens/fonts.json. Font files are CORS requests. */}
        {fonts.preconnect.map(origin => (
          <link key={origin} rel="preconnect" href={origin} crossOrigin={origin === stylesheetOrigin ? undefined : ''} />
        ))}
        <link rel="stylesheet" href={fonts.href} />
        {/* Every demo brand's fonts, so switching never waits on a download. */}
        {DEMO_BRANDS.map(b => <link key={b} rel="stylesheet" href={getBrandFonts(b).href} />)}
      </head>
      <body>
        <SiteBrand />
        {children}
      </body>
    </html>
  )
}
