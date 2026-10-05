import type { Metadata } from 'next'
import { MODES, PreviewPage, type Mode } from '@/components/themes/PreviewPage'
// The only place on the site that loads the portfolio brand. It's a skin
// layered after base, and its selectors are unscoped (:root, [data-mode]),
// so it gets its own document here instead of a panel on /themes, where it
// would reskin the whole page and stay loaded after navigating away.
import '@amezquita/design-system/styles/brands/portfolio-light.css'
import '@amezquita/design-system/styles/brands/portfolio-dark.css'

export const dynamicParams = false
export const metadata: Metadata = { title: 'Portfolio theme preview', robots: { index: false } }

export function generateStaticParams() {
  return MODES.map(mode => ({ mode }))
}

export default async function PortfolioPreview({ params }: { params: Promise<{ mode: Mode }> }) {
  const { mode } = await params
  return (
    <>
      {/* The portfolio brand names Schibsted Grotesk; the package doesn't ship the font file. */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap"
        precedence="default"
      />
      <PreviewPage mode={mode} label={`Sample screen in the portfolio theme, ${mode} mode`} />
    </>
  )
}
