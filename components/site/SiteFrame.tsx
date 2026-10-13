'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { GithubLogoIcon } from '@phosphor-icons/react'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { BrandPicker } from '@/components/site/BrandPicker'
import { ModeToggle } from '@/components/site/ModeToggle'
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
  /** The installed package's version, read on the server, for the footer. */
  version: string
  children: React.ReactNode
}

/**
 * The whole site frame, built from the package's own navigation components
 * (decisions/0017): SkipLink, a header with NavigationMenu, and SideNav,
 * which is inline from 1024px up and a drawer below it. The landing page
 * shows no section tree beside its content, so SideNav runs drawer-only
 * there; the drawer still carries the header links and the full tree.
 */
export function SiteFrame({ headerItems, sectionItems, version, children }: SiteFrameProps) {
  const pathname = usePathname()
  const isLanding = pathname === '/'

  return (
    <SideNavProvider>
      <SkipLink />
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__start">
          <SideNavTrigger />
          <Link asChild variant="standalone" className="site-header__brand">
            <NextLink href="/" aria-label="amezquita design system, home">
              <span>amezquita<span className="site-header__name-rest"> design system</span></span>
            </NextLink>
          </Link>
          </div>
          <NavigationMenu
            items={headerItems}
            currentHref={pathname}
            LinkComponent={NextLink}
            aria-label="Main"
            className="site-header__nav"
          />
          <div className="site-header__end">
            <BrandPicker />
            <ModeToggle />
          </div>
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
          <div className="site-footer__credit">
            <p>
              Designed and built by{' '}
              <Link href="https://amezquita.dk" variant="standalone">Antonio Amézquita</Link>
            </p>
            <p>
              Built with <code>@amezquita/design-system</code>, installed from npm like any other project.
            </p>
          </div>
          <ul className="site-footer__links" aria-label="Package">
            <li className="site-footer__release">
              <span className="site-footer__version">{version}</span>
              <span aria-hidden="true">·</span>
              <Link asChild variant="standalone">
                <NextLink href="/changelog">Changelog</NextLink>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/anto-amezquita/design-system"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub, opens in a new tab"
                title="GitHub"
                className="site-footer__icon-link"
              >
                <GithubLogoIcon weight="fill" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@amezquita/design-system"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="npm, opens in a new tab"
                title="npm"
                className="site-footer__icon-link"
              >
                {/* npm's mark (Simple Icons, CC0); Phosphor has none. */}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </SideNavProvider>
  )
}
