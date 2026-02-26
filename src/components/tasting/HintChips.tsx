import { Sparkles } from 'lucide-react'
import ChipButton from '../primitives/ChipButton'
import { useHints } from '../../hooks/useHints'
import { useTasting } from '../../context/TastingContext'

export default function HintChips() {
  const hints = useHints()
  const { setField } = useTasting()

  if (hints.length === 0) return null

  function applyHint(_label: string, grape?: string, country?: string, region?: string) {
    if (grape) setField('grapeGuess', grape)
    if (country) setField('countryGuess', country)
    if (region) setField('regionGuess', region)
  }

  return (
    <div className="rounded-card bg-wine-blush/8 border border-wine-blush/25 p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles size={13} className="text-wine-blush" strokeWidth={2} />
        <span className="text-vino-xs font-body font-medium text-wine-red uppercase tracking-wide">
          Hints
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {hints.map((hint) => (
          <ChipButton
            key={hint.label}
            label={hint.label}
            selected={false}
            variant="hint"
            size="sm"
            onClick={() => applyHint(hint.label, hint.grape, hint.country, hint.region)}
          />
        ))}
      </div>
    </div>
  )
}
