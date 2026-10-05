'use client'

import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { SkipLink } from '@amezquita/design-system/components/primitives/SkipLink'
import { NavigationMenu } from '@amezquita/design-system/components/composition/NavigationMenu'
import {
  SideNav,
  SideNavProvider,
  SideNavTrigger,
  type NavItem,
} from '@amezquita/design-system/components/patterns/SideNav'

type SiteFrameProps = {
  headerItems: NavItem[]
  sectionItems: NavItem[]
  children: React.ReactNode
}

/**
 * The whole site frame, built from the package's own navigation components
 * (decisions/0017): SkipLink, a header with NavigationMenu, and SideNav,
 * which is inline from 1024px up and a drawer below it. The landing page
 * shows no section tree beside its content, so SideNav runs drawer-only
 * there; the drawer still carries the header links and the full tree.
 */
export function SiteFrame({ headerItems, sectionItems, children }: SiteFrameProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isLanding = pathname === '/'

  return (
    <SideNavProvider>
      <SkipLink />
      <header className="site-header">
        <div className="site-header__inner">
          <SideNavTrigger />
          <Link asChild variant="standalone" className="site-header__brand">
            <NextLink href="/">amezquita design system</NextLink>
          </Link>
          <NavigationMenu
            items={headerItems}
            currentHref={pathname}
            LinkComponent={NextLink}
            aria-label="Main"
          />
          <Button
            href="/getting-started"
            onNavigate={href => router.push(href)}
            className="site-header__cta"
          >
            Get started
          </Button>
        </div>
      </header>
      <div className={isLanding ? 'site-body site-body--landing' : 'site-body'}>
        <SideNav
          items={sectionItems}
          headerItems={headerItems}
          currentHref={pathname}
          LinkComponent={NextLink}
          layout={isLanding ? 'drawer-only' : 'sidebar'}
          aria-label="Documentation"
          drawerTitle="Menu"
          className="site-sidenav"
        />
        <main id="main-content" className="site-main">
          {children}
        </main>
      </div>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>
            Built with <code>@amezquita/design-system</code>, installed from npm like any other project.
          </p>
          <p>
            <Link href="https://github.com/anto-amezquita/design-system" variant="standalone" external>
              Source on GitHub
            </Link>
          </p>
        </div>
      </footer>
    </SideNavProvider>
  )
}
