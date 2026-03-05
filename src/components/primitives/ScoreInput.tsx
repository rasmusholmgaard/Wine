import { useRef } from 'react'
import StarRating from './StarRating'

const MIN = 1.0
const MAX = 5.0
const TRACK_HEIGHT = 220

interface ScoreInputProps {
  value: number | null
  onChange: (v: number | null) => void
}

export default function ScoreInput({ value, onChange }: ScoreInputProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const fillPct = value != null ? ((value - MIN) / (MAX - MIN)) * 100 : 0

  function positionToScore(clientY: number): number {
    const rect = trackRef.current!.getBoundingClientRect()
    const pct = 1 - (clientY - rect.top) / rect.height // top = high score
    const raw = MIN + Math.max(0, Math.min(1, pct)) * (MAX - MIN)
    return Math.round(raw * 10) / 10
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    onChange(positionToScore(e.clientY))
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.buttons === 0) return
    onChange(positionToScore(e.clientY))
  }

  return (
    <div className="flex flex-col items-center gap-6 select-none touch-none">
      {/* Score display */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-vino-3xl font-semibold text-wine-red leading-none">
          {value != null ? value.toFixed(1) : '—'}
        </span>
        {value != null ? (
          <StarRating score={value} size={20} />
        ) : (
          <span className="text-vino-sm text-charcoal-soft font-body">Træk for at bedømme</span>
        )}
      </div>

      {/* Slider */}
      <div className="flex items-stretch gap-4">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative w-12 cursor-pointer"
          style={{ height: TRACK_HEIGHT }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
        >
          {/* Track background */}
          <div
            className="absolute bottom-0 top-0 mx-auto rounded-full"
            style={{ left: '50%', transform: 'translateX(-50%)', width: 8, background: 'var(--cream-deeper)' }}
          />
          {/* Track fill */}
          {value != null && (
            <div
              className="absolute bottom-0 mx-auto rounded-full"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: 8,
                height: `${fillPct}%`,
                background: 'var(--sage)',
              }}
            />
          )}
          {/* Tick marks at each star position */}
          {[1, 2, 3, 4, 5].map((star) => {
            const pct = ((star - MIN) / (MAX - MIN)) * 100
            return (
              <div
                key={star}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: `${pct}%`,
                  marginBottom: -1,
                  width: 14,
                  height: 2,
                  background: 'var(--cream-deeper)',
                  opacity: 0.8,
                  zIndex: 1,
                }}
              />
            )
          })}
          {/* Thumb */}
          {value != null && (
            <div
              className="absolute rounded-full bg-cream"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: `calc(${fillPct}% - 14px)`,
                width: 28,
                height: 28,
                boxShadow: '0 2px 8px rgba(0,0,0,0.18), 0 0 0 2px var(--sage)',
                zIndex: 2,
              }}
            />
          )}
        </div>

        {/* Star labels */}
        <div className="relative" style={{ height: TRACK_HEIGHT }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const pct = ((star - MIN) / (MAX - MIN)) * 100
            return (
              <div
                key={star}
                className="absolute flex items-center text-vino-xs text-charcoal-soft font-body"
                style={{ bottom: `${pct}%`, transform: 'translateY(50%)' }}
              >
                {star}★
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
