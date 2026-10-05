'use client'

import { useId, useState } from 'react'
import { Avatar } from '@amezquita/design-system/components/primitives/Avatar'
import { Badge } from '@amezquita/design-system/components/primitives/Badge'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Input } from '@amezquita/design-system/components/primitives/Input'
import { Select } from '@amezquita/design-system/components/primitives/Select'
import { Switch } from '@amezquita/design-system/components/primitives/Switch'
import { Alert } from '@amezquita/design-system/components/composition/Alert'
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from '@amezquita/design-system/components/composition/Card'
import { Menu } from '@amezquita/design-system/components/composition/Menu'
import { Breadcrumb } from '@amezquita/design-system/components/patterns/Breadcrumb'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amezquita/design-system/components/patterns/Table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'

const MEMBERS = [
  { initials: 'AA', name: 'Anna Andersen', role: 'Owner', status: 'Active' },
  { initials: 'MK', name: 'Mads Kjær', role: 'Editor', status: 'Active' },
  { initials: 'SL', name: 'Sofie Lund', role: 'Viewer', status: 'Invited' },
] as const

/**
 * One working screen built only from the package: a project settings page
 * with a form, a members table and feedback. The landing page shows it in
 * base; the Themes frames show the same screen per theme, so the only thing
 * that changes between them is the CSS the page loads.
 */
export function SampleScreen() {
  const id = useId()
  const [saved, setSaved] = useState(false)

  return (
    <div className="sample">
      <Breadcrumb items={[{ label: 'Projects', href: '#projects' }, { label: 'Ajar', href: '#ajar' }, { label: 'Settings' }]} />
      <div className="sample__head">
        <Heading level={4} as="h2">Project settings</Heading>
        <Menu
          aria-label="Project actions"
          trigger={<Button variant="secondary">More</Button>}
          groups={[
            { items: [{ id: 'export', label: 'Export tokens', onSelect: () => {} }, { id: 'duplicate', label: 'Duplicate project', onSelect: () => {} }] },
            { items: [{ id: 'archive', label: 'Archive project', variant: 'destructive', onSelect: () => {} }] },
          ]}
        />
      </div>

      <Tabs defaultValue="general">
        <TabsList aria-label="Settings sections">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="sample__stack">
            {saved && (
              <Alert variant="success" title="Settings saved" dismissible onDismiss={() => setSaved(false)}>
                Everyone on the project sees the new name straight away.
              </Alert>
            )}
            <Card>
              <CardHeader>
                <CardTitle as="h3">Details</CardTitle>
                <CardDescription>How the project shows up for your team.</CardDescription>
              </CardHeader>
              <CardBody>
                <div className="sample__form">
                  <Input id={`${id}-name`} label="Project name" defaultValue="Ajar" />
                  <div className="sample__field">
                    {/* Select takes its name from aria-label; this is the visible twin. */}
                    <span className="sample__label" aria-hidden="true">Theme</span>
                    <Select
                      aria-label="Theme"
                      defaultValue="base"
                      groups={[{ options: [{ value: 'base', label: 'Base' }, { value: 'portfolio', label: 'Portfolio' }] }]}
                    />
                  </div>
                  <Switch id={`${id}-notify`} label="Email me when a release lands" defaultChecked />
                </div>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setSaved(true)}>Save changes</Button>
                <Button variant="ghost">Cancel</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <Table compact scrollLabel="Project members">
            <TableHead>
              <TableRow>
                <TableHeader scope="col">Name</TableHeader>
                <TableHeader scope="col">Role</TableHeader>
                <TableHeader scope="col">Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {MEMBERS.map(m => (
                <TableRow key={m.name}>
                  <TableCell>
                    <span className="sample__member">
                      <Avatar fallback={m.initials} alt="" size="sm" />
                      {m.name}
                    </span>
                  </TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell>
                    <Badge variant={m.status === 'Active' ? 'success' : 'warning'} shape="status">{m.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}
