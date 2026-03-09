import { useState } from 'react'
import { ChevronDown, ChevronRight, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import WineCard from '../components/cards/WineCard'
import type { CompletedTasting } from '../types/tasting'

function avgScore(tastings: CompletedTasting[]): string | null {
  const scores = tastings.map((t) => t.score).filter((s): s is number => s !== null)
  if (scores.length === 0) return null
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
}

function GrapeGroup({ grape, tastings }: { grape: string; tastings: CompletedTasting[] }) {
  const [open, setOpen] = useState(true)
  const avg = avgScore(tastings)

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 focus-visible:outline-none"
      >
        <div className="flex items-center gap-3">
          <h2 className="font-display text-vino-lg text-charcoal font-semibold">{grape}</h2>
          <span className="text-vino-xs text-charcoal-soft font-body bg-cream-dark px-2 py-0.5 rounded-chip">
            {tastings.length}
          </span>
          {avg && (
            <span className="flex items-center gap-0.5 text-vino-xs font-body font-medium text-vino bg-vino/10 px-2 py-0.5 rounded-chip">
              <Star size={10} className="fill-vino text-vino" />
              {avg}
            </span>
          )}
        </div>
        {open ? (
          <ChevronDown size={18} className="text-charcoal-soft" />
        ) : (
          <ChevronRight size={18} className="text-charcoal-soft" />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-2 fade-in">
          {tastings.map((t) => (
            <WineCard key={t.id} tasting={t} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CellarGrapePage() {
  const { tastings } = useApp()

  const byGrape: Record<string, CompletedTasting[]> = {}
  for (const t of tastings) {
    const key = t.grapeGuess || 'Ukendt drue'
    if (!byGrape[key]) byGrape[key] = []
    byGrape[key].push(t)
  }

  const grapes = Object.entries(byGrape).sort((a, b) => b[1].length - a[1].length)

  if (grapes.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <p className="font-display text-vino-lg text-charcoal-mid">Ingen smagninger endnu</p>
      </div>
    )
  }

  return (
    <div className="pb-4">
      {grapes.map(([grape, ts]) => (
        <GrapeGroup key={grape} grape={grape} tastings={ts} />
      ))}
    </div>
  )
}
