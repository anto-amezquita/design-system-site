'use client'

import { useState } from 'react'
import { CopyIcon, FileTextIcon, FunnelIcon, MoonIcon, PaletteIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Checkbox } from '@amezquita/design-system/components/primitives/Checkbox'
import { Kbd } from '@amezquita/design-system/components/primitives/Kbd'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { Text } from '@amezquita/design-system/components/primitives/Text'
import { CommandPalette, useCommandPaletteShortcut, type CommandGroup } from '@amezquita/design-system/components/composition/CommandPalette'
import { ContextMenu } from '@amezquita/design-system/components/composition/ContextMenu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@amezquita/design-system/components/composition/HoverCard'
import { LightboxGallery } from '@amezquita/design-system/components/composition/Lightbox'
import { Popover, PopoverContent, PopoverTrigger } from '@amezquita/design-system/components/composition/Popover'
import { PHOTOS, Stack } from './shared'

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false)
  const [ran, setRan] = useState('')
  useCommandPaletteShortcut(setOpen)
  const groups: CommandGroup[] = [
    {
      label: 'Create',
      commands: [
        { id: 'page', label: 'New page', icon: <PlusIcon />, shortcut: ['Ctrl', 'N'], onSelect: () => setRan('New page') },
        { id: 'brand', label: 'New brand', description: 'Start from the base tokens', icon: <PaletteIcon />, onSelect: () => setRan('New brand') },
      ],
    },
    {
      label: 'Go to',
      commands: [
        { id: 'tokens', label: 'Tokens', icon: <FileTextIcon />, keywords: ['colours', 'spacing'], onSelect: () => setRan('Tokens') },
        { id: 'theme', label: 'Switch to dark mode', icon: <MoonIcon />, keywords: ['theme', 'night'], onSelect: () => setRan('Dark mode') },
      ],
    },
  ]
  return (
    <Stack>
      <Button variant="secondary" onClick={() => setOpen(true)}>Search commands <Kbd>Ctrl</Kbd> <Kbd>K</Kbd></Button>
      <Text size="small" tone="secondary" aria-live="polite">{ran ? `Ran: ${ran}` : 'Pick a command to see it run.'}</Text>
      <CommandPalette open={open} onOpenChange={setOpen} groups={groups} />
    </Stack>
  )
}

function ContextMenuDemo() {
  return (
    <ContextMenu
      aria-label="Actions for report.pdf"
      groups={[
        { items: [{ id: 'copy', label: 'Copy link', icon: <CopyIcon />, shortcut: ['Ctrl', 'C'] }] },
        { items: [{ id: 'delete', label: 'Delete', icon: <TrashIcon /> }] },
      ]}
    >
      <div className="demo-tile" aria-label="report.pdf. Right-click, long-press or press Shift+F10 for actions.">
        report.pdf · right-click or Shift+F10
      </div>
    </ContextMenu>
  )
}

function HoverCardDemo() {
  return (
    <p className="demo-text">
      Reviewed by{' '}
      <HoverCard>
        <HoverCardTrigger><Link href="#ana">@ana</Link></HoverCardTrigger>
        <HoverCardContent aria-label="Ana Quispe">
          <strong>Ana Quispe</strong>
          <Text size="small" tone="secondary">Accessibility lead · Aarhus</Text>
        </HoverCardContent>
      </HoverCard>
      .
    </p>
  )
}

function LightboxDemo() {
  return (
    <div className="demo-full">
      <LightboxGallery title="Brand photos" images={PHOTOS} />
    </div>
  )
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" icon={<FunnelIcon />}>Filters</Button>
      </PopoverTrigger>
      <PopoverContent title="Filters" showClose align="start">
        <Stack>
          <Checkbox label="Primitives" defaultChecked />
          <Checkbox label="Composition" />
          <Checkbox label="Patterns" defaultChecked />
        </Stack>
      </PopoverContent>
    </Popover>
  )
}

export const COMPOSITION_DEMOS: Record<string, () => React.ReactNode> = {
  'command-palette': CommandPaletteDemo,
  'context-menu': ContextMenuDemo,
  'hover-card': HoverCardDemo,
  lightbox: LightboxDemo,
  popover: PopoverDemo,
}
