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

function ScoreBadge({ tastings }: { tastings: CompletedTasting[] }) {
  const avg = avgScore(tastings)
  if (!avg) return null
  return (
    <span className="flex items-center gap-0.5 text-vino-xs font-body font-medium text-vino bg-vino/10 px-2 py-0.5 rounded-chip">
      <Star size={10} className="fill-vino text-vino" />
      {avg}
    </span>
  )
}

function CountryGroup({ country, tastings }: { country: string; tastings: CompletedTasting[] }) {
  const [open, setOpen] = useState(true)

  // Group by region within country
  const byRegion: Record<string, CompletedTasting[]> = {}
  for (const t of tastings) {
    const key = t.regionGuess || 'Ukendt region'
    if (!byRegion[key]) byRegion[key] = []
    byRegion[key].push(t)
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 focus-visible:outline-none"
      >
        <div className="flex items-center gap-3">
          <h2 className="font-display text-vino-lg text-charcoal font-semibold">{country}</h2>
          <span className="text-vino-xs text-charcoal-soft font-body bg-cream-dark px-2 py-0.5 rounded-chip">
            {tastings.length}
          </span>
          <ScoreBadge tastings={tastings} />
        </div>
        {open ? (
          <ChevronDown size={18} className="text-charcoal-soft" />
        ) : (
          <ChevronRight size={18} className="text-charcoal-soft" />
        )}
      </button>

      {open && (
        <div className="fade-in">
          {Object.entries(byRegion).map(([region, ts]) => (
            <div key={region} className="mb-3">
              {Object.keys(byRegion).length > 1 && (
                <div className="flex items-center gap-2 mb-2 pl-1">
                  <p className="text-vino-sm text-charcoal-mid font-body font-medium">{region}</p>
                  <ScoreBadge tastings={ts} />
                </div>
              )}
              <div className="flex flex-col gap-2">
                {ts.map((t) => (
                  <WineCard key={t.id} tasting={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CellarCountryPage() {
  const { tastings } = useApp()

  const byCountry: Record<string, CompletedTasting[]> = {}
  for (const t of tastings) {
    const key = t.countryGuess || 'Ukendt land'
    if (!byCountry[key]) byCountry[key] = []
    byCountry[key].push(t)
  }

  const countries = Object.entries(byCountry).sort((a, b) => b[1].length - a[1].length)

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <p className="font-display text-vino-lg text-charcoal-mid">Ingen smagninger endnu</p>
      </div>
    )
  }

  return (
    <div className="pb-4">
      {countries.map(([country, ts]) => (
        <CountryGroup key={country} country={country} tastings={ts} />
      ))}
    </div>
  )
}
