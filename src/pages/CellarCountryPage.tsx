import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import WineCard from '../components/cards/WineCard'
import type { CompletedTasting } from '../types/tasting'

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
                <p className="text-vino-sm text-charcoal-mid font-body font-medium mb-2 pl-1">{region}</p>
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
