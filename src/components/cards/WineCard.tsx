import { Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { CompletedTasting } from '../../types/tasting'
import StarRating from '../primitives/StarRating'

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

export default function WineCard({ tasting }: WineCardProps) {
  const navigate = useNavigate()
  const dotColor = getColorDot(tasting.color, tasting.wineType)

  const hasReveal = !!(tasting.wineName || tasting.wineGrape || tasting.producer || tasting.vintage || tasting.wineCountry || tasting.wineRegion)

  const wineInfoParts = [
    tasting.wineGrape,
    tasting.wineCountry,
    tasting.wineRegion,
  ].filter(Boolean).join(' · ')

  const guessItems = [
    { value: tasting.grapeGuess, actual: tasting.wineGrape },
    { value: tasting.countryGuess, actual: tasting.wineCountry },
    { value: tasting.regionGuess, actual: tasting.wineRegion },
  ].filter((item): item is { value: string; actual: string | undefined } => !!item.value)

  const hasGuess = guessItems.length > 0

  return (
    <button
      onClick={() => navigate(`/tasting/${tasting.id}`)}
      className="w-full text-left rounded-card bg-cream-dark px-4 py-4 flex items-start gap-4 hover:bg-cream-deeper active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      style={{ boxShadow: 'var(--shadow-vino)' }}
    >
      {/* Color dot / label photo */}
      {tasting.labelPhotoUrl ? (
        <img
          src={tasting.labelPhotoUrl}
          alt="Etiket"
          className="w-10 h-10 rounded-full flex-shrink-0 object-cover mt-0.5"
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 mt-0.5"
          style={{ backgroundColor: dotColor, boxShadow: `0 0 0 3px rgba(${dotColor}, 0.15)` }}
        />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Wine info */}
        {hasReveal ? (
          <div className="mb-1.5">
            <p className="font-display text-vino-md text-charcoal font-semibold truncate">
              {tasting.wineName || tasting.wineGrape || 'Ukendt vin'}
            </p>
            {(tasting.producer || wineInfoParts) && (
              <p className="text-vino-sm text-charcoal-mid font-body mt-0.5 truncate">
                {[tasting.producer, wineInfoParts].filter(Boolean).join(' · ')}
              </p>
            )}
            {tasting.vintage && (
              <p className="text-vino-xs text-charcoal-soft font-body mt-0.5">{tasting.vintage}</p>
            )}
          </div>
        ) : (
          <p className="font-display text-vino-md text-charcoal font-semibold truncate mb-1.5">
            Blind smagning
          </p>
        )}

        {/* Guess section (blind) */}
        {hasGuess && (
          <div className={hasReveal ? 'border-t border-cream-deeper pt-1.5 mt-1.5' : ''}>
            {hasReveal && (
              <p className="text-vino-xs font-body font-semibold uppercase tracking-wider text-charcoal-soft mb-0.5">
                Gæt
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-1">
              {guessItems.map(({ value, actual }, i) => {
                const match = hasReveal && actual
                  ? value.toLowerCase().trim() === actual.toLowerCase().trim()
                  : null
                return (
                  <span key={i} className="flex items-center gap-0.5">
                    {i > 0 && <span className="text-charcoal-soft text-vino-xs mx-0.5">·</span>}
                    <span className={`text-vino-sm font-body ${match === true ? 'text-sage' : match === false ? 'text-wine-red' : 'text-charcoal-mid'}`}>
                      {value}
                    </span>
                    {match === true && <Check size={11} className="text-sage" strokeWidth={3} />}
                    {match === false && <X size={11} className="text-wine-red" strokeWidth={3} />}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-vino-xs text-charcoal-soft font-body mt-1.5">
          {formatDate(tasting.createdAt)}
        </p>
      </div>

      {/* Score */}
      {tasting.score != null && (
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <span className="font-display text-vino-base font-semibold text-wine-red leading-none">
            {tasting.score.toFixed(1)}
          </span>
          <StarRating score={tasting.score} size={10} />
        </div>
      )}
    </button>
  )
}
