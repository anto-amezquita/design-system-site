'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CopyIcon, FileCssIcon, FileTsxIcon, FolderIcon, LinkSimpleIcon, TextBIcon, TextItalicIcon,
  TextUnderlineIcon,
} from '@phosphor-icons/react'
import { Avatar } from '@amezquita/design-system/components/primitives/Avatar'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { IconButton } from '@amezquita/design-system/components/primitives/IconButton'
import { Input } from '@amezquita/design-system/components/primitives/Input'
import { Text } from '@amezquita/design-system/components/primitives/Text'
import { ToggleButton } from '@amezquita/design-system/components/primitives/ToggleButton'
import { Carousel, CarouselSlide } from '@amezquita/design-system/components/patterns/Carousel'
import { Chart } from '@amezquita/design-system/components/patterns/Chart'
import { ChatComposer } from '@amezquita/design-system/components/patterns/ChatComposer'
import { ChatMessage } from '@amezquita/design-system/components/patterns/ChatMessage'
import { FormActions, FormLayout, FormRow, FormSection } from '@amezquita/design-system/components/patterns/FormLayout'
import { Markdown } from '@amezquita/design-system/components/patterns/Markdown'
import { MessageList } from '@amezquita/design-system/components/patterns/MessageList'
import { PromptForm } from '@amezquita/design-system/components/patterns/PromptForm'
import { ResizablePanels } from '@amezquita/design-system/components/patterns/ResizablePanels'
import { Stepper } from '@amezquita/design-system/components/patterns/Stepper'
import { TableOfContents } from '@amezquita/design-system/components/patterns/TableOfContents'
import { ToolCall, type ToolCallStatus } from '@amezquita/design-system/components/patterns/ToolCall'
import { Toolbar, ToolbarSeparator } from '@amezquita/design-system/components/patterns/Toolbar'
import { TopNav } from '@amezquita/design-system/components/patterns/TopNav'
import { TreeView, type TreeNode } from '@amezquita/design-system/components/patterns/TreeView'
import { PHOTOS, Stack } from './shared'

/** A whole-page example in an iframe: see app/(frame). */
function Frame({ src, title, short = false }: { src: string; title: string; short?: boolean }) {
  return <iframe src={src} title={title} className={short ? 'demo-frame demo-frame--short' : 'demo-frame'} />
}

const me = <Avatar alt="Antonio Amézquita" fallback="AA" size="sm" />
const ai = <Avatar alt="Assistant" fallback="AI" size="sm" />

function AppShellDemo() {
  return <Frame src="/frame/app-shell" title="AppShell example: a header, main content, a footer and a bottom bar" />
}

function CarouselDemo() {
  return (
    <div className="demo-full">
      <Carousel label="Brand photos">
        {PHOTOS.map(p => (
          <CarouselSlide key={p.src}>
            <img src={p.src} alt={p.alt} className="demo-photo" />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  )
}

const signups = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2026, i, 1),
  web: 1200 + i * 90 + (i % 3) * 140,
  ios: 800 + i * 60 - (i % 4) * 70,
  android: 600 + i * 110,
}))

function ChartDemo() {
  return (
    <div className="demo-full">
      <Chart
        type="line"
        title="Monthly signups, 2026"
        description="Web leads every month; Android grows fastest."
        data={signups}
        x="month"
        xLabel="Month"
        locale="en-GB"
        series={[{ key: 'web', label: 'Web' }, { key: 'ios', label: 'iOS' }, { key: 'android', label: 'Android' }]}
      />
    </div>
  )
}

function ChartPreview() {
  return (
    <div className="demo-full">
      <Chart
        type="bar"
        title="Components per tier"
        data={[{ tier: 'Primitives', n: 56 }, { tier: 'Composition', n: 15 }, { tier: 'Patterns', n: 26 }]}
        x="tier"
        series={[{ key: 'n', label: 'Components' }]}
        height={160}
      />
    </div>
  )
}

function ChatComposerDemo() {
  const [sent, setSent] = useState<string[]>([])
  return (
    <div className="demo-full">
      <Stack>
        {sent.length > 0 && <Text size="small" tone="secondary">Sent: {sent[sent.length - 1]}</Text>}
        <ChatComposer placeholder="Ask about tokens, components or themes" onSubmit={m => setSent(s => [...s, m])} />
      </Stack>
    </div>
  )
}

function ChatMessageDemo() {
  return (
    <div className="demo-full">
      <Stack>
        <ChatMessage role="user" author="Antonio" avatar={me} timestamp={new Date(2026, 9, 20, 14, 1)}>
          Why does a brand only override some tokens?
        </ChatMessage>
        <ChatMessage
          role="assistant"
          author="Assistant"
          avatar={ai}
          timestamp={new Date(2026, 9, 20, 14, 2)}
          actions={<IconButton icon={<CopyIcon />} label="Copy" size="sm" />}
        >
          Because a brand is a thin skin on base: it changes only the roles that make it look like itself.
        </ChatMessage>
      </Stack>
    </div>
  )
}

function FormLayoutDemo() {
  return (
    <div className="demo-full">
      <FormLayout onSubmit={e => e.preventDefault()}>
        <FormSection title="Contact details" headingLevel={3}>
          <FormRow>
            <Input label="First name" autoComplete="given-name" />
            <Input label="Last name" autoComplete="family-name" />
          </FormRow>
          <Input label="Email" type="email" autoComplete="email" />
        </FormSection>
        <FormActions>
          <Button variant="secondary">Back</Button>
          <Button type="submit">Continue</Button>
        </FormActions>
      </FormLayout>
    </div>
  )
}

const notes = `## Release 1.6.0

Seven new components and **square checkboxes** in round brands.

- Chart, TreeView and ToolCall
- A chat set: ChatMessage, MessageList, ChatComposer, PromptForm

\`npm install @amezquita/design-system@1.6.0\``

function MarkdownDemo() {
  return <div className="demo-full"><Markdown headingOffset={1}>{notes}</Markdown></div>
}

type Msg = { id: number; role: 'user' | 'assistant'; text: string; streaming?: boolean }

const history: Msg[] = [
  { id: 1, role: 'user', text: 'Why does a brand only override some tokens?' },
  { id: 2, role: 'assistant', text: 'Because a brand is a **thin skin** on base: base defines every role, and a brand changes only the few that make it look like itself.' },
  { id: 3, role: 'user', text: 'When should I add a component token?' },
  { id: 4, role: 'assistant', text: 'When a component needs a value no semantic role gives it. If it would only pass a role through, use the role.' },
]

const reply = 'Start from **base**, list the roles your brand needs to change, and override only those. Everything else comes through unchanged, so a new component works in your brand the day it ships.'

function MessageListDemo() {
  const [list, setList] = useState(history)
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  useEffect(() => () => clearInterval(timer.current), [])
  const streaming = list.some(m => m.streaming)

  const send = (text: string) => {
    const id = Date.now()
    setList(l => [...l, { id: id - 1, role: 'user', text }, { id, role: 'assistant', text: '', streaming: true }])
    const words = reply.split(' ')
    let n = 0
    timer.current = setInterval(() => {
      n++
      const done = n >= words.length
      setList(l => l.map(m => (m.id === id ? { ...m, text: words.slice(0, n).join(' '), streaming: !done } : m)))
      if (done) clearInterval(timer.current)
    }, 60)
  }
  const stop = () => {
    clearInterval(timer.current)
    setList(l => l.map(m => (m.streaming ? { ...m, streaming: false } : m)))
  }

  return (
    <div className="demo-chat">
      <MessageList label="Conversation with Assistant">
        {list.map((m, i) => (
          <ChatMessage
            key={m.id}
            role={m.role}
            author={m.role === 'user' ? 'Antonio' : 'Assistant'}
            avatar={m.role === 'user' ? me : ai}
            status={m.streaming ? 'streaming' : 'complete'}
            continued={i > 0 && list[i - 1].role === m.role}
          >
            {m.role === 'assistant' && m.text ? <Markdown>{m.text}</Markdown> : m.text || undefined}
          </ChatMessage>
        ))}
      </MessageList>
      <ChatComposer placeholder="Ask a follow-up" onSubmit={send} status={streaming ? 'streaming' : 'idle'} onStop={stop} hint={null} />
    </div>
  )
}

function MessageListPreview() {
  return (
    <div className="demo-full demo-chat demo-chat--short">
      <MessageList label="Conversation with Assistant" announce={false}>
        <ChatMessage role="user" author="Antonio" avatar={me}>When should I add a component token?</ChatMessage>
        <ChatMessage role="assistant" author="Assistant" avatar={ai} status="streaming">When a component needs a value no role gives it</ChatMessage>
      </MessageList>
    </div>
  )
}

function MobileNavDemo() {
  return <Frame src="/frame/mobile-nav" title="MobileNav example: a bar of four places at the bottom of the screen" short />
}

function PromptFormDemo() {
  return (
    <div className="demo-full">
      <PromptForm
        title="Two questions before I set it up"
        onSubmit={() => {}}
        onSkip={() => {}}
        questions={[
          {
            id: 'framework',
            question: 'Which framework is the app in?',
            options: [
              { value: 'next', label: 'Next.js', description: 'App Router' },
              { value: 'vite', label: 'Vite', description: 'A single-page app' },
            ],
          },
          {
            id: 'brands',
            question: 'Which brands should it support?',
            multiple: true,
            allowOther: false,
            options: [{ value: 'base', label: 'Base' }, { value: 'warm', label: 'Demo warm' }],
          },
        ]}
      />
    </div>
  )
}

function PromptFormPreview() {
  return (
    <div className="demo-full">
      <PromptForm
        title="Before I start"
        onSubmit={() => {}}
        answers={{ framework: ['next'] }}
        questions={[{ id: 'framework', question: 'Which framework is the app in?', options: [{ value: 'next', label: 'Next.js' }] }]}
      />
    </div>
  )
}

function ResizablePanelsDemo() {
  return (
    <div className="demo-full demo-panels">
      <ResizablePanels label="Resize the sidebar" defaultSize={35} minSize={20} maxSize={70}>
        <div className="demo-pane"><Text weight="label">Files</Text></div>
        <div className="demo-pane"><Text tone="secondary">Drag the handle, or focus it and use the arrow keys.</Text></div>
      </ResizablePanels>
    </div>
  )
}

const checkout = [
  { id: 'cart', label: 'Basket' },
  { id: 'address', label: 'Address' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'pay', label: 'Payment' },
]

function StepperPreview() {
  return <Stepper steps={checkout} current={1} orientation="vertical" aria-label="Checkout progress" />
}

function TableOfContentsPreview() {
  return <TableOfContents items={tocItems} activeId="toc-tokens" aria-label="Example article contents" />
}

function StepperDemo() {
  const steps = checkout
  const [current, setCurrent] = useState(1)
  return (
    <div className="demo-full">
      <Stack>
        <div className="demo-full">
          <Stepper steps={steps} current={current} onStepClick={setCurrent} aria-label="Checkout progress" />
        </div>
        <Stack row>
          <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>Back</Button>
          <Button disabled={current === steps.length} onClick={() => setCurrent(c => c + 1)}>Continue</Button>
        </Stack>
      </Stack>
    </div>
  )
}

const tocItems = [
  { id: 'toc-intro', label: 'Introduction' },
  { id: 'toc-tokens', label: 'Tokens', children: [{ id: 'toc-semantic', label: 'Semantic roles' }] },
  { id: 'toc-brands', label: 'Brands' },
]

function TableOfContentsDemo() {
  const [root, setRoot] = useState<HTMLElement | null>(null)
  return (
    <div className="demo-full demo-toc">
      <div ref={setRoot} className="demo-toc__article" tabIndex={0} role="region" aria-label="Example article">
        {tocItems.flatMap(i => [i, ...(i.children ?? [])]).map(i => (
          <section key={i.id}>
            <Heading level={5} as="h3" id={i.id}>{i.label}</Heading>
            <Text tone="secondary">Scroll this article: the contents beside it follow the section you're reading.</Text>
            <Text tone="secondary">A second paragraph, so each section takes some room.</Text>
          </section>
        ))}
      </div>
      <TableOfContents items={tocItems} root={root} offset={8} aria-label="Example article contents" />
    </div>
  )
}

function ToolbarDemo() {
  return (
    <Toolbar aria-label="Text formatting">
      <ToggleButton size="sm" icon={<TextBIcon />} label="Bold" hideLabel />
      <ToggleButton size="sm" icon={<TextItalicIcon />} label="Italic" hideLabel />
      <ToggleButton size="sm" icon={<TextUnderlineIcon />} label="Underline" hideLabel />
      <ToolbarSeparator />
      <IconButton size="sm" icon={<LinkSimpleIcon />} label="Insert link" />
    </Toolbar>
  )
}

function ToolCallDemo() {
  const [status, setStatus] = useState<ToolCallStatus>('awaiting-approval')
  return (
    <div className="demo-full">
      <Stack>
        <ToolCall name="search_tokens" title="Search the tokens for “radius”" status="success" durationMs={820} input={{ query: 'radius' }} output={{ results: ['--border-radius-component', '--border-radius-interactive'] }} />
        <ToolCall
          name="write_file"
          title="Write tokens/brands/acme.json"
          status={status}
          durationMs={status === 'success' ? 140 : undefined}
          input={{ path: 'tokens/brands/acme.json' }}
          onApprove={() => setStatus('success')}
          onDeny={() => setStatus('denied')}
        />
      </Stack>
    </div>
  )
}

function TopNavDemo() {
  return <Frame src="/frame/top-nav" title="TopNav example: a brand, three links and, when narrow, a menu" short />
}

const files: TreeNode[] = [
  {
    id: 'components',
    label: 'components',
    icon: <FolderIcon />,
    children: [
      { id: 'button', label: 'Button', icon: <FolderIcon />, children: [
        { id: 'button-tsx', label: 'Button.tsx', icon: <FileTsxIcon /> },
        { id: 'button-css', label: 'Button.css', icon: <FileCssIcon /> },
      ] },
      { id: 'card', label: 'Card', icon: <FolderIcon />, children: [{ id: 'card-tsx', label: 'Card.tsx', icon: <FileTsxIcon /> }] },
    ],
  },
  { id: 'tokens', label: 'tokens', icon: <FolderIcon />, children: [] },
]

function TreeViewDemo() {
  return (
    <div className="demo-narrow">
      <TreeView aria-label="Files" items={files} selectionMode="single" defaultSelected={['button-tsx']} defaultExpanded={['components', 'button']} />
    </div>
  )
}

export const PATTERN_DEMOS: Record<string, () => React.ReactNode> = {
  'app-shell': AppShellDemo,
  carousel: CarouselDemo,
  chart: ChartDemo,
  'chat-composer': ChatComposerDemo,
  'chat-message': ChatMessageDemo,
  'form-layout': FormLayoutDemo,
  markdown: MarkdownDemo,
  'message-list': MessageListDemo,
  'mobile-nav': MobileNavDemo,
  'prompt-form': PromptFormDemo,
  'resizable-panels': ResizablePanelsDemo,
  stepper: StepperDemo,
  'table-of-contents': TableOfContentsDemo,
  toolbar: ToolbarDemo,
  'tool-call': ToolCallDemo,
  'top-nav': TopNavDemo,
  'tree-view': TreeViewDemo,
}

/** Smaller cards for the Components overview where the page's render is too tall. */
export const PATTERN_PREVIEWS: Record<string, () => React.ReactNode> = {
  chart: ChartPreview,
  'message-list': MessageListPreview,
  'prompt-form': PromptFormPreview,
  stepper: StepperPreview,
  'table-of-contents': TableOfContentsPreview,
}

