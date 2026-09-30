import type { Metadata } from 'next'
import { MODES, PreviewPage, type Mode } from '@/components/themes/PreviewPage'

// The base theme is already loaded by the root layout.

export const dynamicParams = false
export const metadata: Metadata = { title: 'Base theme preview', robots: { index: false } }

export function generateStaticParams() {
  return MODES.map(mode => ({ mode }))
}

export default async function BasePreview({ params }: { params: Promise<{ mode: Mode }> }) {
  const { mode } = await params
  return <PreviewPage mode={mode} label={`Sample screen in the base theme, ${mode} mode`} />
}
