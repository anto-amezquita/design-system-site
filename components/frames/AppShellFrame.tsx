'use client'

import { BellIcon, ChatCircleIcon, HouseIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { AppShell } from '@amezquita/design-system/components/patterns/AppShell'
import { MobileNav } from '@amezquita/design-system/components/patterns/MobileNav'
import { TopNav } from '@amezquita/design-system/components/patterns/TopNav'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Section } from '@amezquita/design-system/components/primitives/Section'
import { Text } from '@amezquita/design-system/components/primitives/Text'

export const NAV = [
  { id: 'home', label: 'Home', href: '#home', icon: <HouseIcon /> },
  { id: 'search', label: 'Search', href: '#search', icon: <MagnifyingGlassIcon /> },
  { id: 'messages', label: 'Messages', href: '#messages', icon: <ChatCircleIcon />, badge: 3, badgeLabel: (n: number) => `${n} unread` },
  { id: 'alerts', label: 'Alerts', href: '#alerts', icon: <BellIcon /> },
]

export function AppShellFrame() {
  return (
    <AppShell
      header={<TopNav brand="Northwind" items={NAV.map(({ id, label, href }) => ({ id, label, href }))} currentHref="#home" />}
      footer={<Text size="small" tone="secondary">© 2026 Northwind</Text>}
      bottomNav={<MobileNav items={NAV} currentHref="#home" />}
    >
      <Section width="text" spacing="component" aria-labelledby="frame-home">
        <Heading level={3} as="h1" id="frame-home">Home</Heading>
        <Text>
          The header, the main content, the footer and the bar at the bottom of a small screen, each in its landmark.
          Below 1024px the bottom bar appears; from 1024px the links sit in the header.
        </Text>
        {Array.from({ length: 6 }, (_, i) => (
          <Text key={i} tone="secondary">Paragraph {i + 1} of example content, so the frame scrolls and the header stays put.</Text>
        ))}
      </Section>
    </AppShell>
  )
}

export function TopNavFrame() {
  return (
    <div>
      <TopNav
        brand="Northwind"
        currentHref="#overview"
        items={[
          { id: 'overview', label: 'Overview', href: '#overview' },
          { id: 'tokens', label: 'Tokens', href: '#tokens' },
          { id: 'changelog', label: 'Changelog', href: '#changelog' },
        ]}
      />
      <main style={{ padding: 'var(--space-element-gap)' }}>
        <Heading level={3} as="h1">Overview</Heading>
        <Text tone="secondary">Below 1024px the links move into a menu behind the button; from 1024px they sit in the bar.</Text>
      </main>
    </div>
  )
}

export function MobileNavFrame() {
  return (
    <div>
      <main style={{ padding: 'var(--space-element-gap)' }}>
        <Heading level={3} as="h1">Messages</Heading>
        <Text tone="secondary">The bar stays at the bottom of the screen while the page scrolls.</Text>
      </main>
      <MobileNav items={NAV} currentHref="#messages" alwaysVisible />
    </div>
  )
}
