'use client'

import { useEffect, useState } from 'react'
import { Button } from '@amezquita/design-system/components/primitives/Button'

type CopyButtonProps = {
  text: string
  /** Accessible name, e.g. "Copy prompt". The visible label stays short. */
  label?: string
  children?: string
  variant?: 'ghost' | 'secondary' | 'primary'
}

export function CopyButton({ text, label = 'Copy', children = 'Copy', variant = 'ghost' }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const id = setTimeout(() => setStatus('idle'), 2000)
    return () => clearTimeout(id)
  }, [status])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <>
      <Button variant={variant} onClick={copy} aria-label={label} className="copy-button">
        {status === 'copied' ? 'Copied' : children}
      </Button>
      <span className="visually-hidden" role="status">
        {status === 'copied' ? 'Copied to clipboard' : status === 'failed' ? 'Couldn’t copy. Select the text and copy it instead.' : ''}
      </span>
    </>
  )
}
