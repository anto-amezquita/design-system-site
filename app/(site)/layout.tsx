import { SiteFrame } from '@/components/site/SiteFrame'
import { HEADER_ITEMS, getSectionItems } from '@/lib/nav'
import { getPackageVersion } from '@/lib/ds'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteFrame headerItems={HEADER_ITEMS} sectionItems={getSectionItems()} version={getPackageVersion()}>
      {children}
    </SiteFrame>
  )
}
