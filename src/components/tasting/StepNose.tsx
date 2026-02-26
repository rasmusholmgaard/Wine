import type { TastingNote } from '../../types/tasting'
import ChipButton from '../primitives/ChipButton'
import SegmentedControl from '../primitives/SegmentedControl'
import TagChipGroup from '../primitives/TagChipGroup'
import TextInput from '../primitives/TextInput'
import {
  CONDITION_OPTIONS,
  FRUIT_CONDITION_OPTIONS,
  PRIMARY_WHITE_AROMAS,
  PRIMARY_RED_AROMAS,
  SECONDARY_AROMAS,
  TERTIARY_AROMAS,
} from '../../data/aromaOptions'

interface StepNoseProps {
  fieldKey: keyof TastingNote
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
}

const INTENSITY_OPTIONS = ['Delikat', 'Medium', 'Kraftig']
const AGE_OPTIONS = ['Ung', 'Under Udvikling', 'Aldret']

export function getNoseTitle(fieldKey: keyof TastingNote): string {
  const titles: Partial<Record<keyof TastingNote, string>> = {
    condition: 'Er vinen ren? (valgfri)',
    noseIntensity: 'Hvad er næseintensiteten?',
    fruitCondition: 'Hvad er frugtkondition?',
    ageEstimate: 'Hvad er aldersestimatet?',
    primaryAromas: 'Primære aromaer',
    secondaryAromas: 'Sekundære aromaer',
    tertiaryAromas: 'Tertiære aromaer',
  }
  return titles[fieldKey] ?? String(fieldKey)
}

export default function StepNose({ fieldKey, data, setField }: StepNoseProps) {
  const primaryOptions = (data.wineType === 'white') ? PRIMARY_WHITE_AROMAS : PRIMARY_RED_AROMAS

  switch (fieldKey) {
    case 'condition':
      return (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {CONDITION_OPTIONS.map((opt) => (
              <ChipButton key={opt} label={opt} selected={data.condition === opt} onClick={() => setField('condition', opt)} />
            ))}
          </div>
          <p className="text-vino-xs text-charcoal-soft font-body">
            De fleste vine er rene — spring over hvis du er i tvivl.
          </p>
        </div>
      )

    case 'noseIntensity':
      return <SegmentedControl options={INTENSITY_OPTIONS} value={data.noseIntensity || null} onChange={(v) => setField('noseIntensity', v)} />

    case 'fruitCondition':
      return (
        <div className="flex flex-wrap gap-2">
          {FRUIT_CONDITION_OPTIONS.map((opt) => (
            <ChipButton key={opt} label={opt} selected={data.fruitCondition === opt} onClick={() => setField('fruitCondition', opt)} />
          ))}
        </div>
      )

    case 'ageEstimate':
      return (
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map((opt) => (
            <ChipButton key={opt} label={opt} selected={data.ageEstimate === opt} onClick={() => setField('ageEstimate', opt)} />
          ))}
        </div>
      )

    case 'primaryAromas':
      return (
        <div className="flex flex-col gap-3">
          <TagChipGroup
            options={primaryOptions}
            selected={data.primaryAromas}
            onChange={(v) => setField('primaryAromas', v)}
          />
          <TextInput
            value={data.primaryAromasCustom ?? ''}
            onChange={(v) => setField('primaryAromasCustom', v)}
            placeholder="Tilføj egne noter..."
          />
        </div>
      )

    case 'secondaryAromas':
      return (
        <div className="flex flex-col gap-3">
          <TagChipGroup
            options={SECONDARY_AROMAS}
            selected={data.secondaryAromas}
            onChange={(v) => setField('secondaryAromas', v)}
          />
          <TextInput
            value={data.secondaryAromasCustom ?? ''}
            onChange={(v) => setField('secondaryAromasCustom', v)}
            placeholder="Tilføj egne noter..."
          />
        </div>
      )

    case 'tertiaryAromas':
      return (
        <div className="flex flex-col gap-3">
          <TagChipGroup
            options={TERTIARY_AROMAS}
            selected={data.tertiaryAromas}
            onChange={(v) => setField('tertiaryAromas', v)}
          />
          <TextInput
            value={data.tertiaryAromasCustom ?? ''}
            onChange={(v) => setField('tertiaryAromasCustom', v)}
            placeholder="Tilføj egne noter..."
          />
        </div>
      )

    default:
      return null
  }
}
