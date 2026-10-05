import type { Metadata } from 'next'
import '@amezquita/design-system/styles/reset.css'
import '@amezquita/design-system/styles/brands/base-light.css'
import '@amezquita/design-system/styles/brands/base-dark.css'
import './site.css'
import { getBrandFonts } from '@/lib/ds'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'amezquita design system',
    template: '%s · amezquita design system',
  },
  description:
    'Documentation for @amezquita/design-system: tokens, components and themes, shown in the brand-neutral base theme a new project starts from.',
}

// The base theme's dark values apply under [data-mode="dark"]. Set it from
// the system preference before first paint, so there's no light flash.
const colorSchemeScript = `try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.mode='dark'}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = getBrandFonts('base')
  const stylesheetOrigin = new URL(fonts.href).origin
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />
        {/* The base theme's fonts, from the package's tokens/fonts.json. Font files are CORS requests. */}
        {fonts.preconnect.map(origin => (
          <link key={origin} rel="preconnect" href={origin} crossOrigin={origin === stylesheetOrigin ? undefined : ''} />
        ))}
        <link rel="stylesheet" href={fonts.href} />
      </head>
      <body>{children}</body>
    </html>
  )
}
