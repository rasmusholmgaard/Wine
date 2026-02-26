import { useNavigate } from 'react-router-dom'
import type { CompletedTasting } from '../../types/tasting'

interface WineCardProps {
  tasting: CompletedTasting
}

function getColorDot(color: string, wineType: string): string {
  if (wineType === 'white') {
    if (color === 'Rav') return '#C9A84C'
    if (color === 'Gylden') return '#E8C84A'
    return '#F4E06A'
  }
  if (wineType === 'rosé') return '#F4A7B9'
  if (color === 'Granatrød') return '#8B2635'
  if (color === 'Rubin') return '#9B3040'
  return '#B05070'
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getTitle(t: CompletedTasting): string {
  if (t.wineName) return t.wineName
  if (t.grapeGuess) return `${t.grapeGuess}${t.regionGuess ? ` · ${t.regionGuess}` : ''}`
  return `Blind smagning`
}

export default function WineCard({ tasting }: WineCardProps) {
  const navigate = useNavigate()
  const dotColor = getColorDot(tasting.color, tasting.wineType)

  return (
    <button
      onClick={() => navigate(`/tasting/${tasting.id}`)}
      className="w-full text-left rounded-card bg-cream-dark px-4 py-4 flex items-center gap-4 hover:bg-cream-deeper active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      style={{ boxShadow: 'var(--shadow-vino)' }}
    >
      {/* Color dot */}
      <div
        className="w-10 h-10 rounded-full flex-shrink-0"
        style={{ backgroundColor: dotColor, boxShadow: `0 0 0 3px rgba(${dotColor}, 0.15)` }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display text-vino-md text-charcoal font-semibold truncate">
          {getTitle(tasting)}
        </p>
        <p className="text-vino-sm text-charcoal-mid font-body mt-0.5 truncate">
          ● Blind · {tasting.countryGuess || '—'}
          {tasting.producer && ` · ${tasting.producer}`}
        </p>
        <p className="text-vino-xs text-charcoal-soft font-body mt-0.5">
          {formatDate(tasting.createdAt)}
        </p>
      </div>

      {/* Score */}
      {tasting.score != null && (
        <div
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: 'var(--cream-deeper)' }}
        >
          <span className="font-display text-vino-sm font-semibold text-wine-red">
            {tasting.score}
          </span>
        </div>
      )}
    </button>
  )
}
