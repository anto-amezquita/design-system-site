'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@amezquita/design-system/components/primitives/Button'

export function LandingActions() {
  const router = useRouter()
  const go = (href: string) => router.push(href)
  return (
    <>
      <Button href="/getting-started" onNavigate={go} arrow>Get started</Button>
      <Button href="/components" onNavigate={go} variant="secondary">Browse components</Button>
    </>
  )
}
