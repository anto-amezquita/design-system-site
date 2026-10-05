import { TokenTable, type TokenPreview } from './TokenTable'
import type { TokenGroup } from '@/lib/token-groups'

export function TokenGroups({ groups, preview, showUsedBy }: { groups: TokenGroup[]; preview?: TokenPreview; showUsedBy?: boolean }) {
  return (
    <div className="token-groups">
      {groups.map(group => (
        <div key={group.title} className="token-group">
          <p className="token-group__title">{group.title}</p>
          <p className="token-group__desc">{group.description}</p>
          <TokenTable tokens={group.tokens} preview={preview} showUsedBy={showUsedBy} label={`${group.title} tokens`} />
        </div>
      ))}
    </div>
  )
}
