'use client'

import { useId, useMemo, useState } from 'react'
import { CopyIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Avatar, AvatarGroup } from '@amezquita/design-system/components/primitives/Avatar'
import { Badge } from '@amezquita/design-system/components/primitives/Badge'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Checkbox } from '@amezquita/design-system/components/primitives/Checkbox'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Input } from '@amezquita/design-system/components/primitives/Input'
import { Label } from '@amezquita/design-system/components/primitives/Label'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { RadioGroup } from '@amezquita/design-system/components/primitives/Radio'
import { Select } from '@amezquita/design-system/components/primitives/Select'
import { Skeleton } from '@amezquita/design-system/components/primitives/Skeleton'
import { Spinner } from '@amezquita/design-system/components/primitives/Spinner'
import { Switch } from '@amezquita/design-system/components/primitives/Switch'
import { Tag } from '@amezquita/design-system/components/primitives/Tag'
import { Textarea } from '@amezquita/design-system/components/primitives/Textarea'
import { Alert } from '@amezquita/design-system/components/composition/Alert'
import { AlertDialog } from '@amezquita/design-system/components/composition/AlertDialog'
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@amezquita/design-system/components/composition/Card'
import { Dialog } from '@amezquita/design-system/components/composition/Dialog'
import { Drawer } from '@amezquita/design-system/components/composition/Drawer'
import { Menu } from '@amezquita/design-system/components/composition/Menu'
import { NavigationMenu } from '@amezquita/design-system/components/composition/NavigationMenu'
import { ToastProvider, useToast } from '@amezquita/design-system/components/composition/Toast'
import { ThemeScope } from '@amezquita/design-system/components/composition/ThemeScope'
import { Tooltip, TooltipProvider } from '@amezquita/design-system/components/composition/Tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amezquita/design-system/components/patterns/Accordion'
import { Breadcrumb } from '@amezquita/design-system/components/patterns/Breadcrumb'
import { DataTable } from '@amezquita/design-system/components/patterns/DataTable'
import { EmptyState } from '@amezquita/design-system/components/patterns/EmptyState'
import { Hero } from '@amezquita/design-system/components/patterns/Hero'
import { Pagination } from '@amezquita/design-system/components/patterns/Pagination'
import { SideNav, SideNavProvider, SideNavTrigger } from '@amezquita/design-system/components/patterns/SideNav'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amezquita/design-system/components/patterns/Table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'

// One small live render per public component, keyed by the registry slug.
// These are the only hand-written part of the Components pages: a prop
// rename in a release breaks the typecheck here, which is the point. A
// component the package adds before a render is written here falls back to
// a note, so a release never fails the build for want of a demo (FR-12).

function Stack({ children, row = false }: { children: React.ReactNode; row?: boolean }) {
  return <div className={row ? 'demo-stack demo-stack--row' : 'demo-stack'}>{children}</div>
}

function AvatarDemo() {
  return (
    <Stack row>
      <Avatar fallback="AA" alt="Anna Andersen" size="lg" />
      <AvatarGroup max={3} size="md" aria-label="Project members">
        <Avatar fallback="MK" alt="Mads Kjær" />
        <Avatar fallback="SL" alt="Sofie Lund" />
        <Avatar fallback="JP" alt="Jonas Poulsen" />
        <Avatar fallback="EH" alt="Emma Holm" />
      </AvatarGroup>
    </Stack>
  )
}

function BadgeDemo() {
  return (
    <Stack row>
      <Badge variant="success" shape="status">Live</Badge>
      <Badge variant="warning" shape="status">Draft</Badge>
      <Badge variant="info" shape="count" aria-label="3 unread">3</Badge>
      <Badge variant="error" shape="dot" aria-label="Error" />
    </Stack>
  )
}

function ButtonDemo() {
  return (
    <Stack row>
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Skip</Button>
      <Button loading>Saving</Button>
    </Stack>
  )
}

function CheckboxDemo() {
  const id = useId()
  return (
    <Stack>
      <Checkbox id={`${id}-a`} label="Email me about releases" defaultChecked />
      <Checkbox id={`${id}-b`} label="Include prereleases" />
    </Stack>
  )
}

function HeadingDemo() {
  return (
    <Stack>
      <Heading level={3} as="h3">Level 3</Heading>
      <Heading level={4} as="h3">Level 4</Heading>
      <Heading level={5} as="h3">Level 5</Heading>
    </Stack>
  )
}

function InputDemo() {
  const id = useId()
  return <Input id={id} label="Email address" type="email" placeholder="you@example.com" hint="We’ll only use it for release notes." />
}

function LabelDemo() {
  const id = useId()
  return (
    <Stack>
      <Label htmlFor={id} required>Project name</Label>
      <input id={id} className="demo-native-input" defaultValue="Ajar" />
    </Stack>
  )
}

function LinkDemo() {
  return (
    <Stack>
      <p>Read the <Link href="#link-demo">release notes</Link> before upgrading.</p>
      <Link variant="standalone" href="https://github.com/anto-amezquita/design-system" external>Source on GitHub</Link>
    </Stack>
  )
}

function RadioDemo() {
  return (
    <RadioGroup
      aria-label="Theme"
      defaultValue="base"
      options={[
        { value: 'base', label: 'Base' },
        { value: 'portfolio', label: 'Portfolio' },
        { value: 'custom', label: 'Your own', disabled: true },
      ]}
    />
  )
}

function SelectDemo() {
  return (
    <div className="demo-narrow">
      <Select
        aria-label="Package manager"
        placeholder="Package manager"
        groups={[{ options: [{ value: 'npm', label: 'npm' }, { value: 'pnpm', label: 'pnpm' }, { value: 'yarn', label: 'Yarn' }] }]}
      />
    </div>
  )
}

function SkeletonDemo() {
  return (
    <div className="demo-narrow">
      <Stack row>
        <Skeleton variant="circle" width={40} height={40} label="Loading profile" />
        <div className="demo-grow"><Skeleton variant="text" lines={2} /></div>
      </Stack>
    </div>
  )
}

function SkipLinkDemo() {
  return (
    <p className="demo-note">
      This site’s own SkipLink is the first Tab stop on every page. Press Tab from the top of the page to see it.
    </p>
  )
}

function SpinnerDemo() {
  return (
    <Stack row>
      <Spinner size="sm" label="Loading" />
      <Spinner size="md" label="Loading" />
      <Spinner size="lg" label="Loading" />
    </Stack>
  )
}

function SwitchDemo() {
  const id = useId()
  return (
    <Stack>
      <Switch id={`${id}-a`} label="Dark mode" />
      <Switch id={`${id}-b`} label="Reduce motion" defaultChecked />
    </Stack>
  )
}

function TagDemo() {
  const [tags, setTags] = useState(['tokens', 'react', 'a11y'])
  return (
    <Stack row>
      <Tag variant="accent">base</Tag>
      {tags.map(t => (
        <Tag key={t} removable onRemove={() => setTags(tags.filter(x => x !== t))}>{t}</Tag>
      ))}
    </Stack>
  )
}

function TextareaDemo() {
  const id = useId()
  return <Textarea id={id} label="Release note" placeholder="What changed, and who needs to act?" maxLength={200} characterCount />
}

function AlertDemo() {
  return (
    <Alert variant="info" title="1.1.1 is out" live={false}>
      The registry now installs the base theme’s colours.
    </Alert>
  )
}

function AlertDialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Delete project</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this project?"
        description="Its tokens and settings go with it. This can’t be undone."
        cancel={<Button variant="secondary">Keep project</Button>}
        action={<Button onClick={() => setOpen(false)}>Delete project</Button>}
      />
    </>
  )
}

function CardDemo() {
  return (
    <div className="demo-narrow">
      <Card>
        <CardHeader>
          <CardTitle as="h3">Songwriting profile</CardTitle>
          <CardDescription>A consumer of the system since 1.0.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="secondary">Open</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function DialogDemo() {
  return (
    <Dialog
      trigger={<Button variant="secondary">Rename project</Button>}
      title="Rename project"
      description="The new name shows everywhere the project does."
      footer={<Button>Save name</Button>}
    >
      <Input label="Project name" defaultValue="Ajar" />
    </Dialog>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="secondary">Open filters</Button>}
      title="Filters"
      description="Narrow the component list."
      footer={<Button onClick={() => setOpen(false)}>Show results</Button>}
    >
      <Checkbox label="Primitives" defaultChecked />
    </Drawer>
  )
}

function MenuDemo() {
  return (
    <Menu
      trigger={<Button variant="secondary">Actions</Button>}
      groups={[
        { items: [{ id: 'edit', label: 'Edit', onSelect: () => {} }, { id: 'duplicate', label: 'Duplicate', onSelect: () => {} }] },
        { items: [{ id: 'delete', label: 'Delete', variant: 'destructive', onSelect: () => {} }] },
      ]}
    />
  )
}

// Mode only: the portfolio CSS loads on Themes alone, and Themes shows the
// brand side. Open either menu: it renders at the end of the page and still
// matches its panel.
function ThemeScopeDemo() {
  return (
    <div className="theme-frames">
      {(['light', 'dark'] as const).map(mode => (
        <ThemeScope key={mode} mode={mode} className="theme-frame__panel">
          <p>A {mode} part of the page.</p>
          <MenuDemo />
        </ThemeScope>
      ))}
    </div>
  )
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu
      aria-label="Example"
      currentHref="#work"
      items={[
        { id: 'work', label: 'Work', href: '#work' },
        { id: 'writing', label: 'Writing', items: [{ id: 'essays', label: 'Essays', href: '#essays' }, { id: 'notes', label: 'Notes', href: '#notes' }] },
        { id: 'about', label: 'About', href: '#about' },
      ]}
    />
  )
}

function ToastButton() {
  const { toast } = useToast()
  return (
    <Button variant="secondary" onClick={() => toast({ title: 'Changes saved', description: 'Your settings are updated.', variant: 'success' })}>
      Show toast
    </Button>
  )
}

function ToastDemo() {
  return <ToastButton />
}

function TooltipDemo() {
  return (
    <Tooltip content="Copy the install command">
      <Button variant="ghost" icon={<CopyIcon size={16} aria-hidden="true" />} aria-label="Copy the install command">
        Copy
      </Button>
    </Tooltip>
  )
}

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="demo-full">
      <AccordionItem value="a">
        <AccordionTrigger>Does it need Tailwind?</AccordionTrigger>
        <AccordionContent>No. Components ship their own CSS, built on the tokens.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Can I use my own brand?</AccordionTrigger>
        <AccordionContent>Yes. Override the semantic tokens in a CSS file you own.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function BreadcrumbDemo() {
  return <Breadcrumb items={[{ label: 'Home', href: '#home' }, { label: 'Components', href: '#components' }, { label: 'Breadcrumb' }]} />
}

type Release = { id: string; version: string; kind: string }
const RELEASES: Release[] = [
  { id: '1', version: '1.1.1', kind: 'Patch' },
  { id: '2', version: '1.1.0', kind: 'Minor' },
  { id: '3', version: '1.0.0', kind: 'Major' },
]

function DataTableDemo() {
  const data = useMemo(() => RELEASES, [])
  return (
    <DataTable<Release>
      compact
      scrollLabel="Example releases"
      paginationLabel="Example releases pages"
      columns={[
        { key: 'version', label: 'Version', sortable: true },
        { key: 'kind', label: 'Kind', sortable: true },
      ]}
      data={data}
    />
  )
}

function EmptyStateDemo() {
  return (
    <EmptyState
      compact
      icon={<MagnifyingGlassIcon size={24} />}
      title="No components match"
      description="Try a shorter search."
      action={{ label: 'Clear search', onClick: () => {} }}
    />
  )
}

function HeroDemo() {
  return (
    <div className="demo-hero">
      <Hero eyebrow="Design system" title="Start from base" titleAs="h2" lead="A brand-neutral theme every project starts from." />
    </div>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(2)
  return <Pagination currentPage={page} totalPages={8} onPageChange={setPage} compact label="Example pages" />
}

function SideNavDemo() {
  return (
    <SideNavProvider>
      <SideNavTrigger aria-label="Open example navigation" />
      <SideNav
        aria-label="Example sections"
        drawerTitle="Example"
        currentHref="#color"
        items={[
          { id: 'start', label: 'Getting started', href: '#start' },
          { id: 'foundations', label: 'Foundations', items: [{ id: 'color', label: 'Color', href: '#color' }, { id: 'type', label: 'Typography', href: '#type' }] },
        ]}
      />
    </SideNavProvider>
  )
}

function TableDemo() {
  return (
    <Table compact scrollLabel="Example table">
      <TableHead>
        <TableRow>
          <TableHeader scope="col">Token</TableHeader>
          <TableHeader scope="col">Value</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow><TableCell>space-inline-gap</TableCell><TableCell>8px</TableCell></TableRow>
        <TableRow><TableCell>space-element-gap</TableCell><TableCell>16px</TableCell></TableRow>
      </TableBody>
    </Table>
  )
}

function TabsDemo() {
  return (
    <Tabs defaultValue="npm" className="demo-full">
      <TabsList>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
      </TabsList>
      <TabsContent value="npm"><code>npm install @amezquita/design-system</code></TabsContent>
      <TabsContent value="pnpm"><code>pnpm add @amezquita/design-system</code></TabsContent>
    </Tabs>
  )
}

const DEMOS: Record<string, () => React.ReactNode> = {
  avatar: AvatarDemo,
  badge: BadgeDemo,
  button: ButtonDemo,
  checkbox: CheckboxDemo,
  heading: HeadingDemo,
  input: InputDemo,
  label: LabelDemo,
  link: LinkDemo,
  radio: RadioDemo,
  select: SelectDemo,
  skeleton: SkeletonDemo,
  'skip-link': SkipLinkDemo,
  spinner: SpinnerDemo,
  switch: SwitchDemo,
  tag: TagDemo,
  textarea: TextareaDemo,
  alert: AlertDemo,
  'alert-dialog': AlertDialogDemo,
  card: CardDemo,
  dialog: DialogDemo,
  drawer: DrawerDemo,
  menu: MenuDemo,
  'navigation-menu': NavigationMenuDemo,
  'theme-scope': ThemeScopeDemo,
  toast: ToastDemo,
  tooltip: TooltipDemo,
  accordion: AccordionDemo,
  breadcrumb: BreadcrumbDemo,
  'data-table': DataTableDemo,
  'empty-state': EmptyStateDemo,
  hero: HeroDemo,
  pagination: PaginationDemo,
  'side-nav': SideNavDemo,
  table: TableDemo,
  tabs: TabsDemo,
}

/** Providers the overlay demos need, mounted once per page. */
export function DemoProviders({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ToastProvider>{children}</ToastProvider>
    </TooltipProvider>
  )
}

export function Demo({ slug, name }: { slug: string; name: string }) {
  const Render = DEMOS[slug]
  if (!Render) {
    return <p className="demo-note">No live render of {name} on this site yet. Its docs below come straight from the package.</p>
  }
  return <Render />
}
