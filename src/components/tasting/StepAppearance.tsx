import type { TastingNote } from '../../types/tasting'
import ChipButton from '../primitives/ChipButton'
import SegmentedControl from '../primitives/SegmentedControl'
import {
  WINE_COLOR_WHITE_OPTIONS,
  WINE_COLOR_RED_OPTIONS,
  WINE_COLOR_ROSE_OPTIONS,
  RIM_WHITE_OPTIONS,
  RIM_RED_OPTIONS,
  RIM_ROSE_OPTIONS,
} from '../../data/aromaOptions'

interface StepAppearanceProps {
  fieldKey: keyof TastingNote
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
}

const CLARITY_OPTIONS = ['Klar', 'Lidt uklar', 'Uklar']
const CONCENTRATION_OPTIONS = ['Bleg', 'Medium', 'Dyb', 'Uigennemsigtig']
const VISCOSITY_OPTIONS = ['Lav', 'Medium', 'Høj']
const YESNO = ['Ja', 'Nej']
const WINE_TYPE_OPTIONS = ['Rød', 'Hvid', 'Rosé']

export function getAppearanceTitle(fieldKey: keyof TastingNote): string {
  const titles: Partial<Record<keyof TastingNote, string>> = {
    wineType: 'Hvilken type vin er det?',
    clarity: 'Hvordan er vinen i klarhed?',
    concentration: 'Hvad er farvekoncentrationen?',
    co2: 'Er der CO₂ tilstede?',
    sediment: 'Er der sedimenter?',
    color: 'Hvad er farven?',
    rim: 'Hvad er kantskæret?',
    viscosity: 'Hvad er viskositeten?',
  }
  return titles[fieldKey] ?? String(fieldKey)
}

export default function StepAppearance({ fieldKey, data, setField }: StepAppearanceProps) {
  const colorOptions =
    data.wineType === 'white'
      ? WINE_COLOR_WHITE_OPTIONS
      : data.wineType === 'rosé'
      ? WINE_COLOR_ROSE_OPTIONS
      : WINE_COLOR_RED_OPTIONS

  const rimOptions =
    data.wineType === 'white'
      ? RIM_WHITE_OPTIONS
      : data.wineType === 'rosé'
      ? RIM_ROSE_OPTIONS
      : RIM_RED_OPTIONS

  // Map Danish display values back to internal values for wineType
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

  switch (fieldKey) {
    case 'wineType':
      return (
        <div className="flex flex-col gap-3">
          {WINE_TYPE_OPTIONS.map((opt) => (
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

    case 'clarity':
      return <SegmentedControl options={CLARITY_OPTIONS} value={data.clarity || null} onChange={(v) => setField('clarity', v)} />

    case 'concentration':
      return <SegmentedControl options={CONCENTRATION_OPTIONS} value={data.concentration || null} onChange={(v) => setField('concentration', v)} />

    case 'co2':
      return (
        <div className="flex gap-3">
          {YESNO.map((opt) => (
            <div key={opt} className="flex-1">
              <ChipButton label={opt} selected={data.co2 === opt} onClick={() => setField('co2', opt)} size="md" />
            </div>
          ))}
        </div>
      )

    case 'sediment':
      return (
        <div className="flex gap-3">
          {YESNO.map((opt) => (
            <div key={opt} className="flex-1">
              <ChipButton label={opt} selected={data.sediment === opt} onClick={() => setField('sediment', opt)} size="md" />
            </div>
          ))}
        </div>
      )

    case 'color':
      return (
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((opt) => (
            <ChipButton key={opt} label={opt} selected={data.color === opt} onClick={() => setField('color', opt)} size="md" />
          ))}
        </div>
      )

    case 'rim':
      return (
        <div className="flex flex-wrap gap-3">
          {rimOptions.map((opt) => (
            <ChipButton key={opt} label={opt} selected={data.rim === opt} onClick={() => setField('rim', opt)} size="md" />
          ))}
        </div>
      )

    case 'viscosity':
      return <SegmentedControl options={VISCOSITY_OPTIONS} value={data.viscosity || null} onChange={(v) => setField('viscosity', v)} />

    default:
      return null
  }
}
