import type { Metadata } from 'next'
import '@amezquita/design-system/styles/reset.css'
import '@amezquita/design-system/styles/brands/base-light.css'
import '@amezquita/design-system/styles/brands/base-dark.css'
import './site.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://design.amezquita.dk'),
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />
        {/* The base theme names JetBrains Mono for code; load it so code renders as specified. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
