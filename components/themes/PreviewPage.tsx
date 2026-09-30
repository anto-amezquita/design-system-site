import { SampleScreen } from '@/components/demos/SampleScreen'
import { DemoProviders } from '@/components/demos/Demo'

export const MODES = ['light', 'dark'] as const
export type Mode = (typeof MODES)[number]

/** The bare document a Themes frame loads: the sample screen, one mode, no site frame. */
export function PreviewPage({ mode, label }: { mode: Mode; label: string }) {
  return (
    <div data-mode={mode} className="preview">
      <main className="preview__main" aria-label={label}>
        <DemoProviders>
          <SampleScreen />
        </DemoProviders>
      </main>
    </div>
  )
}
