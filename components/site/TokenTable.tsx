import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@amezquita/design-system/components/patterns/Table'
import type { Token } from '@/lib/ds'
import { DEMO_BRANDS } from '@/lib/demo-brands'
import { PerBrand } from '@/components/site/PerBrand'

export type TokenPreview = 'color' | 'space' | 'none'

type TokenTableProps = {
  tokens: Token[]
  preview?: TokenPreview
  /** Show which components use each token. */
  showUsedBy?: boolean
  /** Names the table's scroll region and caption. */
  label: string
}

/**
 * A token table in the brand the site wears: light and dark values from the
 * package's token reference, one set per demo brand (PerBrand shows the
 * site's own). When no token in the set changes between light and dark,
 * one Value column replaces the two, rather than repeating every value.
 * Previews are painted from the live CSS variable, not the JSON value, so a
 * mismatch between the reference and the shipped CSS would show.
 */
export function TokenTable({ tokens, preview = 'none', showUsedBy = false, label }: TokenTableProps) {
  const modeAware = tokens.some(t => DEMO_BRANDS.some(b => t.resolved[`${b}-light`] !== t.resolved[`${b}-dark`]))

  return (
    <div className="table-scroll">
      <Table compact scrollLabel={label}>
        <TableHead>
          <TableRow>
            <TableHeader scope="col">Token</TableHeader>
            {preview !== 'none' && <TableHeader scope="col">Preview</TableHeader>}
            {modeAware ? (
              <>
                <TableHeader scope="col">Light</TableHeader>
                <TableHeader scope="col">Dark</TableHeader>
              </>
            ) : (
              <TableHeader scope="col">Value</TableHeader>
            )}
            {showUsedBy && <TableHeader scope="col">Used by</TableHeader>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map(token => (
            <TableRow key={token.name}>
              <TableCell><code>{token.cssVar}</code></TableCell>
              {preview !== 'none' && (
                <TableCell>
                  <Preview token={token} kind={preview} />
                </TableCell>
              )}
              {modeAware ? (
                <>
                  <TableCell><Value token={token} mode="light" /></TableCell>
                  <TableCell><Value token={token} mode="dark" /></TableCell>
                </>
              ) : (
                <TableCell><Value token={token} mode="light" /></TableCell>
              )}
              {showUsedBy && <TableCell><UsedBy names={token.usedBy} /></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Value({ token, mode }: { token: Token; mode: 'light' | 'dark' }) {
  return <PerBrand>{b => <code>{token.resolved[`${b}-${mode}`] ?? '—'}</code>}</PerBrand>
}

const MAX_BAR_PX = 160

function Preview({ token, kind }: { token: Token; kind: TokenPreview }) {
  if (kind === 'color') {
    return (
      <span className="swatch-pair" aria-hidden="true">
        <span data-mode="light" className="swatch" style={{ background: `var(${token.cssVar})` }} />
        <span data-mode="dark" className="swatch" style={{ background: `var(${token.cssVar})` }} />
      </span>
    )
  }
  if (kind === 'space') {
    // A page-width value (the layout max width) would stretch the table; its value column says enough.
    const px = parseFloat(token.resolved[`${DEMO_BRANDS[0]}-light`] ?? '')
    if (token.resolved[`${DEMO_BRANDS[0]}-light`]?.endsWith('px') && px > MAX_BAR_PX) return null
    return <span className="space-bar" aria-hidden="true" style={{ width: `var(${token.cssVar})` }} />
  }
  return null
}

function UsedBy({ names }: { names: string[] }) {
  if (names.length === 0) return <span className="token-muted">—</span>
  const shown = names.slice(0, 4)
  const rest = names.length - shown.length
  return (
    <span className="token-muted">
      {shown.join(', ')}
      {rest > 0 && ` and ${rest} more`}
    </span>
  )
}
