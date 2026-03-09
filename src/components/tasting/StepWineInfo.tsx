import type { TastingNote } from '../../types/tasting'
import ChipButton from '../primitives/ChipButton'
import TextInput from '../primitives/TextInput'
import PhotoCapture from '../primitives/PhotoCapture'
import { COUNTRIES, REGIONS } from '../../data/regionTaxonomy'

interface StepWineInfoProps {
  fieldKey: keyof TastingNote
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
}

const WINE_TYPES = ['Rød', 'Hvid', 'Rosé']

export function getWineInfoTitle(fieldKey: keyof TastingNote): string {
  const titles: Partial<Record<keyof TastingNote, string>> = {
    wineType: 'Hvilken type vin er det?',
    wineName: 'Hvad hedder vinen?',
    producer: 'Hvem er producenten?',
    vintage: 'Hvad er årgangen?',
    countryGuess: 'Hvilket land er vinen fra?',
    regionGuess: 'Hvilken region?',
    labelPhotoUrl: 'Tag et foto af etiketten',
  }
  return titles[fieldKey] ?? fieldKey
}

export default function StepWineInfo({ fieldKey, data, setField }: StepWineInfoProps) {
  function setWineType(display: string) {
    const map: Record<string, 'red' | 'white' | 'rosé'> = {
      'Rød': 'red', 'Hvid': 'white', 'Rosé': 'rosé',
    }
    setField('wineType', map[display] ?? 'red')
  }

  const wineTypeDisplay =
    data.wineType === 'red' ? 'Rød' :
    data.wineType === 'white' ? 'Hvid' :
    data.wineType === 'rosé' ? 'Rosé' : null

  const regionsForCountry = data.countryGuess && REGIONS[data.countryGuess]
    ? REGIONS[data.countryGuess]
    : []

  switch (fieldKey) {
    case 'wineType':
      return (
        <div className="flex flex-col gap-3">
          {WINE_TYPES.map((opt) => (
            <button
              key={opt}
              onClick={() => setWineType(opt)}
              className={`w-full py-4 rounded-card font-body text-vino-base font-medium transition-[background-color,border-color] duration-200 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                wineTypeDisplay === opt
                  ? 'bg-sage border-sage text-white'
                  : 'bg-cream-dark border-cream-deeper text-charcoal hover:bg-cream-deeper'
              }`}
              style={{ boxShadow: 'var(--shadow-vino)' }}
            >
              {opt === 'Rød' ? '🍷 Rød' : opt === 'Hvid' ? '🥂 Hvid' : '🌸 Rosé'} vin
            </button>
          ))}
        </div>
      )

    case 'wineName':
      return (
        <TextInput
          value={data.wineName ?? ''}
          onChange={(v) => setField('wineName', v)}
          placeholder="F.eks. Château Margaux..."
          autoFocus
        />
      )

    case 'producer':
      return (
        <TextInput
          value={data.producer ?? ''}
          onChange={(v) => setField('producer', v)}
          placeholder="F.eks. Domaine Leflaive..."
          autoFocus
        />
      )

    case 'vintage':
      return (
        <TextInput
          value={data.vintage ?? ''}
          onChange={(v) => setField('vintage', v)}
          placeholder="F.eks. 2019..."
          autoFocus
        />
      )

    case 'countryGuess':
      return (
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <ChipButton key={c} label={c} selected={data.countryGuess === c} onClick={() => setField('countryGuess', c)} size="sm" />
          ))}
        </div>
      )

    case 'regionGuess':
      return (
        <div className="flex flex-col gap-3">
          {regionsForCountry.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {regionsForCountry.map((r) => (
                <ChipButton key={r} label={r} selected={data.regionGuess === r} onClick={() => setField('regionGuess', r)} size="sm" />
              ))}
            </div>
          )}
          <TextInput
            value={data.regionGuess}
            onChange={(v) => setField('regionGuess', v)}
            placeholder={regionsForCountry.length > 0 ? 'Eller skriv fritekst...' : 'Region...'}
          />
        </div>
      )

    case 'labelPhotoUrl':
      return (
        <PhotoCapture
          value={data.labelPhotoUrl ?? ''}
          onChange={(url) => setField('labelPhotoUrl', url)}
        />
      )

    default:
      return null
  }
}
