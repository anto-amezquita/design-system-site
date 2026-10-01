'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@amezquita/design-system/components/primitives/Button'

/** `description` is the token's own, from the token reference; null where it has none. */
export type MotionItem = { cssVar: string; value: string; ms: number; description: string | null }

/**
 * Ported from the portfolio's DurationDemo: each duration token drives a bar
 * across its track, and the three easing curves race over the entrance
 * duration. Everything runs on the live CSS variables. With reduced motion
 * on, the bars jump to the end, which is what the components do too.
 */
export function MotionDemo({ durations, easings }: { durations: MotionItem[]; easings: MotionItem[] }) {
  const [playing, setPlaying] = useState<string | null>(null)
  const frame = useRef<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current)
    if (timer.current) clearTimeout(timer.current)
  }, [])

  function play(key: string, ms: number) {
    if (frame.current) cancelAnimationFrame(frame.current)
    if (timer.current) clearTimeout(timer.current)
    setPlaying(null)
    // Two frames: let the reset paint before the transition starts again.
    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame(() => {
        setPlaying(key)
        timer.current = setTimeout(() => setPlaying(null), ms + 600)
      })
    })
  }

  const entranceMs = durations.find(d => d.cssVar === '--duration-entrance')?.ms ?? 600

  return (
    <div className="motion-demo">
      <ul className="motion-demo__list">
        {durations.map(d => (
          <li key={d.cssVar} className="motion-demo__row">
            <div className="motion-demo__meta">
              <code>{d.cssVar}</code>
              <span className="token-muted">{d.description ? `${d.value} · ${d.description}` : d.value}</span>
            </div>
            <div className="motion-demo__track" aria-hidden="true">
              <span
                className={playing === d.cssVar ? 'motion-demo__bar is-playing' : 'motion-demo__bar'}
                style={{ transitionDuration: `var(${d.cssVar})` }}
              />
            </div>
            <Button variant="ghost" onClick={() => play(d.cssVar, d.ms)} aria-label={`Play ${d.cssVar}`}>
              Play
            </Button>
          </li>
        ))}
      </ul>

      <div className="motion-demo__easings">
        <ul className="motion-demo__list">
          {easings.map(e => (
            <li key={e.cssVar} className="motion-demo__row">
              <div className="motion-demo__meta">
                <code>{e.cssVar}</code>
                {e.description && <span className="token-muted">{e.description}</span>}
              </div>
              <div className="motion-demo__track" aria-hidden="true">
                <span
                  className={playing === 'easing' ? 'motion-demo__dot is-playing' : 'motion-demo__dot'}
                  style={{ transitionTimingFunction: `var(${e.cssVar})` }}
                />
              </div>
              <code className="token-muted">{e.value}</code>
            </li>
          ))}
        </ul>
        <Button variant="secondary" onClick={() => play('easing', entranceMs)}>
          Play the easing curves
        </Button>
      </div>
    </div>
  )
}
