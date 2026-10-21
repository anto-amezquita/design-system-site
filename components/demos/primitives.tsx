'use client'

import { useState } from 'react'
import {
  BellIcon, CheckCircleIcon, CopyIcon, FolderIcon, GearIcon, ListBulletsIcon, MapPinIcon,
  MoonIcon, PencilSimpleIcon, SquaresFourIcon, StarIcon, SunIcon, TextBIcon, TextItalicIcon, TrashIcon,
} from '@phosphor-icons/react'
import { AspectRatio } from '@amezquita/design-system/components/primitives/AspectRatio'
import { Blockquote } from '@amezquita/design-system/components/primitives/Blockquote'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { ButtonGroup } from '@amezquita/design-system/components/primitives/ButtonGroup'
import { Calendar } from '@amezquita/design-system/components/primitives/Calendar'
import { Citation } from '@amezquita/design-system/components/primitives/Citation'
import { CodeBlock } from '@amezquita/design-system/components/primitives/CodeBlock'
import { Collapsible } from '@amezquita/design-system/components/primitives/Collapsible'
import { Combobox } from '@amezquita/design-system/components/primitives/Combobox'
import { DatePicker } from '@amezquita/design-system/components/primitives/DatePicker'
import { DateRangePicker } from '@amezquita/design-system/components/primitives/DateRangePicker'
import { DescriptionList } from '@amezquita/design-system/components/primitives/DescriptionList'
import { Divider } from '@amezquita/design-system/components/primitives/Divider'
import { Field } from '@amezquita/design-system/components/primitives/Field'
import { FileUpload } from '@amezquita/design-system/components/primitives/FileUpload'
import { Grid, GridItem } from '@amezquita/design-system/components/primitives/Grid'
import { Icon } from '@amezquita/design-system/components/primitives/Icon'
import { IconButton } from '@amezquita/design-system/components/primitives/IconButton'
import { Image } from '@amezquita/design-system/components/primitives/Image'
import { Input } from '@amezquita/design-system/components/primitives/Input'
import { InputAddon, InputGroup } from '@amezquita/design-system/components/primitives/InputGroup'
import { Item } from '@amezquita/design-system/components/primitives/Item'
import { Kbd } from '@amezquita/design-system/components/primitives/Kbd'
import { List } from '@amezquita/design-system/components/primitives/List'
import { MultiSelect } from '@amezquita/design-system/components/primitives/MultiSelect'
import { NumberInput } from '@amezquita/design-system/components/primitives/NumberInput'
import { OtpInput } from '@amezquita/design-system/components/primitives/OtpInput'
import { ProgressBar } from '@amezquita/design-system/components/primitives/ProgressBar'
import { ScrollArea } from '@amezquita/design-system/components/primitives/ScrollArea'
import { Search } from '@amezquita/design-system/components/primitives/Search'
import { Section } from '@amezquita/design-system/components/primitives/Section'
import { SegmentedControl } from '@amezquita/design-system/components/primitives/SegmentedControl'
import { SelectableCard, SelectableCardGroup } from '@amezquita/design-system/components/primitives/SelectableCard'
import { Slider } from '@amezquita/design-system/components/primitives/Slider'
import { Stack as DsStack } from '@amezquita/design-system/components/primitives/Stack'
import { StatusDot } from '@amezquita/design-system/components/primitives/StatusDot'
import { TagInput } from '@amezquita/design-system/components/primitives/TagInput'
import { Text } from '@amezquita/design-system/components/primitives/Text'
import { TimePicker } from '@amezquita/design-system/components/primitives/TimePicker'
import { Timestamp } from '@amezquita/design-system/components/primitives/Timestamp'
import { ToggleButton } from '@amezquita/design-system/components/primitives/ToggleButton'
import { VisuallyHidden } from '@amezquita/design-system/components/primitives/VisuallyHidden'
import { PHOTOS, Stack, oct } from './shared'

const COUNTRIES = ['Denmark', 'Finland', 'Germany', 'Iceland', 'Norway', 'Peru', 'Spain', 'Sweden']

function AspectRatioDemo() {
  return (
    <div className="demo-narrow">
      <AspectRatio ratio="16/9" rounded>
        <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} />
      </AspectRatio>
    </div>
  )
}

function BlockquoteDemo() {
  return (
    <Blockquote attribution="Dieter Rams" source="Ten principles for good design">
      Good design is as little design as possible.
    </Blockquote>
  )
}

function ButtonGroupDemo() {
  return (
    <Stack>
      <ButtonGroup label="Form actions">
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </ButtonGroup>
      <ButtonGroup label="Text style" attached>
        <ToggleButton size="sm" icon={<TextBIcon />} label="Bold" hideLabel />
        <ToggleButton size="sm" icon={<TextItalicIcon />} label="Italic" hideLabel />
      </ButtonGroup>
    </Stack>
  )
}

function CalendarDemo() {
  return <Calendar defaultValue={oct(22)} locale="en-GB" />
}

function CitationDemo() {
  return (
    <p className="demo-text">
      Good design is as little design as possible.
      <Citation href="#source-1" index={1} title="Ten principles for good design" />
    </p>
  )
}

const SAVE = `export function Save({ onSave }: Props) {
  return <Button onClick={onSave}>Save changes</Button>
}`

function CodeBlockDemo() {
  return (
    <div className="demo-full">
      <CodeBlock code={SAVE} filename="Save.tsx" language="tsx" />
    </div>
  )
}

function CollapsibleDemo() {
  return (
    <div className="demo-full">
      <Collapsible title="Shipping options">
        <p className="demo-text">Standard delivery in 2–4 working days, or next day if ordered before 14:00.</p>
      </Collapsible>
    </div>
  )
}

function ComboboxDemo() {
  return (
    <div className="demo-narrow">
      <Combobox label="Country" options={COUNTRIES} hint="Start typing, then choose." />
    </div>
  )
}

function DatePickerDemo() {
  return (
    <div className="demo-narrow">
      <DatePicker label="Delivery date" defaultValue={oct(22)} locale="en-GB" />
    </div>
  )
}

function DateRangePickerDemo() {
  return (
    <div className="demo-narrow">
      <DateRangePicker label="Stay" startLabel="Check-in" endLabel="Check-out" defaultValue={{ start: oct(12), end: oct(16) }} locale="en-GB" />
    </div>
  )
}

function DescriptionListDemo() {
  return (
    <div className="demo-full">
      <DescriptionList
        divided
        items={[
          { term: 'Package', description: '@amezquita/design-system' },
          { term: 'Version', description: '1.6.0' },
          { term: 'Licence', description: 'MIT' },
        ]}
      />
    </div>
  )
}

function DividerDemo() {
  return (
    <div className="demo-full">
      <Stack>
        <Text>Above the line</Text>
        <Divider />
        <Text>Below the line</Text>
      </Stack>
    </div>
  )
}

function FieldDemo() {
  return (
    <div className="demo-narrow">
      <Field label="Company" hint="As it appears on invoices.">
        <input className="demo-native-input demo-full" />
      </Field>
    </div>
  )
}

function FileUploadDemo() {
  return (
    <div className="demo-narrow">
      <FileUpload label="Attachments" accept="image/*,.pdf" maxFiles={3} maxSize={5 * 1024 * 1024} hint="Images or PDFs, up to 5 MB each." />
    </div>
  )
}

function GridDemo() {
  return (
    <div className="demo-full">
      <Grid columns={3} gap="inline">
        {[1, 2, 3, 4, 5].map(n => (
          <GridItem key={n} span={n === 4 ? 2 : 1}><div className="demo-tile">{n === 4 ? 'Spans 2' : n}</div></GridItem>
        ))}
      </Grid>
    </div>
  )
}

function IconDemo() {
  return (
    <Stack row>
      <Icon icon={StarIcon} size="sm" />
      <Icon icon={StarIcon} />
      <Icon icon={StarIcon} size="lg" tone="accent" />
      <Icon icon={CheckCircleIcon} size="lg" weight="fill" label="Verified" />
      <Icon icon={BellIcon} size="xl" tone="secondary" />
    </Stack>
  )
}

function IconButtonDemo() {
  return (
    <Stack row>
      <IconButton icon={<PencilSimpleIcon />} label="Edit" variant="primary" />
      <IconButton icon={<CopyIcon />} label="Copy" variant="secondary" />
      <IconButton icon={<TrashIcon />} label="Delete" />
      <IconButton icon={<GearIcon />} label="Settings" size="sm" />
    </Stack>
  )
}

function ImageDemo() {
  return (
    <div className="demo-narrow">
      <Image src={PHOTOS[1].src} alt={PHOTOS[1].alt} ratio="16/9" rounded caption={PHOTOS[1].caption} />
    </div>
  )
}

function InputGroupDemo() {
  return (
    <div className="demo-narrow">
      <InputGroup label="Website">
        <InputAddon>https://</InputAddon>
        <Input placeholder="example.dk" />
      </InputGroup>
    </div>
  )
}

function ItemDemo() {
  return (
    <div className="demo-full">
      <List divided aria-label="Recent files">
        <Item leading={<Icon icon={FolderIcon} />} title="brand-brief.pdf" description="2 MB · Edited today" />
        <Item leading={<Icon icon={FolderIcon} />} title="tokens.json" description="12 KB · Edited yesterday" />
      </List>
    </div>
  )
}

function KbdDemo() {
  return <p className="demo-text">Open the palette with <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></p>
}

function ListDemo() {
  return (
    <Stack row>
      <List marker="bullet" aria-label="Tiers">
        <li>Primitives</li>
        <li>Composition</li>
        <li>Patterns</li>
      </List>
      <List marker="number" aria-label="Steps">
        <li>Install</li>
        <li>Import a theme</li>
        <li>Use a component</li>
      </List>
    </Stack>
  )
}

function MultiSelectDemo() {
  return (
    <div className="demo-narrow">
      <MultiSelect label="Languages" options={['Danish', 'English', 'Spanish', 'Swedish', 'German']} defaultValue={['Danish', 'Spanish']} />
    </div>
  )
}

function NumberInputDemo() {
  return (
    <div className="demo-narrow">
      <NumberInput label="Guests" defaultValue={2} min={1} max={12} />
    </div>
  )
}

function OtpInputDemo() {
  return <OtpInput label="Verification code" hint="We sent 6 digits to your phone." />
}

function ProgressBarDemo() {
  return (
    <div className="demo-full">
      <Stack>
        <ProgressBar label="Uploading tokens.json" value={64} showValue />
        <ProgressBar label="Preparing export" />
      </Stack>
    </div>
  )
}

function ScrollAreaDemo() {
  return (
    <div className="demo-full">
      <ScrollArea label="Release notes" maxHeight="8rem">
        <List marker="bullet" gap="tight" aria-label="Changes">
          {['Chart', 'TreeView', 'ToolCall', 'MessageList', 'ChatComposer', 'PromptForm', 'ChatMessage', 'Checkbox shape fix'].map(c => <li key={c}>{c}</li>)}
        </List>
      </ScrollArea>
    </div>
  )
}

function SearchDemo() {
  return (
    <div className="demo-narrow">
      <Search label="Search components" placeholder="Search components" shortcut="/" />
    </div>
  )
}

function SectionDemo() {
  return (
    <div className="demo-full">
      <Section tone="subtle" spacing="component" width="text" aria-label="Example section">
        <Text weight="label">A section</Text>
        <Text tone="secondary" size="small">Width, spacing and tone come from the brand.</Text>
      </Section>
    </div>
  )
}

function SegmentedControlDemo() {
  return (
    <SegmentedControl
      label="View"
      defaultValue="grid"
      options={[
        { value: 'grid', label: 'Grid', icon: <SquaresFourIcon /> },
        { value: 'list', label: 'List', icon: <ListBulletsIcon /> },
        { value: 'map', label: 'Map', icon: <MapPinIcon /> },
      ]}
    />
  )
}

function SelectableCardDemo() {
  return (
    <div className="demo-full">
      <SelectableCardGroup legend="Plan" defaultValue={['pro']} columns>
        <SelectableCard value="basic" title="Basic" meta="Free" description="One brand, light only" />
        <SelectableCard value="pro" title="Pro" meta="90 kr/mo" description="Every brand, light and dark" />
      </SelectableCardGroup>
    </div>
  )
}

function SliderDemo() {
  return (
    <div className="demo-narrow">
      <Slider label="Volume" defaultValue={60} showValue />
    </div>
  )
}

function StackDemo() {
  return (
    <DsStack direction="horizontal" gap="inline" wrap>
      {['One', 'Two', 'Three'].map(t => <div key={t} className="demo-tile">{t}</div>)}
    </DsStack>
  )
}

function StatusDotDemo() {
  return (
    <Stack>
      <StatusDot status="success">Deployed</StatusDot>
      <StatusDot status="warning">Degraded</StatusDot>
      <StatusDot status="error">Down</StatusDot>
      <StatusDot status="info" pulse>Building</StatusDot>
    </Stack>
  )
}

function TagInputDemo() {
  return (
    <div className="demo-narrow">
      <TagInput label="Skills" defaultValue={['React', 'Design tokens']} suggestions={['Accessibility', 'Figma', 'TypeScript']} />
    </div>
  )
}

function TextDemo() {
  return (
    <Stack>
      <Text>Body text in the brand's face.</Text>
      <Text size="small" tone="secondary">Small, secondary text.</Text>
      <Text size="caption" weight="label">CAPTION, LABEL WEIGHT</Text>
    </Stack>
  )
}

function TimePickerDemo() {
  return (
    <div className="demo-narrow">
      <TimePicker label="Meeting time" defaultValue="14:30" step={15} locale="en-GB" />
    </div>
  )
}

function TimestampDemo() {
  const [now] = useState(() => Date.now())
  return (
    <Stack>
      <Text>Edited <Timestamp date={now - 5 * 60_000} /></Text>
      <Text>Published <Timestamp date={now - 26 * 3_600_000} /></Text>
      <Text>Released <Timestamp date={oct(20)} format="date" locale="en-GB" /></Text>
    </Stack>
  )
}

function ToggleButtonDemo() {
  return (
    <Stack row>
      <ToggleButton label="Dark mode" icon={<MoonIcon />} />
      <ToggleButton label="Light mode" icon={<SunIcon />} defaultPressed />
    </Stack>
  )
}

function VisuallyHiddenDemo() {
  return (
    <p className="demo-text">
      <a href="#report">Read the report<VisuallyHidden> (PDF, 2 MB)</VisuallyHidden></a>
      <br />
      <Text as="span" size="small" tone="secondary">Screen readers also hear “PDF, 2 MB”.</Text>
    </p>
  )
}

export const PRIMITIVE_DEMOS: Record<string, () => React.ReactNode> = {
  'aspect-ratio': AspectRatioDemo,
  blockquote: BlockquoteDemo,
  'button-group': ButtonGroupDemo,
  calendar: CalendarDemo,
  citation: CitationDemo,
  'code-block': CodeBlockDemo,
  collapsible: CollapsibleDemo,
  combobox: ComboboxDemo,
  'date-picker': DatePickerDemo,
  'date-range-picker': DateRangePickerDemo,
  'description-list': DescriptionListDemo,
  divider: DividerDemo,
  field: FieldDemo,
  'file-upload': FileUploadDemo,
  grid: GridDemo,
  icon: IconDemo,
  'icon-button': IconButtonDemo,
  image: ImageDemo,
  'input-group': InputGroupDemo,
  item: ItemDemo,
  kbd: KbdDemo,
  list: ListDemo,
  'multi-select': MultiSelectDemo,
  'number-input': NumberInputDemo,
  'otp-input': OtpInputDemo,
  'progress-bar': ProgressBarDemo,
  'scroll-area': ScrollAreaDemo,
  search: SearchDemo,
  section: SectionDemo,
  'segmented-control': SegmentedControlDemo,
  'selectable-card': SelectableCardDemo,
  slider: SliderDemo,
  stack: StackDemo,
  'status-dot': StatusDotDemo,
  'tag-input': TagInputDemo,
  text: TextDemo,
  'time-picker': TimePickerDemo,
  timestamp: TimestampDemo,
  'toggle-button': ToggleButtonDemo,
  'visually-hidden': VisuallyHiddenDemo,
}

/** Smaller cards for the Components overview where the page's render is too tall. */
export const PRIMITIVE_PREVIEWS: Record<string, () => React.ReactNode> = {
  // Six boxes don't fit a card three a row; the page shows six.
  'otp-input': () => <OtpInput label="Verification code" length={4} hint="We sent 4 digits." />,
}
