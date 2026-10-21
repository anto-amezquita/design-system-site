'use client'

import { useEffect } from 'react'

/**
 * Keeps a framed example in the brand and mode of the page around it. The
 * frame is same-origin, so it reads the parent's `data-brand` and
 * `data-mode` and follows every change to them, however the reader makes it
 * (the brand picker, the mode toggle, the system setting).
 */
export function FrameSync() {
  useEffect(() => {
    if (window.parent === window) return
    let parentRoot: HTMLElement
    try {
      parentRoot = window.parent.document.documentElement
    } catch {
      return // not same-origin after all: keep the frame's own settings
    }
    const root = document.documentElement
    const copy = () => {
      if (parentRoot.dataset.brand) root.dataset.brand = parentRoot.dataset.brand
      if (parentRoot.dataset.mode) root.dataset.mode = parentRoot.dataset.mode
    }
    copy()
    const observer = new MutationObserver(copy)
    observer.observe(parentRoot, { attributes: true, attributeFilter: ['data-brand', 'data-mode'] })
    return () => observer.disconnect()
  }, [])
  return null
}
