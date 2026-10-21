import type { Metadata } from 'next'
import { FrameSync } from '@/components/frames/FrameSync'

// Whole-page examples shown in an iframe on a component page. AppShell and
// MobileNav own the page (a <main>, a skip link, a bar fixed to the bottom),
// which can't sit inside a docs page without breaking it; TopNav switches to
// its menu by the viewport's width, which only a frame can show at card size. The root layout
// gives them the site's brand and mode; FrameSync keeps them in step when
// the reader switches either on the page around the frame.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function FrameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FrameSync />
      {children}
    </>
  )
}
